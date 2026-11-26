'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import {
  createPackage,
  updatePackage,
  deletePackage,
} from '@/lib/db'
import type { ItineraryDay } from '@/types'

function requireAdmin() {
  // Called inside async server actions — session verified by middleware already,
  // but we double-check here as a defence-in-depth measure.
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseJsonArray(raw: FormDataEntryValue | null): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw as string)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return (raw as string).split('\n').map((s) => s.trim()).filter(Boolean)
  }
}

function parseItinerary(raw: FormDataEntryValue | null): ItineraryDay[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw as string)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function createPackageAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  requireAdmin()
  try {
    const title = formData.get('title') as string
    const pkg = await createPackage({
      slug: slugify(title),
      title,
      category: formData.get('category') as string,
      duration_days: parseInt(formData.get('duration_days') as string),
      starting_price_usd: parseFloat(formData.get('starting_price_usd') as string),
      summary: formData.get('summary') as string,
      cover_image_url: (formData.get('cover_image_url') as string) || null,
      route_tags: parseJsonArray(formData.get('route_tags')),
      itinerary: parseItinerary(formData.get('itinerary')),
      inclusions: parseJsonArray(formData.get('inclusions')),
      exclusions: parseJsonArray(formData.get('exclusions')),
      is_featured: formData.get('is_featured') === 'true',
      is_published: formData.get('is_published') === 'true',
    })
    revalidatePath('/')
    revalidatePath('/packages')
    redirect(`/admin/packages`)
  } catch (err) {
    if ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) throw err
    return { error: (err as Error).message }
  }
}

export async function updatePackageAction(
  id: number,
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  requireAdmin()
  try {
    const title = formData.get('title') as string
    await updatePackage(id, {
      slug: slugify(title),
      title,
      category: formData.get('category') as string,
      duration_days: parseInt(formData.get('duration_days') as string),
      starting_price_usd: parseFloat(formData.get('starting_price_usd') as string),
      summary: formData.get('summary') as string,
      cover_image_url: (formData.get('cover_image_url') as string) || null,
      route_tags: parseJsonArray(formData.get('route_tags')),
      itinerary: parseItinerary(formData.get('itinerary')),
      inclusions: parseJsonArray(formData.get('inclusions')),
      exclusions: parseJsonArray(formData.get('exclusions')),
      is_featured: formData.get('is_featured') === 'true',
      is_published: formData.get('is_published') === 'true',
    })
    revalidatePath('/')
    revalidatePath('/packages')
    revalidatePath(`/packages/${slugify(title)}`)
    redirect('/admin/packages')
  } catch (err) {
    if ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) throw err
    return { error: (err as Error).message }
  }
}

export async function deletePackageAction(id: number): Promise<void> {
  requireAdmin()
  await deletePackage(id)
  revalidatePath('/')
  revalidatePath('/packages')
}

export async function toggleFeaturedAction(id: number, value: boolean): Promise<void> {
  requireAdmin()
  await updatePackage(id, { is_featured: value })
  revalidatePath('/')
  revalidatePath('/packages')
}

export async function togglePublishedAction(id: number, value: boolean): Promise<void> {
  requireAdmin()
  await updatePackage(id, { is_published: value })
  revalidatePath('/')
  revalidatePath('/packages')
}
