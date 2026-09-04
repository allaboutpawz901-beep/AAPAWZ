const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const sql = `delete from site_settings where "key" = 'resendApiKey'`
const res = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
})
console.log(res.ok ? "OK — resendApiKey deleted from site_settings" : await res.text())
