import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POST /api/auth — LMS learner authentication
// Handles:
//   1. Google sign-in (provider: 'google') — creates/looks up a learner
//   2. Email/password sign-in — looks up a learner
//   3. New learner registration — creates a learner account
//
// When Supabase is configured, this writes to the auth tables.
// When Supabase is NOT configured (dev/preview), it returns a demo session
// so the onboarding flow can proceed to the classroom.

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabase() {
  if (!SB_URL || !SB_KEY || SB_URL.startsWith("your-")) return null;
  return createClient(SB_URL, SB_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, email, name, password, action } = body;

    // Google sign-in
    if (provider === "google") {
      const supabase = getSupabase();

      if (supabase) {
        // Create the user in Supabase Auth — the handle_new_user trigger
        // will automatically create a profile + learner role + notification
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { full_name: name || "Learner" },
        });

        // If user already exists, that's fine — just sign them in
        if (authError && !authError.message.includes("already")) {
          return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        // If new user was created, the Supabase trigger already:
        //   1. Created a profile in public.profiles
        //   2. Assigned 'learner' role in public.user_roles
        //   3. Assigned 'admin' role if email is etnologicinc@gmail.com
        //   4. Fired the enrollment notification webhook to /api/notify/enrollment
        //   which sends an email to management via Resend

        // Also check if admin role should be assigned for the test account
        if (email.toLowerCase() === "etnologicinc@gmail.com" && authData?.user) {
          await supabase.from("user_roles").upsert({
            user_id: authData.user.id,
            role: "admin",
          }, { onConflict: "user_id,role" });
        }
      }

      // Set a session cookie and return success
      const res = NextResponse.json({
        user: { id: email, email, name: name || "Learner", role: "learner" },
        redirect: "/learn/classroom",
      });
      res.cookies.set("leashed_user", JSON.stringify({ id: email, email, name: name || "Learner" }), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    // Email/password sign-in
    if (action === "signin" || (email && password)) {
      const supabase = getSupabase();

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return NextResponse.json({ error: error.message }, { status: 401 });
        }

        return NextResponse.json({
          user: { id: data.user?.id, email: data.user?.email, role: "learner" },
          redirect: "/learn/classroom",
        });
      }

      // Demo mode — no Supabase, return a demo session
      const res = NextResponse.json({
        user: { id: email, email, name: name || email.split("@")[0], role: "learner" },
        redirect: "/learn/classroom",
      });
      res.cookies.set("leashed_user", JSON.stringify({ id: email, email, name: name || email.split("@")[0] }), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    // New registration
    if (action === "register" || (email && !password)) {
      const supabase = getSupabase();

      if (supabase) {
        // Create user in Supabase Auth — the handle_new_user trigger fires
        // automatically, creating profile + learner role + notification email
        const { data, error } = await supabase.auth.admin.createUser({
          email,
          password: password || "tempPassword123!",
          email_confirm: true,
          user_metadata: { full_name: name, name },
        });

        if (error && !error.message.includes("already")) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // If new user created, the trigger already:
        //   1. Created profile in public.profiles
        //   2. Assigned 'learner' role in public.user_roles
        //   3. Fired enrollment notification to /api/notify/enrollment
        //   4. Assigned 'admin' role if email is etnologicinc@gmail.com

        // Also fire the notification webhook directly (belt + suspenders)
        // in case the DB trigger's pg_net isn't available
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aapawz.com"}/api/notify/enrollment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              name,
              user_id: data?.user?.id || email,
              role: "learner",
              timestamp: new Date().toISOString(),
            }),
          });
        } catch {
          // Notification is best-effort — don't fail enrollment
        }
        return NextResponse.json({
          user: { id: data.user.id, email, name, role: "learner" },
          redirect: "/learn/classroom",
        });
      }

      // Demo mode
      const res = NextResponse.json({
        user: { id: email, email, name, role: "learner" },
        redirect: "/learn/classroom",
      });
      res.cookies.set("leashed_user", JSON.stringify({ id: email, email, name }), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Auth failed" },
      { status: 500 }
    );
  }
}

// GET — check current session
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("leashed_user")?.value;
  if (cookie) {
    try {
      const user = JSON.parse(decodeURIComponent(cookie));
      return NextResponse.json({ user });
    } catch {
      return NextResponse.json({ user: null });
    }
  }

  // Check Supabase session
  const supabase = getSupabase();
  if (supabase) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabase.auth.getUser(token);
      if (data.user) {
        return NextResponse.json({ user: { id: data.user.id, email: data.user.email, role: "learner" } });
      }
    }
  }

  return NextResponse.json({ user: null });
}
