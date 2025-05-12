"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { usePathname } from "next/navigation"

type TutorialStep = {
  id: string
  title: string
  content: string
  targetElement: string
  position: "top" | "right" | "bottom" | "left"
}

type TutorialFlow = {
  id: string
  name: string
  steps: TutorialStep[]
  availableOn: string[]
}

type TutorialContextType = {
  activeTutorial: string | null
  currentStep: number
  tutorialFlows: TutorialFlow[]
  completedTutorials: string[]
  startTutorial: (tutorialId: string) => void
  nextStep: () => void
  prevStep: () => void
  endTutorial: () => void
  markTutorialComplete: (tutorialId: string) => void
}

const initialState: TutorialContextType = {
  activeTutorial: null,
  currentStep: 0,
  tutorialFlows: [],
  completedTutorials: [],
  startTutorial: () => null,
  nextStep: () => null,
  prevStep: () => null,
  endTutorial: () => null,
  markTutorialComplete: () => null,
}

// Definir los tutoriales disponibles
const tutorialFlows: TutorialFlow[] = [
  {
    id: "welcome",
    name: "Bienvenida a CrediFácil",
    availableOn: ["/"],
    steps: [
      {
        id: "welcome-1",
        title: "¡Bienvenido a CrediFácil!",
        content: "Te guiaremos a través de las principales funciones de nuestra plataforma.",
        targetElement: "#navbar-logo",
        position: "bottom",
      },
      {
        id: "welcome-2",
        title: "Solicita tu préstamo",
        content: "Haz clic aquí para comenzar el proceso de solicitud de préstamo.",
        targetElement: "#navbar-solicitar",
        position: "bottom",
      },
      {
        id: "welcome-3",
        title: "Tu perfil",
        content: "Accede a tu perfil para ver tus préstamos y gestionar tu cuenta.",
        targetElement: ".user-auth-button",
        position: "bottom",
      },
    ],
  },
  {
    id: "loan-application",
    name: "Solicitud de préstamo",
    availableOn: ["/solicitar"],
    steps: [
      {
        id: "loan-1",
        title: "Formulario de solicitud",
        content: "Completa todos los campos requeridos para tu solicitud.",
        targetElement: "#loan-form",
        position: "top",
      },
      {
        id: "loan-2",
        title: "Monto del préstamo",
        content:
          "Selecciona el monto que necesitas. Recuerda que puedes usar nuestra calculadora para estimar los pagos.",
        targetElement: "#loan-amount",
        position: "right",
      },
      {
        id: "loan-3",
        title: "Documentación",
        content: "Sube los documentos necesarios para verificar tu identidad y ingresos.",
        targetElement: "#document-upload",
        position: "left",
      },
    ],
  },
]

const TutorialContext = createContext<TutorialContextType>(initialState)

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedTutorials, setCompletedTutorials] = useLocalStorage<string[]>("credifacil-completed-tutorials", [])
  const pathname = usePathname()

  // Filtrar tutoriales disponibles para la página actual
  // Importante: Memoizar este cálculo para evitar recálculos innecesarios
  const availableTutorials = tutorialFlows.filter((flow) => flow.availableOn.includes(pathname))

  const startTutorial = useCallback(
    (tutorialId: string) => {
      const tutorial = tutorialFlows.find((flow) => flow.id === tutorialId)
      if (tutorial && tutorial.availableOn.includes(pathname)) {
        setActiveTutorial(tutorialId)
        setCurrentStep(0)
      } else {
        console.error(`Tutorial ${tutorialId} no está disponible en esta página`)
      }
    },
    [pathname],
  )

  const nextStep = useCallback(() => {
    const tutorial = tutorialFlows.find((flow) => flow.id === activeTutorial)
    if (tutorial && currentStep < tutorial.steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else if (tutorial) {
      // Si es el último paso, marcar como completado y finalizar
      if (!completedTutorials.includes(tutorial.id)) {
        setCompletedTutorials((prev) => [...prev, tutorial.id])
      }
      setActiveTutorial(null)
      setCurrentStep(0)
    }
  }, [activeTutorial, currentStep, completedTutorials, setCompletedTutorials])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const endTutorial = useCallback(() => {
    setActiveTutorial(null)
    setCurrentStep(0)
  }, [])

  const markTutorialComplete = useCallback(
    (tutorialId: string) => {
      if (!completedTutorials.includes(tutorialId)) {
        setCompletedTutorials((prev) => [...prev, tutorialId])
      }
    },
    [completedTutorials, setCompletedTutorials],
  )

  const value = {
    activeTutorial,
    currentStep,
    tutorialFlows: availableTutorials,
    completedTutorials,
    startTutorial,
    nextStep,
    prevStep,
    endTutorial,
    markTutorialComplete,
  }

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>
}

export const useTutorial = () => {
  const context = useContext(TutorialContext)
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider")
  }
  return context
}
