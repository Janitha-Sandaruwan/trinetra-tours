import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { PackagesSection } from '@/components/home/PackagesSection'
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection'
import { DestinationsSection } from '@/components/home/DestinationsSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { ContactCTASection } from '@/components/home/ContactCTASection'

export const metadata: Metadata = {
  title: 'Trinetra Solutions Tours & Travels | Luxury Tailor-Made Sri Lanka Holidays',
  description:
    'Award-winning luxury inbound travel agency in Sri Lanka. SLTDA registered. 100% tailor-made itineraries — Cultural tours, Wildlife safaris, Honeymoon packages & Beach retreats.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PackagesSection />
      <WhyChooseUsSection />
      <DestinationsSection />
      <ReviewsSection />
      <ContactCTASection />
    </>
  )
}
