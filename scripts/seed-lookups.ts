// Seed grooming lookup tables with real values.
const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const data: Record<string, string[]> = {
  coat_types: ["Straight", "Wavy", "Curly", "Corded", "Double Coat", "Wire Coat", "Silky", "Hairless", "Mixed / Combination", "Other"],
  coat_textures: ["Soft", "Coarse", "Silky", "Wooly", "Cottony", "Harsh", "Fine", "Medium", "Coarse and Dense"],
  coat_lengths: ["Shaved / Very Short", "Short", "Medium", "Long", "Extra Long", "Breed Standard", "Variable"],
  coat_conditions: ["Good", "Lightly Tangled", "Matted", "Severely Matted", "Undercoat Packed", "Dry / Brittle", "Oily", "Dirty", "Other"],
  shedding_levels: ["Low", "Moderate", "Heavy", "Seasonal Heavy"],
  clip_lengths: ['1/8"', '1/4"', '3/8"', '1/2"', '5/8"', '3/4"', '1"', '1.25"', '1.5"', '2"', "Scissor Length", "Leave Natural", "Custom"],
  body_styles: ["Same as Body", "Long", "Full", "Scissored", "Column Legs", "Short", "Natural", "Custom"],
  face_styles: ["Teddy Bear", "Clean Face", "Rounded", "Natural", "Breed Standard", "Short", "Long", "Custom"],
  head_styles: ["Rounded", "Top Knot", "Mohawk", "Natural", "Short", "Breed Standard", "Custom"],
  ear_styles: ["Long", "Short", "Rounded", "Feathered", "Natural", "Breed Standard", "Custom"],
  tail_styles: ["Full", "Plume", "Flag", "Pom", "Short", "Natural", "Breed Standard", "Custom"],
  feet_styles: ["Round", "Clean", "Tight", "Natural", "Breed Standard", "Custom"],
  sanitary_options: ["Standard", "Full Sanitary", "Skip", "Not Applicable"],
  nail_services: ["Standard Trim", "Dremel / File", "Skip", "Not Applicable"],
  paw_pad_services: ["Trim Pads", "Moisturize Pads", "Skip", "Not Applicable"],
  ear_services: ["Clean Ears", "Pluck Ear Hair", "Clean + Pluck", "Skip", "Not Applicable"],
  teeth_services: ["Brush Teeth", "Brush + Breath Freshener", "Skip", "Not Applicable"],
  deshedding_services: ["Standard", "Heavy Deshedding", "Undercoat Removal", "Skip", "Not Applicable"],
  coat_techniques: ["Hand Scissor", "Clipper Cut", "Combination", " breed Standard Hand Strip"],
}

let ok = 0, fail = 0
for (const [table, values] of Object.entries(data)) {
  const valuesSql = values.map((v, i) => `('${v.replace(/'/g, "''")}','${slug(v)}',${i},true)`).join(",")
  const sql = `insert into ${table} ("name","slug","sortOrder","active") values ${valuesSql} on conflict ("slug") do nothing`
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql }),
    })
    if (res.ok) { ok++; console.log(`OK   ${table} (${values.length} rows)`) }
    else { fail++; console.log(`FAIL ${table}: ${(await res.text()).slice(0, 80)}`) }
  } catch (e: any) { fail++; console.log(`ERR  ${table}: ${e.message}`) }
}
console.log(`\n${ok} ok, ${fail} failed`)
