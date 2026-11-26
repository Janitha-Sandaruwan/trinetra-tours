'use client'
import { Star } from 'lucide-react'
import { reviews } from '@/data/mockData'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

function PlatformBadge({ platform }: { platform: 'TripAdvisor' | 'Google' }) {
  if (platform === 'TripAdvisor') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        TripAdvisor
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      Google
    </span>
  )
}

export function ReviewsSection() {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Guest Stories</div>
            <h2 className="font-serif text-4xl md:text-5xl text-ocean mb-4">
              What Our Travelers Say
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-gray-500 text-sm">500+ verified reviews across TripAdvisor & Google</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => {
            const initials = review.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
            return (
              <StaggerItem key={review.id}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-deep to-ocean flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-ocean">{review.name}</div>
                        <div className="text-xs text-gray-400">{review.country}</div>
                      </div>
                    </div>
                    <PlatformBadge platform={review.platform} />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-4">
                    &quot;{review.text}&quot;
                  </p>

                  {/* Tour taken */}
                  <div className="border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-400">Tour: </span>
                    <span className="text-xs font-medium text-emerald-deep">{review.tourTaken}</span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
