"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/auth/client"
import { PawPrint } from "@phosphor-icons/react"
import type { UserRole } from "@/lib/dawg-types"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/admin"
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<"signin" | "magic">("signin")

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Determine redirect based on role
    const role = data.user?.user_metadata?.role as UserRole
    if (role === "customer") {
      router.push("/account")
    } else if (role === "groomer") {
      router.push("/admin?portal=groomer")
    } else {
      router.push(redirect)
    }
    router.refresh()
  }

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    })

    if (error) {
      setError(error.message)
    } else {
      setError("Check your email — we sent you a magic link to sign in.")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <PawPrint size={40} weight="fill" className="mx-auto text-indigo-400" />
          <h1 className="mt-3 text-[18px] font-semibold tracking-[0.14em] text-white">ALL ABOUT PAWZ</h1>
          <p className="mt-1 text-[10px] font-bold tracking-[0.3em] text-zinc-500">BUSINESS OS</p>
        </div>

        {/* Mode toggle */}
        <div className="mb-4 flex rounded-lg border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-md py-2 text-[11px] font-bold transition-colors ${mode === "signin" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("magic")}
            className={`flex-1 rounded-md py-2 text-[11px] font-bold transition-colors ${mode === "magic" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
          >
            Magic Link
          </button>
        </div>

        {/* Form */}
        <form onSubmit={mode === "signin" ? signIn : sendMagicLink} className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6">
          {error && (
            <div className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-[12px] text-indigo-300">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-zinc-400">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20"
              placeholder="you@aapawz.com"
            />
          </div>

          {mode === "signin" && (
            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-zinc-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-white px-4 py-2.5 text-[13px] font-bold text-black hover:bg-zinc-200 disabled:opacity-40"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Send Magic Link"}
          </button>
        </form>

        {/* Role hints */}
        <div className="mt-6 space-y-1 text-center text-[10px] text-zinc-600">
          <p>Admin → /admin · Groomer → Groomer Station · Customer → /account</p>
          <p>The system detects your role automatically after sign-in.</p>
        </div>
      </div>
    </div>
  )
}
