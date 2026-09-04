import { NextRequest, NextResponse } from "next/server"
import { repo } from "@/lib/repo"

// GET /api/availability?date=2025-03-15&duration=120
// Returns available time slots, checking:
//   - business hours (Tue-Sat 9-6, Sun 10-4, Mon closed)
//   - existing bookings (with service duration overlap)
//   - blocked times
// The server validates again at booking time (double-booking protection).

const ALL_SLOTS = {
  tue_sat: ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"],
  sun: ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM"],
}

// Parse "10:30 AM" → minutes from midnight
function parseTimeToMin(t: string): number {
  const m = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i)
  if (!m) return 0
  let h = parseInt(m[1])
  const min = parseInt(m[2])
  const ap = m[3].toUpperCase()
  if (ap === "PM" && h !== 12) h += 12
  if (ap === "AM" && h === 12) h = 0
  return h * 60 + min
}

// Format minutes → "10:30 AM"
function minToTime(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  const ap = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${ap}`
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")
  const duration = parseInt(searchParams.get("duration") || "120") // minutes

  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 })

  const d = new Date(date + "T00:00:00")
  const day = d.getDay()
  if (day === 1) return NextResponse.json({ date, closed: true, times: [], reason: "Closed Mondays" })

  const baseSlots = day === 0 ? ALL_SLOTS.sun : ALL_SLOTS.tue_sat

  // Get existing bookings for this date
  let existing: any[] = []
  let blocked: any[] = []
  try {
    const allBookings = (await repo.list("bookings")) as any[]
    existing = allBookings.filter((b) => b.date === date && b.status !== "CANCELLED")
    blocked = (await repo.list("blocked_times")) as any[]
    blocked = blocked.filter((b) => b.date === date)
  } catch { /* ignore */ }

  // Build occupied time ranges (start_min, end_min) from existing bookings
  // Each booking occupies its slot + a default 120min duration
  const occupied: [number, number][] = existing.map((b) => {
    const start = parseTimeToMin(b.time || "9:00 AM")
    const dur = parseInt(b.durationMinutes || "120")
    return [start, start + dur]
  })

  // Add blocked times
  for (const bt of blocked) {
    if (bt.startTime && bt.endTime) {
      occupied.push([parseTimeToMin(bt.startTime), parseTimeToMin(bt.endTime)])
    } else {
      // Whole day blocked
      return NextResponse.json({ date, closed: true, times: [], reason: bt.reason || "Blocked" })
    }
  }

  // Check each base slot: does [slot, slot+duration] overlap any occupied range?
  const available = baseSlots.filter((slot) => {
    const start = parseTimeToMin(slot)
    const end = start + duration
    // Also check the slot fits within business hours
    const closingMin = day === 0 ? parseTimeToMin("4:00 PM") : parseTimeToMin("6:00 PM")
    if (end > closingMin) return false
    // Check overlap
    return !occupied.some(([oStart, oEnd]) => start < oEnd && end > oStart)
  })

  return NextResponse.json({ date, closed: false, times: available, duration })
}
