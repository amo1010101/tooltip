"use client"

import { useState } from "react"
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#ECEFCA' }}>
      <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-[#94B4C1]">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#213448' }}>Connexion</h1>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium" style={{ color: '#213448' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[#94B4C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B4C1] bg-[#ECEFCA] text-[#213448]"
            placeholder="Votre email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium" style={{ color: '#213448' }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[#94B4C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B4C1] bg-[#ECEFCA] text-[#213448]"
            placeholder="Votre mot de passe"
          />
        </div>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-semibold text-white"
          style={{ background: loading ? '#547792' : '#94B4C1', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
} 