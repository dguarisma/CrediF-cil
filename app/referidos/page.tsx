"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Share2, Gift, Award, CheckCircle, Users, ArrowRight, Mail, Phone, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GuideAvatar } from "@/components/onboarding/guide-avatar"

export default function ProgramaReferidos() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("invitar")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isInviting, setIsInviting] = useState(false)

  // Código de referido del usuario actual
  const codigoReferido = "JUAN2023"

  // Datos de ejemplo para los referidos
  const referidos = [
    {
      id: 1,
      nombre: "María López",
      fecha: "10/04/2023",
      estado: "registrado",
      recompensaObtenida: false,
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      fecha: "15/04/2023",
      estado: "prestamo_activo",
      recompensaObtenida: true,
      recompensa: "$25 de crédito",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      fecha: "20/04/2023",
      estado: "verificando",
      recompensaObtenida: false,
    },
    {
      id: 4,
      nombre: "Roberto Sánchez",
      fecha: "05/05/2023",
      estado: "prestamo_pagado",
      recompensaObtenida: true,
      recompensa: "$50 de crédito",
    },
  ]

  // Datos de ejemplo para las recompensas
  const recompensas = [
    {
      id: 1,
      tipo: "credito",
      descripcion: "$25 de crédito",
      fecha: "15/04/2023",
      referido: "Carlos Rodríguez",
      estado: "aplicado",
    },
    {
      id: 2,
      tipo: "credito",
      descripcion: "$50 de crédito",
      fecha: "05/05/2023",
      referido: "Roberto Sánchez",
      estado: "aplicado",
    },
    {
      id: 3,
      tipo: "tasa",
      descripcion: "5% de descuento en tasa de interés",
      fecha: "Pendiente",
      referido: "Ana Martínez",
      estado: "pendiente",
    },
  ]

  // Función para copiar el código de referido
  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoReferido)
    toast({
      title: "¡Código copiado!",
      description: "El código de referido ha sido copiado al portapapeles.",
    })
  }

  // Función para compartir el enlace de referido
  const compartirEnlace = () => {
    const enlace = `https://credifacil.com/registro?ref=${codigoReferido}`

    if (navigator.share) {
      navigator.share({
        title: "¡Únete a CrediFácil!",
        text: "Obtén tu primer préstamo con CrediFácil y recibe beneficios exclusivos.",
        url: enlace,
      })
    } else {
      navigator.clipboard.writeText(enlace)
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace de referido ha sido copiado al portapapeles.",
      })
    }
  }

  // Función para compartir por WhatsApp
  const compartirPorWhatsApp = () => {
    const enlace = `https://credifacil.com/registro?ref=${codigoReferido}`
    const mensaje = encodeURIComponent(
      `¡Hola! Te invito a unirte a CrediFácil. Usa mi código de referido ${codigoReferido} y ambos recibiremos beneficios exclusivos. Regístrate aquí: ${enlace}`,
    )
    const whatsappUrl = `https://wa.me/?text=${mensaje}`
    window.open(whatsappUrl, "_blank")
  }

  // Función para invitar por email o teléfono
  const invitarContacto = (e) => {
    e.preventDefault()
    setIsInviting(true)

    // Simulamos el envío de la invitación
    setTimeout(() => {
      setIsInviting(false)
      toast({
        title: "¡Invitación enviada!",
        description: email
          ? `Se ha enviado una invitación a ${email}.`
          : `Se ha enviado una invitación por SMS a ${phone}.`,
      })
      setEmail("")
      setPhone("")
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Programa de Referidos</h1>
              <p className="text-gray-600">Invita a tus amigos y gana recompensas exclusivas</p>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tu código de referido</CardTitle>
              <CardDescription>Comparte este código con tus amigos para ganar recompensas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-lg flex-1 text-center">
                  <p className="text-sm text-gray-600 mb-1">Tu código único</p>
                  <p className="text-3xl font-bold tracking-wider text-primary">{codigoReferido}</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
                  <Button variant="outline" onClick={copiarCodigo} className="flex-1 md:flex-none">
                    <Copy className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Copiar código</span>
                    <span className="sm:hidden">Copiar</span>
                  </Button>
                  <Button variant="outline" onClick={compartirEnlace} className="flex-1 md:flex-none">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Compartir</span>
                    <span className="sm:hidden">Compartir</span>
                  </Button>
                  <Button
                    onClick={compartirPorWhatsApp}
                    className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">WhatsApp</span>
                    <span className="sm:hidden">WhatsApp</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold mb-1">Invita amigos</h3>
                      <p className="text-sm text-gray-600">Comparte tu código con amigos y familiares</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-bold mb-1">Ellos se registran</h3>
                      <p className="text-sm text-gray-600">Tus amigos crean una cuenta con tu código</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                        <Gift className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-bold mb-1">Ambos ganan</h3>
                      <p className="text-sm text-gray-600">Recibe recompensas cuando soliciten un préstamo</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestiona tus referidos</CardTitle>
              <CardDescription>Invita, rastrea y recibe recompensas</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="invitar">Invitar amigos</TabsTrigger>
                  <TabsTrigger value="referidos">Mis referidos</TabsTrigger>
                  <TabsTrigger value="recompensas">Mis recompensas</TabsTrigger>
                </TabsList>

                <TabsContent value="invitar" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4">Invitar por correo electrónico</h3>
                      <form onSubmit={invitarContacto} className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              id="email"
                              type="email"
                              placeholder="amigo@ejemplo.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required={!phone}
                              className="flex-1"
                            />
                            <Button
                              type="submit"
                              disabled={isInviting || (!email && !phone)}
                              className="sm:w-auto w-full"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Invitar
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Invitar por SMS</h3>
                      <form onSubmit={invitarContacto} className="space-y-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de teléfono
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required={!email}
                              className="flex-1"
                            />
                            <Button
                              type="submit"
                              disabled={isInviting || (!email && !phone)}
                              className="sm:w-auto w-full"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Invitar
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">Invitar por WhatsApp</h3>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-green-700 mb-2">Comparte directamente con tus contactos</p>
                          <p className="text-sm text-green-800 mb-4">
                            Envía una invitación personalizada a tus contactos de WhatsApp con tu código de referido.
                          </p>
                          <Button onClick={compartirPorWhatsApp} className="bg-green-600 hover:bg-green-700 text-white">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Compartir por WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Recompensas actuales</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-1" />
                        <span>
                          <strong>$25 de crédito</strong> cuando tu referido solicite su primer préstamo
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-1" />
                        <span>
                          <strong>$50 de crédito</strong> cuando tu referido pague su primer préstamo a tiempo
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-1" />
                        <span>
                          <strong>5% de descuento</strong> en la tasa de interés por cada 5 referidos activos
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-green-50 p-2 rounded-md">
                        <MessageCircle className="h-4 w-4 text-green-600 mt-1" />
                        <span>
                          <strong>¡NUEVO!</strong> Comparte por WhatsApp y aumenta tus posibilidades de recompensas
                        </span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="referidos">
                  <div className="rounded-md border overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                        <div>Nombre</div>
                        <div>Fecha</div>
                        <div>Estado</div>
                        <div>Recompensa</div>
                        <div>Acciones</div>
                      </div>
                      {referidos.map((referido) => (
                        <div key={referido.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                          <div>{referido.nombre}</div>
                          <div>{referido.fecha}</div>
                          <div>
                            {referido.estado === "registrado" ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                Registrado
                              </Badge>
                            ) : referido.estado === "verificando" ? (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                Verificando
                              </Badge>
                            ) : referido.estado === "prestamo_activo" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                Préstamo activo
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                                Préstamo pagado
                              </Badge>
                            )}
                          </div>
                          <div>
                            {referido.recompensaObtenida ? (
                              <span className="text-green-600 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {referido.recompensa}
                              </span>
                            ) : (
                              <span className="text-gray-500">Pendiente</span>
                            )}
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              Recordar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recompensas">
                  <div className="rounded-md border overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                        <div>Tipo</div>
                        <div>Descripción</div>
                        <div>Fecha</div>
                        <div>Referido</div>
                        <div>Estado</div>
                      </div>
                      {recompensas.map((recompensa) => (
                        <div key={recompensa.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                          <div>
                            {recompensa.tipo === "credito" ? (
                              <div className="flex items-center">
                                <Gift className="h-4 w-4 text-green-600 mr-1" />
                                <span>Crédito</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-purple-600 mr-1" />
                                <span>Descuento</span>
                              </div>
                            )}
                          </div>
                          <div>{recompensa.descripcion}</div>
                          <div>{recompensa.fecha}</div>
                          <div>{recompensa.referido}</div>
                          <div>
                            {recompensa.estado === "aplicado" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                Aplicado
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                                Pendiente
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-700">Recompensas acumuladas</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <p className="text-sm text-gray-600">Crédito total ganado</p>
                            <p className="text-2xl font-bold text-primary">$75.00</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <p className="text-sm text-gray-600">Descuento en tasa actual</p>
                            <p className="text-2xl font-bold text-primary">0%</p>
                          </div>
                        </div>
                        <p className="text-sm text-blue-700 mt-3">
                          Invita a 3 amigos más para obtener un 5% de descuento en tu próximo préstamo.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                <p className="text-gray-600">
                  No hay límite en la cantidad de amigos que puedes referir. ¡Mientras más refieran, más ganas!
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Componente de onboarding */}
      <GuideAvatar
        message="¡Invita a tus amigos y gana recompensas! Por cada amigo que solicite un préstamo, ambos recibirán beneficios exclusivos."
        position="bottom-right"
      />
    </main>
  )
}
