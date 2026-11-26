import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Users, Luggage, Zap, ArrowRight } from 'lucide-react'
import { fleet } from '@/data/mockData'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

export const metadata: Metadata = {
  title: 'Vehicle Fleet',
  description: 'Luxury A/C vehicles for Sri Lanka tours — Sedans, SUVs, KDH Tourist Vans, and Mini Coaches. SLTDA certified chauffeur guides.',
}

export default function FleetPage() {
  return (
    <div className="pt-20">
      <div className="bg-ocean text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Travel in Style</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Our Vehicle Fleet</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            All vehicles are air-conditioned, well-maintained, and driven by SLTDA certified English-speaking chauffeur guides.
          </p>
        </div>
      </div>

      <section className="py-16 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-6">
            {fleet.map((v) => (
              <StaggerItem key={v.id}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    {/* Visual area */}
                    <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-ocean to-emerald-deep flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-white/20 font-serif text-6xl">{v.type[0]}</div>
                        <div className="text-white font-semibold text-sm mt-2">{v.type}</div>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-6 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="text-xs font-semibold bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full">{v.type}</span>
                          <h2 className="font-serif text-2xl text-ocean mt-2">{v.name}</h2>
                        </div>
                        <div className="flex gap-3">
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-sm font-semibold text-ocean">
                              <Users className="w-4 h-4 text-gold" />{v.passengers}
                            </div>
                            <div className="text-xs text-gray-400">Passengers</div>
                          </div>
                          {v.ac && (
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-sm font-semibold text-ocean">
                                <Zap className="w-4 h-4 text-gold" />A/C
                              </div>
                              <div className="text-xs text-gray-400">Included</div>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-sm font-semibold text-ocean">
                              <Luggage className="w-4 h-4 text-gold" />
                            </div>
                            <div className="text-xs text-gray-400 max-w-20">{v.luggage}</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {v.features.map((f) => (
                          <div key={f} className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Check className="w-3.5 h-3.5 text-emerald-deep flex-shrink-0" />{f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Driver Standards */}
      <section className="py-16 bg-emerald-deep text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl md:text-4xl mb-3">SLTDA Certified Chauffeur Guides</h2>
              <p className="text-white/70">Every driver is rigorously vetted and certified by Sri Lanka Tourism Development Authority.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Full SLTDA chauffeur guide certification',
                'Minimum 5 years tourism experience',
                'English fluency tested and verified',
                'First aid trained',
                'Comprehensive knowledge of Sri Lankan history & culture',
                'GPS-tracked vehicles for your safety',
                'Background verified and police cleared',
                'Uniformed and professional at all times',
              ].map((s) => (
                <div key={s} className="flex items-center gap-2.5 text-sm text-white/80">
                  <Check className="w-4 h-4 text-gold flex-shrink-0" />{s}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-14 bg-ivory text-center">
        <FadeIn>
          <div className="max-w-xl mx-auto px-4">
            <h2 className="font-serif text-3xl text-ocean mb-3">Need help choosing?</h2>
            <p className="text-gray-500 mb-6">Tell us your group size and we&apos;ll recommend the perfect vehicle for your journey.</p>
            <Link href="/tailor-made" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5">
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
