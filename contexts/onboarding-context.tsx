"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

type OnboardingStep = "profile" | "score" | "simulation" | "completed"
type Challenge = { id: string; completed: boolean }

interface OnboardingContextType {
  isActive: boolean
  currentStep: OnboardingStep
  challenges: Record<string, Challenge[]>
  progress: number
  completeChallenge: (stepId: string, challengeId: string) => void
  nextStep: () => void
  skipOnboarding: () => void
  showGuide: boolean
  setShowGuide: (show: boolean) => void
  currentLevel: number
  levelProgress: number
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("profile")
  const [showGuide, setShowGuide] = useState(true)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [levelProgress, setLevelProgress] = useState(65)
  const [challenges, setChallenges] = useState({
    profile: [
      { id: "selfie", completed: false },
      { id: "document", completed: false },
      { id: "geolocation", completed: false },
    ],
    score: [
      { id: "card1", completed: false },
      { id: "card2", completed: false },
      { id: "card3", completed: false },
    ],
    simulation: [{ id: "simulate", completed: false }],
  })

  // Calcular progreso total
  const totalChallenges = Object.values(challenges).flat().length
  const completedChallenges = Object.values(challenges)
    .flat()
    .filter((c) => c.completed).length
  const progress = Math.round((completedChallenges / totalChallenges) * 100)

  // Cargar estado desde localStorage al iniciar
  useEffect(() => {
    const savedOnboarding = localStorage.getItem("credifacil_onboarding")
    if (savedOnboarding) {
      const { isActive, currentStep, challenges, showGuide, currentLevel, levelProgress } = JSON.parse(savedOnboarding)
      setIsActive(isActive)
      setCurrentStep(currentStep)
      setChallenges(challenges)
      setShowGuide(showGuide)
      setCurrentLevel(currentLevel)
      setLevelProgress(levelProgress)
    } else {
      // Primera vez que el usuario inicia sesión
      setIsActive(true)
    }
  }, [])

  // Guardar estado en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem(
      "credifacil_onboarding",
      JSON.stringify({
        isActive,
        currentStep,
        challenges,
        showGuide,
        currentLevel,
        levelProgress,
      }),
    )
  }, [isActive, currentStep, challenges, showGuide, currentLevel, levelProgress])

  // Update the completeChallenge function to properly track progress and move to next step when all challenges in a step are completed
  const completeChallenge = (stepId: string, challengeId: string) => {
    setChallenges((prev) => {
      const newChallenges = { ...prev }
      const challengeIndex = newChallenges[stepId].findIndex((c) => c.id === challengeId)
      if (challengeIndex !== -1) {
        newChallenges[stepId][challengeIndex].completed = true
      }

      // Check if all challenges in this step are completed
      const allCompleted = newChallenges[stepId].every((c) => c.completed)
      if (allCompleted) {
        // Automatically move to next step when all challenges in current step are completed
        setTimeout(() => {
          nextStep()
        }, 1000)
      }

      return newChallenges
    })
  }

  // Update the nextStep function to properly handle completion
  const nextStep = () => {
    if (currentStep === "profile") setCurrentStep("score")
    else if (currentStep === "score") setCurrentStep("simulation")
    else if (currentStep === "simulation") {
      setCurrentStep("completed")
      setIsActive(false) // Important: This will close the overlay when completed
    }
  }

  const skipOnboarding = () => {
    setIsActive(false)
    setCurrentStep("completed")
  }

  return (
    <OnboardingContext.Provider
      value={{
        isActive,
        currentStep,
        challenges,
        progress,
        completeChallenge,
        nextStep,
        skipOnboarding,
        showGuide,
        setShowGuide,
        currentLevel,
        levelProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
