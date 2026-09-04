// Seed dog_breeds table in Supabase via the Management API.
const breeds: [string, string, string][] = [
  ["Goldendoodle","Large","Curly"],["Labradoodle","Large","Curly"],["Poodle (Standard)","Large","Curly"],
  ["Poodle (Miniature)","Medium","Curly"],["Poodle (Toy)","Small","Curly"],["Goldendoodle (Mini)","Medium","Curly"],
  ["Labrador Retriever","Large","Double Coat"],["Golden Retriever","Large","Double Coat"],
  ["German Shepherd","Large","Double Coat"],["Siberian Husky","Large","Double Coat"],
  ["Bernese Mountain Dog","X-Large","Double Coat"],["Australian Shepherd","Medium","Double Coat"],
  ["Border Collie","Medium","Double Coat"],["Shetland Sheepdog","Medium","Double Coat"],
  ["Cocker Spaniel","Medium","Wavy"],["English Springer Spaniel","Medium","Wavy"],
  ["Cavalier King Charles Spaniel","Small","Wavy"],["Bichon Frise","Small","Curly"],
  ["Shih Tzu","Small","Long"],["Lhasa Apso","Small","Long"],["Maltese","Small","Long"],
  ["Yorkshire Terrier","Small","Long"],["Havanese","Small","Wavy"],["Portuguese Water Dog","Medium","Curly"],
  ["Soft Coated Wheaten Terrier","Medium","Wavy"],["Irish Setter","Large","Wavy"],
  ["Dachshund","Small","Smooth"],["Dachshund (Long-haired)","Small","Long"],
  ["Miniature Schnauzer","Small","Wiry"],["Standard Schnauzer","Medium","Wiry"],["Giant Schnauzer","Large","Wiry"],
  ["West Highland White Terrier","Small","Wiry"],["Scottish Terrier","Small","Wiry"],
  ["Cairn Terrier","Small","Wiry"],["Norwich Terrier","Small","Wiry"],
  ["Beagle","Medium","Smooth"],["Basset Hound","Medium","Smooth"],["Pug","Small","Smooth"],
  ["French Bulldog","Small","Smooth"],["English Bulldog","Medium","Smooth"],["Boston Terrier","Small","Smooth"],
  ["Boxer","Large","Smooth"],["Doberman Pinscher","Large","Smooth"],["Rottweiler","Large","Double Coat"],
  ["Great Dane","X-Large","Smooth"],["Mastiff","X-Large","Smooth"],["Saint Bernard","X-Large","Double Coat"],
  ["Newfoundland","X-Large","Double Coat"],["Old English Sheepdog","Large","Long"],
  ["Briard","Large","Long"],["Bouvier des Flandres","Large","Wiry"],
  ["Chihuahua","Small","Smooth"],["Chihuahua (Long-haired)","Small","Long"],
  ["Pomeranian","Small","Double Coat"],["Samoyed","Medium","Double Coat"],
  ["Akita","Large","Double Coat"],["Alaskan Malamute","Large","Double Coat"],
  ["Pembroke Welsh Corgi","Medium","Double Coat"],["Cardigan Welsh Corgi","Medium","Double Coat"],
  ["Australian Labradoodle","Medium","Curly"],["Maltipoo","Small","Curly"],
  ["Cavapoo","Small","Wavy"],["Cockapoo","Medium","Wavy"],["Schnoodle","Medium","Wiry"],
  ["Puggle","Small","Smooth"],["Yorkipoo","Small","Curly"],["Shih Poo","Small","Curly"],
  ["Mixed Breed (Small)","Small","Variable"],["Mixed Breed (Medium)","Medium","Variable"],
  ["Mixed Breed (Large)","Large","Variable"],["Mixed Breed (X-Large)","X-Large","Variable"],
]

const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

// 1. create table
const createSql = `create table if not exists dog_breeds (
  id text primary key default gen_random_uuid()::text,
  "name" text not null,
  "slug" text unique not null,
  "sizeCategory" text,
  "coatType" text,
  "active" boolean default true,
  "sortOrder" int default 0,
  "createdAt" timestamptz default now()
)`
let res = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: createSql }),
})
console.log("create table:", res.ok ? "OK" : await res.text())

// 2. seed breeds (batch insert)
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
const rows = breeds.map(([name, size, coat], i) => ({
  name, slug: slugify(name), sizeCategory: size, coatType: coat, sortOrder: i, active: true,
}))
const insertSql = `insert into dog_breeds ("name","slug","sizeCategory","coatType","sortOrder","active") values ${
  rows.map((r, i) => `('${r.name.replace(/'/g, "''")}','${r.slug}','${r.sizeCategory}','${r.coatType}',${r.sortOrder},true)`).join(",")
} on conflict ("slug") do nothing`
res = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: insertSql }),
})
console.log("seed breeds:", res.ok ? "OK" : await res.text())

// 3. verify count
res = await fetch(URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: "select count(*) as n from dog_breeds" }),
})
console.log("count:", await res.text())
