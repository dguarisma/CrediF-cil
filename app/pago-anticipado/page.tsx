"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { CreditCard, Landmark, Wallet, AlertCircle, Copy, Check } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { GuideAvatar } from "@/components/onboarding/guide-avatar"

export default function PagoAnticipado() {
  const [metodo, setMetodo] = useState("tarjeta")
  const [isLoading, setIsLoading] = useState(false)
  const [pagoCompletado, setPagoCompletado] = useState(false)
  const [montoPersonalizado, setMontoPersonalizado] = useState(false)
  const [monto, setMonto] = useState(175)
  const [descuento, setDescuento] = useState(0)
  const router = useRouter()
  const { user } = useAuth()

  // Datos del préstamo actual
  const prestamo = {
    id: "LOAN-123456",
    montoOriginal: 200,
    saldoActual: 175,
    tasaInteres: 15,
    fechaVencimiento: "15/06/2023",
    plazoRestante: 30, // días
    pagoMinimo: 50,
  }

  // Calcular descuento basado en días anticipados
  const calcularDescuento = (monto) => {
    // Simulación: 0.5% de descuento por cada día anticipado (máximo 15%)
    const diasAnticipados = 30 // Ejemplo: 30 días antes
    const porcentajeDescuento = Math.min(diasAnticipados * 0.5, 15) / 100
    return Math.round(monto * porcentajeDescuento)
  }

  // Actualizar descuento cuando cambia el monto
  const actualizarMonto = (valor) => {
    setMonto(valor)
    setDescuento(calcularDescuento(valor))
  }

  const handleSubmit = (e) => {
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
          <h1 className="text-3xl font-bold text-primary mb-2">Pago Anticipado</h1>
          <p className="text-gray-600 mb-8">Liquida tu préstamo antes de tiempo y ahorra en intereses</p>

          {pagoCompletado ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">¡Pago anticipado completado!</h2>
                <p className="text-gray-600 mb-6">Tu pago de ${monto - descuento}.00 ha sido procesado exitosamente.</p>
                <div className="bg-green-50 p-4 rounded-lg w-full mb-6 text-green-700">
                  <p className="font-medium">¡Felicidades! Has ahorrado ${descuento}.00 en intereses.</p>
                </div>
                <div className="bg-neutral p-4 rounded-lg w-full mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Número de referencia:</span>
                    <span className="font-bold">REF-87654321</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Fecha:</span>
                    <span>{new Date().toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Método de pago:</span>
                    <span>
                      {metodo === "tarjeta"
                        ? "Tarjeta terminada en 4242"
                        : metodo === "banco"
                          ? "Transferencia bancaria"
                          : "Efectivo"}
                    </span>
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
                    <CardTitle>Opciones de pago anticipado</CardTitle>
                    <CardDescription>Elige cuánto deseas pagar de tu préstamo actual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-blue-700">Beneficios del pago anticipado</p>
                              <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
                                <li>Reduce el monto total a pagar</li>
                                <li>Mejora tu historial crediticio</li>
                                <li>Aumenta tu límite de crédito más rápido</li>
                                <li>Obtén un descuento en los intereses</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="monto-pago">Monto a pagar</Label>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="monto-personalizado"
                                checked={montoPersonalizado}
                                onCheckedChange={(checked) => setMontoPersonalizado(checked === true)}
                              />
                              <Label htmlFor="monto-personalizado" className="text-sm font-normal">
                                Monto personalizado
                              </Label>
                            </div>
                          </div>

                          {!montoPersonalizado ? (
                            <div className="space-y-6">
                              <div className="flex justify-between mb-2">
                                <span>Pago mínimo</span>
                                <span>Liquidación total</span>
                              </div>
                              <Slider
                                defaultValue={[prestamo.saldoActual]}
                                min={prestamo.pagoMinimo}
                                max={prestamo.saldoActual}
                                step={5}
                                value={[monto]}
                                onValueChange={(value) => actualizarMonto(value[0])}
                              />
                              <div className="flex justify-between text-sm text-gray-500">
                                <span>${prestamo.pagoMinimo}</span>
                                <span>${prestamo.saldoActual}</span>
                              </div>
                              <div className="text-center">
                                <span className="text-2xl font-bold text-primary">${monto}</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Input
                                type="number"
                                id="monto-pago"
                                placeholder="Ingresa el monto a pagar"
                                min={prestamo.pagoMinimo}
                                max={prestamo.saldoActual}
                                value={monto}
                                onChange={(e) => actualizarMonto(Number.parseInt(e.target.value) || 0)}
                              />
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t">
                          <Label className="mb-2 block">Método de pago</Label>
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
                        </div>

                        <Tabs value={metodo} className="w-full mt-4">
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
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Procesando pago..." : "Realizar pago anticipado"}
                      </Button>
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
                      <span className="font-bold">{prestamo.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha de vencimiento:</span>
                      <span className="font-bold">{prestamo.fechaVencimiento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monto original:</span>
                      <span>${prestamo.montoOriginal}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saldo actual:</span>
                      <span>${prestamo.saldoActual}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monto a pagar:</span>
                      <span>${monto}.00</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Descuento por pago anticipado:</span>
                      <span>-${descuento}.00</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-bold">Total a pagar:</span>
                      <span className="font-bold text-primary">${monto - descuento}.00</span>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="h-4 w-4 text-primary" />
                        <span className="font-medium">Ahorro estimado</span>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Intereses evitados:</span>
                          <span className="text-green-700 font-medium">${descuento}.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Días anticipados:</span>
                          <span className="text-green-700 font-medium">{prestamo.plazoRestante} días</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                      <p className="text-gray-600">
                        El pago anticipado mejora tu historial crediticio y aumenta tu límite más rápido.
                      </p>
                    </div>
                  </CardFooter>
                </Card>

                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => router.push("/pagos")}>
                    Volver a opciones de pago
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Componente de onboarding */}
      <GuideAvatar
        message="¡Paga tu préstamo antes de tiempo y ahorra en intereses! Mientras más anticipado sea tu pago, mayor será tu descuento."
        position="bottom-right"
      />
    </main>
  )
}
