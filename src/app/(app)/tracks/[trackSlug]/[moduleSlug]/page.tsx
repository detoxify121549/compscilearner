import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { CheckCircle, Circle, ArrowRight, BookOpen, Video, Flag, FileText, Globe } from 'lucide-react'

const typeIcons: Record<string, typeof BookOpen> = { READING: BookOpen, VIDEO: Video, HANDS_ON: Flag, ASSESSMENT: FileText }

export default async function ModulePage({ params }: { params: Promise<{ trackSlug: string; moduleSlug: string }> }) {
  const { trackSlug, moduleSlug } = await params
  const session = await getSession()
  const track = await prisma.track.findUnique({ where: { slug: trackSlug } })
  if (!track) notFound()
  const mod = await prisma.module.findUnique({ where: { trackId_slug: { trackId: track.id, slug: moduleSlug } }, include: { lessons: { orderBy: { order: 'asc' }, include: { resources: { orderBy: { order: 'asc' } } } } } })
  if (!mod) notFound()
  const progress = await prisma.userProgress.findMany({ where: { userId: session!.id, completed: true, lessonId: { in: mod.lessons.map(l => l.id) } } })
  const completedIds = new Set(progress.map(p => p.lessonId))

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href={`/tracks/${trackSlug}`} className="hover:text-gray-300 transition-colors">{track.name}</Link>
        <span>/</span>
        <span className="text-white">{mod.name}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white mb-2">{mod.name}</h1>
        <p className="text-gray-400 text-sm">{mod.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          <span className={`px-2.5 py-1 rounded-full font-semibold uppercase ${mod.difficulty === 'BEGINNER' ? 'text-emerald-400 bg-emerald-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>{mod.difficulty}</span>
          <span>{completedIds.size}/{mod.lessons.length} complete</span>
        </div>
      </div>

      <div className="space-y-3">
        {mod.lessons.map((lesson, i) => {
          const done = completedIds.has(lesson.id)
          const Icon = typeIcons[lesson.contentType] || Globe
          return (
            <Link key={lesson.id} href={`/tracks/${trackSlug}/${moduleSlug}/${lesson.slug}`} className="glass glass-hover rounded-xl p-5 flex items-center gap-4 group block">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${done ? 'bg-emerald-500/20' : 'bg-white/[0.04]'}`}>
                {done ? <CheckCircle size={16} className="text-emerald-400" /> : <Icon size={16} className="text-gray-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-semibold ${done ? 'text-gray-400 line-through' : 'text-white'}`}>{lesson.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  {lesson.resources.slice(0, 3).map(r => (
                    <span key={r.id} className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/[0.04] text-gray-500 uppercase">{r.type}</span>
                  ))}
                  {lesson.resources.length > 3 && <span className="text-[10px] text-gray-600">+{lesson.resources.length - 3} more</span>}
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
