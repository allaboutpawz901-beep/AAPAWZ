import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

// Seed All About Pawz CMS with the content taken from the live site.
async function main() {
  // ---- Services ----
  await db.service.createMany({
    data: [
      { title: "GROOMING", description: "Haircuts, styling, and full grooms", icon: "Scissors", image: "/assets/svc-groom.jpg", alt: "Groomer trimming a dog's coat with scissors", order: 0 },
      { title: "BATH & SPA", description: "De-shedding, deep cleanse, and more", icon: "Bath", image: "/assets/svc-bath.jpg", alt: "Small dog enjoying a bubble bath", order: 1 },
      { title: "NAIL & PAW CARE", description: "Nail trims, paw balm, and pawdicures", icon: "PawPrint", image: "/assets/svc-nails.jpg", alt: "Dog's nails being trimmed", order: 2 },
      { title: "ADD-ON SERVICES", description: "Teeth brushing, de-tangling, fragrance & more", icon: "Droplets", image: "/assets/svc-addon.jpg", alt: "Paw balm being applied to a dog's paw", order: 3 },
    ],
  })

  // ---- Products ----
  await db.product.createMany({
    data: [
      { name: "Pawz Signature Shampoo", price: "$34.00", image: "/assets/product-shampoo.jpg", alt: "Pawz signature shampoo bottle", order: 0, badge: "Bestseller" },
      { name: "Coat Conditioning Spray", price: "$22.00", image: "/assets/product-spray.jpg", alt: "Coat conditioning spray bottle", order: 1 },
      { name: "Grooming Brush", price: "$26.00", image: "/assets/product-brush.jpg", alt: "Wooden grooming brush", order: 2 },
      { name: "Pawz Bandana", price: "$16.00", image: "/assets/product-bandana.jpg", alt: "Black dog bandana with gold paw", order: 3 },
    ],
  })

  // ---- Gallery ----
  await db.galleryPhoto.createMany({
    data: [
      { alt: "Cream cockapoo with a bow tie", category: "GROOMING", image: "/assets/g1.jpg", order: 0 },
      { alt: "Apricot cockapoo portrait", category: "TRANSFORMATIONS", image: "/assets/g2.jpg", order: 1 },
      { alt: "Smiling corgi", category: "BATH & SPA", image: "/assets/g3.jpg", order: 2 },
      { alt: "Golden retriever with tongue out", category: "GROOMING", image: "/assets/g4.jpg", order: 3 },
      { alt: "Black poodle mix portrait", category: "TRANSFORMATIONS", image: "/assets/g5.jpg", order: 4 },
      { alt: "Apricot labradoodle sitting", category: "GROOMING", image: "/assets/g6.jpg", order: 5 },
      { alt: "Salt and pepper schnauzer", category: "BATH & SPA", image: "/assets/g7.jpg", order: 6 },
      { alt: "Cream goldendoodle puppy", category: "TRANSFORMATIONS", image: "/assets/g8.jpg", order: 7 },
    ],
  })

  // ---- Pricing packages ----
  await db.pricingPackage.createMany({
    data: [
      { name: "Bath & Brush", smallPrice: "$75", mediumPrice: "$95", largePrice: "$115", xlargePrice: "$135", order: 0 },
      { name: "Full Groom", smallPrice: "$95", mediumPrice: "$115", largePrice: "$135", xlargePrice: "$155", featured: true, order: 1 },
      { name: "Deluxe Spa", smallPrice: "$125", mediumPrice: "$145", largePrice: "$165", xlargePrice: "$185", order: 2 },
    ],
  })

  // ---- Add-ons ----
  await db.addOn.createMany({
    data: [
      { title: "Teeth Brushing", price: "$15", icon: "Sparkles", order: 0 },
      { title: "De-shedding", price: "$15 - $35", icon: "Scissors", order: 1 },
      { title: "Paw Treatment", price: "$15", icon: "PawPrint", order: 2 },
      { title: "Nail Trim", price: "$15", icon: "Droplets", order: 3 },
      { title: "Flea Bath", price: "$10", icon: "Bug", order: 4 },
    ],
  })

  // ---- FAQs ----
  await db.faq.createMany({
    data: [
      { question: "How often should my dog be groomed?", answer: "Most coats do best on a four to six week schedule. Doodles, poodles, and other curly coats benefit from every four weeks to prevent matting, while short smooth coats can comfortably stretch to eight weeks.", order: 0 },
      { question: "How long does an appointment take?", answer: "A full groom typically takes two to three hours depending on size, coat condition, and the services selected. We groom one dog at a time so your pup is never left in a kennel waiting.", order: 1 },
      { question: "Do you use cage dryers?", answer: "Never. Every dog is hand dried and hand finished by their groomer from start to finish.", order: 2 },
      { question: "What products do you use?", answer: "Salon exclusive, sulphate free, plant based shampoos and conditioners selected for each coat and skin type. All of our retail products are the same ones we use at the table.", order: 3 },
      { question: "Can I stay with my dog during the groom?", answer: "We ask parents to step out during the groom. Most dogs settle far more quickly without an audience, and we will always call if anything needs your attention.", order: 4 },
      { question: "Do you groom senior dogs or dogs with anxiety?", answer: "Yes. We offer a gentle, low stress approach with breaks built in, and we will happily split services across visits when that is kinder for your dog.", order: 5 },
    ],
  })

  // ---- Policies ----
  await db.policy.createMany({
    data: [
      { title: "CANCELLATIONS", body: "Please give 24 hours notice to cancel or reschedule. Cancellations inside 24 hours are subject to a 50% service fee.", order: 0 },
      { title: "LATE ARRIVALS", body: "Arrivals more than 15 minutes late may need to be rescheduled so we can honour the appointments that follow.", order: 1 },
      { title: "VACCINATIONS", body: "Current rabies and distemper records are required for every dog on their first visit.", order: 2 },
      { title: "MATTED COATS", body: "Humanity before vanity. Severely matted coats may require a short clip, and de-matting is charged in 15 minute increments.", order: 3 },
    ],
  })

  // ---- Testimonials ----
  await db.testimonial.createMany({
    data: [
      { quote: "The best grooming experience we've ever had! My dog always comes home happy and handsome.", author: "Jessica M. & Cooper", rating: 5, order: 0 },
      { quote: "From the moment you walk in, you feel the love they put into every detail. Cooper actually gets excited to go.", author: "Daniel R. & Olive", rating: 5, order: 1 },
      { quote: "Booked the Deluxe Spa for our doodle and the results were stunning. Worth every single penny.", author: "Priya S. & Maple", rating: 5, order: 2 },
    ],
  })

  // ---- Sample bookings / consultation / message so the dashboard isn't empty ----
  await db.booking.createMany({
    data: [
      { ownerName: "Sarah Bennett", dogName: "Milo", breed: "Goldendoodle", service: "Full Groom", size: "MEDIUM", date: "2025-02-18", time: "10:00", notes: "Milo gets a little nervous with the dryer.", phone: "(312) 555-0199", email: "sarah@example.com", status: "PENDING" },
      { ownerName: "Marcus Lee", dogName: "Biscuit", breed: "Bichon Frise", service: "Deluxe Spa", size: "SMALL", date: "2025-02-19", time: "14:00", phone: "(312) 555-0144", email: "marcus@example.com", status: "CONFIRMED" },
    ],
  })
  await db.consultation.createMany({
    data: [
      { name: "Olivia Chen", dogName: "Pumpkin", breed: "Cockapoo", concerns: "First-time groomer for a nervous puppy", preferredTime: "Weekday mornings", email: "olivia@example.com", status: "PENDING" },
    ],
  })
  await db.contactMessage.createMany({
    data: [
      { name: "Tom Alvarez", email: "tom@example.com", subject: "Gift cards?", message: "Hi! Do you offer gift cards for the Deluxe Spa package? Would love to surprise my sister.", status: "UNREAD" },
    ],
  })

  // ---- Site settings ----
  const settings: Record<string, string> = {
    brandName: "All About Pawz",
    tagline: "From Pawz to PAWfection",
    heroTitle: "Luxury Grooming. Exceptional Care.",
    heroSubtitle: "We deliver a spa-level grooming experience where every detail is designed for your pup's comfort, style, and happiness.",
    addressLine1: "1428 Maple Grove Avenue",
    addressLine2: "Suite 4, Riverbend, IL 60614",
    phone: "(312) 555-0142",
    email: "hello@allaboutpawz.com",
    hoursTueSat: "9am – 6pm",
    hoursSun: "10am – 4pm",
    hoursMon: "Closed",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    footerNote: "© 2024 All About Pawz LLC. All rights reserved.",
  }
  for (const [key, value] of Object.entries(settings)) {
    await db.siteSetting.upsert({ where: { key }, create: { key, value }, update: { value } })
  }

  console.log("✓ Seed complete")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
