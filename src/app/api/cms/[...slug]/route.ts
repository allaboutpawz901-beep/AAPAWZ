import { NextRequest, NextResponse } from "next/server"
import { repo, type CmsResource } from "@/lib/repo"
import { sendBookingConfirmation, sendConsultationRequest } from "@/lib/email"
import { captureServerEvent, logAnalyticsEvent } from "@/lib/analytics-server"
import { requireAdminApi } from "@/lib/admin/gate"

const RESOURCES = new Set<CmsResource>([
  "services", "products", "gallery", "packages", "addons", "faqs",
  "policies", "testimonials", "bookings", "consultations", "messages",
  "orders", "order_items", "customers", "dogs", "activity_log", "dog_breeds",
  "staff", "haircut_styles",
  "coat_types", "coat_textures", "coat_lengths", "coat_conditions", "shedding_levels",
  "clip_lengths", "body_styles", "leg_styles", "face_styles", "head_styles",
  "ear_styles", "tail_styles", "feet_styles",
  "sanitary_options", "nail_services", "paw_pad_services", "ear_services",
  "teeth_services", "deshedding_services", "coat_techniques",
  "dog_grooming_profiles", "appointment_grooming_requests",
  "blocked_times", "availability", "service_pricing",
  "invoices", "invoice_items", "email_messages", "communications", "product_reviews",
  "pet_product_categories", "pet_product_filters", "pet_product_filter_values", "pet_category_filters",
  "serviceItems",
])

// Resources the PUBLIC website forms are allowed to write to without admin
// sign-in. These are the only endpoints under /api/cms that any anonymous
// visitor can POST/PUT/DELETE — every other resource (orders, customers,
// staff, invoices, products, services, …) requires an admin session.
//
//   - bookings        → /book (booking-form)
//   - consultations    → /book/consultation (consultation-form, booking-wizard-v2)
//   - dogs             → booking-wizard-v2 (creates a pet profile before booking)
//   - messages         → /contact (contact-form)
//   - newsletter       → footer newsletter form
//   - product_reviews  → shop product pages (moderated, visible:false on insert)
//
// Anything else (orders, order_items, customers, staff, invoices,
// invoice_items, services, products, …) is admin-only on writes.
const PUBLIC_WRITE_RESOURCES = new Set<CmsResource>([
  "bookings", "consultations", "dogs", "messages", "newsletter", "product_reviews",
])

function isResource(k: string): k is CmsResource {
  return RESOURCES.has(k as CmsResource)
}

// Enforce the admin gate on writes for any resource that is NOT in the
// public allowlist. Returns a NextResponse (401/500) when access is denied,
// or null when the caller is allowed to proceed.
async function enforceWriteGate(resource: CmsResource): Promise<NextResponse | null> {
  if (PUBLIC_WRITE_RESOURCES.has(resource)) return null
  return await requireAdminApi()
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const [resource, id] = slug

  if (resource === "status") {
    const { getBackend, supabaseReady: sr } = await import("@/lib/repo")
    return NextResponse.json({ backend: await getBackend(), supabaseConfigured: sr, resendReady: !!process.env.RESEND_API_KEY })
  }
  if (resource === "stats") return NextResponse.json(await repo.stats())
  if (resource === "settings") {
    const settings = await repo.getSettings()
    // Static fallback: when Supabase is not configured, return seed defaults
    // from schema.sql so the site renders fully. When Supabase IS configured,
    // the database settings take precedence.
    const { supabaseReady } = await import("@/lib/repo")
    if (!supabaseReady || Object.keys(settings).length === 0) {
      return NextResponse.json(STATIC_SETTINGS)
    }
    return NextResponse.json(settings)
  }
  if (resource === "newsletter") return NextResponse.json(await repo.listNewsletter())
  if (!isResource(resource)) return NextResponse.json({ error: `Unknown resource: ${resource}` }, { status: 404 })
  if (id) {
    const rec = await repo.get(resource, id)
    if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(rec)
  }
  const rows = await repo.list(resource)
  // Static fallback for core public-site resources when Supabase is not
  // configured or returns empty. These match the seed data in schema.sql.
  const { supabaseReady } = await import("@/lib/repo")
  if (!supabaseReady || rows.length === 0) {
    if (resource === "services") return NextResponse.json(STATIC_SERVICES)
    if (resource === "testimonials") return NextResponse.json(STATIC_TESTIMONIALS)
  }
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const [resource] = slug

  if (resource === "settings") {
    // Settings writes are admin-only — the public site only reads them via GET.
    const gate = await requireAdminApi()
    if (gate) return gate
    const body = await req.json()
    if (body.settings && typeof body.settings === "object") {
      await repo.saveSettings(body.settings as Record<string, string>)
      return NextResponse.json({ ok: true })
    }
    if (body.key) {
      await repo.saveSettings({ [body.key]: String(body.value ?? "") })
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 })
  }

  if (!isResource(resource)) return NextResponse.json({ error: `Unknown resource: ${resource}` }, { status: 404 })

  // Gate: only public-form resources (bookings, consultations, dogs, messages,
  // newsletter, product_reviews) accept anonymous writes. Everything else
  // (orders, customers, staff, invoices, services, products, …) requires
  // an admin session.
  const writeGate = await enforceWriteGate(resource)
  if (writeGate) return writeGate

  const body = await req.json()
  const rec = await repo.create(resource, body)

  // ---- Email notifications (fail-soft) ----
  if (resource === "bookings") {
    sendBookingConfirmation(rec as any).catch((e) => console.error("[email] booking notify failed:", e.message))
  } else if (resource === "consultations") {
    sendConsultationRequest(rec as any).catch((e) => console.error("[email] consultation notify failed:", e.message))

    // Authoritative generate_lead — the consultation was actually submitted
    // and persisted (server-side, independent of cookie consent). Fail-safe:
    // neither helper ever throws; the wrap is belt-and-braces so analytics
    // can NEVER fail the submission response.
    try {
      const c: any = rec
      const props: Record<string, unknown> = {
        lead_type: "consultation",
        currency: "USD",
        value: 0,
      }
      if (c?.email) props.email = c.email
      if (c?.breed) props.breed = c.breed
      if (c?.dogName) props.dog_name = c.dogName
      await captureServerEvent({ event: "generate_lead", distinctId: c?.email || undefined, properties: props })
      await logAnalyticsEvent({
        event: "generate_lead",
        data: props,
        page: "/book/consultation",
        value: 0,
        currency: "USD",
      })
    } catch { /* analytics must never fail the submission */ }
  }

  return NextResponse.json(rec, { status: 201 })
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const [resource, id] = slug
  if (!isResource(resource) || !id) return NextResponse.json({ error: "Bad request" }, { status: 400 })
  const writeGate = await enforceWriteGate(resource)
  if (writeGate) return writeGate
  const body = await req.json()
  const rec = await repo.update(resource, id, body)
  return NextResponse.json(rec)
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params
  const [resource, id] = slug
  if (!isResource(resource) || !id) return NextResponse.json({ error: "Bad request" }, { status: 400 })
  const writeGate = await enforceWriteGate(resource)
  if (writeGate) return writeGate

  // When a product is deleted, archive its Stripe twin too (fail-soft — the
  // catalog row is the source of truth, so deletion must always succeed).
  let stripeCleanup: { ok: boolean; detail?: string } | null = null
  if (resource === "products") {
    try {
      const p = await repo.get("products", id)
      if (p?.stripeProductId && process.env.STRIPE_SECRET_KEY) {
        const { default: Stripe } = await import("stripe")
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        await stripe.products.update(p.stripeProductId, { active: false })
        if (p.stripePriceId) {
          await stripe.prices.update(p.stripePriceId, { active: false }).catch(() => {})
        }
        stripeCleanup = { ok: true }
      }
    } catch (e: any) {
      stripeCleanup = { ok: false, detail: e?.message || "Stripe archive failed" }
    }
  }

  await repo.remove(resource, id)
  return NextResponse.json({ ok: true, ...(stripeCleanup ? { stripeCleanup } : {}) })
}

