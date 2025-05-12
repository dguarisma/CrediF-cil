"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulación de envío de correo de recuperación
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
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
            <CardTitle className="text-2xl font-bold text-center">Recuperar contraseña</CardTitle>
            <CardDescription className="text-center">
              {!isSubmitted
                ? "Ingresa tu correo electrónico para recibir instrucciones de recuperación"
                : "Hemos enviado instrucciones a tu correo electrónico"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  {error && (
                    <div className="flex items-center text-red-500 text-sm mt-1" id="email-error">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
                </Button>
              </form>
            ) : (
              <div className="py-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="mb-4">
                  Hemos enviado un correo electrónico a <strong>{email}</strong> con instrucciones para restablecer tu
                  contraseña.
                </p>
                <p className="text-sm text-muted-foreground">
                  Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo enlace.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Volver a inicio de sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
