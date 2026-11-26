import type { Metadata } from 'next'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sri Lanka Bespoke Tours. Phone, email, WhatsApp — we respond within 2 hours.',
}

const contacts = [
  { icon: Phone, label: 'Call Us', value: '+94 11 234 5678', sub: 'Mon–Sun 8am–8pm IST', href: 'tel:+94112345678', color: 'bg-blue-50 text-blue-600' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+94 77 123 4567', sub: 'Fastest response • 24/7', href: 'https://wa.me/94771234567', color: 'bg-green-50 text-green-600' },
  { icon: Mail, label: 'Email Us', value: 'info@slbespoke.com', sub: 'Response within 2 hours', href: 'mailto:info@slbespoke.com', color: 'bg-gold/10 text-gold' },
]

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="bg-ocean text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Get In Touch</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Contact Us</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Our travel consultants are ready to help. Expect a reply within 2 hours during business hours.
          </p>
        </div>
      </div>

      {/* Contact cards */}
      <section className="py-12 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {contacts.map((c) => {
              const Icon = c.icon
              return (
                <FadeIn key={c.label}>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
                    <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-1">{c.label}</div>
                    <div className="font-serif text-lg text-ocean">{c.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{c.sub}</div>
                  </a>
                </FadeIn>
              )
            })}
          </div>

          {/* Form + Map */}
          <div className="lg:grid lg:grid-cols-5 lg:gap-10">
            <FadeIn className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-8 lg:mb-0">
                <h2 className="font-serif text-2xl text-ocean mb-5">Send a Message</h2>
                <ContactForm />
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="bg-ocean rounded-2xl p-7 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white mb-4">Our Office</h3>
                  <div className="flex items-start gap-3 text-white/70 mb-5">
                    <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-medium">Sri Lanka Bespoke Tours & Travels</div>
                      <div className="text-sm mt-1">12 Galle Road, Colombo 03<br />Sri Lanka</div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl h-40 flex items-center justify-center">
                    <div className="text-center text-white/40">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Colombo 03, Sri Lanka</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-white/60 text-sm">Business Hours</p>
                  <p className="text-white text-sm mt-1">Monday – Sunday<br />8:00 AM – 8:00 PM (IST)</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
