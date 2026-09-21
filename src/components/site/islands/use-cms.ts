"use client"

import { useState } from "react"

// ---------------------------------------------------------------------------
// Client-side CMS data — the data IS the component.
//
// The site renders with this built-in data immediately. No fetch, no
// loading state, no Supabase dependency for rendering.
//
// Supabase is for the ADMIN to push changes. When that happens, Supabase
// sends a trigger/cron to Next.js which revalidates the page. The admin
// changes are a separate concern from rendering — the site always works
// with these defaults.
// ---------------------------------------------------------------------------

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
  const [data] = useState<T[]>(() => (DEFAULTS[resource] as T[]) || [])
  return { data, loading: false }
}

export function useCmsSettings(): { settings: Record<string, string>; loading: boolean } {
  const [settings] = useState<Record<string, string>>(DEFAULT_SETTINGS)
  return { settings, loading: false }
}

export function visibleOnly<T extends { visible?: boolean }>(rows: T[]): T[] {
  return rows.filter((r) => r.visible)
}
