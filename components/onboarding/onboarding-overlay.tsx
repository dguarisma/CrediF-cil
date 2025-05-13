"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useOnboarding } from "@/contexts/onboarding-context"
import { Challenge } from "./challenge"
import { Flashcard } from "./flashcard"
import { Camera, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function OnboardingOverlay() {
  const { isActive, currentStep, progress, nextStep, skipOnboarding, completeChallenge } = useOnboarding()

  if (!isActive) return null

  const scoreCards = [
    {
      title: "Nivel de confianza",
      content:
        "Tu nivel comienza en 1. Cada préstamo pagado a tiempo te ayuda a subir de nivel. A mayor nivel, mayor límite de crédito disponible.",
    },
    {
      title: "Evita penalizaciones",
      content:
        "Los pagos atrasados reducen tu puntuación y pueden limitar tu acceso a préstamos futuros. Siempre paga antes de la fecha límite.",
    },
    {
      title: "Beneficios por puntualidad",
      content:
        "Pagar a tiempo te da acceso a tasas preferenciales, mayores montos y promociones exclusivas. ¡La puntualidad tiene recompensa!",
    },
  ]

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Barra de progreso */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progreso del onboarding</span>
                <span className="text-sm font-bold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Contenido según el paso actual */}
            {currentStep === "profile" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Completa tu perfil</h2>
                  <p className="text-gray-600">Estos pasos son necesarios para verificar tu identidad</p>
                </div>

                <div className="space-y-3">
                  <Challenge
                    stepId="profile"
                    challengeId="selfie"
                    title="Sube tu selfie"
                    description="Toma una foto clara de tu rostro para verificar tu identidad"
                    icon={<Camera className="h-5 w-5 text-primary" />}
                    onComplete={() => completeChallenge("profile", "selfie")}
                  />

                  <Challenge
                    stepId="profile"
                    challengeId="document"
                    title="Verifica tu documento"
                    description="Sube una foto de tu documento de identidad"
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    onComplete={() => completeChallenge("profile", "document")}
                  />

                  <Challenge
                    stepId="profile"
                    challengeId="geolocation"
                    title="Activa geolocalización"
                    description="Permite acceso a tu ubicación para verificar tu dirección"
                    icon={<MapPin className="h-5 w-5 text-primary" />}
                    onComplete={() => completeChallenge("profile", "geolocation")}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Recompensa:</span> Completa estos pasos para ganar +1 punto de confianza
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={skipOnboarding}
                    variant="ghost"
                    className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Omitir por ahora
                  </Button>
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "score" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Entiende tu score</h2>
                  <p className="text-gray-600">Aprende cómo funciona tu nivel de confianza</p>
                </div>

                <Flashcard
                  cards={scoreCards}
                  onComplete={() => {
                    completeChallenge("score", "card1")
                    completeChallenge("score", "card2")
                    completeChallenge("score", "card3")
                  }}
                />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Recompensa:</span> Descuento del 2% en tu primer préstamo
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={skipOnboarding}
                    variant="ghost"
                    className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Omitir por ahora
                  </Button>
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "simulation" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">Simula un préstamo</h2>
                  <p className="text-gray-600">Aprende a usar el simulador de préstamos</p>
                </div>

                {/* Simulador simplificado */}
                <div className="border rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Monto</label>
                      <input type="range" min="50" max="500" step="50" defaultValue="100" className="w-full" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$50</span>
                        <span>$500</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Plazo (días)</label>
                      <input type="range" min="7" max="60" step="1" defaultValue="30" className="w-full" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>7 días</span>
                        <span>60 días</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={() => completeChallenge("simulation", "simulate")}
                    >
                      Simular préstamo
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Recompensa:</span> Acceso al préstamo real
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={skipOnboarding}
                    variant="ghost"
                    className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Omitir por ahora
                  </Button>
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                    Finalizar
                  </Button>
                </div>
              </div>
            )}

            {/* Avatar de Sofi */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-xl font-bold border-4 border-white shadow-lg">
                S
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
