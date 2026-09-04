// Apply the phase-2 schema additions to Supabase via the Management API.
import { readFileSync } from "node:fs"

const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const statements = [
  // product categories
  `alter table products add column if not exists "category" text default 'General'`,
  `alter table products add column if not exists "featured" boolean default false`,
  // booking deposit + stripe fields
  `alter table bookings add column if not exists "servicePrice" text`,
  `alter table bookings add column if not exists "depositAmount" text`,
  `alter table bookings add column if not exists "balanceDue" text`,
  `alter table bookings add column if not exists "stripeCheckoutSessionId" text`,
  `alter table bookings add column if not exists "stripePaymentIntentId" text`,
  `alter table bookings add column if not exists "paymentStatus" text default 'UNPAID'`,
  // customers + dogs
  `create table if not exists customers (
     id text primary key default gen_random_uuid()::text,
     "firstName" text, "lastName" text, "email" text unique, "phone" text,
     "stripeCustomerId" text, "createdAt" timestamptz default now()
   )`,
  `create table if not exists dogs (
     id text primary key default gen_random_uuid()::text,
     "customerId" text references customers(id),
     "name" text, "breed" text, "size" text, "weight" text, "age" text,
     "coatType" text, "notes" text, "specialHandling" text,
     "createdAt" timestamptz default now()
   )`,
  // orders + items
  `create table if not exists orders (
     id text primary key default gen_random_uuid()::text,
     "customerId" text, "status" text default 'CART',
     "subtotal" text, "stripeCheckoutSessionId" text, "stripePaymentIntentId" text,
     "paymentStatus" text default 'UNPAID',
     "createdAt" timestamptz default now(), "updatedAt" timestamptz default now()
   )`,
  `create table if not exists order_items (
     id text primary key default gen_random_uuid()::text,
     "orderId" text references orders(id),
     "productId" text, "name" text, "quantity" int default 1, "unitPrice" text,
     "createdAt" timestamptz default now()
   )`,
  // activity log
  `create table if not exists activity_log (
     id text primary key default gen_random_uuid()::text,
     "entity" text, "entityId" text, "action" text, "summary" text,
     "actor" text default 'system', "createdAt" timestamptz default now()
   )`,
]

let ok = 0, fail = 0
for (let i = 0; i < statements.length; i++) {
  const s = statements[i]
  const preview = s.replace(/\s+/g, " ").slice(0, 60)
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: s }),
    })
    const txt = await res.text()
    if (res.ok || /already exists|duplicate/i.test(txt)) {
      ok++; console.log(`[${i+1}/${statements.length}] OK   ${preview}`)
    } else {
      fail++; console.log(`[${i+1}/${statements.length}] FAIL ${preview}\n      ${txt.slice(0,160)}`)
    }
  } catch (e: any) { fail++; console.log(`[${i+1}/${statements.length}] ERR  ${e.message}`) }
}
console.log(`\nDone: ${ok} ok, ${fail} failed`)
