"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronRight } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// Añadir las importaciones para los componentes de onboarding
import { GuideAvatar } from "@/components/onboarding/guide-avatar"
import { OnboardingOverlay } from "@/components/onboarding/onboarding-overlay"

// Modificar el componente para incluir los componentes de onboarding
export default function Bienvenida() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async (isRegistration = false) => {
    setIsLoading(true)
    try {
      // Llamar a la función login del AuthProvider
      await login("google")
      // Redirigir al usuario a la página de solicitud después de autenticarse
      router.push("/solicitar")
    } catch (error) {
      console.error("Error al autenticar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80 -z-10" />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Logo y título */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/images/logo.png"
              alt="CrediFácil Logo"
              width={240}
              height={53}
              className="h-auto w-[10.5rem] mb-6"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Bienvenido a CrediFácil</h1>
            <p className="text-white/90 text-center mt-2">Tu crédito en minutos, sin complicaciones</p>
          </div>

          {/* Tarjeta de autenticación */}
          <Card className="w-full shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center text-primary">Accede a tu cuenta</h2>

                <Button
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border"
                  onClick={() => handleGoogleAuth(false)}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {isLoading ? "Procesando..." : "Continuar con Google"}
                </Button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t w-full absolute"></div>
                  <span className="bg-white px-2 text-xs text-gray-500 relative">O</span>
                </div>

                <Button
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90"
                  onClick={() => handleGoogleAuth(true)}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#fff"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#fff"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#fff"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#fff"
                    />
                  </svg>
                  {isLoading ? "Procesando..." : "Registrarse con Google"}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Al continuar, aceptas nuestros{" "}
                  <Link href="/legal?tab=terminos" className="text-primary hover:underline">
                    Términos y Condiciones
                  </Link>{" "}
                  y{" "}
                  <Link href="/legal?tab=privacidad" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Características */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="text-white text-sm">Préstamos rápidos desde $50 hasta $500</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="text-white text-sm">Proceso 100% digital, sin papeleo</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <p className="text-white text-sm">Respuesta inmediata a tu solicitud</p>
            </div>
          </div>

          {/* Botón para explorar */}
          <div className="mt-8 text-center">
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link href="/#como-funciona" scroll={false} prefetch={false}>
                Conoce más sobre CrediFácil
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-white/80 text-sm">
        <p>© {new Date().getFullYear()} CrediFácil. Todos los derechos reservados.</p>
      </footer>

      {/* Componentes de onboarding */}
      <GuideAvatar
        message="¡Hola! Soy Sofi y estoy aquí para ayudarte a dominar CrediFácil. Vamos paso a paso."
        position="bottom-right"
      />
      <OnboardingOverlay />
    </main>
  )
}
