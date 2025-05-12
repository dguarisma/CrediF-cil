"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useOnboarding } from "@/contexts/onboarding-context"
import { Button } from "@/components/ui/button"

interface ChallengeProps {
  stepId: string
  challengeId: string
  title: string
  description: string
  icon: React.ReactNode
  onComplete: () => void
}

export function Challenge({ stepId, challengeId, title, description, icon, onComplete }: ChallengeProps) {
  const { challenges, completeChallenge } = useOnboarding()

  const isCompleted = challenges[stepId]?.find((c) => c.id === challengeId)?.completed || false

  // Update the handleComplete function to ensure it calls onComplete
  const handleComplete = () => {
    if (!isCompleted) {
      completeChallenge(stepId, challengeId)
      onComplete()
    }
  }

  return (
    <motion.div
      className={`border rounded-lg p-4 ${isCompleted ? "border-green-500 bg-green-50" : "border-gray-200"}`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? "bg-green-100" : "bg-gray-100"}`}
        >
          {isCompleted ? <Check className="h-5 w-5 text-green-600" /> : icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {!isCompleted && (
          <Button onClick={handleComplete} size="sm" className="bg-primary hover:bg-primary/90">
            Completar
          </Button>
        )}
      </div>
    </motion.div>
  )
}
