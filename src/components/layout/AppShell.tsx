'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Terminal, LayoutDashboard, BookOpen, User, LogOut, Search, Bell } from 'lucide-react'

type Track = { id: string; name: string; slug: string; icon: string; color: string }
type UserInfo = { id: string; name: string; email: string; role: string }

export function AppShell({ user, tracks, children }: { user: UserInfo; tracks: Track[]; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/me', { method: 'POST' })
    router.push('/login')
  }

  const nav = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...tracks.map(t => ({ href: `/tracks/${t.slug}`, label: t.name, icon: BookOpen })),
    { href: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-[250px] min-w-[250px] h-full flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'rgba(12,12,15,0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <Terminal size={16} className="text-black" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-white tracking-tight">CompSciLearner</h1>
            <p className="text-[9px] tracking-[0.2em] uppercase mono" style={{ color: 'var(--text-muted)' }}>Dashboard</p>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
            <Search size={13} />
            <span className="text-[12px]">Search...</span>
          </div>
        </div>

        <div className="px-3 flex-1">
          <p className="text-[9px] tracking-[0.2em] uppercase font-semibold px-3 mb-2 mono" style={{ color: 'var(--text-muted)' }}>Navigation</p>
          <nav className="flex flex-col gap-1">
            {nav.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all" style={{ background: active ? 'var(--bg-card-hover)' : 'transparent', border: active ? '1px solid var(--border-hover)' : '1px solid transparent', color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  <item.icon size={16} style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="px-3 mb-3">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium w-full cursor-pointer transition-all" style={{ color: 'var(--text-muted)' }}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <div className="mx-3 mb-4 p-4 rounded-2xl" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,160,0.1)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: 'var(--accent)' }}>
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white leading-tight">{user.name}</p>
              <p className="text-[10px] mono" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 min-h-14 flex items-center justify-between px-6" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(12,12,15,0.5)', backdropFilter: 'blur(12px)' }}>
          <h2 className="text-[15px] font-semibold text-white">
            {nav.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.label || 'CompSciLearner'}
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl transition-all relative cursor-pointer" style={{ color: 'var(--text-muted)' }}>
              <Bell size={14} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: 'var(--accent)' }}>
              {user.name[0].toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
