import type { Metadata } from 'next'
import { getPublishedPackages } from '@/lib/db'
import { tourPackages } from '@/data/mockData'
import { PackagesClient } from '@/components/packages/PackagesClient'
import type { TourPackage } from '@/data/mockData'

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Luxury Sri Lanka tour packages — Cultural, Wildlife, Honeymoon, and Beach & Wellness. 6 to 15 days. All fully tailor-made.',
}

export default async function PackagesPage() {
  // Try DB first; fall back to mockData when POSTGRES_URL not configured
  let packages: TourPackage[]
  try {
    const rows = await getPublishedPackages()
    if (rows.length > 0) {
      packages = rows.map((r) => ({
        id: String(r.id),
        slug: r.slug,
        title: r.title,
        category: r.category,
        duration: `${r.duration_days} Days`,
        startingPrice: Number(r.starting_price_usd),
        description: r.summary ?? '',
        images: r.cover_image_url ? [r.cover_image_url] : [],
        highlights: r.route_tags ?? [],
        includes: r.inclusions ?? [],
        itinerary: (r.itinerary ?? []).map((d) => ({
          day: d.day,
          title: d.title,
          description: d.description,
          accommodation: d.accommodation,
          meals: d.meals ? d.meals.split(',').map((m) => m.trim()) : [],
        })),
        featured: r.is_featured,
      })) as unknown as TourPackage[]
    } else {
      packages = tourPackages
    }
  } catch {
    packages = tourPackages
  }

  return (
    <div className="pt-20">
      <div className="bg-ocean text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Our Journeys</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Tour Packages</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Handcrafted Sri Lanka itineraries from 6 to 15 days. Every package is a starting point — we tailor each one to your exact wishes.
          </p>
        </div>
      </div>
      <PackagesClient packages={packages} />
    </div>
  )
}
