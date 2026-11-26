'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'

export async function loginAdmin(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return { error: 'Admin credentials are not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local.' }
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { error: 'Invalid email or password.' }
  }

  await createSession()
  redirect('/admin')
}

export async function logoutAdmin() {
  await deleteSession()
  redirect('/admin/login')
}
