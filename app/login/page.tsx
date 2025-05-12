"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Añadir un nuevo estado para almacenar la ruta de redirección
  const [redirectPath, setRedirectPath] = useState("/")
  const [error, setError] = useState<string | null>(null)

  // Obtener el parámetro de redirección de la URL
  useEffect(() => {
    // Verificar si hay un parámetro de redirección en la URL
    const params = new URLSearchParams(window.location.search)
    const redirectPath = params.get("redirect")
    if (redirectPath) {
      setRedirectPath(redirectPath)
    }
  }, [])

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      // Llamar a la función login del AuthProvider
      await login("google")
      // Redirigir al usuario a la página principal después de autenticarse
      router.push("/solicitar")
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login("email")
      // Redirigir al usuario a la página de redirección o a la página principal
      router.push(redirectPath)
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80 -z-10" />

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="CrediFácil Logo"
                width={240}
                height={53}
                className="h-auto w-[10.5rem]"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
            <CardDescription className="text-center">Ingresa a tu cuenta de CrediFácil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border"
                onClick={handleGoogleAuth}
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
              <div className="text-center text-sm mt-4">
                <Link href="/recuperar-contrasena" className="text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="text-center text-sm text-gray-500">
                Al continuar con Google, aceptas nuestros{" "}
                <Link href="/legal" className="text-primary hover:underline">
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link href="/legal?tab=privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                .
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-primary hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
