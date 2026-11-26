'use client'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function MapSplashSection() {
  const scrollToHero = () => {
    const hero = document.getElementById('hero-section')
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0d1f1a' }}
    >
      {/* Full-screen Sri Lanka map image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-srilanka.jpg')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      />

      {/* Subtle dark vignette only on edges — so map stays visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(13,31,26,0.75) 100%)',
        }}
      />

      {/* Brand text overlay */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpg"
              alt="Trinetra Solutions"
              className="w-24 h-24 object-contain rounded-full border-2 border-white/30 shadow-2xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#a3b18a] mb-3"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 drop-shadow-2xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Trinetra Solutions
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#a3b18a] mb-6 drop-shadow-xl italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Tours &amp; Travels
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-base md:text-lg text-white/80 max-w-md mx-auto mb-10"
          >
            Luxury Tailor-Made Journeys Through the Pearl of the Indian Ocean
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            onClick={scrollToHero}
            className="inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-sm uppercase tracking-widest font-medium">Explore Sri Lanka</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
