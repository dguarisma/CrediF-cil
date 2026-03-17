"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function CookieConsent() {
  const {
    consent,
    updateConsent,
    cookiesAccepted,
    acceptCookies,
    declineCookies,
    showPreferences,
    setShowPreferences,
  } = useCookieConsent()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Mostrar el banner solo si no hay consentimiento guardado
    if (!cookiesAccepted) {
      setShowBanner(true)
    } else {
      setShowBanner(false)
    }
  }, [cookiesAccepted])

  const handleAcceptAll = () => {
    acceptCookies()
    setShowBanner(false)
  }

  const handleAcceptNecessary = () => {
    declineCookies() // Esto solo acepta las cookies necesarias
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    updateConsent({
      necessary: true, // Siempre necesarias
      preferences: preferences,
      statistics: statistics,
      marketing: marketing,
    })
    setShowPreferences(false)
    setShowBanner(false)
  }

  // Inicializar estados con valores del contexto o valores predeterminados
  const [preferences, setPreferences] = useState(consent?.preferences || false)
  const [statistics, setStatistics] = useState(consent?.statistics || false)
  const [marketing, setMarketing] = useState(consent?.marketing || false)

  // Actualizar estados cuando cambia el consentimiento
  useEffect(() => {
    if (consent) {
      setPreferences(consent.preferences)
      setStatistics(consent.statistics)
      setMarketing(consent.marketing)
    }
  }, [consent])

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Política de Cookies</h3>
              <p className="text-sm text-gray-600 mb-2">
                Utilizamos cookies para mejorar su experiencia de navegación, mostrar contenido personalizado y analizar
                el tráfico del sitio.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreferences(true)}
                className="whitespace-nowrap bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400"
              >
                Preferencias
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptNecessary}
                className="whitespace-nowrap bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400"
              >
                Solo necesarias
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAcceptAll}
                className="whitespace-nowrap bg-primary text-white hover:bg-primary/90"
              >
                Aceptar todas
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Preferencias de cookies</DialogTitle>
            <DialogDescription className="text-gray-600">
              Personalice sus preferencias de cookies a continuación.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Cookies necesarias</h4>
                <p className="text-sm text-gray-500">Requeridas para el funcionamiento básico del sitio.</p>
              </div>
              <Checkbox checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Cookies de preferencias</h4>
                <p className="text-sm text-gray-500">Permiten recordar información para personalizar su experiencia.</p>
              </div>
              <Checkbox
                checked={preferences}
                onCheckedChange={(checked) => setPreferences(checked === true)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Cookies estadísticas</h4>
                <p className="text-sm text-gray-500">Nos ayudan a entender cómo interactúa con el sitio.</p>
              </div>
              <Checkbox
                checked={statistics}
                onCheckedChange={(checked) => setStatistics(checked === true)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Cookies de marketing</h4>
                <p className="text-sm text-gray-500">Utilizadas para mostrarle anuncios relevantes.</p>
              </div>
              <Checkbox
                checked={marketing}
                onCheckedChange={(checked) => setMarketing(checked === true)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreferences(false)}
              className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button onClick={handleSavePreferences} className="bg-primary text-white hover:bg-primary/90">
              Guardar preferencias
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
