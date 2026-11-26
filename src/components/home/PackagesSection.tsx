'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, DollarSign, MapPin, Check, ArrowRight } from 'lucide-react'
import { tourPackages, type TourPackage } from '@/data/mockData'
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/animations'

const categories = ['All', 'Cultural', 'Wildlife', 'Honeymoon', 'Beach & Wellness'] as const

const categoryColors: Record<string, string> = {
  Cultural: 'bg-emerald-deep/80',
  Wildlife: 'bg-amber-800/80',
  Honeymoon: 'bg-rose-800/80',
  'Beach & Wellness': 'bg-blue-800/80',
}

const categoryBadgeColors: Record<string, string> = {
  Cultural: 'bg-emerald-deep/20 text-emerald-400 border border-emerald-500/20',
  Wildlife: 'bg-amber-900/20 text-amber-400 border border-amber-500/20',
  Honeymoon: 'bg-rose-900/20 text-rose-400 border border-rose-500/20',
  'Beach & Wellness': 'bg-blue-900/20 text-blue-400 border border-blue-500/20',
}

function PackageCard({ pkg }: { pkg: TourPackage }) {
  const whatsapp = encodeURIComponent(`Hello! I'm interested in the "${pkg.title}" package. Could you share more details?`)
  return (
    <motion.div
      layout
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Image area */}
      <div className={`relative h-52 overflow-hidden ${categoryColors[pkg.category] ?? 'bg-ocean/80'} flex items-end`}
        style={{ background: `linear-gradient(160deg, #3a5a40, #263831)` }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${pkg.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative p-4 w-full">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryBadgeColors[pkg.category] ?? 'bg-white/20 text-white'}`}>
            {pkg.category}
          </span>
        </div>
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-ocean mb-2 group-hover:text-emerald-deep transition-colors leading-snug">
          {pkg.title}
        </h3>

        {/* Route */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 flex-wrap">
          <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
          {pkg.route.slice(0, 4).map((r, i) => (
            <span key={r}>
              {r}{i < Math.min(pkg.route.length, 4) - 1 ? ' →' : ''}
            </span>
          ))}
          {pkg.route.length > 4 && <span>+{pkg.route.length - 4} more</span>}
        </div>

        {/* Duration + Price */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>{pkg.duration} Days</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-ocean">
            <DollarSign className="w-3.5 h-3.5 text-gold" />
            <span>From ${pkg.startingPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-1 mb-5 flex-1">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-gray-600">
              <Check className="w-3 h-3 text-emerald-deep mt-0.5 flex-shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/packages/${pkg.slug}`}
            className="flex-1 text-center text-sm font-semibold text-white bg-ocean hover:bg-emerald-deep rounded-xl py-2.5 transition-colors"
          >
            View Itinerary
          </Link>
          <a
            href={`https://wa.me/94782440597?text=${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 border border-gray-200 hover:border-gold rounded-xl text-xs text-gray-500 hover:text-gold transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All'
    ? tourPackages
    : tourPackages.filter((p) => p.category === activeCategory)

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Our Journeys</div>
            <h2 className="font-serif text-4xl md:text-5xl text-ocean mb-4">
              Handcrafted Tour Packages
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every itinerary is fully customizable — these are starting points, not limitations. Tell us your dream and we&apos;ll craft the perfect journey.
            </p>
          </div>
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === cat ? 'text-white' : 'text-gray-600 hover:text-ocean'
                  }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-ocean rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <StaggerItem key={pkg.slug}>
                  <PackageCard pkg={pkg} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <FadeIn delay={0.2}>
          <div className="text-center mt-12">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-ocean hover:text-emerald-deep font-semibold transition-colors group"
            >
              View All Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
