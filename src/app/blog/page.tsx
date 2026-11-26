import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Sri Lanka travel tips, visa guides, packing lists, and destination inspiration from our expert team.',
}

const blogPosts = [
  {
    slug: 'sri-lanka-visa-eta-guide-2025',
    title: 'Sri Lanka Visa & ETA: Complete 2025 Guide for All Nationalities',
    excerpt: 'Everything you need to know about getting your Sri Lanka Electronic Travel Authorization (ETA) online in under 10 minutes. Costs, eligibility, and common pitfalls.',
    category: 'Travel Tips',
    readTime: '5 min',
    date: 'November 2024',
  },
  {
    slug: 'best-time-to-visit-sri-lanka',
    title: 'Best Time to Visit Sri Lanka: Month-by-Month Weather Guide',
    excerpt: 'Sri Lanka has two monsoon seasons that affect different parts of the island. Here\'s exactly when to go for beaches, safaris, hill country, and cultural sites.',
    category: 'Planning',
    readTime: '7 min',
    date: 'October 2024',
  },
  {
    slug: 'scenic-train-kandy-to-ella',
    title: 'Kandy to Ella Scenic Train: Everything You Must Know Before You Go',
    excerpt: 'Which class to book, the best seats, departure times, what to expect — the ultimate guide to Sri Lanka\'s most iconic rail journey through misty tea country.',
    category: 'Experiences',
    readTime: '6 min',
    date: 'September 2024',
  },
  {
    slug: 'yala-leopard-safari-guide',
    title: 'Yala National Park Leopard Safari: What to Expect & How to Maximize Sightings',
    excerpt: 'Yala has the highest wild leopard density on earth. Here\'s how to pick the right block, the best time of day, and what your naturalist guide won\'t tell you.',
    category: 'Wildlife',
    readTime: '8 min',
    date: 'August 2024',
  },
  {
    slug: 'sri-lanka-currency-tips',
    title: 'Sri Lanka Money Guide: Currency, ATMs, Tipping & Exchange Rates',
    excerpt: 'Should you exchange money before arriving? Which ATMs work? How much to tip your driver? All the financial basics for a stress-free Sri Lanka trip.',
    category: 'Travel Tips',
    readTime: '4 min',
    date: 'July 2024',
  },
  {
    slug: 'sri-lanka-packing-guide',
    title: 'What to Pack for Sri Lanka: The Ultimate Packing List (All Seasons)',
    excerpt: 'From silk sarees for temple visits to safari gear for Yala and waterproofs for the hill country — a practical packing guide from locals who know the island inside-out.',
    category: 'Planning',
    readTime: '6 min',
    date: 'June 2024',
  },
]

const categoryColors: Record<string, string> = {
  'Travel Tips': 'bg-blue-50 text-blue-700',
  'Planning': 'bg-purple-50 text-purple-700',
  'Experiences': 'bg-emerald-50 text-emerald-700',
  'Wildlife': 'bg-amber-50 text-amber-700',
}

export default function BlogPage() {
  return (
    <div className="pt-20">
      <div className="bg-ocean text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Expert Insights</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Sri Lanka Travel Guide</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Practical advice, hidden gems, and insider knowledge from our team of Sri Lanka travel experts.
          </p>
        </div>
      </div>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <StaggerItem key={post.slug}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full group">
                  {/* Visual */}
                  <div className="h-44 bg-gradient-to-br from-ocean to-emerald-deep flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20"
                      style={{ background: `hsl(${i * 40}, 50%, 20%)` }} />
                    <span className="font-serif text-white/40 text-6xl font-bold">{i + 1}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />{post.readTime} read
                      </div>
                    </div>
                    <h2 className="font-serif text-lg text-ocean mb-2 group-hover:text-emerald-deep transition-colors leading-snug flex-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <Link href={`/blog/${post.slug}`} className="text-gold hover:text-gold-light text-sm font-medium flex items-center gap-1 transition-colors">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-14 bg-emerald-deep text-white text-center">
        <FadeIn>
          <div className="max-w-xl mx-auto px-4">
            <h2 className="font-serif text-3xl mb-3">Ready to Plan Your Trip?</h2>
            <p className="text-white/70 mb-6">Put all this knowledge to work — let us build your perfect Sri Lanka itinerary.</p>
            <Link href="/tailor-made" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5">
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
