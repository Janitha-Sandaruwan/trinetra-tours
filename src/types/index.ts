// ── Shared TypeScript types ────────────────────────────────

export interface ItineraryDay {
  day: number
  title: string
  description: string
  accommodation: string
  meals: string
}

export interface TourPackageRow {
  id: number
  slug: string
  title: string
  category: string
  duration_days: number
  starting_price_usd: number | string
  summary: string | null
  cover_image_url: string | null
  route_tags: string[]
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  is_featured: boolean
  is_published: boolean
  created_at: string
}

export interface InquiryRow {
  id: number
  inquiry_type: string
  package_title: string | null
  customer_name: string
  email: string
  country: string | null
  whatsapp: string | null
  travel_date: string | null
  duration_days: number | null
  adults: number | null
  children: number | null
  interests: string[]
  hotel_tier: string | null
  vehicle_type: string | null
  notes: string | null
  status: string
  created_at: string
}

export type InquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Booked' | 'Archived'
