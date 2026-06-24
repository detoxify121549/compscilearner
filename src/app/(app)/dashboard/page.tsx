import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { BookOpen, CheckCircle, Target, Clock, ArrowRight, Lock, Code } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getSession()
  const tracks = await prisma.track.findMany({ orderBy: { order: 'asc' }, include: { modules: { include: { lessons: true } } } })
  const progress = await prisma.userProgress.findMany({ where: { userId: session!.id, completed: true } })
  const completedIds = new Set(progress.map(p => p.lessonId))

  const totalLessons = tracks.reduce((sum, t) => sum + t.modules.reduce((s, m) => s + m.lessons.length, 0), 0)
  const completedLessons = progress.length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: CheckCircle, label: 'Completed', value: `${completedLessons}`, sub: `of ${totalLessons} lessons`, color: 'text-emerald-400' },
          { icon: BookOpen, label: 'Tracks', value: `${tracks.length}`, sub: 'Available', color: 'text-purple-400' },
          { icon: Target, label: 'Modules', value: `${tracks.reduce((s, t) => s + t.modules.length, 0)}`, sub: 'Total', color: 'text-cyan-400' },
          { icon: Clock, label: 'Est. Hours', value: `${tracks.reduce((s, t) => s + t.modules.reduce((ms, m) => ms + m.estimatedHours, 0), 0)}`, sub: 'Total learning time', color: 'text-yellow-400' },
        ].map((s, i) => (
          <div key={i} className="glass glass-hover rounded-2xl p-6 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] text-gray-500 uppercase tracking-[0.12em] font-semibold">{s.label}</p>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                <s.icon size={18} className={s.color} />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{s.value}</p>
            <p className="text-[10px] text-gray-600 mt-1.5 font-medium">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Track cards */}
      <div className="grid grid-cols-2 gap-5">
        {tracks.map(track => {
          const trackLessons = track.modules.flatMap(m => m.lessons)
          const trackCompleted = trackLessons.filter(l => completedIds.has(l.id)).length
          const pct = trackLessons.length > 0 ? Math.round((trackCompleted / trackLessons.length) * 100) : 0
          const IconComp = track.slug === 'cybersecurity' ? Lock : Code
          return (
            <Link key={track.id} href={`/tracks/${track.slug}`} className="glass glass-hover rounded-2xl p-8 block group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <IconComp size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{track.name}</h3>
                  <p className="text-xs text-gray-500">{track.modules.length} modules &middot; {trackLessons.length} lessons</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-gray-600 group-hover:text-purple-400 transition-colors" />
              </div>
              <p className="text-sm text-gray-400 mb-5">{track.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{trackCompleted} / {trackLessons.length} lessons</span>
                <span className="font-semibold text-white">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
