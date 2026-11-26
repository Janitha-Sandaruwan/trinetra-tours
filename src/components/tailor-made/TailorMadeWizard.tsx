'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ChevronRight, ChevronLeft, Check, Binoculars, Train, Waves,
  Landmark, Leaf, Coffee, Camera, Heart, Car, Bus, CheckCircle,
  Users, ArrowRight
} from 'lucide-react'

// Step 4 schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  country: z.string().min(2, 'Country is required'),
  whatsapp: z.string().min(7, 'WhatsApp number is required'),
  notes: z.string().optional(),
})
type ContactForm = z.infer<typeof contactSchema>

const interests = [
  { id: 'wildlife', label: 'Wildlife Safari', icon: Binoculars },
  { id: 'trains', label: 'Scenic Trains', icon: Train },
  { id: 'surf', label: 'Surfing & Beach', icon: Waves },
  { id: 'heritage', label: 'UNESCO Heritage', icon: Landmark },
  { id: 'ayurveda', label: 'Ayurveda & Wellness', icon: Leaf },
  { id: 'tea', label: 'Tea Trails', icon: Coffee },
  { id: 'photo', label: 'Photography Tour', icon: Camera },
  { id: 'honeymoon', label: 'Honeymoon', icon: Heart },
]

const accommodations = [
  { id: '3star', label: '3-Star Boutique', sub: 'Comfortable & Charming', price: '$' },
  { id: '4star', label: '4-Star Comfort', sub: 'Premium Experience', price: '$$' },
  { id: '5star', label: '5-Star Luxury', sub: 'Uncompromising Excellence', price: '$$$' },
]

const vehicles = [
  { id: 'sedan', label: 'Luxury Sedan', pax: '1–2 pax', icon: Car },
  { id: 'suv', label: 'Luxury SUV', pax: '3–4 pax', icon: Car },
  { id: 'van', label: 'KDH Van', pax: '5–8 pax', icon: Bus },
  { id: 'coach', label: 'Mini Coach', pax: '9–20 pax', icon: Bus },
]

const stepLabels = ['Dates & Duration', 'Travel Style', 'Accommodation', 'Your Details']

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${i + 1 < step ? 'bg-emerald-500 text-white' :
                i + 1 === step ? 'bg-ocean text-white' :
                  'bg-gray-200 text-gray-400'
              }`}>
              {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] text-center leading-tight hidden sm:block ${i + 1 === step ? 'text-ocean font-semibold' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-1.5 bg-gray-200 rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gold rounded-full"
          animate={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function TailorMadeWizard() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Step 1
  const [duration, setDuration] = useState(8)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [month, setMonth] = useState('')

  // Step 2
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  // Step 3
  const [accommodation, setAccommodation] = useState('')
  const [vehicle, setVehicle] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const nextStep = () => {
    if (step === 2 && selectedInterests.length === 0) return
    if (step === 3 && (!accommodation || !vehicle)) return
    setStep((s) => Math.min(s + 1, 4))
  }
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const onSubmit = (_data: ContactForm) => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="font-serif text-3xl text-ocean mb-3">Thank You!</h2>
        <p className="text-gray-600 mb-2">Your bespoke itinerary request has been received.</p>
        <p className="text-gray-500 text-sm mb-6">We&apos;ll contact you within 2 hours with a detailed personalized itinerary.</p>
        <div className="bg-emerald-50 rounded-xl p-4 text-sm text-emerald-800 mb-6">
          <strong>What happens next:</strong><br />
          Our travel consultant will review your preferences and prepare a custom itinerary with hotel options and pricing — completely free.
        </div>
        <a
          href="https://wa.me/94782440597?text=Hello! I just submitted a tour request on your website."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Chat on WhatsApp <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
      <ProgressBar step={step} />

      <AnimatePresence mode="wait">
        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl text-ocean mb-1">When are you traveling?</h2>
            <p className="text-gray-500 text-sm mb-6">Select your travel dates and group size.</p>

            <div className="space-y-6">
              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Month</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select month...</option>
                  {['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                      <option key={m} value={m}>{m} 2026</option>
                    ))}
                </select>
              </div>

              {/* Duration slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration: <span className="text-gold font-bold">{duration} Days</span>
                </label>
                <input
                  type="range"
                  min={5} max={21} value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5 Days</span><span>21 Days</span>
                </div>
              </div>

              {/* Travelers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                  <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-ocean transition-colors">−</button>
                    <span className="flex-1 text-center font-semibold text-ocean">{adults}</span>
                    <button onClick={() => setAdults(Math.min(20, adults + 1))} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-ocean transition-colors">+</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                  <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-ocean transition-colors">−</button>
                    <span className="flex-1 text-center font-semibold text-ocean">{children}</span>
                    <button onClick={() => setChildren(Math.min(10, children + 1))} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-ocean transition-colors">+</button>
                  </div>
                </div>
              </div>

              <div className="bg-gold/5 border border-gold/20 rounded-xl p-3 text-sm text-gold font-medium text-center">
                <Users className="w-4 h-4 inline mr-1.5" />
                {adults} Adult{adults !== 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''} · {duration} Days
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl text-ocean mb-1">What interests you?</h2>
            <p className="text-gray-500 text-sm mb-6">Select all that apply — the more you tell us, the better we craft your journey.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map(({ id, label, icon: Icon }) => {
                const sel = selectedInterests.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => toggleInterest(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all duration-200 ${sel
                        ? 'border-gold bg-gold/5 text-gold'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sel ? 'bg-gold/10' : 'bg-gray-100'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium leading-tight">{label}</span>
                    {sel && <Check className="w-3.5 h-3.5" />}
                  </button>
                )
              })}
            </div>
            {selectedInterests.length === 0 && (
              <p className="text-xs text-red-500 mt-3 text-center">Please select at least one interest to continue.</p>
            )}
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl text-ocean mb-1">Your comfort level</h2>
            <p className="text-gray-500 text-sm mb-6">Choose your preferred accommodation tier and vehicle type.</p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Accommodation Tier</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {accommodations.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setAccommodation(acc.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${accommodation === acc.id ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="text-gold font-bold text-lg mb-1">{acc.price}</div>
                    <div className="font-semibold text-ocean text-sm">{acc.label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{acc.sub}</div>
                    {accommodation === acc.id && <Check className="w-4 h-4 text-gold mt-2" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Vehicle Preference</h3>
              <div className="grid grid-cols-2 gap-3">
                {vehicles.map(({ id, label, pax, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setVehicle(id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-3 ${vehicle === id ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${vehicle === id ? 'bg-gold/10' : 'bg-gray-100'}`}>
                      <Icon className={`w-4 h-4 ${vehicle === id ? 'text-gold' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-ocean text-sm">{label}</div>
                      <div className="text-xs text-gray-500">{pax}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {(!accommodation || !vehicle) && (
              <p className="text-xs text-red-500 mt-3">Please select both accommodation tier and vehicle type.</p>
            )}
          </motion.div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl text-ocean mb-1">Almost there!</h2>
            <p className="text-gray-500 text-sm mb-6">Share your contact details so we can send your personalized itinerary.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    {...register('name')}
                    placeholder="John Smith"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    {...register('country')}
                    placeholder="United Kingdom"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                  <input
                    {...register('whatsapp')}
                    placeholder="+44 7700 900000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests or Notes</label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Dietary requirements, accessibility needs, special occasions, specific hotels you love..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Send My Request <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-center text-gray-400">Free quote · No obligation · Response within 2 hours</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 4 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 text-gray-500 hover:text-ocean text-sm font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-ocean hover:bg-emerald-deep text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
