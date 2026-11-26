'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Users, Heart, Award, Clock, Shield, MessageCircle, Car, Sparkles } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { stats } from '@/data/mockData'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Heart, Award, Clock,
}

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numeric = parseInt(target.replace(/\D/g, ''))
    if (isNaN(numeric)) { setDisplayed(target); return }
    let start = 0
    const duration = 1800
    const step = duration / 60
    const increment = numeric / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= numeric) {
        setDisplayed(target)
        clearInterval(timer)
      } else {
        setDisplayed(Math.floor(start).toString() + suffix)
      }
    }, step)
    return () => clearInterval(timer)
  }, [isInView, target, suffix])

  return <span ref={ref}>{displayed}</span>
}

const valueProps = [
  { icon: Sparkles, title: '100% Tailor-Made', desc: 'No two itineraries are alike. Every journey is crafted from scratch around your dates, interests, and budget.' },
  { icon: Shield, title: 'SLTDA Certified Guides', desc: 'All our chauffeur guides are licensed by Sri Lanka Tourism Development Authority with English fluency.' },
  { icon: MessageCircle, title: '24/7 WhatsApp Support', desc: 'Real humans available around the clock. Message us at 3am — your dedicated travel consultant responds.' },
  { icon: Car, title: 'Luxury Fleet Included', desc: 'Premium A/C vehicles from sedans to luxury SUVs and KDH vans. All maintained to the highest standards.' },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <div className="text-gold text-sm tracking-widest uppercase mb-3 font-medium">Why Travel With Us</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
              The Sri Lanka Bespoke Difference
            </h2>
            <p className="text-white/55 max-w-xl mx-auto">
              We&apos;ve been crafting unforgettable Sri Lanka journeys since 2009. Here&apos;s what sets us apart.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] ?? Users
            return (
              <StaggerItem key={stat.label}>
                <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-gold/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="font-serif text-3xl md:text-4xl text-white mb-1 font-semibold">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.value.includes('+') ? '+' : stat.value.includes('%') ? '%' : ''}
                    />
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Value Props */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {valueProps.map((vp) => {
            const Icon = vp.icon
            return (
              <StaggerItem key={vp.title}>
                <div className="glass-dark rounded-2xl p-6 hover:border-gold/20 transition-colors h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-1.5">{vp.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{vp.desc}</p>
                    </div>
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
