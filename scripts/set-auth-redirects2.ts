// The Supabase API uses a different key name for redirect URLs
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/config/auth`

// Try different field names the API might expect
const body = {
  site_url: "https://aapawz.com",
  uri_allow_list: "https://aapawz.com/admin/login,https://aapawz.com/account,https://aapawz.com/admin,http://localhost:3000/admin/login,http://localhost:3000/account,http://localhost:3000/admin",
}

const res = await fetch(URL, {
  method: "PATCH",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
})
const data = await res.json()
console.log("Status:", res.status)
// Print all keys that contain 'redirect' or 'uri'
for (const [k, v] of Object.entries(data)) {
  if (k.toLowerCase().includes("redirect") || k.toLowerCase().includes("uri") || k.toLowerCase().includes("url")) {
    console.log(`${k}: ${v}`)
  }
}
