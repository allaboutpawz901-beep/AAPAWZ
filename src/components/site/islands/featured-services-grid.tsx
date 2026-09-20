"use client"

import { Scissors } from "lucide-react"
import { getIcon } from "@/lib/icons"

// The 4-up featured services band used on the home page and the services
// page. Static data — no CMS fetch, no loading state. Icons render
// client-side immediately.
const STATIC_SERVICES = [
  { id: "srv-1", icon: "Scissors", title: "FULL GROOM", description: "Breed-specific haircut, bath,\nblow-dry & nail trim." },
  { id: "srv-2", icon: "Bath", title: "LUXURY BATH", description: "Hypoallergenic shampoo,\nconditioning & brush-out." },
  { id: "srv-3", icon: "Sparkle", title: "SPA ADD-ONS", description: "Teeth brushing, paw balm\n& coat treatments." },
  { id: "srv-4", icon: "Heart", title: "PUPPY'S FIRST", description: "Gentle intro groom for pups\nunder 6 months old." },
]

export function FeaturedServicesGrid({ count = 4 }: { count?: number }) {
  const services = STATIC_SERVICES.slice(0, count)
  return (
    <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
      {services.map(({ id, icon, title, description }, i) => {
        const Icon = getIcon(icon, Scissors)
        return (
          <div key={id} className={`px-6 text-center ${i > 0 ? "lg:border-l lg:border-gold/25" : ""}`}>
            <Icon className="mx-auto h-10 w-10 text-gold" strokeWidth={1.2} />
            <h3 className="mt-4 text-[11.5px] font-bold tracking-[0.15em] text-gold">{title}</h3>
            <p className="mt-3 whitespace-pre-line text-[12px] leading-[1.7] text-on-dark-muted">{description}</p>
          </div>
        )
      })}
    </div>
  )
}
