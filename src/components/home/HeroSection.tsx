'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Star, Shield, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

const destinations = ['Sigiriya', 'Kandy', 'Ella', 'Yala', 'Galle', 'Mirissa', 'Nuwara Eliya']
const durations = ['5-7 Days', '8-10 Days', '11-14 Days', '15+ Days']
const travelStyles = ['Cultural', 'Wildlife Safari', 'Honeymoon', 'Beach & Wellness', 'Adventure']

const heroSlides = [
  {
    type: 'video' as const,
    url: '/video/sri-lanka-documentary.mp4',
    location: 'The Real Sri Lanka',
    region: 'Documentary',
  },
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1546708770-599a3abdf230?w=1920&q=85&auto=format&fit=crop',
    location: 'Sigiriya Rock Fortress',
    region: 'Cultural Triangle',
  },
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1920&q=85&auto=format&fit=crop',
    location: 'Nine Arch Bridge, Ella',
    region: 'Hill Country',
  },
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1580181440747-05c8e94a7b3f?w=1920&q=85&auto=format&fit=crop',
    location: 'Mirissa Beach',
    region: 'Southern Coast',
  },
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=1920&q=85&auto=format&fit=crop',
    location: 'Leopard at Yala',
    region: 'Wildlife Safari',
  },
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=1920&q=85&auto=format&fit=crop',
    location: 'Temple of the Tooth, Kandy',
    region: 'Cultural Heritage',
  },
]

export function HeroSection() {
  const [dest, setDest] = useState('')
  const [dur, setDur] = useState('')
  const [style, setStyle] = useState('')
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  // Auto-advance — longer pause on video slide (index 0)
  useEffect(() => {
    const delay = current === 0 ? 10000 : 5000
    const timer = setTimeout(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, delay)
    return () => clearTimeout(timer)
  }, [current])

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)
  }
  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % heroSlides.length)
  }

  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Fullscreen image gallery background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {heroSlides[current].type === 'video' ? (
              <video
                key={heroSlides[current].url}
                src={heroSlides[current].url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <img
                src={heroSlides[current].url}
                alt={heroSlides[current].location}
                className="w-full h-full object-cover object-center"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay — keeps text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(38,56,49,0.52) 0%, rgba(38,56,49,0.28) 40%, rgba(38,56,49,0.82) 100%)',
          }}
        />
        {/* Bottom vignette for Quick Finder legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          style={{ background: 'linear-gradient(to top, rgba(38,56,49,0.96), transparent)' }}
        />
      </div>

      {/* Slide location label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + '-label'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-28 left-6 md:left-12 z-20 text-left"
        >
          <p className="text-gold text-xs uppercase tracking-widest font-medium mb-0.5">
            {heroSlides[current].region}
          </p>
          <p className="text-white/70 text-sm font-light">
            {heroSlides[current].location}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-28 right-6 md:right-12 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'bg-gold w-8' : 'bg-white/40 w-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-gold/90 text-xs tracking-widest uppercase font-medium">
              SLTDA Registered · Award-Winning Agency
            </span>
            <Star className="w-3 h-3 text-gold fill-gold" />
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
          >
            Experience the{' '}
            <span className="text-gradient-gold italic">Untamed Soul</span>
            <br />
            of Sri Lanka
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Luxury tailor-made journeys crafted for discerning travelers. From ancient rock fortresses to wild leopard safaris — your perfect Sri Lanka awaits.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/packages"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-white font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              Explore Packages
            </Link>
            <Link
              href="/tailor-made"
              className="px-8 py-4 border border-white/30 hover:border-white/60 text-white font-semibold rounded-full transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
            >
              Plan My Trip →
            </Link>
          </motion.div>

          {/* Quick Trip Finder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-4 md:p-6">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Quick Tour Finder</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <select
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:border-gold/50 cursor-pointer"
                  >
                    <option value="" className="bg-ocean text-white">Destination</option>
                    {destinations.map((d) => <option key={d} value={d} className="bg-ocean">{d}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={dur}
                    onChange={(e) => setDur(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:border-gold/50 cursor-pointer"
                  >
                    <option value="" className="bg-ocean">Duration</option>
                    {durations.map((d) => <option key={d} value={d} className="bg-ocean">{d}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:border-gold/50 cursor-pointer"
                  >
                    <option value="" className="bg-ocean">Travel Style</option>
                    {travelStyles.map((s) => <option key={s} value={s} className="bg-ocean">{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                <Link
                  href="/packages"
                  className="bg-gold hover:bg-gold-light text-white font-semibold rounded-xl px-6 py-3 text-sm transition-colors text-center"
                >
                  Find Tours →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {[
            { icon: Shield, text: 'SLTDA Registered' },
            { icon: Star, text: '500+ 5-Star Reviews' },
            { icon: Clock, text: '24/7 Chauffeur Support' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
              <Icon className="w-4 h-4 text-gold" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
