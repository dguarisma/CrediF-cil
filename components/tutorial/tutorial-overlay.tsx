"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useTutorial } from "@/contexts/tutorial-context"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function TutorialOverlay() {
  const { activeTutorial, currentStep, tutorialFlows, nextStep, prevStep, endTutorial } = useTutorial()
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "right" | "bottom" | "left">("bottom")
  const calculatePositionRef = useRef<
    (rect: DOMRect, position: "top" | "right" | "bottom" | "left") => { top: number; left: number }
  >({} as any)

  // Si no hay tutorial activo, no mostrar nada
  if (!activeTutorial) return null

  const tutorial = tutorialFlows.find((flow) => flow.id === activeTutorial)
  if (!tutorial || !tutorial.steps[currentStep]) return null

  const currentTutorialStep = tutorial.steps[currentStep]

  calculatePositionRef.current = useCallback((rect: DOMRect, position: "top" | "right" | "bottom" | "left") => {
    const OFFSET = 12 // Distancia del elemento

    switch (position) {
      case "top":
        return {
          top: rect.top - OFFSET,
          left: rect.left + rect.width / 2,
        }
      case "right":
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + OFFSET,
        }
      case "bottom":
        return {
          top: rect.bottom + OFFSET,
          left: rect.left + rect.width / 2,
        }
      case "left":
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - OFFSET,
        }
    }
  }, [])

  // Usar useEffect para actualizar la posición cuando cambia el paso actual
  useEffect(() => {
    if (!currentTutorialStep) return

    const updatePosition = () => {
      const targetElement = document.querySelector(currentTutorialStep.targetElement)
      if (!targetElement) return

      const rect = targetElement.getBoundingClientRect()
      const newPosition = calculatePositionRef.current(rect, currentTutorialStep.position)

      setPosition(newPosition)
      setTooltipPosition(currentTutorialStep.position)
    }

    // Actualizar posición inicialmente
    updatePosition()

    // Actualizar posición en scroll y resize
    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [currentTutorialStep])

  // Clases para posicionar el tooltip
  const tooltipClasses = {
    top: "transform -translate-x-1/2 -translate-y-full",
    right: "transform translate-y-[-50%]",
    bottom: "transform -translate-x-1/2",
    left: "transform -translate-x-full translate-y-[-50%]",
  }

  return (
    <>
      {/* Overlay de fondo */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={endTutorial} />

      {/* Tooltip */}
      <div
        className={`fixed z-[60] ${tooltipClasses[tooltipPosition]}`}
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <Card className="w-72 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{currentTutorialStep.title}</CardTitle>
              <Button variant="ghost" size="icon" onClick={endTutorial} className="h-6 w-6">
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm">{currentTutorialStep.content}</CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {currentStep + 1} de {tutorial.steps.length}
            </div>
            <div className="flex items-center gap-1">
              {currentStep > 0 && (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
              )}
              {currentStep < tutorial.steps.length - 1 ? (
                <Button variant="default" size="sm" onClick={nextStep}>
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={nextStep}>
                  Finalizar
                  <Check className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
