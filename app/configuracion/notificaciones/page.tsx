"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bell, Clock, Calendar, Info, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConfiguracionNotificaciones() {
  const { toast } = useToast()
  const [notificacionesActivas, setNotificacionesActivas] = useState(true)
  const [configuracion, setConfiguracion] = useState({
    pagos: {
      recordatorios: true,
      confirmaciones: true,
      vencimientos: true,
    },
    prestamos: {
      solicitudes: true,
      aprobaciones: true,
      rechazos: true,
      ofertas: true,
    },
    cuenta: {
      cambiosNivel: true,
      inicioSesion: true,
      cambiosConfig: false,
    },
    sistema: {
      actualizaciones: true,
      mantenimiento: true,
      promociones: false,
    },
  })

  const [horarioPreferido, setHorarioPreferido] = useState({
    inicio: "09:00",
    fin: "21:00",
    silencioso: false,
  })

  // Función para solicitar permisos de notificaciones
  const solicitarPermisos = async () => {
    try {
      // En una implementación real, esto solicitaría permisos del navegador
      // y registraría el service worker
      toast({
        title: "Permisos solicitados",
        description: "Has activado las notificaciones push en este dispositivo.",
      })
      setNotificacionesActivas(true)
    } catch (error) {
      toast({
        title: "Error al activar notificaciones",
        description: "No se pudieron activar las notificaciones. Verifica los permisos del navegador.",
        variant: "destructive",
      })
    }
  }

  // Función para actualizar configuración
  const actualizarConfiguracion = () => {
    // En una implementación real, esto enviaría la configuración al servidor
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias de notificaciones han sido actualizadas.",
    })
  }

  // Función para cambiar un valor específico de configuración
  const cambiarConfiguracion = (categoria: string, tipo: string, valor: boolean) => {
    setConfiguracion((prev) => ({
      ...prev,
      [categoria]: {
        ...prev[categoria as keyof typeof prev],
        [tipo]: valor,
      },
    }))
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Link href="/configuracion" className="flex items-center text-gray-600 hover:text-primary mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Configuración
            </Link>
            <h1 className="text-3xl font-bold text-primary mb-2">Configuración de Notificaciones</h1>
            <p className="text-gray-600">Personaliza cómo y cuándo quieres recibir notificaciones</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notificaciones Push
                </CardTitle>
                <CardDescription>
                  Recibe alertas importantes incluso cuando no estás usando la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Activar notificaciones push</h3>
                    <p className="text-sm text-gray-500">
                      Recibirás notificaciones en este dispositivo según tus preferencias
                    </p>
                  </div>
                  <Switch
                    checked={notificacionesActivas}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        solicitarPermisos()
                      } else {
                        setNotificacionesActivas(false)
                        toast({
                          title: "Notificaciones desactivadas",
                          description: "Ya no recibirás notificaciones push en este dispositivo.",
                        })
                      }
                    }}
                  />
                </div>

                {notificacionesActivas && (
                  <>
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Horario preferido
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="horario-inicio">Desde</Label>
                          <input
                            type="time"
                            id="horario-inicio"
                            value={horarioPreferido.inicio}
                            onChange={(e) => setHorarioPreferido({ ...horarioPreferido, inicio: e.target.value })}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="horario-fin">Hasta</Label>
                          <input
                            type="time"
                            id="horario-fin"
                            value={horarioPreferido.fin}
                            onChange={(e) => setHorarioPreferido({ ...horarioPreferido, fin: e.target.value })}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="modo-silencioso"
                          checked={horarioPreferido.silencioso}
                          onCheckedChange={(checked) =>
                            setHorarioPreferido({ ...horarioPreferido, silencioso: checked })
                          }
                        />
                        <Label htmlFor="modo-silencioso">Modo silencioso (sin sonido)</Label>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <Tabs defaultValue="pagos">
                        <TabsList className="grid grid-cols-4 mb-6">
                          <TabsTrigger value="pagos">Pagos</TabsTrigger>
                          <TabsTrigger value="prestamos">Préstamos</TabsTrigger>
                          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                          <TabsTrigger value="sistema">Sistema</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pagos" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-recordatorios" className="font-medium">
                                Recordatorios de pago
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe alertas 3 días y 1 día antes del vencimiento
                              </p>
                            </div>
                            <Switch
                              id="notif-recordatorios"
                              checked={configuracion.pagos.recordatorios}
                              onCheckedChange={(checked) => cambiarConfiguracion("pagos", "recordatorios", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-confirmaciones" className="font-medium">
                                Confirmaciones de pago
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe confirmación cuando tu pago ha sido procesado
                              </p>
                            </div>
                            <Switch
                              id="notif-confirmaciones"
                              checked={configuracion.pagos.confirmaciones}
                              onCheckedChange={(checked) => cambiarConfiguracion("pagos", "confirmaciones", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-vencimientos" className="font-medium">
                                Alertas de vencimiento
                              </Label>
                              <p className="text-sm text-gray-500">Recibe alertas cuando un pago se ha vencido</p>
                            </div>
                            <Switch
                              id="notif-vencimientos"
                              checked={configuracion.pagos.vencimientos}
                              onCheckedChange={(checked) => cambiarConfiguracion("pagos", "vencimientos", checked)}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="prestamos" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-solicitudes" className="font-medium">
                                Estado de solicitudes
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe actualizaciones sobre el estado de tus solicitudes
                              </p>
                            </div>
                            <Switch
                              id="notif-solicitudes"
                              checked={configuracion.prestamos.solicitudes}
                              onCheckedChange={(checked) => cambiarConfiguracion("prestamos", "solicitudes", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-aprobaciones" className="font-medium">
                                Aprobaciones
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe notificación cuando tu préstamo es aprobado
                              </p>
                            </div>
                            <Switch
                              id="notif-aprobaciones"
                              checked={configuracion.prestamos.aprobaciones}
                              onCheckedChange={(checked) => cambiarConfiguracion("prestamos", "aprobaciones", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-rechazos" className="font-medium">
                                Rechazos
                              </Label>
                              <p className="text-sm text-gray-500">Recibe notificación si tu solicitud es rechazada</p>
                            </div>
                            <Switch
                              id="notif-rechazos"
                              checked={configuracion.prestamos.rechazos}
                              onCheckedChange={(checked) => cambiarConfiguracion("prestamos", "rechazos", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-ofertas" className="font-medium">
                                Ofertas especiales
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe notificaciones sobre ofertas personalizadas
                              </p>
                            </div>
                            <Switch
                              id="notif-ofertas"
                              checked={configuracion.prestamos.ofertas}
                              onCheckedChange={(checked) => cambiarConfiguracion("prestamos", "ofertas", checked)}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="cuenta" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-cambiosNivel" className="font-medium">
                                Cambios de nivel
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe notificación cuando subas de nivel de confianza
                              </p>
                            </div>
                            <Switch
                              id="notif-cambiosNivel"
                              checked={configuracion.cuenta.cambiosNivel}
                              onCheckedChange={(checked) => cambiarConfiguracion("cuenta", "cambiosNivel", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-inicioSesion" className="font-medium">
                                Inicios de sesión
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe alertas cuando se inicie sesión en tu cuenta
                              </p>
                            </div>
                            <Switch
                              id="notif-inicioSesion"
                              checked={configuracion.cuenta.inicioSesion}
                              onCheckedChange={(checked) => cambiarConfiguracion("cuenta", "inicioSesion", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-cambiosConfig" className="font-medium">
                                Cambios en configuración
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe alertas cuando se modifique la configuración de tu cuenta
                              </p>
                            </div>
                            <Switch
                              id="notif-cambiosConfig"
                              checked={configuracion.cuenta.cambiosConfig}
                              onCheckedChange={(checked) => cambiarConfiguracion("cuenta", "cambiosConfig", checked)}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="sistema" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-actualizaciones" className="font-medium">
                                Actualizaciones de la app
                              </Label>
                              <p className="text-sm text-gray-500">
                                Recibe notificaciones sobre nuevas funcionalidades
                              </p>
                            </div>
                            <Switch
                              id="notif-actualizaciones"
                              checked={configuracion.sistema.actualizaciones}
                              onCheckedChange={(checked) => cambiarConfiguracion("sistema", "actualizaciones", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-mantenimiento" className="font-medium">
                                Mantenimiento programado
                              </Label>
                              <p className="text-sm text-gray-500">Recibe alertas sobre periodos de mantenimiento</p>
                            </div>
                            <Switch
                              id="notif-mantenimiento"
                              checked={configuracion.sistema.mantenimiento}
                              onCheckedChange={(checked) => cambiarConfiguracion("sistema", "mantenimiento", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="notif-promociones" className="font-medium">
                                Promociones generales
                              </Label>
                              <p className="text-sm text-gray-500">Recibe información sobre promociones y novedades</p>
                            </div>
                            <Switch
                              id="notif-promociones"
                              checked={configuracion.sistema.promociones}
                              onCheckedChange={(checked) => cambiarConfiguracion("sistema", "promociones", checked)}
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </>
                )}

                <div className="flex flex-col space-y-4 pt-4">
                  <div className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-lg">
                    <Info className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">
                      Las notificaciones importantes relacionadas con tu cuenta y seguridad siempre se enviarán,
                      independientemente de tu configuración.
                    </p>
                  </div>

                  <Button onClick={actualizarConfiguracion} className="bg-accent hover:bg-accent/90">
                    Guardar configuración
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ejemplos de notificaciones</CardTitle>
                <CardDescription>Así se verán las notificaciones en tu dispositivo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Recordatorio de pago</h3>
                      <p className="text-sm text-gray-600">Tu pago de $250.00 vence en 3 días.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Préstamo aprobado</h3>
                      <p className="text-sm text-gray-600">¡Felicidades! Tu préstamo de $350.00 ha sido aprobado.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Inicio de sesión detectado</h3>
                      <p className="text-sm text-gray-600">
                        Se ha iniciado sesión en tu cuenta desde un nuevo dispositivo.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
