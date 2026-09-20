"use client"

import { Scissors, Bath, Sparkle, Heart } from "lucide-react"

// The 4-up featured services band used on the home page and the services
// page. Pure static — icons and copy are NOT wired to the CMS. The CMS is
// only for booking, pricing, shop, FAQ, and policies.
const STATIC_SERVICES = [
  { id: "srv-1", Icon: Scissors, title: "FULL GROOM", description: "Breed-specific haircut, bath,\nblow-dry & nail trim." },
  { id: "srv-2", Icon: Bath, title: "LUXURY BATH", description: "Hypoallergenic shampoo,\nconditioning & brush-out." },
  { id: "srv-3", Icon: Sparkle, title: "SPA ADD-ONS", description: "Teeth brushing, paw balm\n& coat treatments." },
  { id: "srv-4", Icon: Heart, title: "PUPPY'S FIRST", description: "Gentle intro groom for pups\nunder 6 months old." },
]

export function FeaturedServicesGrid({ count = 4 }: { count?: number }) {
  const services = STATIC_SERVICES.slice(0, count)
  return (
    <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
      {services.map(({ id, Icon, title, description }, i) => (
        <div key={id} className={`px-6 text-center ${i > 0 ? "lg:border-l lg:border-gold/25" : ""}`}>
          <Icon className="mx-auto h-10 w-10 text-gold" strokeWidth={1.2} />
          <h3 className="mt-4 text-[11.5px] font-bold tracking-[0.15em] text-gold">{title}</h3>
          <p className="mt-3 whitespace-pre-line text-[12px] leading-[1.7] text-on-dark-muted">{description}</p>
        </div>
      ))}
    </div>
  )
}
