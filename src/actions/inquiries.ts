'use server'

import { createInquiry, updateInquiryStatus as dbUpdateStatus } from '@/lib/db'
import type { InquiryStatus } from '@/types'

export async function submitInquiry(data: {
  inquiry_type: 'Package Booking' | 'Tailor-Made'
  package_title?: string
  customer_name: string
  email: string
  country?: string
  whatsapp?: string
  travel_date?: string
  duration_days?: number
  adults?: number
  children?: number
  interests?: string[]
  hotel_tier?: string
  vehicle_type?: string
  notes?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    await createInquiry({
      inquiry_type: data.inquiry_type,
      package_title: data.package_title ?? null,
      customer_name: data.customer_name,
      email: data.email,
      country: data.country ?? null,
      whatsapp: data.whatsapp ?? null,
      travel_date: data.travel_date ?? null,
      duration_days: data.duration_days ?? null,
      adults: data.adults ?? null,
      children: data.children ?? null,
      interests: data.interests ?? [],
      hotel_tier: data.hotel_tier ?? null,
      vehicle_type: data.vehicle_type ?? null,
      notes: data.notes ?? null,
      status: 'New',
    })
    return { success: true }
  } catch (err) {
    console.error('[submitInquiry]', err)
    return { success: false, error: 'Failed to submit inquiry. Please try again.' }
  }
}

export async function updateInquiryStatusAction(
  id: number,
  status: InquiryStatus
): Promise<void> {
  await dbUpdateStatus(id, status)
}
