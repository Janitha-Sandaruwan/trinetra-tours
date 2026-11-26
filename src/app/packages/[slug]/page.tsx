import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { tourPackages } from '@/data/mockData'
import { getPackageBySlug } from '@/lib/db'
import { PackageDetail } from '@/components/packages/PackageDetail'
import type { TourPackage } from '@/data/mockData'

export async function generateStaticParams() {
  return tourPackages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const row = await getPackageBySlug(slug)
    if (row) return { title: row.title, description: row.summary ?? '' }
  } catch {}
  const pkg = tourPackages.find((p) => p.slug === slug)
  if (!pkg) return {}
  return { title: pkg.title, description: pkg.description }
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Try DB first
  let pkg: TourPackage | undefined
  try {
    const row = await getPackageBySlug(slug)
    if (row) {
      pkg = {
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        category: row.category,
        duration: `${row.duration_days} Days`,
        startingPrice: Number(row.starting_price_usd),
        description: row.summary ?? '',
        images: row.cover_image_url ? [row.cover_image_url] : [],
        highlights: row.route_tags ?? [],
        includes: row.inclusions ?? [],
        itinerary: (row.itinerary ?? []).map((d) => ({
          day: d.day,
          title: d.title,
          description: d.description,
          accommodation: d.accommodation,
          meals: d.meals ? d.meals.split(',').map((m) => m.trim()) : [],
        })),
        featured: row.is_featured,
      } as unknown as TourPackage
    }
  } catch {}

  // Fall back to mockData
  if (!pkg) {
    pkg = tourPackages.find((p) => p.slug === slug)
  }

  if (!pkg) notFound()
  return <PackageDetail pkg={pkg} />
}
