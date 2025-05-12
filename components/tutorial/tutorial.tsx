"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ChevronRight, ChevronLeft } from "lucide-react"

type Position = "top" | "right" | "bottom" | "left"

interface TutorialProps {
  targetId: string
  title: string
  description: string
  position?: Position
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
}

export function Tutorial({
  targetId,
  title,
  description,
  position = "bottom",
  onNext,
  onPrev,
  onClose,
  isFirstStep,
  isLastStep,
  currentStep,
  totalSteps,
}: TutorialProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState({})
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) {
      console.error(`Tutorial target with id "${targetId}" not found`)
      return
    }

    const updatePosition = () => {
      const rect = target.getBoundingClientRect()
      setTargetRect(rect)

      // Añadir clase para resaltar el elemento
      target.classList.add("tutorial-target")

      // Hacer scroll al elemento si no está visible
      if (rect.top < 0 || rect.left < 0 || rect.bottom > window.innerHeight || rect.right > window.innerWidth) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      target.classList.remove("tutorial-target")
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [targetId])

  useEffect(() => {
    if (!targetRect || !tooltipRef.current) return

    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const margin = 10 // margen entre el tooltip y el elemento

    let top, left

    switch (position) {
      case "top":
        top = targetRect.top - tooltipRect.height - margin
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.right + margin
        break
      case "bottom":
        top = targetRect.bottom + margin
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.left - tooltipRect.width - margin
        break
    }

    // Asegurarse de que el tooltip no se salga de la pantalla
    if (left < 10) left = 10
    if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10
    if (top < 10) top = 10
    if (top + tooltipRect.height > window.innerHeight - 10) top = window.innerHeight - tooltipRect.height - 10

    setTooltipStyle({
      top: `${top}px`,
      left: `${left}px`,
    })
  }, [targetRect, position])

  if (!targetRect) return null

  return (
    <div className="tutorial-overlay" onClick={onClose}>
      <div
        className="tutorial-spotlight"
        style={{
          top: targetRect.top - 5,
          left: targetRect.left - 5,
          width: targetRect.width + 10,
          height: targetRect.height + 10,
        }}
      />
      <div ref={tooltipRef} className="tutorial-tooltip" style={tooltipStyle} onClick={(e) => e.stopPropagation()}>
        <Card className="w-[300px] shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{title}</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar tutorial">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              {currentStep} de {totalSteps}
            </div>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button variant="outline" size="sm" onClick={onPrev}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
              )}
              <Button size="sm" onClick={onNext}>
                {isLastStep ? "Finalizar" : "Siguiente"}
                {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
