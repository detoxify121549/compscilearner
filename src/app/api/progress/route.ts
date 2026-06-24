import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json([], { status: 401 })
  const progress = await prisma.userProgress.findMany({ where: { userId: session.id } })
  return NextResponse.json(progress)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { lessonId } = await req.json()
  const existing = await prisma.userProgress.findUnique({ where: { userId_lessonId: { userId: session.id, lessonId } } })
  if (existing) {
    const updated = await prisma.userProgress.update({ where: { userId_lessonId: { userId: session.id, lessonId } }, data: { completed: !existing.completed, completedAt: !existing.completed ? new Date() : null } })
    return NextResponse.json(updated)
  }
  const created = await prisma.userProgress.create({ data: { userId: session.id, lessonId, completed: true, completedAt: new Date() } })
  return NextResponse.json(created)
}
