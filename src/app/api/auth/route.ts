import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// POST /api/auth — LMS learner authentication and enrollment
// Uses the EXISTING Supabase schema:
//   - lms.learner_profiles for learner data
//   - lms.lms_roles for role assignments (via assign_lms_role function)
//   - lms.enrollments for course enrollment
//   - staff table for groomer/admin roles
//   - customers table for customer accounts

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const TENANT_ID = "00000000-0000-0000-0000-000000000001"

function getSupabase() {
  if (!SB_URL || !SB_KEY || SB_URL.startsWith("your-")) return null
  return createClient(SB_URL, SB_KEY, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { provider, email, name, password, action, pathwayCode } = body

    const supabase = getSupabase()

    // Google sign-in
    if (provider === "google") {
      if (supabase) {
        // Check if learner_profiles already has this user
        const { data: existing } = await supabase
          .from("learner_profiles")
          .select("id, user_id")
          .eq("user_id", body.user_id || email)
          .limit(1)

        if (!existing || existing.length === 0) {
          // Create learner profile using the existing table
          await supabase.from("learner_profiles").insert({
            tenant_id: TENANT_ID,
            user_id: body.user_id || crypto.randomUUID(),
            preferred_name: name || "Learner",
            marketing_opt_in: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          // Assign learner role using the existing function
          await supabase.rpc("assign_lms_role", {
            p_tenant_id: TENANT_ID,
            p_user_id: body.user_id || email,
            p_role: "learner",
          })

          // Fire enrollment notification
          await fetch(`${req.nextUrl.origin}/api/notify/enrollment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name: name || "Learner", user_id: body.user_id, timestamp: new Date().toISOString() }),
          })
        }
      }

      const res = NextResponse.json({
        user: { id: email, email, name: name || "Learner", role: "learner" },
        redirect: "/learn/classroom",
      })
      res.cookies.set("leashed_user", JSON.stringify({ id: email, email, name: name || "Learner" }), {
        httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/",
      })
      return res
    }

    // Email/password sign-in
    if (action === "signin" || (email && password)) {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return NextResponse.json({ error: error.message }, { status: 401 })

        return NextResponse.json({
          user: { id: data.user?.id, email: data.user?.email, role: "learner" },
          redirect: "/learn/classroom",
        })
      }

      // Demo mode
      const res = NextResponse.json({
        user: { id: email, email, name: name || email.split("@")[0], role: "learner" },
        redirect: "/learn/classroom",
      })
      res.cookies.set("leashed_user", JSON.stringify({ id: email, email, name: name || email.split("@")[0] }), {
        httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/",
      })
      return res
    }

    // New registration / enrollment
    if (action === "register" || (email && !password)) {
      if (supabase) {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          password: password || "WelcomePawz123!",
          email_confirm: true,
          user_metadata: { name, role: "learner", full_name: name },
        })

        if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

        const userId = authData.user.id

        // Insert into existing learner_profiles table
        await supabase.from("learner_profiles").insert({
          tenant_id: TENANT_ID,
          user_id: userId,
          preferred_name: name,
          marketing_opt_in: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        // Assign learner role using the existing function
        await supabase.rpc("assign_lms_role", {
          p_tenant_id: TENANT_ID,
          p_user_id: userId,
          p_role: "learner",
        })

        // If etnologicinc@gmail.com, also assign admin role
        if (email.toLowerCase() === "etnologicinc@gmail.com") {
          await supabase.rpc("assign_lms_role", {
            p_tenant_id: TENANT_ID,
            p_user_id: userId,
            p_role: "admin",
          })
        }

        // Fire enrollment notification to management
        await fetch(`${req.nextUrl.origin}/api/notify/enrollment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, user_id: userId, timestamp: new Date().toISOString() }),
        })

        return NextResponse.json({
          user: { id: userId, email, name, role: "learner" },
          redirect: "/learn/classroom",
        })
      }

      // Demo mode
      const res = NextResponse.json({
        user: { id: email, email, name, role: "learner" },
        redirect: "/learn/classroom",
      })
      res.cookies.set("leashed_user", JSON.stringify({ id: email, email, name }), {
        httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/",
      })
      return res
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Auth failed" },
      { status: 500 }
    )
  }
}

// GET — check current session
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("leashed_user")?.value
  if (cookie) {
    try {
      const user = JSON.parse(decodeURIComponent(cookie))
      return NextResponse.json({ user })
    } catch {
      return NextResponse.json({ user: null })
    }
  }

  const supabase = getSupabase()
  if (supabase) {
    const authHeader = req.headers.get("authorization")
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "")
      const { data } = await supabase.auth.getUser(token)
      if (data.user) {
        return NextResponse.json({ user: { id: data.user.id, email: data.user.email, role: "learner" } })
      }
    }
  }

  return NextResponse.json({ user: null })
}
