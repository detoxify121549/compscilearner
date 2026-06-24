import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { User, Mail, Calendar } from 'lucide-react'

export default async function ProfilePage() {
  const session = await getSession()
  const user = await prisma.user.findUnique({ where: { id: session!.id } })
  if (!user) return null
  const progressCount = await prisma.userProgress.count({ where: { userId: user.id, completed: true } })
  const taskCount = await prisma.userTask.count({ where: { userId: user.id, completed: true } })

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-extrabold text-white">Profile</h1>
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/20">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: User, label: 'Role', value: user.role },
            { icon: Mail, label: 'Lessons Done', value: `${progressCount}` },
            { icon: Calendar, label: 'Tasks Done', value: `${taskCount}` },
          ].map((s, i) => (
            <div key={i} className="bg-white/[0.03] rounded-xl p-4 text-center">
              <s.icon size={16} className="text-purple-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
