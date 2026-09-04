const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const stmts = [
  `alter table pricing_packages add column if not exists "durationMinutes" int default 120`,
  `alter table pricing_packages add column if not exists "depositAmount" text default '$25.00'`,
  `alter table customers add column if not exists "firstName" text`,
  `alter table customers add column if not exists "lastName" text`,
  `alter table customers add column if not exists "address" text`,
  `alter table customers add column if not exists "addressLine2" text`,
  `alter table customers add column if not exists "city" text`,
  `alter table customers add column if not exists "state" text`,
  `alter table customers add column if not exists "postalCode" text`,
  `alter table dogs add column if not exists "name" text`,
  `alter table dogs add column if not exists "breedId" text`,
  `alter table dogs add column if not exists "sex" text`,
  `alter table dogs add column if not exists "birthDate" text`,
  `alter table dogs add column if not exists "weightLbs" text`,
  `alter table dogs add column if not exists "color" text`,
  `alter table dogs add column if not exists "markings" text`,
  // service_pricing table (separate from packages, for add-ons per service per size)
  `create table if not exists service_pricing (
    id text primary key default gen_random_uuid()::text,
    "serviceName" text, "size" text, "price" text,
    "depositAmount" text, "durationMinutes" int default 120,
    "active" boolean default true, "createdAt" timestamptz default now()
  )`,
  // availability table for admin-managed slots
  `create table if not exists availability (
    id text primary key default gen_random_uuid()::text,
    "staffId" text, "date" text, "startTime" text, "endTime" text,
    "status" text default 'open',
    "createdAt" timestamptz default now()
  )`,
  // payments table
  `create table if not exists payments (
    id text primary key default gen_random_uuid()::text,
    "bookingId" text, "customerId" text, "orderId" text,
    "stripeCheckoutSessionId" text, "stripePaymentIntentId" text,
    "amount" text, "type" text, "status" text default 'pending',
    "createdAt" timestamptz default now()
  )`,
  // blocked_times table
  `create table if not exists blocked_times (
    id text primary key default gen_random_uuid()::text,
    "date" text, "startTime" text, "endTime" text,
    "reason" text, "staffId" text,
    "createdAt" timestamptz default now()
  )`,
]

for (const sql of stmts) {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql }),
    })
    console.log(res.ok ? "OK  " : "FAIL", sql.replace(/\s+/g, " ").slice(0, 70))
  } catch (e: any) { console.log("ERR ", e.message) }
}
