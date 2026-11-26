import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'

export const metadata: Metadata = {
  title: {
    default: 'Trinetra Solutions Tours & Travels | Luxury Tailor-Made Sri Lanka Holidays',
    template: '%s | Trinetra Solutions Tours & Travels',
  },
  description:
    'Award-winning luxury inbound travel agency in Sri Lanka. SLTDA registered. 100% tailor-made itineraries — Cultural tours, Wildlife safaris, Honeymoon packages, Beach & Wellness retreats. 24/7 chauffeur-guided service.',
  keywords: [
    'Sri Lanka tour packages',
    'luxury Sri Lanka holidays',
    'tailor-made Sri Lanka tours',
    'SLTDA registered travel agency',
    'Trinetra Solutions Tours',
    'Sigiriya tours',
    'Yala safari',
    'Ceylon honeymoon',
    'Sri Lanka chauffeur guide',
  ],
  authors: [{ name: 'Trinetra Solutions Tours & Travels' }],
  creator: 'Trinetra Solutions Tours & Travels',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.trinetrасolutions.com',
    siteName: 'Trinetra Solutions Tours & Travels',
    title: 'Trinetra Solutions Tours & Travels | Luxury Tailor-Made Sri Lanka Holidays',
    description:
      'Experience the untamed soul of Sri Lanka with Trinetra Solutions. SLTDA registered. Luxury 5-star chauffeur-guided itineraries.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trinetra Solutions Tours & Travels',
    description: 'Luxury tailor-made Sri Lanka holiday packages. SLTDA registered.',
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
    shortcut: '/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
