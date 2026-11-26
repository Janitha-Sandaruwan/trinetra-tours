import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="pt-20 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-4xl text-ocean mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: November 2024</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 prose prose-gray max-w-none space-y-8">
          {[
            { title: '1. Introduction', body: 'Sri Lanka Bespoke Tours & Travels ("we", "us", "our") operates slbespoke.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.' },
            { title: '2. Data We Collect', body: 'We collect personal information you voluntarily provide when submitting tour inquiries, contact forms, or newsletter subscriptions — including name, email address, phone number, country of residence, and travel preferences. We also collect non-personal data via cookies and analytics tools.' },
            { title: '3. How We Use Your Data', body: 'We use your personal data to: respond to tour inquiries and prepare customized itineraries; send booking confirmations and travel documents; communicate important trip updates; send newsletters (only with your consent); improve our website and services; comply with legal obligations.' },
            { title: '4. Cookies', body: 'We use essential cookies to operate the website and optional analytics cookies (Google Analytics) to understand visitor behavior. You may disable non-essential cookies in your browser settings without affecting website functionality.' },
            { title: '5. Third-Party Disclosure', body: 'We do not sell, trade, or transfer your personal information to third parties except our trusted service partners (hotels, transport providers) who assist in delivering your booked services, and as required by Sri Lankan law.' },
            { title: '6. Data Security', body: 'We implement industry-standard SSL encryption, secure servers, and strict internal data access policies. While no method of transmission over the internet is 100% secure, we work diligently to protect your personal information.' },
            { title: '7. Your Rights', body: 'You have the right to request access to, correction of, or deletion of your personal data at any time by emailing info@slbespoke.com. We will respond within 30 days.' },
            { title: '8. Contact', body: 'For privacy-related inquiries: info@slbespoke.com | +94 11 234 5678 | 12 Galle Road, Colombo 03, Sri Lanka' },
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
