import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Shield, Star, Award } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Sri Lanka Bespoke Tours — SLTDA registered luxury inbound travel agency. 15+ years crafting unforgettable Sri Lanka journeys.',
}

const values = [
  { icon: Heart, title: 'Passion First', desc: 'We are Sri Lankans sharing our paradise with the world. Every itinerary is crafted with genuine love for our island.' },
  { icon: Shield, title: 'Integrity Always', desc: 'Transparent pricing, honest advice, and no hidden surprises. What we quote is what you pay.' },
  { icon: Star, title: 'Excellence in Service', desc: 'From the first WhatsApp message to your final airport drop-off — every touchpoint is handled with care.' },
  { icon: Award, title: 'Expert Knowledge', desc: '15+ years of on-the-ground Sri Lanka expertise. We know every hidden waterfall, every luxury villa, every leopard trail.' },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-ocean text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Our Story</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">About Sri Lanka Bespoke</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Born from a passion for sharing Sri Lanka&apos;s extraordinary beauty — 5 years of creating journeys that change lives.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Our Story</div>
                <h2 className="font-serif text-3xl md:text-4xl text-ocean mb-5">From Passion to Purpose</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>Founded in 2027 by Janitha Sandaruwan, Sri Lanka Trinrtra Tours & Travels was born from a simple but powerful belief: every traveler deserves a journey as unique as they are.</p>
                  <p>What began as a small family operation guiding honeymooners through the Cultural Triangle has grown into one of Sri Lanka&apos;s most trusted inbound travel specialists — but we&apos;ve never lost that personal touch.</p>
                  <p>Today, our team of 25 passionate travel professionals and 40+ SLTDA certified chauffeur guides serves hundreds of discerning travelers from across the world every year. Each journey is planned from scratch, tailored to your exact interests, pace, and budget.</p>
                  <p>We are not a booking engine. We are storytellers, local experts, and your friends in Sri Lanka — available on WhatsApp at any hour, ready to make your journey perfect.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-10 lg:mt-0 grid grid-cols-2 gap-4">
                {[
                  { value: '500+', label: 'Happy Travelers', sub: 'Served since 2009' },
                  { value: '100%', label: 'Tailor-Made', sub: 'No cookie-cutter tours' },
                  { value: '15+', label: 'Years Experience', sub: 'Deep local expertise' },
                  { value: '4.9★', label: 'Average Rating', sub: 'On TripAdvisor & Google' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                    <div className="font-serif text-3xl text-ocean font-bold mb-1">{stat.value}</div>
                    <div className="font-semibold text-sm text-gray-700">{stat.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-ocean mb-3">Our Values</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <StaggerItem key={v.title}>
                  <div className="p-6 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all h-full">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-serif text-lg text-ocean mb-2">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* SLTDA */}
      <section className="py-16 bg-emerald-deep text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl mb-3">SLTDA Registration & Credentials</h2>
              <p className="text-white/70">We operate under full licensing from Sri Lanka Tourism Development Authority.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'SLTDA Registration', value: 'TRP/0001/2024', desc: 'Licensed Inbound Tour Operator' },
                { label: 'THASL Member', value: '#TH-2456', desc: 'Tourist Hotels & Agents Association of Sri Lanka' },
                { label: 'IATA Affiliated', value: 'IATA-99-3-7893-5', desc: 'International Air Transport Association' },
              ].map((cred) => (
                <div key={cred.label} className="border border-white/20 rounded-2xl p-5 text-center">
                  <div className="text-gold font-semibold text-sm uppercase tracking-wide mb-1">{cred.label}</div>
                  <div className="font-serif text-xl text-white mb-1">{cred.value}</div>
                  <div className="text-white/55 text-xs">{cred.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 bg-ivory text-center">
        <FadeIn>
          <div className="max-w-xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-ocean mb-3">Ready to Plan Your Journey?</h2>
            <p className="text-gray-500 mb-6">Get a free personalized Sri Lanka itinerary within 24 hours.</p>
            <Link href="/tailor-made" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5">
              Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
