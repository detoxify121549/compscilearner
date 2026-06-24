import Link from 'next/link'
import { Terminal, BookOpen, Target, CheckCircle, ArrowRight, Code, Lock, Zap, Flag, ChevronRight, Star, Users, Clock, Award, Layers, Shield, GraduationCap, Play } from 'lucide-react'

const cx = { marginLeft: 'auto', marginRight: 'auto' } as const

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--bg)' }}>

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(11,13,17,0.88)', backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border)' }}>
        <div className="w-full h-[72px] flex items-center justify-between px-10" style={{ ...cx, maxWidth: 1320 }}>
          <Link href="/" className="flex items-center gap-2.5">
            <Terminal size={20} style={{ color: 'var(--accent)' }} />
            <span className="text-[17px] font-bold text-white tracking-tight">CompSciLearner</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#tracks" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Tracks</a>
            <a href="#how" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>How It Works</a>
            <a href="#resources" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Resources</a>
            <Link href="/login" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
            <Link href="/signup" className="px-5 py-2.5 rounded-xl text-[14px] font-semibold text-black transition-all hover:brightness-110" style={{ background: 'var(--accent)' }}>
              Start free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="px-10" style={{ paddingTop: 180, paddingBottom: 140 }}>
        <div className="w-full flex flex-col items-center text-center" style={{ ...cx, maxWidth: 900 }}>
          <div className="fade-up d1 flex items-center gap-2 px-4 py-2 rounded-full mb-10 mono" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--accent)', border: '1px solid var(--accent-dim)', background: 'var(--accent-glow)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
            Free &amp; Open Curriculum · Learn at Your Own Pace
          </div>

          <h1 className="fade-up d2 font-extrabold text-white leading-[1.04] tracking-[-0.03em] mb-7" style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}>
            Learn From Builders.<br />
            <span style={{ color: 'var(--accent)' }}>Not Textbooks.</span>
          </h1>

          <p className="fade-up d3 text-lg md:text-xl leading-relaxed mb-12" style={{ color: 'var(--text-secondary)', maxWidth: 620, ...cx }}>
            Two guided tracks in cybersecurity and software design. Real PDFs, real video courses, real CTF labs — all free, forever. Track progress and build skills that actually matter.
          </p>

          <div className="fade-up d4 flex items-center justify-center gap-4 mb-8">
            <Link href="/signup" className="px-9 py-[14px] rounded-xl text-black text-[15px] font-semibold flex items-center gap-2.5 transition-all hover:brightness-110" style={{ background: 'var(--accent)', boxShadow: '0 4px 24px var(--accent-dim)' }}>
              Browse tracks <ArrowRight size={16} />
            </Link>
            <a href="#how" className="card px-9 py-[14px] text-[15px] font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)', borderRadius: 12 }}>
              <Play size={14} /> See how it works
            </a>
          </div>

          <div className="fade-up d5 flex items-center justify-center gap-6 text-[13px] font-medium" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5"><Users size={13} style={{ color: 'var(--accent)' }} /> Open Source</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Star size={13} style={{ color: 'var(--accent)' }} /> 200+ Resources</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Award size={13} style={{ color: 'var(--accent)' }} /> Lifetime Access</span>
          </div>

          {/* Floating preview card */}
          <div className="fade-up d6 card mt-14 p-5 text-left" style={{ maxWidth: 340, borderRadius: 14, boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
            <div className="mono text-[9px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md inline-block mb-3" style={{ color: 'var(--accent)', background: 'var(--accent-dim)' }}>Most Popular</div>
            <p className="text-[15px] font-bold text-white mb-1">Web Security Basics</p>
            <p className="text-[12px] mb-3 mono" style={{ color: 'var(--text-muted)' }}>4 lessons · 10hrs · OWASP Top 10 · CTF Labs</p>
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="var(--accent)" style={{ color: 'var(--accent)' }} />)}
              <span className="text-[11px] ml-1" style={{ color: 'var(--text-muted)' }}>Beginner friendly</span>
            </div>
            <Link href="/signup" className="text-[12px] font-semibold flex items-center gap-1 transition-colors" style={{ color: 'var(--accent)' }}>
              Start learning →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRACKS ═══ */}
      <section id="tracks" className="px-10" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="w-full" style={{ ...cx, maxWidth: 1320 }}>
          <div className="text-center" style={{ marginBottom: 80 }}>
            <p className="mono text-[10px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>Curriculum</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">Two Tracks. One Mission.</h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)', ...cx, maxWidth: 580 }}>Choose your path. Both take you from zero to capable with structured, free resources curated by practitioners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Lock, name: 'Cybersecurity', tag: 'Defense & Offense', desc: 'From networking basics to bug bounty hunting. Learn to find and exploit vulnerabilities.', accent: 'var(--accent)', modules: ['Foundations of Cybersecurity', 'Networking Fundamentals', 'Linux for Security', 'Web Security Basics', 'Capture The Flag', 'Network Pentesting', 'Web App Hacking', 'Bug Bounty Hunting'] },
              { icon: Code, name: 'Software Design', tag: 'Build & Scale', desc: 'From programming fundamentals to system architecture. Build software that scales.', accent: 'var(--blue)', modules: ['Programming Fundamentals', 'Data Structures & Algorithms', 'Object-Oriented Design', 'Version Control & Git', 'Web Development', 'System Design Basics', 'API Design & Architecture', 'Database Design'] },
            ].map((t, i) => (
              <div key={i} className="card p-10 relative overflow-hidden" style={{ borderRadius: 20 }}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[120px] opacity-15" style={{ background: t.accent }} />
                <div className="flex items-center gap-4 mb-2 relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: i === 0 ? 'var(--accent-dim)' : 'var(--blue-dim)' }}>
                    <t.icon size={22} style={{ color: t.accent }} />
                  </div>
                  <div>
                    <p className="mono text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: t.accent }}>{t.tag}</p>
                    <h3 className="text-2xl font-bold text-white">{t.name}</h3>
                  </div>
                </div>
                <p className="text-[15px] mb-8" style={{ color: 'var(--text-secondary)' }}>{t.desc}</p>
                <div className="space-y-0.5">
                  {t.modules.map((m, j) => (
                    <div key={j} className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold mono shrink-0" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{String(j + 1).padStart(2, '0')}</span>
                      <span className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{m}</span>
                      <ChevronRight size={14} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="px-10" style={{ paddingTop: 120, paddingBottom: 120, background: 'var(--bg-surface)' }}>
        <div className="w-full" style={{ ...cx, maxWidth: 1320 }}>
          <div className="text-center" style={{ marginBottom: 80 }}>
            <p className="mono text-[10px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>How it works</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Learn Differently</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Layers, title: 'Pick a Track', desc: 'Choose cybersecurity or software design. Each has a clear, ordered sequence from beginner to advanced.' },
              { icon: BookOpen, title: 'Learn Free Resources', desc: 'Watch curated YouTube courses, read free PDFs, follow structured articles — all hand-picked.' },
              { icon: Flag, title: 'Practice Hands-On', desc: 'Solve CTF challenges, build projects, complete labs. Real practice on real platforms.' },
              { icon: Award, title: 'Track Mastery', desc: 'Mark lessons complete, track progress visually. Build your personal task list per module.' },
            ].map((s, i) => (
              <div key={i} className="card p-8 relative overflow-hidden" style={{ borderRadius: 16 }}>
                <div className="absolute top-5 right-5 text-[72px] font-black leading-none" style={{ color: 'rgba(255,255,255,0.02)' }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--accent-dim)' }}>
                  <s.icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="px-10" style={{ paddingTop: 0, paddingBottom: 0, background: 'var(--navy)' }}>
        <div className="w-full flex items-center justify-between" style={{ ...cx, maxWidth: 1000, height: 80 }}>
          {[
            { val: '20+', label: 'Modules' },
            { val: '100+', label: 'Lessons' },
            { val: '200+', label: 'Free Resources' },
            { val: '$0', label: 'Forever Free' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <div className="w-px h-6 mr-3" style={{ background: 'rgba(255,255,255,0.08)' }} />}
              <div className="text-center">
                <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{s.val}</p>
                <p className="mono text-[9px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RESOURCES PREVIEW ═══ */}
      <section id="resources" className="px-10" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="w-full" style={{ ...cx, maxWidth: 1320 }}>
          <div className="text-center" style={{ marginBottom: 80 }}>
            <p className="mono text-[10px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>What you get</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">Real Resources. Not Filler.</h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)', ...cx, maxWidth: 580 }}>Every link is hand-picked. Free PDFs from NIST and OWASP. Video courses from NetworkChuck and CS50. CTF labs from PortSwigger and TryHackMe.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: BookOpen, type: 'Free PDFs', count: '25+', examples: 'NIST frameworks, Think Python, Pro Git, OWASP Top 10' },
              { icon: Play, type: 'Video Courses', count: '40+', examples: 'CS50, NetworkChuck, Computerphile, Fireship, Abdul Bari' },
              { icon: Flag, type: 'CTF & Labs', count: '30+', examples: 'PortSwigger Academy, TryHackMe, PicoCTF, HackTheBox' },
              { icon: GraduationCap, type: 'Full Courses', count: '15+', examples: 'Coursera, freeCodeCamp, The Odin Project, Hacker101' },
            ].map((r, i) => (
              <div key={i} className="card p-7" style={{ borderRadius: 16 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-dim)' }}>
                  <r.icon size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <p className="text-2xl font-bold text-white mb-0.5">{r.count}</p>
                <p className="text-[14px] font-semibold text-white mb-2">{r.type}</p>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{r.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="px-10" style={{ paddingTop: 80, paddingBottom: 80, background: 'var(--bg-surface)' }}>
        <div className="w-full text-center" style={{ ...cx, maxWidth: 700 }}>
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--accent)" style={{ color: 'var(--accent)' }} />)}
          </div>
          <blockquote className="text-xl md:text-2xl font-light italic text-white leading-relaxed mb-6" style={{ fontWeight: 300 }}>
            &ldquo;I went from zero Linux knowledge to completing my first HackTheBox machine in three weeks. The curriculum order actually makes sense — each module builds on the last.&rdquo;
          </blockquote>
          <p className="mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>CompSciLearner Student · Cybersecurity Track</p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-10" style={{ paddingTop: 100, paddingBottom: 100, background: 'var(--navy)' }}>
        <div className="w-full text-center" style={{ ...cx, maxWidth: 700 }}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">Start Learning Today</h2>
          <p className="text-lg font-light mb-10" style={{ color: 'rgba(255,255,255,0.6)', ...cx, maxWidth: 500 }}>
            No credit card. No paywall. Browse every track, complete every lesson, access every resource. Free forever.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-black text-[16px] font-semibold transition-all hover:brightness-110" style={{ background: 'var(--accent)', boxShadow: '0 4px 30px var(--accent-dim)' }}>
            Create free account <ArrowRight size={18} />
          </Link>
          <p className="mt-6 mono text-[10px] tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.3)' }}>No commitment · Lifetime access · 200+ free resources</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-10" style={{ paddingTop: 48, paddingBottom: 48, background: '#080a0e', borderTop: '1px solid var(--border)' }}>
        <div className="w-full flex items-center justify-between" style={{ ...cx, maxWidth: 1320 }}>
          <div className="flex items-center gap-2.5">
            <Terminal size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-[14px] font-bold" style={{ color: 'var(--accent)' }}>CompSciLearner</span>
          </div>
          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>&copy; 2026 CompSciLearner · Free Curriculum · Learn Anywhere · Built for Learners</p>
        </div>
      </footer>
    </div>
  )
}
