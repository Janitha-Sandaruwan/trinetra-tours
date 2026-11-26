import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { destinations } from '@/data/mockData'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

export const metadata: Metadata = {
  title: 'Destinations Guide',
  description: 'Explore Sri Lanka\'s iconic destinations — Sigiriya, Kandy, Ella, Yala, Galle, Mirissa and more.',
}

// Map each destination slug to its local image in /public/img/
const destImages: Record<string, string> = {
  sigiriya:     '/img/sigiriya.png',
  kandy:        '/img/kandy.png',
  'nuwara-eliya': '/img/nuwara-eliya.png',
  ella:         '/img/ella.png',
  yala:         '/img/yala.png',
  galle:        '/img/galle.png',
  mirissa:      '/img/mirissa.png',
}

export default function DestinationsPage() {
  return (
    <div className="pt-20">
      {/* Hero header */}
      <div className="bg-ocean text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Pearl of the Indian Ocean</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Destinations Guide</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            From misty mountain villages to sun-kissed beaches and ancient rock fortresses — discover Sri Lanka&apos;s most extraordinary places.
          </p>
        </div>
      </div>

      {/* Destination cards grid */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => {
              const imgSrc = destImages[dest.slug]
              return (
                <StaggerItem key={dest.slug} className={i === 0 ? 'md:col-span-2' : ''}>
                  <Link href="#" className="group block h-full">
                    <div className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'h-80' : 'h-64'}`}>

                      {/* Real photo for every card — sigiriya.png for first card */}
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={dest.name}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep to-ocean" />
                      )}

                      {/* Dark gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

                      {/* Weather badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-xs font-medium bg-gold text-white px-3 py-1 rounded-full shadow-md">
                          {dest.weatherBadge}
                        </span>
                      </div>

                      {/* Arrow button */}
                      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-gold">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>

                      {/* Text content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <h2 className={`font-serif text-white mb-1.5 ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>
                          {dest.name}
                        </h2>
                        <div className="flex items-center gap-1.5 text-white/70 text-xs mb-3">
                          <Calendar className="w-3 h-3" />
                          <span>Best time: {dest.bestTimeToVisit}</span>
                        </div>
                        <p className="text-white/85 text-sm leading-relaxed mb-3 line-clamp-2">
                          {dest.description}
                        </p>
                        {/* Activity chips — visible on hover */}
                        <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {dest.activities.slice(0, 4).map((act) => (
                            <span
                              key={act}
                              className="text-[11px] bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full"
                            >
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-deep text-white text-center">
        <FadeIn>
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Explore?</h2>
            <p className="text-white/70 mb-6">Let us build a personalized itinerary combining your favorite destinations.</p>
            <Link
              href="/tailor-made"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
            >
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
