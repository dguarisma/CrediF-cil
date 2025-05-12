"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, Check, CreditCard, Clock, Percent, Gift, Zap, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function Beneficios() {
  const [nivelActual, setNivelActual] = useState(2)

  // Definición de los niveles y sus beneficios
  const niveles = [
    {
      nivel: 1,
      nombre: "Principiante",
      descripcion: "Comienza tu camino financiero",
      color: "bg-gray-100 text-gray-700",
      limiteCredito: "$50 - $100",
      tasaInteres: "20% mensual",
      tiempoAprobacion: "24 horas",
      beneficios: ["Acceso a préstamos pequeños", "Proceso de verificación simplificado", "Soporte por chat"],
      requisitos: "Registro completo y verificación de identidad básica",
    },
    {
      nivel: 2,
      nombre: "Confiable",
      descripcion: "Construyendo confianza",
      color: "bg-blue-100 text-blue-700",
      limiteCredito: "$100 - $250",
      tasaInteres: "18% mensual",
      tiempoAprobacion: "12 horas",
      beneficios: [
        "Mayor límite de crédito",
        "Tasa de interés reducida",
        "Proceso de aprobación más rápido",
        "Notificaciones personalizadas",
      ],
      requisitos: "3 préstamos pagados a tiempo en Nivel 1",
    },
    {
      nivel: 3,
      nombre: "Establecido",
      descripcion: "Cliente con historial sólido",
      color: "bg-green-100 text-green-700",
      limiteCredito: "$250 - $500",
      tasaInteres: "15% mensual",
      tiempoAprobacion: "6 horas",
      beneficios: [
        "Límite de crédito significativamente mayor",
        "Tasa de interés preferencial",
        "Aprobación rápida",
        "Soporte prioritario",
        "Acceso a promociones exclusivas",
      ],
      requisitos: "5 préstamos pagados a tiempo en Nivel 2",
    },
    {
      nivel: 4,
      nombre: "Premium",
      descripcion: "Cliente preferencial",
      color: "bg-purple-100 text-purple-700",
      limiteCredito: "$500 - $1,000",
      tasaInteres: "12% mensual",
      tiempoAprobacion: "3 horas",
      beneficios: [
        "Límites de crédito elevados",
        "Tasas de interés muy competitivas",
        "Aprobación casi inmediata",
        "Soporte VIP",
        "Período de gracia en pagos (hasta 3 días)",
        "Descuentos en comisiones",
      ],
      requisitos: "8 préstamos pagados a tiempo en Nivel 3",
    },
    {
      nivel: 5,
      nombre: "Élite",
      descripcion: "Cliente distinguido",
      color: "bg-yellow-100 text-yellow-700",
      limiteCredito: "$1,000 - $2,500",
      tasaInteres: "10% mensual",
      tiempoAprobacion: "1 hora",
      beneficios: [
        "Límites de crédito muy altos",
        "Mejor tasa de interés disponible",
        "Aprobación inmediata",
        "Asesor financiero personal",
        "Período de gracia extendido (hasta 5 días)",
        "Sin comisiones por servicio",
        "Acceso a productos financieros exclusivos",
      ],
      requisitos: "12 préstamos pagados a tiempo en Nivel 4",
    },
    {
      nivel: 6,
      nombre: "VIP",
      descripcion: "Cliente exclusivo",
      color: "bg-red-100 text-red-700",
      limiteCredito: "$2,500 - $5,000",
      tasaInteres: "8% mensual",
      tiempoAprobacion: "Instantánea",
      beneficios: [
        "Límites de crédito máximos",
        "Tasa de interés mínima garantizada",
        "Aprobación instantánea garantizada",
        "Línea directa 24/7 con asesor personal",
        "Flexibilidad total en pagos",
        "Sin comisiones de ningún tipo",
        "Invitaciones a eventos exclusivos",
        "Programa de recompensas premium",
        "Acceso a préstamos de emergencia",
      ],
      requisitos: "15 préstamos pagados a tiempo en Nivel 5 y mínimo 1 año como cliente",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Programa de Beneficios</h1>
            <p className="text-gray-600">
              Descubre los beneficios exclusivos que obtienes al subir de nivel en CrediFácil
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Tu nivel actual</CardTitle>
                  <CardDescription>
                    Nivel {nivelActual} - {niveles[nivelActual - 1].nombre}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-2/3">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${(nivelActual / 6) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Nivel 1</span>
                      <span>Nivel 6</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 text-center md:text-right">
                    <p className="text-sm text-gray-600">Próximo nivel</p>
                    <p className="font-bold text-lg">
                      {nivelActual < 6
                        ? `Nivel ${nivelActual + 1} - ${niveles[nivelActual].nombre}`
                        : "Nivel máximo alcanzado"}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">¿Cómo subir de nivel?</h3>
                  <p className="text-gray-600 mb-2">
                    Para avanzar al siguiente nivel, debes cumplir con los siguientes requisitos:
                  </p>
                  <p className="text-gray-600">
                    {nivelActual < 6 ? niveles[nivelActual].requisitos : "¡Felicidades! Has alcanzado el nivel máximo."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="todos">
            <TabsList className="mb-6">
              <TabsTrigger value="todos">Todos los niveles</TabsTrigger>
              <TabsTrigger value="actual">Mi nivel actual</TabsTrigger>
              <TabsTrigger value="siguiente">Próximo nivel</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {niveles.map((nivel) => (
                  <Card
                    key={nivel.nivel}
                    className={`border-2 ${nivel.nivel === nivelActual ? "border-accent" : "border-transparent"}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className={nivel.color}>Nivel {nivel.nivel}</Badge>
                          <CardTitle className="mt-2">{nivel.nombre}</CardTitle>
                          <CardDescription>{nivel.descripcion}</CardDescription>
                        </div>
                        {nivel.nivel === nivelActual && (
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                            Tu nivel actual
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Límite de crédito</p>
                          <p className="font-medium">{nivel.limiteCredito}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Percent className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Tasa de interés</p>
                          <p className="font-medium">{nivel.tasaInteres}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Tiempo de aprobación</p>
                          <p className="font-medium">{nivel.tiempoAprobacion}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Beneficios exclusivos:</h4>
                        <ul className="space-y-2">
                          {nivel.beneficios.map((beneficio, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-sm">{beneficio}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {nivel.nivel > nivelActual ? (
                        <div className="w-full text-sm text-gray-600">
                          <p className="font-medium mb-1">Requisitos para alcanzar este nivel:</p>
                          <p>{nivel.requisitos}</p>
                        </div>
                      ) : nivel.nivel < nivelActual ? (
                        <div className="w-full text-sm text-green-600">
                          <p>¡Ya has superado este nivel!</p>
                        </div>
                      ) : (
                        <div className="w-full text-sm text-accent">
                          <p>Este es tu nivel actual. ¡Sigue mejorando!</p>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actual">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={niveles[nivelActual - 1].color}>Nivel {nivelActual}</Badge>
                      <CardTitle className="mt-2">{niveles[nivelActual - 1].nombre}</CardTitle>
                      <CardDescription>{niveles[nivelActual - 1].descripcion}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                      Tu nivel actual
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Límite de crédito</p>
                        <p className="font-medium">{niveles[nivelActual - 1].limiteCredito}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Percent className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Tasa de interés</p>
                        <p className="font-medium">{niveles[nivelActual - 1].tasaInteres}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Tiempo de aprobación</p>
                        <p className="font-medium">{niveles[nivelActual - 1].tiempoAprobacion}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4">Beneficios exclusivos de tu nivel:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {niveles[nivelActual - 1].beneficios.map((beneficio, index) => (
                        <div key={index} className="flex items-start gap-3 bg-accent/5 p-3 rounded-lg">
                          <div className="bg-accent/10 p-2 rounded-full">
                            {index % 4 === 0 ? (
                              <Gift className="h-4 w-4 text-accent" />
                            ) : index % 4 === 1 ? (
                              <Zap className="h-4 w-4 text-accent" />
                            ) : index % 4 === 2 ? (
                              <Shield className="h-4 w-4 text-accent" />
                            ) : (
                              <Star className="h-4 w-4 text-accent" />
                            )}
                          </div>
                          <span>{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {nivelActual < 6 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">¿Cómo subir al siguiente nivel?</h4>
                      <p className="text-gray-600">{niveles[nivelActual].requisitos}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="siguiente">
              {nivelActual < 6 ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className={niveles[nivelActual].color}>Nivel {nivelActual + 1}</Badge>
                        <CardTitle className="mt-2">{niveles[nivelActual].nombre}</CardTitle>
                        <CardDescription>{niveles[nivelActual].descripcion}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        Próximo nivel
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Límite de crédito</p>
                          <p className="font-medium">{niveles[nivelActual].limiteCredito}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Percent className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Tasa de interés</p>
                          <p className="font-medium">{niveles[nivelActual].tasaInteres}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Tiempo de aprobación</p>
                          <p className="font-medium">{niveles[nivelActual].tiempoAprobacion}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Nuevos beneficios que desbloquearás:</h4>
                      <ul className="space-y-2">
                        {niveles[nivelActual].beneficios
                          .filter((b) => !niveles[nivelActual - 1].beneficios.includes(b))
                          .map((beneficio, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-sm font-medium">{beneficio}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">Requisitos para alcanzar este nivel:</h4>
                      <p className="text-gray-600">{niveles[nivelActual].requisitos}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/perfil">Volver a mi perfil</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>¡Felicidades!</CardTitle>
                    <CardDescription>Has alcanzado el nivel máximo en CrediFácil</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center py-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                        <Award className="h-10 w-10 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Nivel 6 - VIP</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Has alcanzado el nivel más alto en nuestro programa de beneficios. Disfruta de todos los
                        privilegios exclusivos que tenemos para ti.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button asChild>
                      <Link href="/perfil">Volver a mi perfil</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
