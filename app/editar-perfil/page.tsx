"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Phone, Home, CreditCard, Upload, AlertTriangle } from "lucide-react"

export default function EditarPerfil() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Estados para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    telefono: "+1 (555) 123-4567",
    direccion: "Calle Principal 123",
    ciudad: "Ciudad Ejemplo",
    codigoPostal: "12345",
    pais: "México",
    banco: "Banco Nacional",
    numeroCuenta: "**** **** **** 1234",
    titularCuenta: "Juan Pérez",
    notificacionesEmail: true,
    notificacionesSMS: true,
    notificacionesPush: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      router.push("/perfil")
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Editar Perfil</h1>
            <p className="text-gray-600">Actualiza tu información personal y preferencias</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="bancaria">Información Bancaria</TabsTrigger>
                <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tus datos personales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          <User className="h-12 w-12 text-primary" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                          type="button"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="sr-only">Subir foto</span>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Haz clic para cambiar tu foto de perfil</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">
                          <User className="h-4 w-4 inline mr-2" />
                          Nombre completo
                        </Label>
                        <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Correo electrónico
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Teléfono
                        </Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="direccion">
                          <Home className="h-4 w-4 inline mr-2" />
                          Dirección
                        </Label>
                        <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ciudad">Ciudad</Label>
                        <Input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="codigoPostal">Código Postal</Label>
                        <Input
                          id="codigoPostal"
                          name="codigoPostal"
                          value={formData.codigoPostal}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="pais">País</Label>
                        <Input id="pais" name="pais" value={formData.pais} onChange={handleChange} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.push("/perfil")}>
                      Cancelar
                    </Button>
                    <div className="flex gap-2">
                      <Button type="button" onClick={() => setActiveTab("bancaria")}>
                        Siguiente
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="bancaria">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Bancaria</CardTitle>
                    <CardDescription>Actualiza tus datos bancarios para recibir y pagar préstamos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-3 mb-6">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">Información importante</h4>
                        <p className="text-sm text-yellow-700">
                          Tus datos bancarios son utilizados únicamente para procesar depósitos y pagos. Esta
                          información se almacena de forma segura y encriptada.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="banco">
                          <CreditCard className="h-4 w-4 inline mr-2" />
                          Banco
                        </Label>
                        <Input id="banco" name="banco" value={formData.banco} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numeroCuenta">Número de cuenta</Label>
                        <Input
                          id="numeroCuenta"
                          name="numeroCuenta"
                          value={formData.numeroCuenta}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titularCuenta">Titular de la cuenta</Label>
                        <Input
                          id="titularCuenta"
                          name="titularCuenta"
                          value={formData.titularCuenta}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("personal")}>
                      Anterior
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("notificaciones")}>
                      Siguiente
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notificaciones">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de notificaciones</CardTitle>
                    <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notificacionesEmail">Notificaciones por email</Label>
                          <p className="text-sm text-gray-500">
                            Recibe actualizaciones sobre tus préstamos y pagos por correo electrónico
                          </p>
                        </div>
                        <Switch
                          id="notificacionesEmail"
                          checked={formData.notificacionesEmail}
                          onCheckedChange={(checked) => handleSwitchChange("notificacionesEmail", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notificacionesSMS">Notificaciones por SMS</Label>
                          <p className="text-sm text-gray-500">
                            Recibe recordatorios de pago y alertas importantes por mensaje de texto
                          </p>
                        </div>
                        <Switch
                          id="notificacionesSMS"
                          checked={formData.notificacionesSMS}
                          onCheckedChange={(checked) => handleSwitchChange("notificacionesSMS", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notificacionesPush">Notificaciones push</Label>
                          <p className="text-sm text-gray-500">
                            Recibe notificaciones en tiempo real en tu dispositivo
                          </p>
                        </div>
                        <Switch
                          id="notificacionesPush"
                          checked={formData.notificacionesPush}
                          onCheckedChange={(checked) => handleSwitchChange("notificacionesPush", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("bancaria")}>
                      Anterior
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </div>
    </main>
  )
}
