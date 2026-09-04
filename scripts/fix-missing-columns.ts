// Add any missing columns needed by the wizard
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const stmts = [
  `alter table dogs add column if not exists "breedName" text`,
  `alter table consultations add column if not exists "preferredDate" text`,
  `alter table consultations add column if not exists "dogId" text`,
  `alter table payments add column if not exists "stripeCheckoutSessionId" text`,
  `alter table payments add column if not exists "stripePaymentIntentId" text`,
]

for (const sql of stmts) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  })
  console.log(res.ok ? "OK  " : "FAIL", sql.replace(/\s+/g, " ").slice(0, 70))
}
