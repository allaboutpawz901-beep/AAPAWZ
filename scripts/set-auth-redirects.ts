// Update Supabase Auth config with correct redirect URLs
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/config/auth`

const body = {
  site_url: "https://aapawz.com",
  redirect_urls: "https://aapawz.com/admin/login,https://aapawz.com/account,https://aapawz.com/admin,http://localhost:3000/admin/login,http://localhost:3000/account,http://localhost:3000/admin",
  mailer_otp_exp: 3600,
  mailer_otp_length: 6,
  external_email_enabled: true,
}

const res = await fetch(URL, {
  method: "PATCH",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
})
const data = await res.json()
console.log("Status:", res.status)
console.log("Site URL:", data.site_url)
console.log("Redirect URLs:", data.redirect_urls)
