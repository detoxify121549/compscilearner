import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, FileText, Video, Globe, Flag, BookOpen, ExternalLink } from 'lucide-react'
import { MarkCompleteButton } from '@/components/ui/MarkCompleteButton'

const typeConfig: Record<string, { icon: typeof FileText; color: string; label: string }> = {
  PDF: { icon: FileText, color: 'text-red-400 bg-red-400/10', label: 'PDF' },
  VIDEO: { icon: Video, color: 'text-purple-400 bg-purple-400/10', label: 'Video' },
  COURSE: { icon: BookOpen, color: 'text-cyan-400 bg-cyan-400/10', label: 'Course' },
  CTF: { icon: Flag, color: 'text-emerald-400 bg-emerald-400/10', label: 'CTF / Lab' },
  ARTICLE: { icon: Globe, color: 'text-yellow-400 bg-yellow-400/10', label: 'Article' },
  TOOL: { icon: Globe, color: 'text-orange-400 bg-orange-400/10', label: 'Tool' },
}

export default async function LessonPage({ params }: { params: Promise<{ trackSlug: string; moduleSlug: string; lessonSlug: string }> }) {
  const { trackSlug, moduleSlug, lessonSlug } = await params
  const session = await getSession()
  const track = await prisma.track.findUnique({ where: { slug: trackSlug } })
  if (!track) notFound()
  const mod = await prisma.module.findUnique({ where: { trackId_slug: { trackId: track.id, slug: moduleSlug } }, include: { lessons: { orderBy: { order: 'asc' } } } })
  if (!mod) notFound()
  const lesson = await prisma.lesson.findUnique({ where: { moduleId_slug: { moduleId: mod.id, slug: lessonSlug } }, include: { resources: { orderBy: { order: 'asc' } } } })
  if (!lesson) notFound()

  const progress = await prisma.userProgress.findUnique({ where: { userId_lessonId: { userId: session!.id, lessonId: lesson.id } } })
  const isCompleted = progress?.completed ?? false

  const currentIdx = mod.lessons.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIdx > 0 ? mod.lessons[currentIdx - 1] : null
  const nextLesson = currentIdx < mod.lessons.length - 1 ? mod.lessons[currentIdx + 1] : null

  return (
    <div className="max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href={`/tracks/${trackSlug}`} className="hover:text-gray-300 transition-colors">{track.name}</Link>
        <span>/</span>
        <Link href={`/tracks/${trackSlug}/${moduleSlug}`} className="hover:text-gray-300 transition-colors">{mod.name}</Link>
        <span>/</span>
        <span className="text-white">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="glass rounded-2xl p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white mb-2">{lesson.title}</h1>
            <p className="text-sm text-gray-400">{lesson.description}</p>
          </div>
          <MarkCompleteButton lessonId={lesson.id} initialCompleted={isCompleted} />
        </div>
        {lesson.content && <div className="prose prose-invert prose-sm mt-6 border-t border-white/[0.06] pt-6 text-gray-300">{lesson.content}</div>}
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.resources.map(r => {
            const config = typeConfig[r.type] || typeConfig.ARTICLE
            const Icon = config.icon
            const isYouTube = r.type === 'VIDEO' && (r.url.includes('youtube.com') || r.url.includes('youtu.be'))
            const videoId = isYouTube ? r.url.match(/(?:v=|youtu\.be\/)([^&]+)/)?.[1] : null

            return (
              <div key={r.id} className="glass rounded-xl overflow-hidden">
                {videoId && (
                  <div className="aspect-video">
                    <iframe src={`https://www.youtube.com/embed/${videoId}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ${config.color}`}>{config.label}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{r.title}</h3>
                  {r.description && <p className="text-xs text-gray-500 mb-3">{r.description}</p>}
                  {!videoId && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
                      Open Resource <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
        {prevLesson ? (
          <Link href={`/tracks/${trackSlug}/${moduleSlug}/${prevLesson.slug}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> {prevLesson.title}
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link href={`/tracks/${trackSlug}/${moduleSlug}/${nextLesson.slug}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            {nextLesson.title} <ArrowRight size={14} />
          </Link>
        ) : (
          <Link href={`/tracks/${trackSlug}`} className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
            Back to {track.name} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}
