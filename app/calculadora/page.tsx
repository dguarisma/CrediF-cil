"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Calendar, Info, ArrowRight, Calculator, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
// Eliminamos la importación del componente LoanCalculatorIntro si existe

export default function CalculadoraPrestamos() {
  const [monto, setMonto] = useState(100)
  const [plazo, setPlazo] = useState(30)
  const [comparacionPlazo, setComparacionPlazo] = useState("30")
  const { toast } = useToast()
  const [generandoImagen, setGenerandoImagen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Cálculos financieros
  const calcularPrestamo = (montoCalc: number, plazoCalc: number) => {
    const tasaInteres = 0.15 // 15% mensual
    const interesMensual = montoCalc * tasaInteres
    const comision = 2 // $2 de comisión fija
    const totalPagar = montoCalc + interesMensual * (plazoCalc / 30) + comision
    const pagoDiario = totalPagar / plazoCalc
    const tasaAnualEquivalente = (Math.pow(1 + tasaInteres, 12) - 1) * 100

    return {
      interesMensual,
      comision,
      totalPagar,
      pagoDiario,
      tasaAnualEquivalente,
    }
  }

  const resultado = calcularPrestamo(monto, plazo)

  // Cálculos para la comparativa
  const calcularComparativa = () => {
    const plazos = [7, 15, 30, 60]
    return plazos.map((p) => {
      const calc = calcularPrestamo(monto, p)
      return {
        plazo: p,
        totalPagar: calc.totalPagar,
        pagoDiario: calc.pagoDiario,
        interesTotal: calc.interesMensual * (p / 30),
      }
    })
  }

  const comparativa = calcularComparativa()

  // Función para generar una imagen del resumen
  const generarImagenResumen = () => {
    if (!canvasRef.current) return null

    const canvas = canvasRef.current
    // Ajustar el tamaño del canvas para dispositivos móviles
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      canvas.width = 400
      canvas.height = 600
    } else {
      canvas.width = 600
      canvas.height = 500
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Ajustar el tamaño de fuente para móviles
    const titleSize = isMobile ? "20px" : "24px"
    const subtitleSize = isMobile ? "18px" : "20px"
    const textSize = isMobile ? "14px" : "16px"
    const smallTextSize = isMobile ? "12px" : "14px"

    // Limpiar canvas
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar borde
    ctx.strokeStyle = "#E2E8F0"
    ctx.lineWidth = 2
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

    // Dibujar logo/título
    ctx.fillStyle = "#0F766E" // Color primario
    ctx.font = `bold ${titleSize} Arial`
    ctx.fillText("CrediFácil", 30, 50)

    ctx.fillStyle = "#334155" // Color texto
    ctx.font = `bold ${subtitleSize} Arial`
    ctx.fillText("Resumen de Préstamo", 30, 80)

    // Línea separadora
    ctx.strokeStyle = "#E2E8F0"
    ctx.beginPath()
    ctx.moveTo(30, 100)
    ctx.lineTo(canvas.width - 30, 100)
    ctx.stroke()

    // Datos del préstamo
    ctx.font = `${textSize} Arial`
    ctx.fillStyle = "#64748B"

    const y1 = 140 // Posición Y inicial
    const lineHeight = 30 // Altura de línea

    // Columna izquierda - Etiquetas
    ctx.textAlign = "left"
    ctx.fillText("Monto solicitado:", 30, y1)
    ctx.fillText("Plazo:", 30, y1 + lineHeight)
    ctx.fillText("Tasa de interés mensual:", 30, y1 + lineHeight * 2)
    ctx.fillText("TAE:", 30, y1 + lineHeight * 3)
    ctx.fillText("Interés total:", 30, y1 + lineHeight * 4)
    ctx.fillText("Comisión por apertura:", 30, y1 + lineHeight * 5)

    // Columna derecha - Valores
    ctx.textAlign = "right"
    ctx.fillStyle = "#0F172A"
    ctx.font = `bold ${textSize} Arial`
    ctx.fillText(`$${monto.toFixed(2)}`, canvas.width - 30, y1)
    ctx.fillText(`${plazo} días`, canvas.width - 30, y1 + lineHeight)
    ctx.fillText("15%", canvas.width - 30, y1 + lineHeight * 2)
    ctx.fillText(`${resultado.tasaAnualEquivalente.toFixed(2)}%`, canvas.width - 30, y1 + lineHeight * 3)
    ctx.fillText(`$${(resultado.interesMensual * (plazo / 30)).toFixed(2)}`, canvas.width - 30, y1 + lineHeight * 4)
    ctx.fillText(`$${resultado.comision.toFixed(2)}`, canvas.width - 30, y1 + lineHeight * 5)

    // Línea separadora
    ctx.strokeStyle = "#E2E8F0"
    ctx.beginPath()
    ctx.moveTo(30, y1 + lineHeight * 6 - 10)
    ctx.lineTo(canvas.width - 30, y1 + lineHeight * 6 - 10)
    ctx.stroke()

    // Total a pagar
    ctx.fillStyle = "#64748B"
    ctx.textAlign = "left"
    ctx.font = `bold ${subtitleSize} Arial`
    ctx.fillText("Total a pagar:", 30, y1 + lineHeight * 7)

    ctx.fillStyle = "#0F766E" // Color primario
    ctx.textAlign = "right"
    ctx.font = `bold ${titleSize} Arial`
    ctx.fillText(`$${resultado.totalPagar.toFixed(2)}`, canvas.width - 30, y1 + lineHeight * 7)

    // Pago diario
    ctx.fillStyle = "#64748B"
    ctx.textAlign = "left"
    ctx.font = `${smallTextSize} Arial`
    ctx.fillText("Pago diario estimado:", 30, y1 + lineHeight * 8)

    ctx.textAlign = "right"
    ctx.fillText(`$${resultado.pagoDiario.toFixed(2)}/día`, canvas.width - 30, y1 + lineHeight * 8)

    // Fecha de generación
    ctx.fillStyle = "#94A3B8"
    ctx.textAlign = "center"
    ctx.font = `${smallTextSize} Arial`
    ctx.fillText(`Generado el ${new Date().toLocaleDateString('es-ES')}`, canvas.width / 2, canvas.height - 20)

    return canvas.toDataURL("image/png")
  }

  // Función para guardar la simulación como imagen
  const guardarSimulacion = () => {
    try {
      setGenerandoImagen(true)

      const imageUrl = generarImagenResumen()
      if (!imageUrl) {
        throw new Error("No se pudo generar la imagen")
      }

      // Crear enlace de descarga
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = `CrediFacil-Prestamo-${monto}-${plazo}dias.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Imagen guardada",
        description: "Se ha descargado la imagen con el resumen de tu préstamo.",
      })
    } catch (error) {
      console.error("Error al generar imagen:", error)
      toast({
        title: "Error",
        description: "No se pudo generar la imagen. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setGenerandoImagen(false)
    }
  }

  // Función para compartir la simulación por WhatsApp
  const compartirSimulacion = () => {
    const mensaje = encodeURIComponent(
      `¡Mira mi simulación de préstamo en CrediFácil!\n\n` +
        `Monto: $${monto}\n` +
        `Plazo: ${plazo} días\n` +
        `Total a pagar: $${resultado.totalPagar.toFixed(2)}\n` +
        `Pago diario: $${resultado.pagoDiario.toFixed(2)}\n\n` +
        `Solicita tu préstamo ahora en CrediFácil`,
    )

    // Abrir WhatsApp con el mensaje
    window.open(`https://api.whatsapp.com/send?text=${mensaje}`, "_blank")

    toast({
      title: "Compartir por WhatsApp",
      description: "Se ha abierto WhatsApp para compartir tu simulación.",
    })
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      {/* Eliminamos la referencia al componente LoanCalculatorIntro si existe */}

      {/* Canvas oculto para generar la imagen */}
      <canvas ref={canvasRef} width="600" height="500" style={{ display: "none" }} />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Calculadora de Préstamos</h1>
              <p className="text-gray-600">Simula diferentes escenarios para tu préstamo</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={guardarSimulacion}
                disabled={generandoImagen}
                className="w-full sm:w-auto"
              >
                {generandoImagen ? (
                  <>Generando...</>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Guardar simulación
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={compartirSimulacion} className="w-full sm:w-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Simula tu préstamo
                  </CardTitle>
                  <CardDescription>Ajusta los parámetros según tus necesidades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
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
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$50</span>
                      <span>$500</span>
                    </div>
                  </div>

                  <div className="space-y-4">
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
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>7 días</span>
                      <span>60 días</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium text-lg mb-4">Comparativa de plazos</h3>
                    <Tabs defaultValue="30" value={comparacionPlazo} onValueChange={setComparacionPlazo}>
                      <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
                        <TabsTrigger value="7">7 días</TabsTrigger>
                        <TabsTrigger value="15">15 días</TabsTrigger>
                        <TabsTrigger value="30">30 días</TabsTrigger>
                        <TabsTrigger value="60">60 días</TabsTrigger>
                      </TabsList>

                      {comparativa.map((comp) => (
                        <TabsContent key={comp.plazo} value={comp.plazo.toString()} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Total a pagar</h4>
                                  <p className="text-2xl font-bold text-primary">${comp.totalPagar.toFixed(2)}</p>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Pago diario</h4>
                                  <p className="text-2xl font-bold text-accent">${comp.pagoDiario.toFixed(2)}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="bg-neutral p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Interés total:</span>
                              <span className="font-medium">${comp.interesTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Comisión:</span>
                              <span className="font-medium">${resultado.comision.toFixed(2)}</span>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90" size="lg">
                    <Link href={`/solicitar?monto=${monto}&plazo=${plazo}`}>Solicitar este préstamo</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card id="resumen-prestamo">
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
                    <span className="font-bold text-right text-lg">15%</span>

                    <span className="text-gray-600 font-medium">TAE (Tasa Anual Equivalente):</span>
                    <span className="font-bold text-right text-lg">{resultado.tasaAnualEquivalente.toFixed(2)}%</span>

                    <span className="text-gray-600 font-medium">Interés total:</span>
                    <span className="font-bold text-right text-lg">
                      ${(resultado.interesMensual * (plazo / 30)).toFixed(2)}
                    </span>

                    <span className="text-gray-600 font-medium">Comisión por apertura:</span>
                    <span className="font-bold text-right text-lg">${resultado.comision.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-lg">Total a pagar:</span>
                      <span className="font-bold text-right text-xl text-primary">
                        ${resultado.totalPagar.toFixed(2)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <span className="text-gray-600 text-sm">Pago diario estimado:</span>
                      <span className="text-gray-600 text-right text-sm">${resultado.pagoDiario.toFixed(2)}/día</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-0">
                  <div className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                    <Info className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">
                      Esta simulación es informativa. Las tasas pueden variar según tu nivel de confianza.
                    </p>
                  </div>

                  <Link href="/educacion" className="text-sm text-primary hover:underline flex items-center">
                    Aprende más sobre nuestros préstamos
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