// ---------------------------------------------------------------------------
// Static fallback data — matches the seed data in supabase/schema.sql.
// Used when Supabase is not configured (dev/preview) so the site renders
// fully. In production with Supabase connected, the database data is used.
// ---------------------------------------------------------------------------

const STATIC_SETTINGS: Record<string, string> = {
  brandName: "All About Pawz",
  tagline: "From Pawz to PAWfection",
  heroTitle: "Luxury Grooming. Exceptional Care.",
  heroSubtitle: "We deliver a spa-level grooming experience where every detail is designed for your pup's comfort, style, and happiness.",
  addressLine1: "1428 Maple Grove Avenue",
  addressLine2: "Memphis, TN 38104",
  phone: "901-800-7182",
  email: "help@aapawz.com",
  hoursTueSat: "9am – 6pm",
  hoursSun: "10am – 4pm",
  hoursMon: "Closed",
  instagram: "https://instagram.com/aapawz",
  footerNote: "© 2024 All About Pawz LLC. All rights reserved.",
}

const STATIC_SERVICES = [
  { id: "srv-1", icon: "Scissors", title: "GROOMING", description: "Haircuts, styling,\nand full grooms", image: "/assets/svc-groom.jpg", alt: "Groomer trimming a dog's coat with scissors", order: 0, visible: true },
  { id: "srv-2", icon: "Bath", title: "BATH & SPA", description: "De-shedding, deep\ncleanse, and more", image: "/assets/svc-bath.jpg", alt: "Small dog enjoying a bubble bath", order: 1, visible: true },
  { id: "srv-3", icon: "PawPrint", title: "NAIL & PAW CARE", description: "Nail trims, paw balm,\nand pawdicures", image: "/assets/svc-nails.jpg", alt: "Dog's nails being trimmed", order: 2, visible: true },
  { id: "srv-4", icon: "Droplets", title: "ADD-ON SERVICES", description: "Teeth brushing, de-tangling,\nfragrance & more", image: "/assets/svc-addon.jpg", alt: "Paw balm being applied to a dog's paw", order: 3, visible: true },
]

const STATIC_TESTIMONIALS = [
  { id: "t-1", quote: "The best grooming experience we've ever had! My dog always comes home happy and handsome.", author: "Jessica M. & Cooper", rating: 5, order: 0, visible: true },
  { id: "t-2", quote: "From the moment you walk in, you feel the love they put into every detail.", author: "Daniel R. & Olive", rating: 5, order: 1, visible: true },
  { id: "t-3", quote: "Booked the Deluxe Spa for our doodle and the results were stunning.", author: "Priya S. & Maple", rating: 5, order: 2, visible: true },
]
