import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const getSecret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-fallback-secret-32-bytes!!')

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  // ── Verify admin session ───────────────────────────────
  const token = request.cookies.get('admin_session')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await jwtVerify(token, getSecret())
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  // ── Validate Blob token ────────────────────────────────
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN not configured' },
      { status: 500 }
    )
  }

  // ── Parse multipart form ───────────────────────────────
  const form = await request.formData()
  const file = form.get('file')

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
      { status: 400 }
    )
  }

  const filename = (file as File).name ?? `upload-${Date.now()}`

  // ── Upload to Vercel Blob ──────────────────────────────
  const blob = await put(`packages/${Date.now()}-${filename}`, file, {
    access: 'public',
  })

  return NextResponse.json({ url: blob.url })
}
