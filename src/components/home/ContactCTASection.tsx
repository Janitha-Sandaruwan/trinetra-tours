import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations'

export function ContactCTASection() {
  const whatsapp = encodeURIComponent("Hello! I'd like to plan a Sri Lanka trip. Can you help me get started?")
  return (
    <section className="py-24 bg-emerald-deep relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #588157, transparent 60%), radial-gradient(ellipse at 80% 50%, #3a5a40, transparent 60%)' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="text-gold-light text-sm tracking-widest uppercase mb-4 font-medium">Start Your Journey</div>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-5 leading-tight">
            Ready to Experience<br />
            <span className="italic text-gold-light">Sri Lanka?</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Get a free, personalized itinerary within 24 hours. No obligation, no cookie-cutter packages — just your perfect journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tailor-made"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              Start Planning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/94782440597?text=${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:bg-white/10"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
