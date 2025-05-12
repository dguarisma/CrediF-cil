"use client"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useOnboarding } from "@/contexts/onboarding-context"

interface GuideAvatarProps {
  message: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export function GuideAvatar({ message, position = "bottom-right" }: GuideAvatarProps) {
  const { showGuide, setShowGuide } = useOnboarding()

  // Posicionamiento basado en la prop position
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-24 left-4",
    "bottom-right": "bottom-24 right-4",
  }

  return (
    <AnimatePresence>
      {showGuide && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50 flex items-end gap-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {/* Avatar de Sofi */}
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white text-lg font-bold shadow-lg">
            S
          </div>

          {/* Mensaje en un bocadillo */}
          <motion.div
            className="bg-white p-3 rounded-lg shadow-lg max-w-xs relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute left-[-8px] bottom-3 w-0 h-0 border-t-8 border-r-8 border-b-8 border-l-0 border-white"></div>
            <p className="text-sm">{message}</p>
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xs"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
