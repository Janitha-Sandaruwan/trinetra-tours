'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Clock, DollarSign, Check, X, ChevronDown,
  Hotel, Utensils, MessageCircle, ArrowRight, Users, Shield
} from 'lucide-react'
import { type TourPackage } from '@/data/mockData'
import { FadeIn } from '@/components/animations'

function ItineraryAccordion({ itinerary }: { itinerary: TourPackage['itinerary'] }) {
  const [openDay, setOpenDay] = useState(1)
  return (
    <div className="space-y-3">
      {itinerary.map((item) => (
        <div key={item.day} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenDay(openDay === item.day ? 0 : item.day)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-ocean text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {item.day}
              </span>
              <span className="font-semibold text-ocean text-sm md:text-base">{item.title}</span>
            </div>
            <motion.div animate={{ rotate: openDay === item.day ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openDay === item.day && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    {item.accommodation && (
                      <div className="flex items-center gap-1.5">
                        <Hotel className="w-3.5 h-3.5 text-gold" />
                        <span>{item.accommodation}</span>
                      </div>
                    )}
                    {item.meals.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-gold" />
                        <span>{item.meals.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function FAQAccordion({ faqs }: { faqs: TourPackage['faqs'] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-ocean text-sm pr-4">{faq.q}</span>
            <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export function PackageDetail({ pkg }: { pkg: TourPackage }) {
  const whatsapp = encodeURIComponent(`Hello! I'm interested in the "${pkg.title}" (${pkg.duration} days). Could you please send me more details and pricing?`)
  return (
    <div className="pt-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-deep to-ocean text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <Link href="/packages" className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
              ← All Packages
            </Link>
          </div>
          <span className="inline-block text-xs font-semibold bg-gold text-white px-3 py-1 rounded-full mb-4">{pkg.category}</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">{pkg.title}</h1>
          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>{pkg.duration} Days</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gold" />
              <span>From ${pkg.startingPrice.toLocaleString()} per person</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{pkg.route.join(' → ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold" />
              <span>2–15 Passengers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <FadeIn>
              <div>
                <h2 className="font-serif text-2xl text-ocean mb-3">About This Tour</h2>
                <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
              </div>
            </FadeIn>

            {/* Highlights */}
            <FadeIn delay={0.1}>
              <div>
                <h2 className="font-serif text-2xl text-ocean mb-4">Tour Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 p-3 bg-emerald-50 rounded-xl">
                      <Check className="w-4 h-4 text-emerald-deep mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Itinerary */}
            <FadeIn delay={0.15}>
              <div>
                <h2 className="font-serif text-2xl text-ocean mb-4">Day-by-Day Itinerary</h2>
                <ItineraryAccordion itinerary={pkg.itinerary} />
              </div>
            </FadeIn>

            {/* Inclusions / Exclusions */}
            <FadeIn delay={0.2}>
              <div>
                <h2 className="font-serif text-2xl text-ocean mb-4">Inclusions & Exclusions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-emerald-deep mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4" /> What&apos;s Included
                    </h3>
                    <ul className="space-y-2">
                      {pkg.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-3.5 h-3.5 text-emerald-deep mt-0.5 flex-shrink-0" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <X className="w-4 h-4" /> Not Included
                    </h3>
                    <ul className="space-y-2">
                      {pkg.exclusions.map((exc) => (
                        <li key={exc} className="flex items-start gap-2 text-sm text-gray-700">
                          <X className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                          {exc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* FAQ */}
            <FadeIn delay={0.25}>
              <div>
                <h2 className="font-serif text-2xl text-ocean mb-4">Frequently Asked Questions</h2>
                <FAQAccordion faqs={pkg.faqs} />
              </div>
            </FadeIn>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="mt-10 lg:mt-0">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Starting from</div>
                  <div className="font-serif text-3xl text-ocean font-bold">
                    ${pkg.startingPrice.toLocaleString()}
                    <span className="text-sm font-sans font-normal text-gray-400 ml-1">/ person</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{pkg.duration} days · All-inclusive as listed</div>
                </div>

                <div className="space-y-2.5 mb-5 text-sm text-gray-600">
                  {pkg.inclusions.slice(0, 4).map((inc) => (
                    <div key={inc} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-deep mt-0.5 flex-shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/tailor-made"
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold py-3.5 rounded-xl transition-colors mb-3"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/94782440597?text=${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-green-500 text-gray-700 hover:text-green-700 font-medium py-3.5 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Inquiry
                </a>
              </div>

              {/* Trust badges */}
              <div className="bg-emerald-50 rounded-2xl p-4 space-y-3">
                {[
                  { icon: Shield, text: 'SLTDA Registered Agency' },
                  { icon: Check, text: 'Free personalized quote' },
                  { icon: Clock, text: 'Response within 2 hours' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-emerald-dark">
                    <div className="w-7 h-7 rounded-full bg-emerald-deep/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-emerald-deep" />
                    </div>
                    <span className="text-emerald-900 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
