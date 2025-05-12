"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

// Definición de tipos para el consentimiento de cookies
interface CookieConsent {
  necessary: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

interface CookieConsentContextType {
  consent: CookieConsent | null
  updateConsent: (newConsent: CookieConsent) => void
  cookiesAccepted: boolean
  acceptCookies: () => void
  declineCookies: () => void
  showPreferences: boolean
  setShowPreferences: (show: boolean) => void
}

// Valor inicial para el consentimiento
const initialConsent: CookieConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false)
  const [showPreferences, setShowPreferences] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)

  // Check local storage on mount
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem("cookie-consent-data")
      if (storedConsent) {
        const parsedConsent = JSON.parse(storedConsent) as CookieConsent
        setConsent(parsedConsent)
        setCookiesAccepted(true)
      }

      // Compatibilidad con la versión anterior
      const legacyConsent = localStorage.getItem("cookie-consent")
      if (!storedConsent && legacyConsent) {
        setCookiesAccepted(legacyConsent === "accepted")
        if (legacyConsent === "accepted") {
          setConsent(initialConsent)
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    } finally {
      setInitialized(true)
    }
  }, [])

  const updateConsent = (newConsent: CookieConsent) => {
    try {
      localStorage.setItem("cookie-consent-data", JSON.stringify(newConsent))
      setConsent(newConsent)
      setCookiesAccepted(true)
    } catch (error) {
      console.error("Error saving consent to localStorage:", error)
    }
  }

  const acceptCookies = () => {
    try {
      const fullConsent: CookieConsent = {
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
      }
      localStorage.setItem("cookie-consent-data", JSON.stringify(fullConsent))
      localStorage.setItem("cookie-consent", "accepted") // Para compatibilidad
      setConsent(fullConsent)
      setCookiesAccepted(true)
    } catch (error) {
      console.error("Error accepting cookies:", error)
    }
  }

  const declineCookies = () => {
    try {
      const minimalConsent: CookieConsent = {
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      }
      localStorage.setItem("cookie-consent-data", JSON.stringify(minimalConsent))
      localStorage.setItem("cookie-consent", "declined") // Para compatibilidad
      setConsent(minimalConsent)
      setCookiesAccepted(true) // Aún consideramos que aceptó (las necesarias)
    } catch (error) {
      console.error("Error declining cookies:", error)
    }
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        updateConsent,
        cookiesAccepted,
        acceptCookies,
        declineCookies,
        showPreferences,
        setShowPreferences,
      }}
    >
      {initialized && children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
