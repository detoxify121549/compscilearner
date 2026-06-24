import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const token = await createToken({ id: user.id, email: user.email, role: user.role })
  const cookieStore = await cookies()
  cookieStore.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/' })
  return NextResponse.json({ id: user.id, name: user.name, email: user.email })
}
