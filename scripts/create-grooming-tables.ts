// Create all grooming lookup tables + relationship tables in Supabase.
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const lookups = [
  "coat_types", "coat_textures", "coat_lengths", "coat_conditions",
  "shedding_levels", "clip_lengths", "body_styles", "leg_styles",
  "face_styles", "head_styles", "ear_styles", "tail_styles", "feet_styles",
  "sanitary_options", "nail_services", "paw_pad_services",
  "ear_services", "teeth_services", "deshedding_services", "coat_techniques",
]

const createLookup = (name: string) =>
  `create table if not exists ${name} (id text primary key default gen_random_uuid()::text, "name" text not null, "slug" text unique, "description" text, "active" boolean default true, "sortOrder" int default 0, "createdAt" timestamptz default now())`

const statements = [
  ...lookups.map(createLookup),
  `create table if not exists dog_grooming_profiles (
    id text primary key default gen_random_uuid()::text,
    "dogId" text, "coatTypeId" text, "coatTextureId" text, "coatLengthId" text,
    "coatConditionId" text, "sheddingLevel" text,
    "currentHaircutStyleId" text, "currentBodyLengthId" text,
    "temperament" text, "nailHandling" text, "faceHandling" text,
    "feetHandling" text, "earHandling" text, "dryerHandling" text, "clipperHandling" text,
    "handlingNotes" text, "groomingNotes" text, "ownerNotes" text,
    "createdAt" timestamptz default now(), "updatedAt" timestamptz default now()
  )`,
  `create table if not exists appointment_grooming_requests (
    id text primary key default gen_random_uuid()::text,
    "bookingId" text, "styleId" text, "bodyLengthId" text, "bodyStyleId" text,
    "legStyleId" text, "faceStyleId" text, "headStyleId" text,
    "earStyleId" text, "tailStyleId" text, "feetStyleId" text,
    "sanitaryService" text, "nailService" text, "pawPadService" text,
    "earService" text, "teethService" text, "desheddingService" text,
    "coatTechnique" text, "specialInstructions" text,
    "createdAt" timestamptz default now()
  )`,
  `alter table bookings add column if not exists "customerId" text`,
  `alter table bookings add column if not exists "dogId" text`,
  `alter table bookings add column if not exists "groomingRequestId" text`,
  `alter table consultations add column if not exists "customerId" text`,
  `alter table consultations add column if not exists "dogId" text`,
]

let ok = 0, fail = 0
for (const sql of statements) {
  const preview = sql.replace(/\s+/g, " ").slice(0, 60)
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql }),
    })
    const txt = await res.text()
    if (res.ok) { ok++; console.log("OK  ", preview) }
    else { fail++; console.log("FAIL", preview, txt.slice(0, 80)) }
  } catch (e: any) { fail++; console.log("ERR ", e.message) }
}
console.log(`\n${ok} ok, ${fail} failed`)
