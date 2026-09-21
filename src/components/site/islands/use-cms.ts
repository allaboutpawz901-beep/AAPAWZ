"use client"

import { useEffect, useState } from "react"

// ---------------------------------------------------------------------------
// Client-side CMS — renders immediately with built-in defaults, then
// updates from Supabase when the admin publishes a change.
//
// Components NEVER show a loading skeleton. They render their fallback
// content on first paint. If Supabase returns data, it swaps in.
// If Supabase is not configured or returns empty, the defaults stay.
// ---------------------------------------------------------------------------

// Built-in defaults — these render on first paint, no fetch needed.
// When an admin pushes a change to Supabase, the Supabase data overrides.
const DEFAULT_SETTINGS: Record<string, string> = {
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

const DEFAULT_SERVICES = [
  { id: "srv-1", icon: "Scissors", title: "GROOMING", description: "Haircuts, styling,\nand full grooms", visible: true, order: 0 },
  { id: "srv-2", icon: "Bath", title: "BATH & SPA", description: "De-shedding, deep\ncleanse, and more", visible: true, order: 1 },
  { id: "srv-3", icon: "PawPrint", title: "NAIL & PAW CARE", description: "Nail trims, paw balm,\nand pawdicures", visible: true, order: 2 },
  { id: "srv-4", icon: "Droplets", title: "ADD-ON SERVICES", description: "Teeth brushing, de-tangling,\nfragrance & more", visible: true, order: 3 },
]

const DEFAULT_TESTIMONIALS = [
  { id: "t-1", quote: "The best grooming experience we've ever had! My dog always comes home happy and handsome.", author: "Jessica M. & Cooper", rating: 5, visible: true, order: 0 },
  { id: "t-2", quote: "From the moment you walk in, you feel the love they put into every detail.", author: "Daniel R. & Olive", rating: 5, visible: true, order: 1 },
  { id: "t-3", quote: "Booked the Deluxe Spa for our doodle and the results were stunning.", author: "Priya S. & Maple", rating: 5, visible: true, order: 2 },
]

const DEFAULTS: Record<string, any[]> = {
  services: DEFAULT_SERVICES,
  testimonials: DEFAULT_TESTIMONIALS,
}

export function useCms<T = any>(resource: string): { data: T[]; loading: boolean } {
  // Render defaults immediately — no loading state, no skeleton.
  const [data, setData] = useState<T[]>(() => (DEFAULTS[resource] as T[]) || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(`/api/cms/${resource}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (!alive) return
        const rows = Array.isArray(d) ? d : []
        // Only update if Supabase returned real data — otherwise keep defaults.
        if (rows.length > 0) {
          setData(rows)
        }
      })
      .catch(() => {
        // Keep defaults on error — no skeleton, no broken state.
      })
    return () => {
      alive = false
    }
  }, [resource])

  return { data, loading }
}

export function useCmsSettings(): { settings: Record<string, string>; loading: boolean } {
  // Render defaults immediately — no loading state.
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let alive = true
    fetch("/api/cms/settings")
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => {
        if (!alive) return
        const s = d && typeof d === "object" && !Array.isArray(d) ? d : {}
        // Only update if Supabase returned real settings — otherwise keep defaults.
        if (Object.keys(s).length > 0) {
          setSettings(s)
        }
      })
      .catch(() => {
        // Keep defaults on error.
      })
    return () => {
      alive = false
    }
  }, [])

  return { settings, loading }
}

// Rows the admin marked hidden must not render on the public site.
export function visibleOnly<T extends { visible?: boolean }>(rows: T[]): T[] {
  return rows.filter((r) => r.visible)
}
