import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json([], { status: 401 })
  const { searchParams } = new URL(req.url)
  const moduleId = searchParams.get('moduleId')
  const tasks = await prisma.userTask.findMany({ where: { userId: session.id, ...(moduleId ? { moduleId } : {}) }, orderBy: { order: 'asc' } })
  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { moduleId, title } = await req.json()
  const count = await prisma.userTask.count({ where: { userId: session.id, moduleId } })
  const task = await prisma.userTask.create({ data: { userId: session.id, moduleId, title, order: count } })
  return NextResponse.json(task)
}

export async function PUT(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, completed, title } = await req.json()
  const task = await prisma.userTask.update({ where: { id }, data: { ...(completed !== undefined ? { completed } : {}), ...(title ? { title } : {}) } })
  return NextResponse.json(task)
}

export async function DELETE(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await prisma.userTask.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
