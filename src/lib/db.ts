/**
 * Database access layer.
 * Falls back to mockData when POSTGRES_URL is not configured.
 */
import { sql } from '@vercel/postgres'
import type { TourPackageRow, InquiryRow } from '@/types'

const hasDb = !!process.env.POSTGRES_URL

// ── Mock data fallback ─────────────────────────────────────
function mockPackages(): TourPackageRow[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { tourPackages } = require('@/data/mockData')
    return (tourPackages as Array<Record<string, unknown>>).map((p, i) => ({
      id: i + 1,
      slug: p.slug as string,
      title: p.title as string,
      category: p.category as string,
      duration_days: (p.duration as string)
        ? parseInt((p.duration as string).split(' ')[0])
        : 7,
      starting_price_usd: p.startingPrice as number,
      summary: p.description as string,
      cover_image_url: (p.images as string[])?.[0] ?? null,
      route_tags: (p.highlights as string[]) ?? [],
      itinerary: [],
      inclusions: (p.includes as string[]) ?? [],
      exclusions: [],
      is_featured: !!(p.featured),
      is_published: true,
      created_at: new Date().toISOString(),
    }))
  } catch {
    return []
  }
}

// ── Package queries ────────────────────────────────────────

export async function getPublishedPackages(): Promise<TourPackageRow[]> {
  if (!hasDb) return mockPackages()
  const { rows } = await sql<TourPackageRow>`
    SELECT * FROM tour_packages
    WHERE is_published = true
    ORDER BY is_featured DESC, created_at DESC
  `
  return rows
}

export async function getAllPackages(): Promise<TourPackageRow[]> {
  if (!hasDb) return mockPackages()
  const { rows } = await sql<TourPackageRow>`
    SELECT * FROM tour_packages ORDER BY created_at DESC
  `
  return rows
}

export async function getPackageBySlug(slug: string): Promise<TourPackageRow | null> {
  if (!hasDb) {
    const all = mockPackages()
    return all.find((p) => p.slug === slug) ?? null
  }
  const { rows } = await sql<TourPackageRow>`
    SELECT * FROM tour_packages WHERE slug = ${slug} AND is_published = true LIMIT 1
  `
  return rows[0] ?? null
}

export async function getPackageById(id: number): Promise<TourPackageRow | null> {
  if (!hasDb) return null
  const { rows } = await sql<TourPackageRow>`
    SELECT * FROM tour_packages WHERE id = ${id} LIMIT 1
  `
  return rows[0] ?? null
}

export async function createPackage(data: Omit<TourPackageRow, 'id' | 'created_at'>): Promise<TourPackageRow> {
  const { rows } = await sql<TourPackageRow>`
    INSERT INTO tour_packages
      (slug, title, category, duration_days, starting_price_usd, summary, cover_image_url,
       route_tags, itinerary, inclusions, exclusions, is_featured, is_published)
    VALUES
      (${data.slug}, ${data.title}, ${data.category}, ${data.duration_days},
       ${data.starting_price_usd}, ${data.summary}, ${data.cover_image_url},
       ${JSON.stringify(data.route_tags)}, ${JSON.stringify(data.itinerary)},
       ${JSON.stringify(data.inclusions)}, ${JSON.stringify(data.exclusions)},
       ${data.is_featured}, ${data.is_published})
    RETURNING *
  `
  return rows[0]
}

export async function updatePackage(id: number, data: Partial<Omit<TourPackageRow, 'id' | 'created_at'>>): Promise<TourPackageRow> {
  const { rows } = await sql<TourPackageRow>`
    UPDATE tour_packages SET
      slug               = COALESCE(${data.slug ?? null}, slug),
      title              = COALESCE(${data.title ?? null}, title),
      category           = COALESCE(${data.category ?? null}, category),
      duration_days      = COALESCE(${data.duration_days ?? null}, duration_days),
      starting_price_usd = COALESCE(${data.starting_price_usd ?? null}, starting_price_usd),
      summary            = COALESCE(${data.summary ?? null}, summary),
      cover_image_url    = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
      route_tags         = COALESCE(${data.route_tags != null ? JSON.stringify(data.route_tags) : null}::jsonb, route_tags),
      itinerary          = COALESCE(${data.itinerary != null ? JSON.stringify(data.itinerary) : null}::jsonb, itinerary),
      inclusions         = COALESCE(${data.inclusions != null ? JSON.stringify(data.inclusions) : null}::jsonb, inclusions),
      exclusions         = COALESCE(${data.exclusions != null ? JSON.stringify(data.exclusions) : null}::jsonb, exclusions),
      is_featured        = COALESCE(${data.is_featured ?? null}, is_featured),
      is_published       = COALESCE(${data.is_published ?? null}, is_published)
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0]
}

export async function deletePackage(id: number): Promise<void> {
  await sql`DELETE FROM tour_packages WHERE id = ${id}`
}

// ── Inquiry queries ────────────────────────────────────────

export async function createInquiry(data: Omit<InquiryRow, 'id' | 'created_at'>): Promise<void> {
  if (!hasDb) {
    console.log('[Inquiry submitted — no DB configured]', data)
    return
  }
  await sql`
    INSERT INTO inquiries
      (inquiry_type, package_title, customer_name, email, country, whatsapp,
       travel_date, duration_days, adults, children, interests,
       hotel_tier, vehicle_type, notes, status)
    VALUES
      (${data.inquiry_type}, ${data.package_title}, ${data.customer_name},
       ${data.email}, ${data.country}, ${data.whatsapp}, ${data.travel_date},
       ${data.duration_days}, ${data.adults}, ${data.children},
       ${JSON.stringify(data.interests)}, ${data.hotel_tier},
       ${data.vehicle_type}, ${data.notes}, 'New')
  `
}

export async function getAllInquiries(): Promise<InquiryRow[]> {
  if (!hasDb) return []
  const { rows } = await sql<InquiryRow>`
    SELECT * FROM inquiries ORDER BY created_at DESC
  `
  return rows
}

export async function getRecentInquiries(limit = 5): Promise<InquiryRow[]> {
  if (!hasDb) return []
  const { rows } = await sql<InquiryRow>`
    SELECT * FROM inquiries ORDER BY created_at DESC LIMIT ${limit}
  `
  return rows
}

export async function updateInquiryStatus(id: number, status: string): Promise<void> {
  await sql`UPDATE inquiries SET status = ${status} WHERE id = ${id}`
}

// ── Stats ─────────────────────────────────────────────────

export async function getDashboardStats() {
  if (!hasDb) return { publishedPackages: 0, newInquiries: 0, bookedTours: 0 }
  const [pkgResult, newResult, bookedResult] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM tour_packages WHERE is_published = true`,
    sql`SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'`,
    sql`SELECT COUNT(*) as count FROM inquiries WHERE status = 'Booked'`,
  ])
  return {
    publishedPackages: parseInt(pkgResult.rows[0].count),
    newInquiries: parseInt(newResult.rows[0].count),
    bookedTours: parseInt(bookedResult.rows[0].count),
  }
}
