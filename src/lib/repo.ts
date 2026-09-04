// ---------------------------------------------------------------------------
// Repository abstraction — Supabase only.
//   All reads/writes go to Supabase (Postgres via the PostgREST API + Storage
//   for uploads). There is no Prisma/SQLite fallback — Supabase has all 51
//   tables and is the single source of truth.
// ---------------------------------------------------------------------------

export type Row = Record<string, any>

export type CmsResource =
  | "services" | "products" | "gallery" | "packages" | "addons"
  | "faqs" | "policies" | "testimonials" | "bookings" | "consultations" | "messages"
  | "orders" | "order_items" | "customers" | "dogs" | "activity_log" | "dog_breeds"
  | "staff" | "haircut_styles"
  | "coat_types" | "coat_textures" | "coat_lengths" | "coat_conditions" | "shedding_levels"
  | "clip_lengths" | "body_styles" | "leg_styles" | "face_styles" | "head_styles"
  | "ear_styles" | "tail_styles" | "feet_styles"
  | "sanitary_options" | "nail_services" | "paw_pad_services" | "ear_services"
  | "teeth_services" | "deshedding_services" | "coat_techniques"
  | "dog_grooming_profiles" | "appointment_grooming_requests"
  | "payments" | "blocked_times" | "availability" | "service_pricing"
  | "invoices" | "invoice_items" | "email_messages" | "communications"

const TABLE: Record<CmsResource, string> = {
  services: "services",
  products: "products",
  gallery: "gallery_photos",
  packages: "pricing_packages",
  addons: "add_ons",
  faqs: "faqs",
  policies: "policies",
  testimonials: "testimonials",
  bookings: "bookings",
  consultations: "consultations",
  messages: "contact_messages",
  orders: "orders",
  order_items: "order_items",
  customers: "customers",
  dogs: "dogs",
  activity_log: "activity_log",
  dog_breeds: "dog_breeds",
  staff: "staff",
  haircut_styles: "haircut_styles",
  coat_types: "coat_types", coat_textures: "coat_textures", coat_lengths: "coat_lengths",
  coat_conditions: "coat_conditions", shedding_levels: "shedding_levels", clip_lengths: "clip_lengths",
  body_styles: "body_styles", leg_styles: "leg_styles", face_styles: "face_styles",
  head_styles: "head_styles", ear_styles: "ear_styles", tail_styles: "tail_styles",
  feet_styles: "feet_styles", sanitary_options: "sanitary_options", nail_services: "nail_services",
  paw_pad_services: "paw_pad_services", ear_services: "ear_services", teeth_services: "teeth_services",
  deshedding_services: "deshedding_services", coat_techniques: "coat_techniques",
  dog_grooming_profiles: "dog_grooming_profiles",
  appointment_grooming_requests: "appointment_grooming_requests",
  payments: "payments",
  blocked_times: "blocked_times",
  availability: "availability",
  service_pricing: "service_pricing",
  invoices: "invoices",
  invoice_items: "invoice_items",
  email_messages: "email_messages",
  communications: "communications",
}

const ORDERED = new Set<CmsResource>([
  "services", "products", "gallery", "packages", "addons", "faqs", "policies", "testimonials",
])

const SB_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)?.replace(/\/$/, "")
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseReady = !!(SB_URL && SB_KEY)
export const supabaseConfig = { url: SB_URL, key: SB_KEY }

// ---- Supabase REST helper ----
async function sb<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY!,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  })
  if (!res.ok) {
    const t = await res.text().catch(() => res.statusText)
    throw new Error(`Supabase ${res.status}: ${t}`)
  }
  if (res.status === 204) return null as T
  const txt = await res.text()
  return (txt ? JSON.parse(txt) : null) as T
}

// ---- Shared shape ----
export type Repo = {
  list(resource: CmsResource): Promise<Row[]>
  get(resource: CmsResource, id: string): Promise<Row | null>
  create(resource: CmsResource, data: Row): Promise<Row>
  update(resource: CmsResource, id: string, data: Row): Promise<Row>
  remove(resource: CmsResource, id: string): Promise<{ ok: boolean }>
  stats(): Promise<any>
  getSettings(): Promise<Record<string, string>>
  saveSettings(obj: Record<string, string>): Promise<void>
  addNewsletter(email: string): Promise<Row>
  listNewsletter(): Promise<Row[]>
}

