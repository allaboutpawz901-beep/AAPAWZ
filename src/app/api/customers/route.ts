import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { repo } from "@/lib/repo"

// POST /api/customers
// Creates or updates a customer in Supabase AND creates a Stripe Customer,
// linking stripe_customer_id back to the Supabase record.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, phone, address, addressLine2, city, state, postalCode } = body

  if (!email || !firstName) {
    return NextResponse.json({ error: "firstName and email required" }, { status: 400 })
  }

  // 1. Check if customer already exists by email
  const existing = (await repo.list("customers")) as any[]
  const found = existing.find((c: any) => c.email === email)

  // 2. Create/update in Stripe
  let stripeCustomer: Stripe.Customer | Stripe.DeletedCustomer | null = null
  try {
    if (found?.stripeCustomerId) {
      stripeCustomer = await stripe.customers.retrieve(found.stripeCustomerId)
    }
    if (!stripeCustomer || (stripeCustomer as Stripe.DeletedCustomer).deleted) {
      stripeCustomer = await stripe.customers.create({
        email, name: `${firstName} ${lastName || ""}`.trim(),
        phone: phone || undefined,
        address: address ? {
          line1: address, line2: addressLine2 || undefined,
          city: city || undefined, state: state || undefined,
          postal_code: postalCode || undefined, country: "US",
        } : undefined,
      })
    } else if (found) {
      // Update existing Stripe customer
      stripeCustomer = await stripe.customers.update(found.stripeCustomerId, {
        email, name: `${firstName} ${lastName || ""}`.trim(),
        phone: phone || undefined,
      })
    }
  } catch (e: any) {
    console.error("[customer] Stripe error:", e.message)
    // Continue — we still create the Supabase customer without Stripe linkage
  }

  // 3. Create/update in Supabase
  const data: any = {
    firstName, lastName, email, phone,
    address, addressLine2, city, state, postalCode,
    stripeCustomerId: (stripeCustomer as Stripe.Customer)?.id || null,
  }

  let customer: any
  if (found) {
    customer = await repo.update("customers", found.id, data)
  } else {
    customer = await repo.create("customers", data)
    // Note: Supabase Auth handles welcome/invitation emails.
    // We do NOT send a custom welcome email here.
  }

  return NextResponse.json(customer, { status: found ? 200 : 201 })
}
