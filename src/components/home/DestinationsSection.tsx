'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { destinations } from '@/data/mockData'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

const destImages: Record<string, string> = {
  sigiriya:       '/img/sigiriya.png',
  kandy:          '/img/kandy.png',
  'nuwara-eliya': '/img/nuwara-eliya.png',
  ella:           '/img/ella.png',
  yala:           '/img/yala.png',
  galle:          '/img/galle.png',
  mirissa:        '/img/mirissa.png',
}

export function DestinationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Explore Sri Lanka</div>
            <h2 className="font-serif text-4xl md:text-5xl text-ocean mb-4">
              Iconic Destinations
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From ancient rock fortresses to pristine beaches — discover the highlights of the Pearl of the Indian Ocean.
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((dest, i) => {
            const imgSrc = destImages[dest.slug]
            return (
              <StaggerItem
                key={dest.slug}
                className={i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <Link href="/destinations" className="group block h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'h-72' : 'h-56'} bg-ocean`}
                  >
                    {/* Real photo for every card — sigiriya.png for first card */}
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={dest.name}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

                    {/* Weather badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-medium bg-gold text-white px-3 py-1 rounded-full shadow">
                        {dest.weatherBadge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className={`font-serif text-white mb-1 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                        {dest.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/70 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>Best: {dest.bestTimeToVisit}</span>
                      </div>

                      {/* Activities — shown on hover */}
                      <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {dest.activities.slice(0, i === 0 ? 5 : 3).map((act) => (
                          <span key={act} className="text-[11px] bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow on hover */}
                    <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-gold">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <FadeIn delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-ocean hover:text-emerald-deep font-semibold transition-colors group"
            >
              View All Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
