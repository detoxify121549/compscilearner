import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json(null, { status: 401 })
  const user = await prisma.user.findUnique({ where: { id: session.id }, select: { id: true, name: true, email: true, role: true, createdAt: true } })
  return NextResponse.json(user)
}

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  return NextResponse.json({ ok: true })
}
