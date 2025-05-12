"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Award, Clock, Zap } from "lucide-react"

interface RewardProps {
  title: string
  description: string
  icon: React.ReactNode
  isUnlocked: boolean
}

export function Reward({ title, description, icon, isUnlocked }: RewardProps) {
  return (
    <motion.div
      className={`border rounded-lg p-4 ${isUnlocked ? "border-accent bg-accent/10" : "border-gray-200 opacity-70"}`}
      whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${isUnlocked ? "bg-accent/20" : "bg-gray-100"}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          {!isUnlocked && <p className="text-xs text-gray-500 mt-1">Completa más retos para desbloquear</p>}
        </div>
      </div>
    </motion.div>
  )
}

export function RewardsList() {
  const rewards = [
    {
      title: "Descuento del 2%",
      description: "En tu primer préstamo",
      icon: <Award className="h-5 w-5 text-accent" />,
      isUnlocked: true,
    },
    {
      title: "Extensión de plazo",
      description: "3 días extra para pagar",
      icon: <Clock className="h-5 w-5 text-accent" />,
      isUnlocked: false,
    },
    {
      title: "Aprobación rápida",
      description: "Préstamos aprobados al instante",
      icon: <Zap className="h-5 w-5 text-accent" />,
      isUnlocked: false,
    },
  ]

  return (
    <div className="space-y-3">
      {rewards.map((reward, index) => (
        <Reward
          key={index}
          title={reward.title}
          description={reward.description}
          icon={reward.icon}
          isUnlocked={reward.isUnlocked}
        />
      ))}
    </div>
  )
}
