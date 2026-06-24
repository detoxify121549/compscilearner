'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Circle } from 'lucide-react'

export function MarkCompleteButton({ lessonId, initialCompleted }: { lessonId: string; initialCompleted: boolean }) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function toggle() {
    setLoading(true)
    setCompleted(!completed)
    await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lessonId }) })
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={toggle} disabled={loading} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${completed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'glass text-gray-400 hover:text-white'}`}>
      {completed ? <CheckCircle size={16} /> : <Circle size={16} />}
      {completed ? 'Completed' : 'Mark Complete'}
    </button>
  )
}
