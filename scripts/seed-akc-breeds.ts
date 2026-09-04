// Seed the complete AKC breed list + designer/mixed breeds into Supabase.
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

type Breed = [name: string, group: string, size: string, coat: string]
const breeds: Breed[] = [
  // --- Sporting (33) ---
  ["American Water Spaniel","Sporting","Medium","Curly"],["Barbet","Sporting","Medium","Curly"],
  ["Boykin Spaniel","Sporting","Medium","Wavy"],["Bracco Italiano","Sporting","Large","Short"],
  ["Brittany","Sporting","Medium","Wavy"],["Chesapeake Bay Retriever","Sporting","Large","Double Coat"],
  ["Clumber Spaniel","Sporting","Medium","Double Coat"],["Cocker Spaniel","Sporting","Medium","Wavy"],
  ["Curly-Coated Retriever","Sporting","Large","Curly"],["English Cocker Spaniel","Sporting","Medium","Wavy"],
  ["English Setter","Sporting","Large","Long"],["English Springer Spaniel","Sporting","Medium","Wavy"],
  ["Field Spaniel","Sporting","Medium","Long"],["Flat-Coated Retriever","Sporting","Large","Double Coat"],
  ["German Shorthaired Pointer","Sporting","Large","Short"],["German Wirehaired Pointer","Sporting","Large","Wiry"],
  ["Golden Retriever","Sporting","Large","Double Coat"],["Gordon Setter","Sporting","Large","Long"],
  ["Irish Red and White Setter","Sporting","Large","Long"],["Irish Setter","Sporting","Large","Long"],
  ["Irish Water Spaniel","Sporting","Large","Curly"],["Labrador Retriever","Sporting","Large","Double Coat"],
  ["Lagotto Romagnolo","Sporting","Medium","Curly"],["Nederlandse Kooikerhondje","Sporting","Small","Long"],
  ["Nova Scotia Duck Tolling Retriever","Sporting","Medium","Double Coat"],["Pointer","Sporting","Large","Short"],
  ["Spinone Italiano","Sporting","Large","Wiry"],["Sussex Spaniel","Sporting","Medium","Wavy"],
  ["Vizsla","Sporting","Medium","Short"],["Weimaraner","Sporting","Large","Short"],
  ["Welsh Springer Spaniel","Sporting","Medium","Wavy"],["Wirehaired Pointing Griffon","Sporting","Medium","Wiry"],
  ["Wirehaired Vizsla","Sporting","Medium","Wiry"],
  // --- Hound (33) ---
  ["Afghan Hound","Hound","Large","Long"],["American English Coonhound","Hound","Large","Short"],
  ["American Foxhound","Hound","Large","Short"],["Azawakh","Hound","Large","Short"],
  ["Basenji","Hound","Small","Short"],["Basset Fauve de Bretagne","Hound","Medium","Wiry"],
  ["Basset Hound","Hound","Medium","Short"],["Beagle","Hound","Medium","Short"],
  ["Black and Tan Coonhound","Hound","Large","Short"],["Bloodhound","Hound","X-Large","Short"],
  ["Bluetick Coonhound","Hound","Large","Short"],["Borzoi","Hound","Large","Long"],
  ["Cirneco dell'Etna","Hound","Small","Short"],["Dachshund","Hound","Small","Smooth"],
  ["English Foxhound","Hound","Large","Short"],["Grand Basset Griffon Vendeen","Hound","Medium","Wiry"],
  ["Greyhound","Hound","Large","Short"],["Harrier","Hound","Medium","Short"],
  ["Ibizan Hound","Hound","Large","Short"],["Irish Wolfhound","Hound","X-Large","Wiry"],
  ["Norwegian Elkhound","Hound","Medium","Double Coat"],["Otterhound","Hound","Large","Double Coat"],
  ["Petit Basset Griffon Vendeen","Hound","Small","Wiry"],["Pharaoh Hound","Hound","Medium","Short"],
  ["Plott","Hound","Large","Short"],["Portuguese Podengo Pequeno","Hound","Small","Smooth"],
  ["Redbone Coonhound","Hound","Large","Short"],["Rhodesian Ridgeback","Hound","Large","Short"],
  ["Saluki","Hound","Large","Long"],["Scottish Deerhound","Hound","X-Large","Wiry"],
  ["Sloughi","Hound","Large","Short"],["Treeing Walker Coonhound","Hound","Large","Short"],
  ["Whippet","Hound","Medium","Short"],
  // --- Working (32) ---
  ["Akita","Working","Large","Double Coat"],["Alaskan Malamute","Working","Large","Double Coat"],
  ["Anatolian Shepherd Dog","Working","X-Large","Short"],["Bernese Mountain Dog","Working","X-Large","Double Coat"],
  ["Black Russian Terrier","Working","Large","Wiry"],["Boerboel","Working","X-Large","Short"],
  ["Boxer","Working","Large","Short"],["Bullmastiff","Working","X-Large","Short"],
  ["Cane Corso","Working","Large","Short"],["Chinook","Working","Large","Double Coat"],
  ["Danish-Swedish Farmdog","Working","Medium","Short"],["Doberman Pinscher","Working","Large","Short"],
  ["Dogo Argentino","Working","Large","Short"],["Dogue de Bordeaux","Working","X-Large","Short"],
  ["German Pinscher","Working","Medium","Short"],["Giant Schnauzer","Working","Large","Wiry"],
  ["Great Dane","Working","X-Large","Short"],["Great Pyrenees","Working","X-Large","Double Coat"],
  ["Greater Swiss Mountain Dog","Working","X-Large","Short"],["Komondor","Working","Large","Corded"],
  ["Kuvasz","Working","Large","Double Coat"],["Leonberger","Working","X-Large","Double Coat"],
  ["Mastiff","Working","X-Large","Short"],["Neapolitan Mastiff","Working","X-Large","Short"],
  ["Newfoundland","Working","X-Large","Double Coat"],["Portuguese Water Dog","Working","Medium","Curly"],
  ["Rottweiler","Working","Large","Short"],["St. Bernard","Working","X-Large","Double Coat"],
  ["Samoyed","Working","Medium","Double Coat"],["Siberian Husky","Working","Medium","Double Coat"],
  ["Standard Schnauzer","Working","Medium","Wiry"],["Tibetan Mastiff","Working","X-Large","Double Coat"],
  // --- Terrier (32) ---
  ["Airedale Terrier","Terrier","Large","Wiry"],["American Hairless Terrier","Terrier","Small","Hairless"],
  ["American Staffordshire Terrier","Terrier","Medium","Short"],["Australian Terrier","Terrier","Small","Wiry"],
  ["Bedlington Terrier","Terrier","Small","Curly"],["Border Terrier","Terrier","Small","Wiry"],
  ["Bull Terrier","Terrier","Medium","Short"],["Cairn Terrier","Terrier","Small","Wiry"],
  ["Cesky Terrier","Terrier","Small","Wavy"],["Dandie Dinmont Terrier","Terrier","Small","Wiry"],
  ["Glen of Imaal Terrier","Terrier","Small","Wiry"],["Irish Terrier","Terrier","Medium","Wiry"],
  ["Kerry Blue Terrier","Terrier","Medium","Wavy"],["Lakeland Terrier","Terrier","Small","Wiry"],
  ["Manchester Terrier","Terrier","Small","Short"],["Miniature Bull Terrier","Terrier","Small","Short"],
  ["Miniature Schnauzer","Terrier","Small","Wiry"],["Norfolk Terrier","Terrier","Small","Wiry"],
  ["Norwich Terrier","Terrier","Small","Wiry"],["Parson Russell Terrier","Terrier","Small","Wiry"],
  ["Rat Terrier","Terrier","Small","Short"],["Russell Terrier","Terrier","Small","Wiry"],
  ["Scottish Terrier","Terrier","Small","Wiry"],["Sealyham Terrier","Terrier","Small","Wiry"],
  ["Skye Terrier","Terrier","Small","Long"],["Smooth Fox Terrier","Terrier","Small","Smooth"],
  ["Soft Coated Wheaten Terrier","Terrier","Medium","Wavy"],["Staffordshire Bull Terrier","Terrier","Medium","Short"],
  ["Teddy Roosevelt Terrier","Terrier","Small","Short"],["Welsh Terrier","Terrier","Medium","Wiry"],
  ["West Highland White Terrier","Terrier","Small","Wiry"],["Wire Fox Terrier","Terrier","Small","Wiry"],
  // --- Toy (22) ---
  ["Affenpinscher","Toy","Small","Wiry"],["Biewer Terrier","Toy","Small","Long"],
  ["Brussels Griffon","Toy","Small","Wiry"],["Cavalier King Charles Spaniel","Toy","Small","Wavy"],
  ["Chihuahua","Toy","Small","Smooth"],["Chinese Crested","Toy","Small","Hairless"],
  ["English Toy Spaniel","Toy","Small","Long"],["Havanese","Toy","Small","Wavy"],
  ["Italian Greyhound","Toy","Small","Short"],["Japanese Chin","Toy","Small","Long"],
  ["Maltese","Toy","Small","Long"],["Miniature Pinscher","Toy","Small","Short"],
  ["Papillon","Toy","Small","Long"],["Pekingese","Toy","Small","Long"],
  ["Pomeranian","Toy","Small","Double Coat"],["Pug","Toy","Small","Smooth"],
  ["Russian Toy","Toy","Small","Short"],["Russian Tsvetnaya Bolonka","Toy","Small","Wavy"],
  ["Shih Tzu","Toy","Small","Long"],["Silky Terrier","Toy","Small","Long"],
  ["Toy Fox Terrier","Toy","Small","Short"],["Yorkshire Terrier","Toy","Small","Long"],
  // --- Non-Sporting (20) ---
  ["American Eskimo Dog","Non-Sporting","Small","Double Coat"],["Bichon Frise","Non-Sporting","Small","Curly"],
  ["Boston Terrier","Non-Sporting","Small","Short"],["Bulldog","Non-Sporting","Medium","Short"],
  ["Chinese Shar-Pei","Non-Sporting","Medium","Short"],["Chow Chow","Non-Sporting","Medium","Double Coat"],
  ["Coton de Tulear","Non-Sporting","Small","Long"],["Dalmatian","Non-Sporting","Large","Short"],
  ["Finnish Spitz","Non-Sporting","Medium","Double Coat"],["French Bulldog","Non-Sporting","Small","Short"],
  ["Keeshond","Non-Sporting","Medium","Double Coat"],["Lhasa Apso","Non-Sporting","Small","Long"],
  ["Lowchen","Non-Sporting","Small","Long"],["Norwegian Lundehund","Non-Sporting","Small","Double Coat"],
  ["Schipperke","Non-Sporting","Small","Double Coat"],["Shiba Inu","Non-Sporting","Small","Double Coat"],
  ["Tibetan Spaniel","Non-Sporting","Small","Double Coat"],["Tibetan Terrier","Non-Sporting","Medium","Long"],
  ["Xoloitzcuintli","Non-Sporting","Medium","Hairless"],
  // --- Herding (33) ---
  ["Australian Cattle Dog","Herding","Medium","Double Coat"],["Australian Shepherd","Herding","Medium","Double Coat"],
  ["Bearded Collie","Herding","Medium","Long"],["Beauceron","Herding","Large","Short"],
  ["Belgian Laekenois","Herding","Medium","Wiry"],["Belgian Malinois","Herding","Medium","Short"],
  ["Belgian Sheepdog","Herding","Medium","Long"],["Belgian Tervuren","Herding","Medium","Long"],
  ["Bergamasco","Herding","Medium","Corded"],["Berger Picard","Herding","Medium","Wiry"],
  ["Border Collie","Herding","Medium","Double Coat"],["Bouvier Des Flanders","Herding","Large","Wiry"],
  ["Briard","Herding","Large","Long"],["Canaan Dog","Herding","Medium","Short"],
  ["Cardigan Welsh Corgi","Herding","Medium","Double Coat"],["Collie","Herding","Large","Double Coat"],
  ["Entlebucher Mountain Dog","Herding","Medium","Short"],["Finnish Lapphund","Herding","Medium","Double Coat"],
  ["German Shepherd Dog","Herding","Large","Double Coat"],["Icelandic Sheepdog","Herding","Medium","Double Coat"],
  ["Lancashire Heeler","Herding","Small","Short"],["Miniature American Shepherd","Herding","Small","Double Coat"],
  ["Mudi","Herding","Medium","Wavy"],["Norwegian Buhund","Herding","Medium","Double Coat"],
  ["Old English Sheepdog","Herding","Large","Long"],["Pembroke Welsh Corgi","Herding","Medium","Double Coat"],
  ["Polish Lowland Sheepdog","Herding","Medium","Long"],["Puli","Herding","Medium","Corded"],
  ["Pumi","Herding","Medium","Wavy"],["Pyrenean Shepherd","Herding","Small","Wiry"],
  ["Shetland Sheepdog","Herding","Small","Double Coat"],["Spanish Water Dog","Herding","Medium","Curly"],
  ["Swedish Vallhund","Herding","Medium","Double Coat"],
  // --- Poodle (recognized in both Toy & Non-Sporting) ---
  ["Poodle (Standard)","Non-Sporting","Large","Curly"],["Poodle (Miniature)","Non-Sporting","Medium","Curly"],
  ["Poodle (Toy)","Toy","Small","Curly"],
  // --- Designer / Mixed Breeds ---
  ["Goldendoodle","Designer","Large","Curly"],["Goldendoodle (Mini)","Designer","Medium","Curly"],
  ["Labradoodle","Designer","Large","Curly"],["Aussiedoodle","Designer","Medium","Curly"],
  ["Bernedoodle","Designer","Large","Curly"],["Cavapoo","Designer","Small","Wavy"],
  ["Cockapoo","Designer","Medium","Wavy"],["Maltipoo","Designer","Small","Curly"],
  ["Schnoodle","Designer","Medium","Wiry"],["Sheepadoodle","Designer","Large","Curly"],
  ["Australian Labradoodle","Designer","Medium","Curly"],["Puggle","Designer","Small","Smooth"],
  ["Yorkipoo","Designer","Small","Curly"],["Shih Poo","Designer","Small","Curly"],
  ["Mixed Breed (Small)","Mixed","Small","Variable"],["Mixed Breed (Medium)","Mixed","Medium","Variable"],
  ["Mixed Breed (Large)","Mixed","Large","Variable"],["Mixed Breed (X-Large)","Mixed","X-Large","Variable"],
  ["Other / Breed Not Listed","Other","Medium","Variable"],
]

const slugify = (s: string) => s.toLowerCase().replace(/'/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")
const rows = breeds.map(([name, group, size, coat], i) => ({
  name, slug: slugify(name), akcGroup: group, sizeCategory: size, coatType: coat, sortOrder: i, active: true,
}))

const insertSql = `insert into dog_breeds ("name","slug","akcGroup","sizeCategory","coatType","sortOrder","active") values ${
  rows.map((r) => `('${r.name.replace(/'/g,"''")}','${r.slug}','${r.akcGroup}','${r.sizeCategory}','${r.coatType}',${r.sortOrder},true)`).join(",")
} on conflict ("slug") do nothing`

const res = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: insertSql }),
})
console.log("insert:", res.ok ? "OK" : await res.text())

const countRes = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: "select count(*) as n from dog_breeds" }),
})
console.log("total breeds:", await countRes.text())
