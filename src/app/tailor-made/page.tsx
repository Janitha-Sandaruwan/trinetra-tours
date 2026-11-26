import type { Metadata } from 'next'
import { TailorMadeWizard } from '@/components/tailor-made/TailorMadeWizard'

export const metadata: Metadata = {
  title: 'Tailor-Made Tours',
  description: 'Build your perfect Sri Lanka holiday with our interactive multi-step tour planner. Free quote, no obligation.',
}

export default function TailorMadePage() {
  return (
    <div className="pt-20 min-h-screen bg-ivory">
      <div className="bg-ocean text-white py-16 px-4 text-center">
        <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Your Journey, Your Way</div>
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Build Your Bespoke Tour</h1>
        <p className="text-white/65 text-lg max-w-2xl mx-auto">
          Tell us your dream — we&apos;ll craft the perfect itinerary. 100% free, no obligation, response within 2 hours.
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <TailorMadeWizard />
      </div>
    </div>
  )
}
