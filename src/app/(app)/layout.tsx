import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AppShell } from '@/components/layout/AppShell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')
  const user = await prisma.user.findUnique({ where: { id: session.id }, select: { id: true, name: true, email: true, role: true } })
  if (!user) redirect('/login')
  const tracks = await prisma.track.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true, slug: true, icon: true, color: true } })
  return <AppShell user={user} tracks={tracks}>{children}</AppShell>
}
