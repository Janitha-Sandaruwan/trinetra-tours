'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Packages', href: '/packages' },
  { label: 'Tailor-Made', href: '/tailor-made' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-ocean/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo + Brand name ── */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="Trinetra Solutions Tours Logo"
                className="h-10 w-10 object-contain rounded-lg"
              />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-white font-semibold text-sm tracking-wide">
                  Trinetra Solutions
                </span>
                <span className="text-gold text-[10px] tracking-widest uppercase">
                  Tours &amp; Travels
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group ${pathname === link.href ? 'text-gold' : 'text-white/80 hover:text-white'
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full transition-transform origin-left duration-300 ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+94782440597"
                className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+94 782440597  </span>
              </a>
              <Link
                href="/tailor-made"
                className="hidden sm:inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                Plan My Trip
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative flex flex-col items-center justify-center h-full gap-6 pt-20">
              {/* Mobile logo */}
              <img src="/logo.jpg" alt="Trinetra Solutions Tours" className="h-16 w-16 object-contain rounded-xl mb-2" />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-3xl font-serif font-medium transition-colors ${pathname === link.href ? 'text-gold' : 'text-white hover:text-gold'
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-4"
              >
                <Link
                  href="/tailor-made"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white text-lg font-semibold px-8 py-3 rounded-full transition-all duration-200"
                >
                  Plan My Trip
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
