import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { CheckCircle, Circle, Clock, ArrowRight } from 'lucide-react'

export default async function TrackPage({ params }: { params: Promise<{ trackSlug: string }> }) {
  const { trackSlug } = await params
  const session = await getSession()
  const track = await prisma.track.findUnique({ where: { slug: trackSlug }, include: { modules: { orderBy: { order: 'asc' }, include: { lessons: true } } } })
  if (!track) notFound()
  const progress = await prisma.userProgress.findMany({ where: { userId: session!.id, completed: true } })
  const completedIds = new Set(progress.map(p => p.lessonId))

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">{track.name}</h1>
        <p className="text-gray-400">{track.description}</p>
      </div>

      <div className="space-y-4">
        {track.modules.map((mod, i) => {
          const completed = mod.lessons.filter(l => completedIds.has(l.id)).length
          const total = mod.lessons.length
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0
          const allDone = completed === total && total > 0
          return (
            <Link key={mod.id} href={`/tracks/${trackSlug}/${mod.slug}`} className="glass glass-hover rounded-2xl p-6 flex items-center gap-6 group block">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${allDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.04] text-gray-500'}`}>
                {allDone ? <CheckCircle size={20} /> : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[15px] font-bold text-white">{mod.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ${mod.difficulty === 'BEGINNER' ? 'text-emerald-400 bg-emerald-400/10' : mod.difficulty === 'INTERMEDIATE' ? 'text-yellow-400 bg-yellow-400/10' : 'text-red-400 bg-red-400/10'}`}>{mod.difficulty}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{mod.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{completed}/{total} lessons</span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{mod.estimatedHours}h</span>
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden ml-2">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="font-semibold text-white">{pct}%</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
