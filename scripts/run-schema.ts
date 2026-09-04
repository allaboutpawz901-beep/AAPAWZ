// Run supabase/schema.sql against the project via the Management API
// /database/query endpoint (HTTPS, so no IPv4/IPv6 issues).
import { readFileSync } from "node:fs"

const PAT = process.env.SUPABASE_PAT || ""
const REF = "qdgfkxbkqcnuhckhvhzd"
const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

const sql = readFileSync("./supabase/schema.sql", "utf8")

function splitStatements(src: string): string[] {
  const out: string[] = []
  let buf = ""
  let inDollar = false
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    buf += ch
    if (ch === "$" && src[i + 1] === "$") { inDollar = !inDollar; buf += "$"; i++ }
    if (ch === ";" && !inDollar) {
      const s = buf.trim()
      if (s && !s.startsWith("--")) out.push(s)
      buf = ""
    }
  }
  const tail = buf.trim()
  if (tail && !tail.startsWith("--")) out.push(tail)
  return out
}

const stmts = splitStatements(sql)
console.log(`Parsed ${stmts.length} statements`)

let ok = 0, fail = 0
for (let i = 0; i < stmts.length; i++) {
  const s = stmts[i]
  const preview = s.replace(/\s+/g, " ").slice(0, 70)
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: s }),
    })
    const txt = await res.text()
    if (res.ok) {
      ok++
      console.log(`[${i + 1}/${stmts.length}] OK   ${preview}`)
    } else {
      const isBenign = /already exists|does not exist|on conflict|duplicate/i.test(txt)
      if (isBenign) { ok++; console.log(`[${i + 1}/${stmts.length}] skip ${preview}  (${txt.slice(0, 60)})`) }
      else { fail++; console.log(`[${i + 1}/${stmts.length}] FAIL ${preview}\n      ${txt.slice(0, 200)}`) }
    }
  } catch (e: any) {
    fail++; console.log(`[${i + 1}/${stmts.length}] ERR  ${preview}\n      ${e.message}`)
  }
}
console.log(`\nDone: ${ok} ok, ${fail} failed`)
process.exit(fail > 0 ? 1 : 0)
