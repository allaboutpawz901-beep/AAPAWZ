import { db } from "./db"

// ---------------------------------------------------------------------------
// Repository abstraction.
//   - If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, all reads/writes
//     go to Supabase (Postgres via the PostgREST API + Storage for uploads).
//   - Otherwise, fall back to the local Prisma + SQLite database.
// The two implementations expose the same surface so the API routes and the
// CMS frontend never need to know which backend is active.
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

const PRISMA_DELEGATE: Record<CmsResource, any> = {
  services: db.service,
  products: db.product,
  gallery: db.galleryPhoto,
  packages: db.pricingPackage,
  addons: db.addOn,
  faqs: db.faq,
  policies: db.policy,
  testimonials: db.testimonial,
  bookings: db.booking,
  consultations: db.consultation,
  messages: db.contactMessage,
  orders: (null as any),      // SQLite fallback not modeled for these yet
  order_items: (null as any),
  customers: (null as any),
  dogs: (null as any),
  activity_log: (null as any),
  dog_breeds: (null as any),
  staff: (null as any),
  haircut_styles: (null as any),
  coat_types: (null as any), coat_textures: (null as any), coat_lengths: (null as any),
  coat_conditions: (null as any), shedding_levels: (null as any), clip_lengths: (null as any),
  body_styles: (null as any), leg_styles: (null as any), face_styles: (null as any),
  head_styles: (null as any), ear_styles: (null as any), tail_styles: (null as any),
  feet_styles: (null as any), sanitary_options: (null as any), nail_services: (null as any),
  paw_pad_services: (null as any), ear_services: (null as any), teeth_services: (null as any),
  deshedding_services: (null as any), coat_techniques: (null as any),
  dog_grooming_profiles: (null as any), appointment_grooming_requests: (null as any),
  payments: (null as any), blocked_times: (null as any),
  availability: (null as any), service_pricing: (null as any),
  invoices: (null as any), invoice_items: (null as any),
  email_messages: (null as any), communications: (null as any),
}

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

// Use NEXT_PUBLIC_ vars (available on both server and client) with fallback
// to the non-public versions for backwards compatibility.
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
// Prisma implementation
// ===========================================================================
const prismaRepo: Repo = {
  async list(r) {
    const delegate = PRISMA_DELEGATE[r]
    if (!delegate) throw new Error(`Resource ${r} not available on SQLite (Supabase only)`)
    const orderBy = ORDERED.has(r) ? { order: "asc" as const } : { createdAt: "desc" as const }
    return delegate.findMany({ orderBy })
  },
  async get(r, id) {
    const delegate = PRISMA_DELEGATE[r]
    if (!delegate) throw new Error(`Resource ${r} not available on SQLite (Supabase only)`)
    return delegate.findUnique({ where: { id } })
  },
  async create(r, data) {
    const delegate = PRISMA_DELEGATE[r]
    if (!delegate) throw new Error(`Resource ${r} not available on SQLite (Supabase only)`)
    return delegate.create({ data })
  },
  async update(r, id, data) {
    const delegate = PRISMA_DELEGATE[r]
    if (!delegate) throw new Error(`Resource ${r} not available on SQLite (Supabase only)`)
    return delegate.update({ where: { id }, data })
  },
  async remove(r, id) {
    const delegate = PRISMA_DELEGATE[r]
    if (!delegate) throw new Error(`Resource ${r} not available on SQLite (Supabase only)`)
    await delegate.delete({ where: { id } })
    return { ok: true }
  },
  async stats() {
    const [
      services, products, gallery, packages, addons, faqs, policies,
      testimonials, bookings, consultations, messages, newsletter,
    ] = await Promise.all([
      db.service.count(), db.product.count(), db.galleryPhoto.count(),
      db.pricingPackage.count(), db.addOn.count(), db.faq.count(),
      db.policy.count(), db.testimonial.count(), db.booking.count(),
      db.consultation.count(), db.contactMessage.count(), db.newsletterSub.count(),
    ])
    const [pendingBookings, unreadMessages, pendingConsultations] = await Promise.all([
      db.booking.count({ where: { status: "PENDING" } }),
      db.contactMessage.count({ where: { status: "UNREAD" } }),
      db.consultation.count({ where: { status: "PENDING" } }),
    ])
    const recentBookings = await db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
    const recentMessages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
    return {
      counts: { services, products, gallery, packages, addons, faqs, policies, testimonials, bookings, consultations, messages, newsletter },
      pendingBookings, unreadMessages, pendingConsultations,
      recentBookings, recentMessages,
    }
  },
  async getSettings() {
    const rows = await db.siteSetting.findMany()
    const obj: Record<string, string> = {}
    for (const r of rows) obj[r.key] = r.value
    return obj
  },
  async saveSettings(obj) {
    for (const [key, value] of Object.entries(obj)) {
      await db.siteSetting.upsert({ where: { key }, create: { key, value: String(value) }, update: { value: String(value) } })
    }
  },
  async addNewsletter(email) {
    return db.newsletterSub.create({ data: { email } })
  },
  async listNewsletter() {
    return db.newsletterSub.findMany({ orderBy: { createdAt: "desc" } })
  },
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

// ---- backend probe ----
// Supabase env may be present before the schema has been applied. Probe once
// to see whether the tables actually exist; if not, fall back to Prisma so the
// site keeps working. Re-probe by restarting the dev server after running the
// SQL schema.
let backend: "supabase" | "sqlite" | null = null
async function resolveBackend(): Promise<"supabase" | "sqlite"> {
  if (backend) return backend
  if (!supabaseReady) { backend = "sqlite"; return "sqlite" }
  try {
    const res = await fetch(`${SB_URL}/rest/v1/services?select=id&limit=1`, {
      headers: { apikey: SB_KEY!, Authorization: `Bearer ${SB_KEY}` },
      signal: AbortSignal.timeout(5000),
    })
    backend = res.ok ? "supabase" : "sqlite"
  } catch {
    backend = "sqlite"
  }
  return backend
}

export async function getBackend() {
  return await resolveBackend()
}
export async function usingSupabase() {
  return (await resolveBackend()) === "supabase"
}

// Lazy repo: each call resolves the backend (cached after first probe).
function delegating(name: keyof Repo): Repo[typeof name] {
  return (async (...args: any[]) => {
    const r = (await resolveBackend()) === "supabase" ? supabaseRepo : prismaRepo
    // @ts-expect-error dynamic dispatch
    return r[name](...args)
  }) as Repo[typeof name]
}

export const repo: Repo = {
  list: delegating("list"),
  get: delegating("get"),
  create: delegating("create"),
  update: delegating("update"),
  remove: delegating("remove"),
  stats: delegating("stats"),
  getSettings: delegating("getSettings"),
  saveSettings: delegating("saveSettings"),
  addNewsletter: delegating("addNewsletter"),
  listNewsletter: delegating("listNewsletter"),
}
