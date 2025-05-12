"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Calendar, Info, ArrowRight, AlertTriangle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { LoadingScreen } from "@/components/loading-screen"
import { LevelSystem } from "@/components/onboarding/level-system"
import { useOnboarding } from "@/contexts/onboarding-context"
import { GuideAvatar } from "@/components/onboarding/guide-avatar"
import { OnboardingOverlay } from "@/components/onboarding/onboarding-overlay"

export default function SolicitarPrestamo() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [monto, setMonto] = useState(100)
  const [plazo, setPlazo] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const { currentLevel, levelProgress } = useOnboarding()
  const [displayMode, setDisplayMode] = useState<"horizontal" | "vertical">("horizontal")

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!authLoading) {
      if (!user) {
        // Si no está autenticado, redirigir a login
        router.push("/login")
      } else {
        // Si está autenticado, quitar la pantalla de carga
        setPageLoading(false)
      }
    }

    // Determinar el modo de visualización basado en el ancho de la pantalla
    const handleResize = () => {
      setDisplayMode(window.innerWidth < 768 ? "vertical" : "horizontal")
    }

    // Configurar inicialmente
    handleResize()

    // Añadir listener para cambios de tamaño
    window.addEventListener("resize", handleResize)

    // Limpiar listener
    return () => window.removeEventListener("resize", handleResize)
  }, [user, authLoading, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulación de envío de solicitud
    setTimeout(() => {
      setIsLoading(false)
      // Usar router.push en lugar de window.location para una navegación más suave
      router.push("/verificacion")
    }, 1500)
  }

  // Cálculos financieros
  const tasaInteres = 0.15 // 15-20% mensual según nivel (actualmente 15%)
  const interesMensual = monto * tasaInteres
  const comision = 2 // $2 de comisión fija
  const totalPagar = monto + interesMensual * (plazo / 30) + comision
  const pagoDiario = totalPagar / plazo

  // Calcular la tasa anual equivalente (TAE)
  const tasaAnualEquivalente = (Math.pow(1 + tasaInteres, 12) - 1) * 100

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (authLoading || pageLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-6 bg-neutral/30">
        <div className="container max-w-5xl">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">Solicitar Préstamo</h1>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            <div className="w-full lg:w-3/5">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Personaliza tu préstamo</CardTitle>
                  <CardDescription>Selecciona el monto y plazo que necesitas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4" id="monto-slider">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="monto" className="text-base">
                          Monto del préstamo
                        </Label>
                        <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                          <DollarSign className="h-4 w-4 text-primary mr-1" />
                          <span className="font-bold text-primary">${monto}</span>
                        </div>
                      </div>
                      <Slider
                        id="monto"
                        min={50}
                        max={500}
                        step={50}
                        value={[monto]}
                        onValueChange={(value) => setMonto(value[0])}
                        className="py-4"
                        aria-label="Seleccionar monto del préstamo"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$50</span>
                        <span>$500</span>
                      </div>
                    </div>

                    <div className="space-y-4" id="plazo-slider">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="plazo" className="text-base">
                          Plazo de pago (días)
                        </Label>
                        <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4 text-primary mr-1" />
                          <span className="font-bold text-primary">{plazo} días</span>
                        </div>
                      </div>
                      <Slider
                        id="plazo"
                        min={7}
                        max={60}
                        step={1}
                        value={[plazo]}
                        onValueChange={(value) => setPlazo(value[0])}
                        className="py-4"
                        aria-label="Seleccionar plazo de pago"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>7 días</span>
                        <span>60 días</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Procesando..." : "Solicitar ahora"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col gap-4 md:gap-6">
              {/* Resumen del préstamo con mayor transparencia */}
              <Card className="h-full" id="resumen-prestamo">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600 font-medium">Monto solicitado:</span>
                    <span className="font-bold text-right text-lg">${monto.toFixed(2)}</span>

                    <span className="text-gray-600 font-medium">Plazo:</span>
                    <span className="font-bold text-right text-lg">{plazo} días</span>

                    <span className="text-gray-600 font-medium">Tasa de interés mensual:</span>
                    <span className="font-bold text-right text-lg">{(tasaInteres * 100).toFixed(0)}%</span>

                    <span className="text-gray-600 font-medium">TAE (Tasa Anual Equivalente):</span>
                    <span className="font-bold text-right text-lg">{tasaAnualEquivalente.toFixed(2)}%</span>

                    <span className="text-gray-600 font-medium">Interés total:</span>
                    <span className="font-bold text-right text-lg">${(interesMensual * (plazo / 30)).toFixed(2)}</span>

                    <span className="text-gray-600 font-medium">Comisión por apertura:</span>
                    <span className="font-bold text-right text-lg">${comision.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-lg">Total a pagar:</span>
                      <span className="font-bold text-right text-xl text-primary">${totalPagar.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <span className="text-gray-600 text-sm">Pago diario estimado:</span>
                      <span className="text-gray-600 text-right text-sm">${pagoDiario.toFixed(2)}/día</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-0">
                  <div className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                    <Info className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">El pago puntual mejora tu historial crediticio y aumenta tu límite.</p>
                  </div>

                  {/* Información sobre consecuencias de no pago */}
                  <div className="flex items-start gap-2 text-sm bg-amber-50 p-3 rounded-lg w-full">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">
                      El retraso en pagos genera una penalización del 5% adicional y puede afectar tu historial
                      crediticio.
                      <Link href="/educacion?tab=pagos-tardios" className="block text-primary hover:underline mt-1">
                        Más información sobre pagos tardíos
                      </Link>
                    </p>
                  </div>

                  <Link href="/educacion" className="text-sm text-primary hover:underline flex items-center">
                    Aprende más sobre nuestros préstamos
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>

              {/* Nivel de confianza - Usar el componente LevelSystem */}
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <LevelSystem currentLevel={currentLevel} progress={levelProgress} displayMode={displayMode} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Componentes de onboarding */}
      <GuideAvatar
        message="¡Aquí puedes simular tu préstamo! Recuerda que a mayor nivel, mayor será el monto disponible."
        position="bottom-right"
      />
      <OnboardingOverlay />
    </main>
  )
}
