'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Terminal, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'signing' | 'redirecting'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('signing'); setError('')
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    if (!res.ok) { setError('Invalid email or password'); setStatus('idle'); return }
    setStatus('redirecting')
    window.location.href = '/dashboard'
  }

  const loading = status !== 'idle'

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px]" style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 70%)' }} />
      </div>
      <div className="w-full fade-up" style={{ maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Terminal size={20} className="text-black" />
            </div>
            <span className="text-xl font-bold text-white">CompSciLearner</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue learning</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-10 space-y-6">
          {error && <p className="text-sm px-4 py-3 rounded-xl" style={{ color: 'var(--danger)', background: 'rgba(255,77,77,0.08)' }}>{error}</p>}
          <div>
            <label className="text-xs tracking-[0.15em] uppercase font-semibold block mb-2.5 mono" style={{ color: 'var(--text-muted)' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} className="w-full px-5 py-4 rounded-xl text-base text-white transition-all disabled:opacity-50" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }} placeholder="you@email.com" />
          </div>
          <div>
            <label className="text-xs tracking-[0.15em] uppercase font-semibold block mb-2.5 mono" style={{ color: 'var(--text-muted)' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} className="w-full px-5 py-4 rounded-xl text-base text-white transition-all disabled:opacity-50" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }} placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 rounded-xl text-black font-semibold text-base flex items-center justify-center gap-2.5 transition-all disabled:opacity-70 cursor-pointer hover:brightness-110" style={{ background: 'var(--accent)', boxShadow: '0 4px 20px var(--accent-dim)' }}>
            {status === 'signing' ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> :
             status === 'redirecting' ? <><Loader2 size={18} className="animate-spin" /> Loading dashboard...</> :
             <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
          <p className="text-center text-base pt-2" style={{ color: 'var(--text-secondary)' }}>
            No account? <Link href="/signup" className="font-medium transition-colors" style={{ color: 'var(--accent)' }}>Sign up free</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
