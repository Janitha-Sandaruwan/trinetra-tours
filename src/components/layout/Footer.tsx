'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = 2026

  return (
    <footer className="bg-obsidian text-white">
      {/* Newsletter Band */}
      <div className="bg-emerald-deep/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-1">Get Sri Lanka Inspiration</h3>
              <p className="text-white/60 text-sm">Travel tips, hidden gems, and exclusive early-bird offers.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold/60 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold hover:bg-gold-light text-white font-semibold text-sm rounded-full transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Trinetra Solutions Tours" className="h-11 w-11 object-contain rounded-lg" />
              <div>
                <div className="font-serif text-white font-semibold">Trinetra Solutions</div>
                <div className="text-gold text-[10px] tracking-widest uppercase">Tours &amp; Travels</div>
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              Sri Lanka&apos;s premier inbound travel specialist. SLTDA registered, 100% tailor-made, and built on 15+ years of delivering unforgettable journeys.
            </p>
            <div className="inline-flex items-center gap-2 border border-gold/30 rounded-lg px-3 py-2 mb-5">
              <div className="w-6 h-6 rounded bg-gold/20 flex items-center justify-center">
                <span className="text-gold text-[8px] font-bold">SL</span>
              </div>
              <div>
                <div className="text-white text-[10px] font-semibold">SLTDA Registered</div>
                <div className="text-white/40 text-[9px]">Reg. No: TRP/0001/2024</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors" aria-label="YouTube">
                <svg className="w-3.5 h-3.5 text-white/70 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Tour Packages', href: '/packages' },
                { label: 'Tailor-Made Tours', href: '/tailor-made' },
                { label: 'Vehicle Fleet', href: '/fleet' },
                { label: 'About Us', href: '/about' },
                { label: 'Travel Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2.5">
              {['Sigiriya', 'Kandy', 'Ella', 'Yala', 'Galle', 'Mirissa', 'Nuwara Eliya'].map((dest) => (
                <li key={dest}>
                  <Link href="/destinations" className="text-white/55 hover:text-gold text-sm transition-colors">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+94112345678" className="text-white/70 hover:text-white text-sm transition-colors block">+94 11 234 5678</a>
                  <a href="tel:+94771234567" className="text-white/70 hover:text-white text-sm transition-colors block">+94 77 123 4567</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a href="mailto:info@slbespoke.com" className="text-white/70 hover:text-white text-sm transition-colors">info@slbespoke.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/55 text-sm">12 Galle Road, Colombo 03,<br />Sri Lanka</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="text-white/40 text-[11px] uppercase tracking-widest mb-2">Legal</h5>
              <ul className="space-y-1.5">
                {[
                  { label: 'Privacy Policy', href: '/legal/privacy' },
                  { label: 'Terms & Conditions', href: '/legal/terms' },
                  { label: 'Refund Policy', href: '/legal/refund' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/40 hover:text-white/70 text-xs transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs text-center md:text-left">
              © {currentYear} Sri Lanka Bespoke Tours & Travels. All rights reserved. SLTDA Registered.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs">Payments:</span>
              {['Visa', 'Mastercard', 'PayHere'].map((p) => (
                <span key={p} className="text-[11px] border border-white/20 rounded px-2 py-0.5 text-white/50">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
