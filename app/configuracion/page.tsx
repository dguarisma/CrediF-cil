"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Bell, Settings, Shield, CreditCard, Calendar, Mail, Smartphone, Lock, User, LogOut } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function Configuracion() {
  // Estados para las configuraciones
  const [notificacionesEmail, setNotificacionesEmail] = useState(true)
  const [notificacionesSMS, setNotificacionesSMS] = useState(true)
  const [notificacionesPush, setNotificacionesPush] = useState(true)

  const [notifPrestamos, setNotifPrestamos] = useState(true)
  const [notifPagos, setNotifPagos] = useState(true)
  const [notifSistema, setNotifSistema] = useState(true)
  const [notifPromociones, setNotifPromociones] = useState(false)

  const [metodoAutenticacion, setMetodoAutenticacion] = useState("email")

  const [isSaving, setIsSaving] = useState(false)

  // Dentro del componente Configuracion, añadir:
  const { theme, setTheme } = useTheme()

  // Función para guardar cambios
  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false)
      // Mostrar mensaje de éxito (en una implementación real)
    }, 1000)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Configuración</h1>
              <p className="text-gray-600">Personaliza tu experiencia en CrediFácil</p>
            </div>
          </div>

          <Tabs defaultValue="notificaciones">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-64 space-y-6">
                <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
                  <TabsTrigger
                    value="notificaciones"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-primary/10"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notificaciones
                  </TabsTrigger>
                  <TabsTrigger
                    value="cuenta"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-primary/10"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Cuenta
                  </TabsTrigger>
                  <TabsTrigger
                    value="seguridad"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-primary/10"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Seguridad
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferencias"
                    className="justify-start px-3 py-2 h-auto data-[state=active]:bg-primary/10"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Preferencias
                  </TabsTrigger>
                </TabsList>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-3 text-red-500">
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Cerrar sesión</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex-1">
                <TabsContent value="notificaciones" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración de notificaciones</CardTitle>
                      <CardDescription>Personaliza cómo y cuándo recibes notificaciones</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Canales de notificación</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Mail className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="email-notif" className="font-medium">
                                  Correo electrónico
                                </Label>
                                <p className="text-sm text-gray-500">Recibe notificaciones por email</p>
                              </div>
                            </div>
                            <Switch
                              id="email-notif"
                              checked={notificacionesEmail}
                              onCheckedChange={setNotificacionesEmail}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Smartphone className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="sms-notif" className="font-medium">
                                  SMS
                                </Label>
                                <p className="text-sm text-gray-500">Recibe notificaciones por mensaje de texto</p>
                              </div>
                            </div>
                            <Switch id="sms-notif" checked={notificacionesSMS} onCheckedChange={setNotificacionesSMS} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="push-notif" className="font-medium">
                                  Notificaciones push
                                </Label>
                                <p className="text-sm text-gray-500">Recibe notificaciones en tu dispositivo</p>
                              </div>
                            </div>
                            <Switch
                              id="push-notif"
                              checked={notificacionesPush}
                              onCheckedChange={setNotificacionesPush}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Tipos de notificaciones</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="loan-notif" className="font-medium">
                                  Préstamos
                                </Label>
                                <p className="text-sm text-gray-500">Aprobaciones, rechazos y actualizaciones</p>
                              </div>
                            </div>
                            <Switch id="loan-notif" checked={notifPrestamos} onCheckedChange={setNotifPrestamos} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="payment-notif" className="font-medium">
                                  Pagos
                                </Label>
                                <p className="text-sm text-gray-500">Recordatorios, confirmaciones y vencimientos</p>
                              </div>
                            </div>
                            <Switch id="payment-notif" checked={notifPagos} onCheckedChange={setNotifPagos} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Settings className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="system-notif" className="font-medium">
                                  Sistema
                                </Label>
                                <p className="text-sm text-gray-500">Actualizaciones de la plataforma y seguridad</p>
                              </div>
                            </div>
                            <Switch id="system-notif" checked={notifSistema} onCheckedChange={setNotifSistema} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-primary" />
                              <div>
                                <Label htmlFor="promo-notif" className="font-medium">
                                  Promociones
                                </Label>
                                <p className="text-sm text-gray-500">Ofertas especiales y novedades</p>
                              </div>
                            </div>
                            <Switch id="promo-notif" checked={notifPromociones} onCheckedChange={setNotifPromociones} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="cuenta" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información de la cuenta</CardTitle>
                      <CardDescription>Actualiza tu información personal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre completo</Label>
                          <Input id="nombre" defaultValue="Juan Pérez" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Input id="email" type="email" defaultValue="juan@ejemplo.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input id="telefono" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="direccion">Dirección</Label>
                          <Input id="direccion" defaultValue="Calle Principal 123" />
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Información bancaria</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="banco">Banco</Label>
                            <Input id="banco" defaultValue="Banco Nacional" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cuenta">Número de cuenta</Label>
                            <Input id="cuenta" defaultValue="**** **** **** 1234" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="seguridad" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Seguridad</CardTitle>
                      <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Cambiar contraseña</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Contraseña actual</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nueva contraseña</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Autenticación de dos factores</h3>
                        <RadioGroup value={metodoAutenticacion} onValueChange={setMetodoAutenticacion}>
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="email" id="auth-email" />
                            <Label htmlFor="auth-email" className="font-normal">
                              Correo electrónico
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="sms" id="auth-sms" />
                            <Label htmlFor="auth-sms" className="font-normal">
                              SMS
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="app" id="auth-app" />
                            <Label htmlFor="auth-app" className="font-normal">
                              Aplicación de autenticación
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Lock className="h-5 w-5 text-primary" />
                            <div>
                              <Label htmlFor="session-timeout" className="font-medium">
                                Cierre de sesión automático
                              </Label>
                              <p className="text-sm text-gray-500">Cerrar sesión después de inactividad</p>
                            </div>
                          </div>
                          <Switch id="session-timeout" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="preferencias" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferencias</CardTitle>
                      <CardDescription>Personaliza tu experiencia en la aplicación</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Idioma</h3>
                        <RadioGroup defaultValue="es">
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="es" id="lang-es" />
                            <Label htmlFor="lang-es" className="font-normal">
                              Español
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="en" id="lang-en" />
                            <Label htmlFor="lang-en" className="font-normal">
                              English
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Apariencia</h3>
                        <RadioGroup
                          value={theme}
                          onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                        >
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="light" id="theme-light" />
                            <Label htmlFor="theme-light" className="font-normal">
                              Claro
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="dark" id="theme-dark" />
                            <Label htmlFor="theme-dark" className="font-normal">
                              Oscuro
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="system" id="theme-system" />
                            <Label htmlFor="theme-system" className="font-normal">
                              Usar configuración del sistema
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="analytics" className="font-medium">
                              Compartir datos de uso anónimos
                            </Label>
                            <p className="text-sm text-gray-500">Ayúdanos a mejorar CrediFácil</p>
                          </div>
                          <Switch id="analytics" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
