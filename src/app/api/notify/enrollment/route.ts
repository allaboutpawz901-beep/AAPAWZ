import { NextRequest, NextResponse } from "next/server"

// POST /api/notify/enrollment — receives webhook from Supabase trigger
// when a new learner enrolls. Sends a transactional email to management
// via Resend.
//
// The Supabase trigger (on_new_learner_enrollment) fires this webhook
// whenever a new row is inserted into user_roles with role='learner'.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, user_id, role, timestamp } = body

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      // No Resend key — log and return success so the trigger doesn't retry
      console.log("[Enrollment Notification] New enrollment (no email sent — RESEND_API_KEY not configured):", { email, name, role })
      return NextResponse.json({ notified: false, reason: "RESEND_API_KEY not configured" })
    }

    // Send email to management via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "All About Pawz <noreply@aapawz.com>",
        to: ["etnologicinc@gmail.com"],
        subject: `New Enrollment: ${name || email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0f1f35;">New Learner Enrollment</h2>
            <p>A new learner has enrolled in the academy:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Role:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${role}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Time:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date(timestamp || Date.now()).toLocaleString()}</td></tr>
            </table>
            <p style="color: #666; font-size: 12px;">This is an automated notification from the All About Pawz enrollment system.</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("[Enrollment Notification] Resend error:", errText)
      return NextResponse.json({ notified: false, error: errText }, { status: 500 })
    }

    return NextResponse.json({ notified: true, email, name })
  } catch (error) {
    console.error("[Enrollment Notification] Error:", error)
    return NextResponse.json(
      { notified: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
