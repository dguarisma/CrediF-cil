"use client"

import { useState, useEffect } from "react"

export function ResponsiveHelper() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV !== "development") return

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Inicializar
    updateDimensions()

    // Actualizar en resize
    window.addEventListener("resize", updateDimensions)

    // Tecla para mostrar/ocultar (Ctrl+Shift+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setIsVisible((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!isVisible) return null

  // Determinar el breakpoint actual
  const getBreakpoint = (width: number) => {
    if (width < 640) return "xs (< 640px)"
    if (width < 768) return "sm (≥ 640px)"
    if (width < 1024) return "md (≥ 768px)"
    if (width < 1280) return "lg (≥ 1024px)"
    if (width < 1536) return "xl (≥ 1280px)"
    return "2xl (≥ 1536px)"
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-[9999] pointer-events-none">
      <div>
        <span className="font-bold">Dimensiones:</span> {dimensions.width} × {dimensions.height}
      </div>
      <div>
        <span className="font-bold">Breakpoint:</span> {getBreakpoint(dimensions.width)}
      </div>
    </div>
  )
}
