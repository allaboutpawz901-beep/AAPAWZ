"use client"

import { useState, useEffect } from "react"

// ---------------------------------------------------------------------------
// CMS data architecture — render from local state, update via push.
//
// RENDER: Components render immediately from baked-in defaults. No fetch,
// no loading spinner, no layout shift, no white flash. The data IS the
// component on first paint.
//
// UPDATE: When an admin pushes a change to Supabase, Supabase fires a
// webhook to /api/revalidate which calls revalidatePath. The next page
// load picks up the new data from the server cache. Optionally, a
// Supabase real-time subscription can update the local state in-place
// for instant updates without a page reload.
// ---------------------------------------------------------------------------

// Built-in defaults — the baseline data that ships with the app.
// These render on first paint. Supabase overrides them only when the
// admin pushes a change.

export interface CmsSettings {
  brandName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  addressLine1: string
  addressLine2: string
  phone: string
  email: string
  hoursTueSat: string
  hoursSun: string
  hoursMon: string
  instagram: string
  footerNote: string
  [key: string]: string
}

export interface CmsService {
  id: string
  icon: string
  title: string
  description: string
  visible: boolean
  order: number
}

export interface CmsTestimonial {
  id: string
  quote: string
  author: string
  rating: number
  visible: boolean
  order: number
}

const DEFAULT_SETTINGS: CmsSettings = {
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

const DEFAULT_SERVICES: CmsService[] = [
  { id: "srv-1", icon: "Scissors", title: "GROOMING", description: "Haircuts, styling,\nand full grooms", visible: true, order: 0 },
  { id: "srv-2", icon: "Bath", title: "BATH & SPA", description: "De-shedding, deep\ncleanse, and more", visible: true, order: 1 },
  { id: "srv-3", icon: "PawPrint", title: "NAIL & PAW CARE", description: "Nail trims, paw balm,\nand pawdicures", visible: true, order: 2 },
  { id: "srv-4", icon: "Droplets", title: "ADD-ON SERVICES", description: "Teeth brushing, de-tangling,\nfragrance & more", visible: true, order: 3 },
]

const DEFAULT_TESTIMONIALS: CmsTestimonial[] = [
  { id: "t-1", quote: "The best grooming experience we've ever had! My dog always comes home happy and handsome.", author: "Jessica M. & Cooper", rating: 5, visible: true, order: 0 },
  { id: "t-2", quote: "From the moment you walk in, you feel the love they put into every detail.", author: "Daniel R. & Olive", rating: 5, visible: true, order: 1 },
  { id: "t-3", quote: "Booked the Deluxe Spa for our doodle and the results were stunning.", author: "Priya S. & Maple", rating: 5, visible: true, order: 2 },
]

const DEFAULTS: Record<string, any[]> = {
  services: DEFAULT_SERVICES,
  testimonials: DEFAULT_TESTIMONIALS,
}

// ---------------------------------------------------------------------------
// useCmsSettings — renders defaults instantly, updates silently via
// Supabase real-time subscription when admin pushes a change.
// ---------------------------------------------------------------------------
export function useCmsSettings(initialData: CmsSettings = DEFAULT_SETTINGS) {
  const [settings, setSettings] = useState<CmsSettings>(initialData)

  useEffect(() => {
    // Supabase real-time subscription — optional, only activates when
    // Supabase is configured. This is a PUSH model: the admin changes
    // data in Supabase, Supabase pushes the change here, we update
    // local state silently. No fetch, no pull, no loading state.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.startsWith("your-")) return

    let channel: any = null
    import("@supabase/supabase-js").then(({ createClient }) => {
      const supabase = createClient(supabaseUrl, supabaseKey)
      channel = supabase
        .channel("cms_settings_changes")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "cms_global_content" },
          (payload: any) => {
            // Smoothly update — only the changed key, no flash
            if (payload.new?.content_key && payload.new?.value_text) {
              setSettings((prev) => ({
                ...prev,
                [payload.new.content_key]: payload.new.value_text,
              }))
            }
          }
        )
        .subscribe()
    })

    return () => {
      if (channel) channel.unsubscribe()
    }
  }, [])

  return { settings, loading: false }
}

// ---------------------------------------------------------------------------
// useCms — renders defaults instantly, updates silently via Supabase
// real-time subscription when admin pushes a change.
// ---------------------------------------------------------------------------
export function useCms<T = any>(resource: string): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>(() => (DEFAULTS[resource] as T[]) || [])

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl.startsWith("your-")) return

    let channel: any = null
    import("@supabase/supabase-js").then(({ createClient }) => {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const tableName = resource === "services" ? "services" : resource

      channel = supabase
        .channel(`cms_${resource}_changes`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: tableName },
          () => {
            // When admin pushes a change, refetch this resource silently.
            // This is a background sync — the UI already has data from
            // defaults, so there's no flash.
            fetch(`/api/cms/${resource}`)
              .then((r) => (r.ok ? r.json() : []))
              .then((rows) => {
                if (Array.isArray(rows) && rows.length > 0) {
                  setData(rows)
                }
              })
              .catch(() => {})
          }
        )
        .subscribe()
    })

    return () => {
      if (channel) channel.unsubscribe()
    }
  }, [resource])

  return { data, loading: false }
}

// Rows the admin marked hidden must not render on the public site.
export function visibleOnly<T extends { visible?: boolean }>(rows: T[]): T[] {
  return rows.filter((r) => r.visible)
}
