'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function WhatsAppFloat() {
  const message = encodeURIComponent("Hello! I'm interested in a Sri Lanka tour. Could you please share more details?")
  const whatsappUrl = `https://wa.me/94782440597?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg shadow-black/25 flex items-center justify-center transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 relative z-10" fill="white" />
      </motion.a>
    </div>
  )
}
