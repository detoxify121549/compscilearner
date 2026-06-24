import { prisma } from '@/lib/prisma'
import { hashPassword, createToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, password } = await req.json()
  if (!name || !email || !password || password.length < 6) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 409 })

  const user = await prisma.user.create({
    data: { name, email, passwordHash: await hashPassword(password) },
  })
  const token = await createToken({ id: user.id, email: user.email, role: user.role })
  const cookieStore = await cookies()
  cookieStore.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/' })
  return NextResponse.json({ id: user.id, name: user.name, email: user.email })
}
