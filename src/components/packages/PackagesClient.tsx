'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, DollarSign, MapPin, Check, ArrowRight } from 'lucide-react'
import { type TourPackage } from '@/data/mockData'
import { StaggerContainer, StaggerItem } from '@/components/animations'

const categories = ['All', 'Cultural', 'Wildlife', 'Honeymoon', 'Beach & Wellness']
const durationFilters = ['All', '5-7 Days', '8-14 Days', '15+ Days']

// Local images per package slug
const packageImages: Record<string, string> = {
  'classic-cultural-triangle': '/img/cultural-heritage.png',
  'wild-leopard-safari': '/img/wildlife.png',
  'honeymoon-paradise': '/img/honeymoon.png',
  'beach-wellness-south': '/img/beach-wellness.png',
  'hill-country-trains': '/img/nuwara-eliya.png',
  'grand-sri-lanka-odyssey': '/img/sigiriya.png',
}

function matchDuration(days: number, filter: string) {
  if (filter === 'All') return true
  if (filter === '5-7 Days') return days >= 5 && days <= 7
  if (filter === '8-14 Days') return days >= 8 && days <= 14
  if (filter === '15+ Days') return days >= 15
  return true
}

function PackageCard({ pkg }: { pkg: TourPackage }) {
  const whatsapp = encodeURIComponent(`Hello! I'm interested in the "${pkg.title}" package.`)
  const imgSrc = packageImages[pkg.slug]
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col hover:-translate-y-1">
      {/* Card image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-emerald-deep to-ocean flex items-end">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="relative p-4 w-full flex items-end justify-between z-10">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold/90 text-white">{pkg.category}</span>
          <span className="text-white/80 text-xs">{pkg.duration} Days</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-ocean mb-2 group-hover:text-emerald-deep transition-colors leading-snug">{pkg.title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 flex-wrap">
          <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
          {pkg.route.slice(0, 4).map((r, i) => (
            <span key={r}>{r}{i < Math.min(pkg.route.length, 4) - 1 ? ' →' : ''}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>{pkg.duration} Days</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-ocean">
            <DollarSign className="w-3.5 h-3.5 text-gold" />
            From ${pkg.startingPrice.toLocaleString()}
          </div>
        </div>
        <ul className="space-y-1 mb-5 flex-1">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-gray-600">
              <Check className="w-3 h-3 text-emerald-deep mt-0.5 flex-shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-auto">
          <Link href={`/packages/${pkg.slug}`} className="flex-1 text-center text-sm font-semibold text-white bg-ocean hover:bg-emerald-deep rounded-xl py-2.5 transition-colors inline-flex items-center justify-center gap-1">
            View Itinerary <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a href={`https://wa.me/94782440597?text=${whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="px-3 py-2.5 border border-gray-200 hover:border-gold rounded-xl text-xs text-gray-500 hover:text-gold transition-colors">
            WA
          </a>
        </div>
      </div>
    </div>
  )
}

export function PackagesClient({ packages }: { packages: TourPackage[] }) {
  const [cat, setCat] = useState('All')
  const [dur, setDur] = useState('All')

  const filtered = packages.filter((p) =>
    (cat === 'All' || p.category === cat) && matchDuration(p.duration, dur)
  )

  return (
    <section className="py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? 'bg-ocean text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-ocean'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:ml-6">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">Duration</div>
            <div className="flex flex-wrap gap-2">
              {durationFilters.map((d) => (
                <button key={d} onClick={() => setDur(d)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${dur === d ? 'bg-gold text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gold'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-6">{filtered.length} packages found</div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={cat + dur} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <StaggerItem key={pkg.slug}>
                  <PackageCard pkg={pkg} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="font-serif text-2xl mb-2">No packages match your filters</p>
                <button onClick={() => { setCat('All'); setDur('All') }} className="text-gold hover:underline text-sm">Clear filters</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
