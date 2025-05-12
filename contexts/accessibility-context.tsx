"use client"

import type React from "react"

import { createContext, useContext, useEffect, useCallback } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type AccessibilityOptions = {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  focusVisible: boolean
}

type AccessibilityContextType = {
  options: AccessibilityOptions
  setFontSize: (size: number) => void
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  toggleFocusVisible: () => void
  resetOptions: () => void
}

const defaultOptions: AccessibilityOptions = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  focusVisible: false,
}

const initialState: AccessibilityContextType = {
  options: defaultOptions,
  setFontSize: () => null,
  toggleHighContrast: () => null,
  toggleReducedMotion: () => null,
  toggleFocusVisible: () => null,
  resetOptions: () => null,
}

const AccessibilityContext = createContext<AccessibilityContextType>(initialState)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useLocalStorage<AccessibilityOptions>("credifacil-accessibility", defaultOptions)

  // Aplicar opciones cuando cambian - usando useEffect con dependencias claras
  useEffect(() => {
    // Tamaño de fuente
    document.documentElement.style.fontSize = `${options.fontSize}%`

    // Alto contraste
    if (options.highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Movimiento reducido
    if (options.reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }

    // Enfoque visible
    if (options.focusVisible) {
      document.documentElement.classList.add("focus-visible")
    } else {
      document.documentElement.classList.remove("focus-visible")
    }
  }, [options.fontSize, options.highContrast, options.reducedMotion, options.focusVisible])

  // Memoizar funciones para evitar recreaciones innecesarias
  const setFontSize = useCallback(
    (size: number) => {
      setOptions((prev) => ({ ...prev, fontSize: size }))
    },
    [setOptions],
  )

  const toggleHighContrast = useCallback(() => {
    setOptions((prev) => ({ ...prev, highContrast: !prev.highContrast }))
  }, [setOptions])

  const toggleReducedMotion = useCallback(() => {
    setOptions((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))
  }, [setOptions])

  const toggleFocusVisible = useCallback(() => {
    setOptions((prev) => ({ ...prev, focusVisible: !prev.focusVisible }))
  }, [setOptions])

  const resetOptions = useCallback(() => {
    setOptions(defaultOptions)
  }, [setOptions])

  const value = {
    options,
    setFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    toggleFocusVisible,
    resetOptions,
  }

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
