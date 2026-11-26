import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <div className="pt-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl text-ocean mb-2">Terms & Conditions</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: November 2024</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-8">
          {[
            { title: '1. Agreement to Terms', body: 'By booking a tour with Sri Lanka Bespoke Tours & Travels (SLTDA Reg: TRP/0001/2024), you agree to be bound by these Terms & Conditions. Please read them carefully before confirming any booking.' },
            { title: '2. Booking & Confirmation', body: 'All bookings are subject to availability. A booking is confirmed only upon receipt of the required deposit and written confirmation from Sri Lanka Bespoke Tours & Travels. Verbal agreements are not binding.' },
            { title: '3. Payment Terms', body: 'A non-refundable deposit of 30% of the total tour cost is required at the time of booking confirmation. The balance of 70% is due 60 days prior to arrival. For bookings made within 60 days of travel, full payment is due at time of booking.' },
            { title: '4. Pricing', body: 'All prices are quoted in USD and are based on prevailing rates at the time of quotation. We reserve the right to adjust prices due to significant fluctuations in exchange rates, fuel surcharges, or government-imposed taxes, with 60 days notice.' },
            { title: '5. Itinerary Changes', body: 'We reserve the right to modify itineraries where circumstances necessitate (weather, road conditions, national park closures). We will always provide comparable alternatives of equal or greater value.' },
            { title: '6. Client Responsibilities', body: 'Clients are responsible for ensuring valid passports (minimum 6 months validity), obtaining Sri Lanka ETA (Electronic Travel Authorization), appropriate travel insurance, and any required vaccinations or health documentation.' },
            { title: '7. Limitation of Liability', body: 'Sri Lanka Bespoke Tours & Travels acts as an agent for hotels, transport providers, and activity operators. We accept no liability for accidents, illness, theft, force majeure events, or circumstances beyond our reasonable control. Travel insurance is strongly recommended.' },
            { title: '8. Governing Law', body: 'These terms shall be governed by the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.' },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="font-serif text-xl text-ocean mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
