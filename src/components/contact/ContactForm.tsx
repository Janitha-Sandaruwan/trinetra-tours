'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  country: z.string().optional(),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, 'Please write at least 10 characters'),
})
type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (_data: FormData) => {
    setTimeout(() => setSubmitted(true), 500)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-serif text-2xl text-ocean mb-2">Message Sent!</h3>
        <p className="text-gray-500">We&apos;ll get back to you within 2 hours during business hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input {...register('name')} placeholder="Your name"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input {...register('email')} type="email" placeholder="your@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input {...register('country')} placeholder="United Kingdom"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
          <input {...register('phone')} placeholder="+44 7700 900000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tour Interest</label>
        <select {...register('interest')}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors">
          <option value="">Select a tour type...</option>
          <option>Cultural Triangle Tour</option>
          <option>Wildlife Safari</option>
          <option>Honeymoon Package</option>
          <option>Beach & Wellness</option>
          <option>Tailor-Made (Custom)</option>
          <option>Group Tour</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea {...register('message')} rows={4}
          placeholder="Tell us about your dream Sri Lanka trip..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none" />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}
        className="w-full bg-gold hover:bg-gold-light text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
        {isSubmitting ? 'Sending...' : (<>Send Message <ArrowRight className="w-4 h-4" /></>)}
      </button>
    </form>
  )
}
