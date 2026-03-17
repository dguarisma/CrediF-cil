"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, Landmark, Wallet, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

// Modificar el componente para verificar autenticación
export default function Pagos() {
  const [metodo, setMetodo] = useState("tarjeta")
  const [isLoading, setIsLoading] = useState(false)
  const [pagoCompletado, setPagoCompletado] = useState(false)
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()

  // Verificar autenticación y redirigir si es necesario
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/pagos")
    }
  }, [user, authLoading, router])

  // Si está cargando la autenticación o no hay usuario, no mostrar el contenido
  if (authLoading || !user) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulación de procesamiento de pago
    setTimeout(() => {
      setIsLoading(false)
      setPagoCompletado(true)
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold text-primary mb-8">Realizar Pago</h1>

          {pagoCompletado ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">¡Pago completado!</h2>
                <p className="text-gray-600 mb-6">Tu pago de $250.00 ha sido procesado exitosamente.</p>
                <div className="bg-neutral p-4 rounded-lg w-full mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Número de referencia:</span>
                    <span className="font-bold">REF-12345678</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Fecha:</span>
                    <span>{new Date().toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Método de pago:</span>
                    <span>Tarjeta terminada en 4242</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline">Descargar recibo</Button>
                  <Button onClick={() => (window.location.href = "/perfil")}>Ver mi perfil</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Método de pago</CardTitle>
                    <CardDescription>Selecciona cómo deseas realizar tu pago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <RadioGroup
                        defaultValue="tarjeta"
                        value={metodo}
                        onValueChange={setMetodo}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="tarjeta" id="tarjeta" className="peer sr-only" />
                          <Label
                            htmlFor="tarjeta"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <CreditCard className="mb-3 h-6 w-6" />
                            Tarjeta
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="banco" id="banco" className="peer sr-only" />
                          <Label
                            htmlFor="banco"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Landmark className="mb-3 h-6 w-6" />
                            Banco
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="efectivo" id="efectivo" className="peer sr-only" />
                          <Label
                            htmlFor="efectivo"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Wallet className="mb-3 h-6 w-6" />
                            Efectivo
                          </Label>
                        </div>
                      </RadioGroup>

                      <Tabs value={metodo} className="w-full">
                        <TabsContent value="tarjeta" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="nombre">Nombre en la tarjeta</Label>
                              <Input id="nombre" placeholder="Juan Pérez" required />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="numero">Número de tarjeta</Label>
                              <Input id="numero" placeholder="4242 4242 4242 4242" required />
                            </div>
                            <div>
                              <Label htmlFor="expiracion">Fecha de expiración</Label>
                              <Input id="expiracion" placeholder="MM/AA" required />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="banco" className="space-y-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="banco">Banco</Label>
                              <Input id="banco" placeholder="Nombre del banco" required />
                            </div>
                            <div>
                              <Label htmlFor="cuenta">Número de cuenta</Label>
                              <Input id="cuenta" placeholder="Número de cuenta" required />
                            </div>
                            <div>
                              <Label htmlFor="titular">Titular de la cuenta</Label>
                              <Input id="titular" placeholder="Nombre del titular" required />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="efectivo" className="space-y-4">
                          <div className="space-y-4">
                            <div className="bg-neutral p-4 rounded-lg">
                              <h3 className="font-bold mb-2">Instrucciones para pago en efectivo</h3>
                              <p className="text-gray-600 mb-4">
                                Genera un código de pago y acude a cualquiera de nuestros establecimientos afiliados
                                para realizar tu pago en efectivo.
                              </p>
                              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                <li>Genera tu código de pago presionando el botón "Generar código"</li>
                                <li>Acude a cualquier establecimiento afiliado</li>
                                <li>Muestra el código al cajero</li>
                                <li>Realiza tu pago en efectivo</li>
                              </ol>
                            </div>
                            <Button type="button" variant="outline" className="w-full">
                              Generar código de pago
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Procesando pago..." : "Pagar ahora"}
                      </Button>
                      <div className="mt-6">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/metodos-pago">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Administrar métodos de pago
                          </Link>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de pago</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Préstamo:</span>
                      <span className="font-bold">#12345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha de vencimiento:</span>
                      <span className="font-bold">05/06/2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monto original:</span>
                      <span>$200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interés:</span>
                      <span>$45.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comisión:</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-bold">Total a pagar:</span>
                      <span className="font-bold text-primary">$250.00</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                      <p className="text-gray-600">
                        El pago puntual mejora tu historial crediticio y aumenta tu límite.
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
