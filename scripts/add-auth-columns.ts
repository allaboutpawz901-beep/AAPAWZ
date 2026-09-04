const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const stmts = [
  // Link CRM customer to Supabase Auth user
  `alter table customers add column if not exists "userId" text`,
  // Staff can also have auth accounts
  `alter table staff add column if not exists "userId" text`,
]

for (const sql of stmts) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  })
  console.log(res.ok ? "OK  " : "FAIL", sql.replace(/\s+/g, " ").slice(0, 70))
}
