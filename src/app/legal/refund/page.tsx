import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cancellation & Refund Policy' }

export default function RefundPage() {
  return (
    <div className="pt-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl text-ocean mb-2">Cancellation & Refund Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: November 2024</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-8">
          <section>
            <h2 className="font-serif text-xl text-ocean mb-3">Cancellation by Client</h2>
            <p className="text-gray-600 text-sm mb-4">All cancellations must be made in writing to info@slbespoke.com. The following refund schedule applies based on days prior to arrival date:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-ocean text-white">
                    <th className="p-3 text-left rounded-tl-lg">Days Before Arrival</th>
                    <th className="p-3 text-left rounded-tr-lg">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['90+ days', '90% refund of total tour cost'],
                    ['60–89 days', '70% refund of total tour cost'],
                    ['30–59 days', '50% refund of total tour cost'],
                    ['15–29 days', '25% refund of total tour cost'],
                    ['Less than 15 days', 'No refund (0%)'],
                  ].map(([days, refund], i) => (
                    <tr key={days} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 text-gray-700 font-medium border-b border-gray-100">{days}</td>
                      <td className="p-3 text-gray-600 border-b border-gray-100">{refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">* The initial 30% deposit is always non-refundable regardless of cancellation timing.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-ocean mb-2">Force Majeure</h2>
            <p className="text-gray-600 text-sm leading-relaxed">In cases of force majeure (natural disasters, war, pandemics, government travel bans), we will offer a full travel credit valid for 24 months, or a refund minus non-recoverable costs (pre-paid hotel deposits, booked activities). We handle each case individually with compassion.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-ocean mb-2">Cancellation by Sri Lanka Bespoke</h2>
            <p className="text-gray-600 text-sm leading-relaxed">In the rare event we must cancel your tour due to circumstances within our control, we will offer a full refund or reschedule at no extra cost. We have never cancelled a confirmed tour in 15 years of operation.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-ocean mb-2">Travel Insurance</h2>
            <p className="text-gray-600 text-sm leading-relaxed">We strongly recommend all clients purchase comprehensive travel insurance that covers trip cancellation, medical emergencies, and evacuation. This protects you in scenarios where our refund policy cannot fully recover your costs.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-ocean mb-2">Refund Processing</h2>
            <p className="text-gray-600 text-sm leading-relaxed">Approved refunds are processed within 14 business days via the original payment method. Bank transfer refunds may take an additional 5–7 business days depending on your bank. We bear any transfer fees on our end.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-ocean mb-2">Contact for Cancellations</h2>
            <p className="text-gray-600 text-sm">Email: info@slbespoke.com | WhatsApp: +94 77 123 4567 | All cancellations must be in writing and acknowledged by our team to be valid.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
