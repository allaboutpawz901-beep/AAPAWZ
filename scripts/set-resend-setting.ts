// Store RESEND_API_KEY in site_settings so the Next.js server reads it at runtime.
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const sql = `insert into site_settings ("key","value") values ('resendApiKey','') on conflict ("key") do nothing`
const res = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
})
console.log(res.ok ? "OK" : await res.text())
