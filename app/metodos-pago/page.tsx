"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  CreditCard,
  Landmark,
  Wallet,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertTriangle,
  Shield,
  CalendarIcon,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { LoadingScreen } from "@/components/loading-screen"

// Tipos para los métodos de pago
type PaymentMethodType = "tarjeta" | "banco" | "efectivo"

interface PaymentMethod {
  id: string
  type: PaymentMethodType
  name: string
  details: string
  isDefault: boolean
  lastUsed?: string
  expiryDate?: string
}

export default function MetodosPago() {
  const { toast } = useToast()
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<PaymentMethodType>("tarjeta")
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [isEditingMethod, setIsEditingMethod] = useState<string | null>(null)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null)
  const [newMethodType, setNewMethodType] = useState<PaymentMethodType>("tarjeta")
  const [isAutoPay, setIsAutoPay] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/metodos-pago")
    } else if (!authLoading) {
      // Simular carga de datos
      setTimeout(() => {
        setIsPageLoading(false)
      }, 500)
    }
  }, [user, authLoading, router])

  // Estado para los métodos de pago (simulados)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      type: "tarjeta",
      name: "Visa terminada en 4242",
      details: "Juan Pérez • Expira 12/25",
      isDefault: true,
      lastUsed: "15/04/2023",
      expiryDate: "12/25",
    },
    {
      id: "bank-1",
      type: "banco",
      name: "Cuenta Bancomer",
      details: "Cuenta terminada en 6789",
      isDefault: false,
      lastUsed: "03/03/2023",
    },
    {
      id: "cash-1",
      type: "efectivo",
      name: "Pago en OXXO",
      details: "Genera un código para pagar",
      isDefault: false,
    },
  ])

  // Si está cargando o el usuario no está autenticado, mostrar pantalla de carga
  if (authLoading || isPageLoading || !user) {
    return <LoadingScreen />
  }

  // Filtrar métodos por tipo
  const filteredMethods = paymentMethods.filter((method) => method.type === activeTab)

  // Función para agregar un nuevo método de pago
  const addPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault()

    // En una implementación real, aquí se procesaría el formulario
    // y se enviarían los datos al servidor

    const newMethod: PaymentMethod = {
      id: `${newMethodType}-${Date.now()}`,
      type: newMethodType,
      name:
        newMethodType === "tarjeta"
          ? "Nueva Visa terminada en 1234"
          : newMethodType === "banco"
            ? "Nueva cuenta bancaria"
            : "Nuevo método de efectivo",
      details:
        newMethodType === "tarjeta"
          ? "Juan Pérez • Expira 06/26"
          : newMethodType === "banco"
            ? "Cuenta terminada en 5678"
            : "Genera un código para pagar",
      isDefault: paymentMethods.length === 0,
      expiryDate: newMethodType === "tarjeta" ? "06/26" : undefined,
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setIsAddingMethod(false)

    toast({
      title: "Método de pago agregado",
      description: "Tu nuevo método de pago ha sido agregado exitosamente.",
    })
  }

  // Función para eliminar un método de pago
  const deletePaymentMethod = (id: string) => {
    const methodToDelete = paymentMethods.find((method) => method.id === id)
    const updatedMethods = paymentMethods.filter((method) => method.id !== id)

    // Si el método eliminado era el predeterminado, establecer otro como predeterminado
    if (methodToDelete?.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }

    setPaymentMethods(updatedMethods)
    setIsConfirmingDelete(null)

    toast({
      title: "Método de pago eliminado",
      description: "El método de pago ha sido eliminado exitosamente.",
    })
  }

  // Función para establecer un método como predeterminado
  const setDefaultMethod = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedMethods)

    toast({
      title: "Método predeterminado actualizado",
      description: "Tu método de pago predeterminado ha sido actualizado.",
    })
  }

  // Función para guardar la configuración de pago automático
  const saveAutoPaySettings = () => {
    toast({
      title: "Configuración guardada",
      description: isAutoPay
        ? "Los pagos automáticos han sido activados."
        : "Los pagos automáticos han sido desactivados.",
    })
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30 pt-24">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Métodos de Pago</h1>
              <p className="text-gray-600">Administra tus opciones de pago de forma segura</p>
            </div>
            <Button onClick={() => setIsAddingMethod(true)} className="bg-accent hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" />
              Agregar método
            </Button>
          </div>

          <Tabs
            defaultValue="tarjeta"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as PaymentMethodType)}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="tarjeta" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Tarjetas
              </TabsTrigger>
              <TabsTrigger value="banco" className="flex items-center">
                <Landmark className="mr-2 h-4 w-4" />
                Cuentas bancarias
              </TabsTrigger>
              <TabsTrigger value="efectivo" className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Efectivo
              </TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "tarjeta"
                    ? "Tarjetas guardadas"
                    : activeTab === "banco"
                      ? "Cuentas bancarias"
                      : "Opciones de pago en efectivo"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "tarjeta"
                    ? "Administra tus tarjetas de crédito y débito"
                    : activeTab === "banco"
                      ? "Administra tus cuentas bancarias para transferencias"
                      : "Genera códigos para pagar en establecimientos"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-neutral/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {activeTab === "tarjeta" ? (
                        <CreditCard className="h-8 w-8 text-gray-400" />
                      ) : activeTab === "banco" ? (
                        <Landmark className="h-8 w-8 text-gray-400" />
                      ) : (
                        <Wallet className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-500">No hay métodos guardados</h3>
                    <p className="text-gray-400 mt-1 mb-4">
                      {activeTab === "tarjeta"
                        ? "Agrega una tarjeta para realizar pagos más rápido"
                        : activeTab === "banco"
                          ? "Agrega una cuenta bancaria para transferencias"
                          : "Configura opciones para pagar en efectivo"}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewMethodType(activeTab)
                        setIsAddingMethod(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar {activeTab === "tarjeta" ? "tarjeta" : activeTab === "banco" ? "cuenta" : "método"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 rounded-lg border ${
                          method.isDefault ? "bg-primary/5 border-primary/20" : "bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${method.isDefault ? "bg-primary/10" : "bg-neutral"}`}>
                              {method.type === "tarjeta" ? (
                                <CreditCard className="h-5 w-5 text-primary" />
                              ) : method.type === "banco" ? (
                                <Landmark className="h-5 w-5 text-primary" />
                              ) : (
                                <Wallet className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold">{method.name}</h3>
                                {method.isDefault && (
                                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                    Predeterminado
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{method.details}</p>
                              {method.lastUsed && (
                                <p className="text-gray-500 text-xs mt-1">Último uso: {method.lastUsed}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!method.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDefaultMethod(method.id)}
                                className="text-gray-500 hover:text-primary"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Establecer como predeterminado</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsEditingMethod(method.id)}
                              className="text-gray-500 hover:text-primary"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsConfirmingDelete(method.id)}
                              className="text-gray-500 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                  <Shield className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">
                    Tu información de pago está protegida con encriptación de nivel bancario. Nunca compartimos tus
                    datos financieros con terceros.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </Tabs>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Pagos automáticos
                </CardTitle>
                <CardDescription>
                  Configura pagos automáticos para nunca perder una fecha de vencimiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Activar pagos automáticos</h3>
                    <p className="text-sm text-gray-500">
                      Se realizará el cargo automáticamente en la fecha de vencimiento
                    </p>
                  </div>
                  <Switch checked={isAutoPay} onCheckedChange={setIsAutoPay} />
                </div>

                {isAutoPay && (
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="font-medium mb-4">Método para pagos automáticos</h3>
                    <RadioGroup defaultValue={paymentMethods.find((m) => m.isDefault)?.id || ""}>
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex items-center">
                            {method.type === "tarjeta" ? (
                              <CreditCard className="mr-2 h-4 w-4" />
                            ) : method.type === "banco" ? (
                              <Landmark className="mr-2 h-4 w-4" />
                            ) : (
                              <Wallet className="mr-2 h-4 w-4" />
                            )}
                            {method.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <div className="mt-4 flex items-start gap-2 text-sm bg-amber-50 p-3 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">
                        Asegúrate de tener fondos suficientes en la fecha de vencimiento para evitar cargos por pago
                        tardío.
                      </p>
                    </div>
                  </div>
                )}

                <Button onClick={saveAutoPaySettings} className="w-full">
                  Guardar configuración
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Diálogo para agregar método de pago */}
      <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar método de pago</DialogTitle>
            <DialogDescription>Ingresa los detalles de tu nuevo método de pago</DialogDescription>
          </DialogHeader>
          <form onSubmit={addPaymentMethod}>
            <div className="grid gap-4 py-4">
              <div className="mb-4">
                <Label htmlFor="payment-type" className="mb-2 block">
                  Tipo de método
                </Label>
                <RadioGroup
                  id="payment-type"
                  value={newMethodType}
                  onValueChange={(value) => setNewMethodType(value as PaymentMethodType)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="tarjeta" id="tarjeta-new" className="peer sr-only" />
                    <Label
                      htmlFor="tarjeta-new"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Tarjeta
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="banco" id="banco-new" className="peer sr-only" />
                    <Label
                      htmlFor="banco-new"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Landmark className="mb-3 h-6 w-6" />
                      Banco
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="efectivo" id="efectivo-new" className="peer sr-only" />
                    <Label
                      htmlFor="efectivo-new"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Wallet className="mb-3 h-6 w-6" />
                      Efectivo
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {newMethodType === "tarjeta" && (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                      <Input id="card-name" placeholder="Juan Pérez" required />
                    </div>
                    <div>
                      <Label htmlFor="card-number">Número de tarjeta</Label>
                      <Input id="card-number" placeholder="4242 4242 4242 4242" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Fecha de expiración</Label>
                        <Input id="expiry" placeholder="MM/AA" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {newMethodType === "banco" && (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="bank-name">Banco</Label>
                      <Input id="bank-name" placeholder="Nombre del banco" required />
                    </div>
                    <div>
                      <Label htmlFor="account-number">Número de cuenta</Label>
                      <Input id="account-number" placeholder="Número de cuenta" required />
                    </div>
                    <div>
                      <Label htmlFor="account-holder">Titular de la cuenta</Label>
                      <Input id="account-holder" placeholder="Nombre del titular" required />
                    </div>
                  </div>
                </>
              )}

              {newMethodType === "efectivo" && (
                <>
                  <div className="space-y-4">
                    <div className="bg-neutral p-4 rounded-lg">
                      <h3 className="font-bold mb-2">Instrucciones para pago en efectivo</h3>
                      <p className="text-gray-600 mb-4">
                        Podrás generar un código de pago y acudir a cualquiera de nuestros establecimientos afiliados
                        para realizar tu pago en efectivo.
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Selecciona esta opción al momento de pagar</li>
                        <li>Genera tu código de pago</li>
                        <li>Acude a cualquier establecimiento afiliado</li>
                        <li>Muestra el código al cajero</li>
                        <li>Realiza tu pago en efectivo</li>
                      </ol>
                    </div>
                    <div>
                      <Label htmlFor="cash-alias">Nombre para identificar este método (opcional)</Label>
                      <Input id="cash-alias" placeholder="Ej: Pago en OXXO" />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <Switch id="make-default" />
                <Label htmlFor="make-default">Establecer como método predeterminado</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddingMethod(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar método</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo para confirmar eliminación */}
      <Dialog open={isConfirmingDelete !== null} onOpenChange={() => setIsConfirmingDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>¿Estás seguro de que deseas eliminar este método de pago?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-start gap-2 text-sm bg-amber-50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">
                Esta acción no se puede deshacer. El método de pago será eliminado permanentemente.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmingDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => isConfirmingDelete && deletePaymentMethod(isConfirmingDelete)}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar método de pago */}
      <Dialog open={isEditingMethod !== null} onOpenChange={() => setIsEditingMethod(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar método de pago</DialogTitle>
            <DialogDescription>Actualiza los detalles de tu método de pago</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsEditingMethod(null)
              toast({
                title: "Método actualizado",
                description: "Los cambios han sido guardados exitosamente.",
              })
            }}
          >
            <div className="grid gap-4 py-4">
              {isEditingMethod && paymentMethods.find((m) => m.id === isEditingMethod)?.type === "tarjeta" && (
                <>
                  <div>
                    <Label htmlFor="edit-expiry">Fecha de expiración</Label>
                    <Input
                      id="edit-expiry"
                      placeholder="MM/AA"
                      defaultValue={paymentMethods.find((m) => m.id === isEditingMethod)?.expiryDate || ""}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-alias">Nombre para identificar esta tarjeta</Label>
                    <Input
                      id="edit-alias"
                      placeholder="Ej: Tarjeta personal"
                      defaultValue={
                        paymentMethods
                          .find((m) => m.id === isEditingMethod)
                          ?.name.replace("Visa terminada en ", "Visa ") || ""
                      }
                    />
                  </div>
                </>
              )}

              {isEditingMethod && paymentMethods.find((m) => m.id === isEditingMethod)?.type === "banco" && (
                <>
                  <div>
                    <Label htmlFor="edit-bank-name">Banco</Label>
                    <Input
                      id="edit-bank-name"
                      placeholder="Nombre del banco"
                      defaultValue={
                        paymentMethods.find((m) => m.id === isEditingMethod)?.name.replace(" Cuenta", "") || ""
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-account-holder">Titular de la cuenta</Label>
                    <Input
                      id="edit-account-holder"
                      placeholder="Nombre del titular"
                      defaultValue="Juan Pérez"
                      required
                    />
                  </div>
                </>
              )}

              {isEditingMethod && paymentMethods.find((m) => m.id === isEditingMethod)?.type === "efectivo" && (
                <>
                  <div>
                    <Label htmlFor="edit-cash-alias">Nombre para identificar este método</Label>
                    <Input
                      id="edit-cash-alias"
                      placeholder="Ej: Pago en OXXO"
                      defaultValue={paymentMethods.find((m) => m.id === isEditingMethod)?.name || ""}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="edit-make-default"
                  checked={
                    isEditingMethod ? paymentMethods.find((m) => m.id === isEditingMethod)?.isDefault || false : false
                  }
                  disabled={
                    isEditingMethod ? paymentMethods.find((m) => m.id === isEditingMethod)?.isDefault || false : false
                  }
                />
                <Label htmlFor="edit-make-default">
                  {isEditingMethod && paymentMethods.find((m) => m.id === isEditingMethod)?.isDefault
                    ? "Este es tu método predeterminado"
                    : "Establecer como método predeterminado"}
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditingMethod(null)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