// ===========================================================================
// Supabase implementation (PostgREST via fetch)
// ===========================================================================
const supabaseRepo: Repo = {
  async list(r) {
    const t = TABLE[r]
    const order = ORDERED.has(r) ? "order.asc" : "createdAt.desc"
    const rows = await sb<Row[]>(`${t}?order=${order}`)
    return rows || []
  },
  async get(r, id) {
    const t = TABLE[r]
    const rows = await sb<Row[]>(`${t}?id=eq.${encodeURIComponent(id)}&limit=1`)
    return (rows && rows[0]) || null
  },
  async create(r, data) {
    const t = TABLE[r]
    const rows = await sb<Row[]>(t, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(stripNulls(data)),
    })
    return (rows && rows[0]) || data
  },
  async update(r, id, data) {
    const t = TABLE[r]
    const rows = await sb<Row[]>(`${t}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(stripNulls(data)),
    })
    return (rows && rows[0]) || data
  },
  async remove(r, id) {
    const t = TABLE[r]
    await sb(`${t}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" })
    return { ok: true }
  },
  async stats() {
    const [services, products, gallery, packages, addons, faqs, policies,
      testimonials, bookings, consultations, messages, newsletter] = await Promise.all([
      sb<Row[]>("services?select=id"), sb<Row[]>("products?select=id"),
      sb<Row[]>("gallery_photos?select=id"), sb<Row[]>("pricing_packages?select=id"),
      sb<Row[]>("add_ons?select=id"), sb<Row[]>("faqs?select=id"),
      sb<Row[]>("policies?select=id"), sb<Row[]>("testimonials?select=id"),
      sb<Row[]>("bookings?select=*&order=createdAt.desc&limit=50"),
      sb<Row[]>("consultations?select=id"),
      sb<Row[]>("contact_messages?select=*&order=createdAt.desc&limit=50"),
      sb<Row[]>("newsletter?select=id"),
    ])
    const arr = (x: Row[] | null) => x || []
    const b = arr(bookings), m = arr(messages)
    return {
      counts: {
        services: arr(services).length, products: arr(products).length,
        gallery: arr(gallery).length, packages: arr(packages).length,
        addons: arr(addons).length, faqs: arr(faqs).length, policies: arr(policies).length,
        testimonials: arr(testimonials).length, bookings: b.length,
        consultations: arr(consultations).length, messages: m.length, newsletter: arr(newsletter).length,
      },
      pendingBookings: b.filter((x) => x.status === "PENDING").length,
      unreadMessages: m.filter((x) => x.status === "UNREAD").length,
      pendingConsultations: arr(await sb<Row[]>("consultations?select=status")).filter((x) => x.status === "PENDING").length,
      recentBookings: b.slice(0, 5),
      recentMessages: m.slice(0, 5),
    }
  },
  async getSettings() {
    const rows = await sb<Row[]>("site_settings?select=key,value")
    const obj: Record<string, string> = {}
    for (const r of rows || []) obj[r.key] = r.value
    return obj
  },
  async saveSettings(obj) {
    for (const [key, value] of Object.entries(obj)) {
      await sb("site_settings", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ key, value: String(value) }),
      })
    }
  },
  async addNewsletter(email) {
    const rows = await sb<Row[]>("newsletter", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ email }),
    })
    return (rows && rows[0]) || { email }
  },
  async listNewsletter() {
    const rows = await sb<Row[]>("newsletter?order=createdAt.desc")
    return rows || []
  },
}

function stripNulls(data: Row): Row {
  const out: Row = {}
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) out[k] = v === null ? undefined : v
  }
  return out
}

// ---- backend probe (Supabase only) ----
let backend: "supabase" | null = null
async function resolveBackend(): Promise<"supabase"> {
  if (backend) return backend
  if (!supabaseReady) {
    throw new Error("Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env")
  }
  // Probe once to verify Supabase is reachable
  try {
    const res = await fetch(`${SB_URL}/rest/v1/services?select=id&limit=1`, {
      headers: { apikey: SB_KEY!, Authorization: `Bearer ${SB_KEY}` },
      signal: AbortSignal.timeout(5000),
    })
    backend = res.ok ? "supabase" : null
    if (!backend) throw new Error(`Supabase probe failed (${res.status})`)
  } catch (e: any) {
    throw new Error(`Supabase unreachable: ${e.message}`)
  }
  return backend
}

export async function getBackend() {
  return await resolveBackend()
}
export async function usingSupabase() {
  try {
    return (await resolveBackend()) === "supabase"
  } catch {
    return false
  }
}

// Direct export — no delegation needed since there's only one backend.
export const repo: Repo = supabaseRepo
