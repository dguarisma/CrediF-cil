"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, Clock, CheckCircle, AlertCircle, TrendingUp, Award, Wallet, Bell, Info } from "lucide-react"
import Link from "next/link"
import { LoadingScreen } from "@/components/loading-screen"

// Añadir las importaciones para los componentes de onboarding
import { GuideAvatar } from "@/components/onboarding/guide-avatar"
import { RewardsList } from "@/components/onboarding/rewards"

// Añadir el componente GuideAvatar al final del componente principal
export default function Perfil() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "general"
  const transactionId = searchParams.get("transaction")

  const [nivelConfianza, setNivelConfianza] = useState(2)
  const [limiteCredito, setLimiteCredito] = useState(250)
  const [saldoDisponible, setSaldoDisponible] = useState(75) // Saldo disponible
  const [tienePrestamoActivo, setTienePrestamoActivo] = useState(true) // Estado para controlar si tiene préstamo activo
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar la carga

  // Estados para los modales
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)
  const [pagoSeleccionado, setPagoSeleccionado] = useState<any>(null)
  const [modalSolicitudAbierto, setModalSolicitudAbierto] = useState(false)
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false)

  // Datos de ejemplo para el historial de pagos
  const historialPagos = [
    {
      id: 1,
      fecha: "15/03/2023",
      monto: 120,
      estado: "pagado",
      diasAtraso: 0,
      transactionId: "PAY-345678",
      metodoPago: "Efectivo",
      referencia: "REF-123456",
      descripcion: "Pago de préstamo",
      cuentaDestino: "N/A",
      tasaInteres: 15,
      comision: 2,
      totalPagado: 122,
      fechaVencimiento: "15/03/2023",
    },
    {
      id: 2,
      fecha: "20/04/2023",
      monto: 150,
      estado: "pagado",
      diasAtraso: 0,
      transactionId: "PAY-789012",
      metodoPago: "Tarjeta de crédito",
      referencia: "REF-789012",
      descripcion: "Pago de préstamo",
      cuentaDestino: "****5678",
      tasaInteres: 15,
      comision: 2,
      totalPagado: 152,
      fechaVencimiento: "20/04/2023",
    },
    {
      id: 3,
      fecha: "10/05/2023",
      monto: 200,
      estado: "pagado",
      diasAtraso: 2,
      transactionId: "LOAN-123456",
      metodoPago: "Transferencia bancaria",
      referencia: "REF-345678",
      descripcion: "Pago de préstamo",
      cuentaDestino: "****1234",
      tasaInteres: 15,
      comision: 2,
      totalPagado: 202,
      fechaVencimiento: "08/05/2023",
    },
    {
      id: 4,
      fecha: "05/06/2023",
      monto: 250,
      estado: "pendiente",
      diasAtraso: 0,
      metodoPago: "Pendiente",
      referencia: "Pendiente",
      descripcion: "Pago pendiente",
      cuentaDestino: "Pendiente",
      tasaInteres: 15,
      comision: 2,
      totalPagado: 252,
      fechaVencimiento: "05/06/2023",
    },
  ]

  // Datos de ejemplo para los depósitos
  const historialDepositos = [
    {
      id: "LOAN-123456",
      fecha: "10/05/2023",
      monto: 200,
      estado: "completado",
      metodoPago: "Transferencia bancaria",
      cuentaDestino: "****1234",
      referencia: "DEP-987654",
      descripcion: "Préstamo aprobado",
    },
    {
      id: "PAY-789012",
      fecha: "20/04/2023",
      monto: 150,
      estado: "completado",
      metodoPago: "Tarjeta de crédito",
      cuentaDestino: "****5678",
      referencia: "DEP-456789",
      descripcion: "Pago programado",
    },
    {
      id: "PAY-345678",
      fecha: "15/03/2023",
      monto: 120,
      estado: "completado",
      metodoPago: "Efectivo",
      cuentaDestino: "N/A",
      referencia: "DEP-123456",
      descripcion: "Depósito en tienda",
    },
  ]

  // Datos de ejemplo para las solicitudes
  const solicitudes = [
    {
      id: "SOL-123456",
      fecha: "15/05/2023",
      monto: 200,
      plazo: 30,
      estado: "aprobada",
      fechaAprobacion: "15/05/2023",
      tasaInteres: 15,
      comision: 2,
      totalPagar: 232,
      fechaVencimiento: "15/06/2023",
      metodoPago: "Transferencia bancaria",
      cuentaDestino: "****1234",
    },
    {
      id: "SOL-789012",
      fecha: "10/06/2023",
      monto: 300,
      plazo: 45,
      estado: "en_proceso",
      fechaAprobacion: null,
      tasaInteres: 15,
      comision: 2,
      totalPagar: 350,
      fechaVencimiento: null,
      metodoPago: null,
      cuentaDestino: null,
    },
    {
      id: "SOL-345678",
      fecha: "01/04/2023",
      monto: 150,
      plazo: 15,
      estado: "rechazada",
      fechaAprobacion: null,
      motivoRechazo: "Historial crediticio insuficiente",
      tasaInteres: 15,
      comision: 2,
      totalPagar: 170,
      fechaVencimiento: null,
      metodoPago: null,
      cuentaDestino: null,
    },
  ]

  // Buscar detalles de la transacción si hay un ID
  const transactionDetails = transactionId ? historialDepositos.find((dep) => dep.id === transactionId) : null

  // Función para mostrar detalles de solicitud
  const mostrarDetallesSolicitud = (solicitud) => {
    setIsLoading(true)
    setSolicitudSeleccionada(null)

    // Simulamos una carga
    setTimeout(() => {
      setSolicitudSeleccionada(solicitud)
      setModalSolicitudAbierto(true)
      setIsLoading(false)
    }, 500)
  }

  // Función para mostrar detalles de pago
  const mostrarDetallesPago = (pago) => {
    setIsLoading(true)
    setPagoSeleccionado(null)

    // Simulamos una carga
    setTimeout(() => {
      setPagoSeleccionado(pago)
      setModalPagoAbierto(true)
      setIsLoading(false)
    }, 500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {isLoading && <LoadingScreen />}

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Mi Perfil</h1>
              <p className="text-gray-600">Gestiona tu información y revisa tu historial</p>
            </div>
            <div className="flex gap-3">
              <Link href="/configuracion">
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Configurar notificaciones
                </Button>
              </Link>
              {!tienePrestamoActivo && (
                <Button className="bg-accent hover:bg-accent/90" asChild>
                  <Link href="/solicitar">Solicitar nuevo préstamo</Link>
                </Button>
              )}
              {tienePrestamoActivo && (
                <Button variant="outline" className="flex items-center gap-2" disabled>
                  <Info className="h-4 w-4" />
                  <span className="hidden sm:inline">Ya tienes un préstamo activo</span>
                  <span className="sm:hidden">Préstamo activo</span>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Información personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-bold">Juan Pérez</h3>
                  <p className="text-gray-600 text-sm">juan@ejemplo.com</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teléfono:</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miembro desde:</span>
                    <span>Marzo 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Préstamos completados:</span>
                    <span>3</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/editar-perfil">Editar perfil</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Nivel de confianza</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                    <Award className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="font-bold">Nivel {nivelConfianza}</h3>
                  <p className="text-gray-600 text-sm">
                    {nivelConfianza === 1
                      ? "Explorador"
                      : nivelConfianza === 2
                        ? "Cliente Confiable"
                        : nivelConfianza === 3
                          ? "Cliente Preferente"
                          : nivelConfianza === 4
                            ? "Cliente Pro"
                            : "Cliente VIP"}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Progreso al siguiente nivel</span>
                      <span className="text-sm font-bold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>
                      Completa 2 préstamos más para subir al Nivel {nivelConfianza + 1} y aumentar tu límite de crédito
                      a $
                      {nivelConfianza === 1
                        ? "250"
                        : nivelConfianza === 2
                          ? "350"
                          : nivelConfianza === 3
                            ? "450"
                            : "500"}
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/beneficios">Ver beneficios</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Información financiera</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Límite de crédito */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Límite de crédito</p>
                      <p className="text-xl font-bold">${limiteCredito}</p>
                    </div>
                  </div>

                  {/* Saldo disponible - NUEVO */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Saldo disponible</p>
                      <p className="text-xl font-bold">${saldoDisponible}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Límite inicial:</span>
                      <span>$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Incremento total:</span>
                      <span>+$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Próximo incremento:</span>
                      <span>+$100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded-lg w-full">
                  <TrendingUp className="h-4 w-4 text-secondary flex-shrink-0" />
                  <p className="text-gray-600">Paga a tiempo para aumentar tu límite.</p>
                </div>
              </CardFooter>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/metodos-pago">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Administrar métodos de pago
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Mis solicitudes</CardTitle>
              <CardDescription>Historial de solicitudes de préstamos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div>ID</div>
                  <div>Fecha</div>
                  <div>Monto</div>
                  <div>Plazo</div>
                  <div>Estado</div>
                  <div>Acciones</div>
                </div>
                {solicitudes.map((solicitud) => (
                  <div key={solicitud.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                    <div>{solicitud.id}</div>
                    <div>{solicitud.fecha}</div>
                    <div>${solicitud.monto}</div>
                    <div>{solicitud.plazo} días</div>
                    <div>
                      {solicitud.estado === "aprobada" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Aprobada
                        </Badge>
                      ) : solicitud.estado === "en_proceso" ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                          En proceso
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                          Rechazada
                        </Badge>
                      )}
                    </div>
                    <div>
                      <Button variant="ghost" size="sm" onClick={() => mostrarDetallesSolicitud(solicitud)}>
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de préstamos</CardTitle>
              <CardDescription>Revisa tus préstamos anteriores y su estado</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab === "historial" ? "todos" : "todos"}>
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="pagados">Pagados</TabsTrigger>
                  <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                </TabsList>

                {/* Si hay un ID de transacción, mostrar los detalles */}
                {transactionDetails && (
                  <div className="mb-6 p-4 border rounded-lg bg-blue-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-primary">Detalles de la transacción</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {transactionDetails.estado}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">ID de Transacción</p>
                        <p className="font-medium">{transactionDetails.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fecha</p>
                        <p className="font-medium">{transactionDetails.fecha}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monto</p>
                        <p className="font-medium">${transactionDetails.monto}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Método de pago</p>
                        <p className="font-medium">{transactionDetails.metodoPago}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cuenta destino</p>
                        <p className="font-medium">{transactionDetails.cuentaDestino}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Referencia</p>
                        <p className="font-medium">{transactionDetails.referencia}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Descripción</p>
                        <p className="font-medium">{transactionDetails.descripcion}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Descargar comprobante
                      </Button>
                    </div>
                  </div>
                )}

                <TabsContent value="todos">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                      <div>Fecha</div>
                      <div>Monto</div>
                      <div>Estado</div>
                      <div>Puntualidad</div>
                      <div>Acciones</div>
                    </div>
                    {historialPagos.map((pago) => (
                      <div key={pago.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                        <div>{pago.fecha}</div>
                        <div>${pago.monto}</div>
                        <div>
                          {pago.estado === "pagado" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Pagado
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                              Pendiente
                            </Badge>
                          )}
                        </div>
                        <div>
                          {pago.estado === "pagado" && (
                            <div className="flex items-center">
                              {pago.diasAtraso === 0 ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                                  <span className="text-sm">A tiempo</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-1" />
                                  <span className="text-sm">{pago.diasAtraso} días tarde</span>
                                </>
                              )}
                            </div>
                          )}
                          {pago.estado === "pendiente" && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm">Próximamente</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <Button variant="ghost" size="sm" onClick={() => mostrarDetallesPago(pago)}>
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="pagados">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                      <div>Fecha</div>
                      <div>Monto</div>
                      <div>Estado</div>
                      <div>Puntualidad</div>
                      <div>Acciones</div>
                    </div>
                    {historialPagos
                      .filter((pago) => pago.estado === "pagado")
                      .map((pago) => (
                        <div key={pago.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                          <div>{pago.fecha}</div>
                          <div>${pago.monto}</div>
                          <div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                              Pagado
                            </Badge>
                          </div>
                          <div>
                            <div className="flex items-center">
                              {pago.diasAtraso === 0 ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                                  <span className="text-sm">A tiempo</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-1" />
                                  <span className="text-sm">{pago.diasAtraso} días tarde</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm" onClick={() => mostrarDetallesPago(pago)}>
                              Ver detalles
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="pendientes">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                      <div>Fecha</div>
                      <div>Monto</div>
                      <div>Estado</div>
                      <div>Puntualidad</div>
                      <div>Acciones</div>
                    </div>
                    {historialPagos
                      .filter((pago) => pago.estado === "pendiente")
                      .map((pago) => (
                        <div key={pago.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                          <div>{pago.fecha}</div>
                          <div>${pago.monto}</div>
                          <div>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                              Pendiente
                            </Badge>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm">Próximamente</span>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm" onClick={() => mostrarDetallesPago(pago)}>
                              Ver detalles
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Añadir una nueva sección para recompensas */}
        <div className="container max-w-4xl mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Mis recompensas</CardTitle>
              <CardDescription>Beneficios desbloqueados por tu buen comportamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <RewardsList />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modales existentes... */}

      {/* Modal para detalles de solicitud */}
      {modalSolicitudAbierto && solicitudSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Detalles de la solicitud {solicitudSeleccionada.id}</h3>
              <Badge
                variant="outline"
                className={
                  solicitudSeleccionada.estado === "aprobada"
                    ? "bg-green-50 text-green-700"
                    : solicitudSeleccionada.estado === "en_proceso"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-700"
                }
              >
                {solicitudSeleccionada.estado === "aprobada"
                  ? "Aprobada"
                  : solicitudSeleccionada.estado === "en_proceso"
                    ? "En proceso"
                    : "Rechazada"}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mb-4">Solicitud realizada el {solicitudSeleccionada.fecha}</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Monto solicitado</p>
                  <p className="font-medium">${solicitudSeleccionada.monto}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plazo</p>
                  <p className="font-medium">{solicitudSeleccionada.plazo} días</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tasa de interés</p>
                  <p className="font-medium">{solicitudSeleccionada.tasaInteres}% mensual</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comisión</p>
                  <p className="font-medium">${solicitudSeleccionada.comision}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total a pagar</p>
                  <p className="font-medium">${solicitudSeleccionada.totalPagar}</p>
                </div>
                {solicitudSeleccionada.fechaVencimiento && (
                  <div>
                    <p className="text-sm text-gray-500">Fecha de vencimiento</p>
                    <p className="font-medium">{solicitudSeleccionada.fechaVencimiento}</p>
                  </div>
                )}
                {solicitudSeleccionada.metodoPago && (
                  <div>
                    <p className="text-sm text-gray-500">Método de pago</p>
                    <p className="font-medium">{solicitudSeleccionada.metodoPago}</p>
                  </div>
                )}
                {solicitudSeleccionada.cuentaDestino && (
                  <div>
                    <p className="text-sm text-gray-500">Cuenta destino</p>
                    <p className="font-medium">{solicitudSeleccionada.cuentaDestino}</p>
                  </div>
                )}
                {solicitudSeleccionada.motivoRechazo && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Motivo de rechazo</p>
                    <p className="font-medium text-red-600">{solicitudSeleccionada.motivoRechazo}</p>
                  </div>
                )}
              </div>

              {solicitudSeleccionada.estado === "aprobada" && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    Tu préstamo fue aprobado y depositado en tu cuenta. Recuerda realizar el pago antes de la fecha de
                    vencimiento para mantener un buen historial crediticio.
                  </p>
                </div>
              )}

              {solicitudSeleccionada.estado === "en_proceso" && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Tu solicitud está siendo procesada. Recibirás una notificación cuando sea aprobada o rechazada.
                  </p>
                </div>
              )}

              {solicitudSeleccionada.estado === "rechazada" && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-700">
                    Lo sentimos, tu solicitud fue rechazada. Puedes intentar nuevamente después de mejorar tu historial
                    crediticio.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={() => setModalSolicitudAbierto(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para detalles de pago */}
      {modalPagoAbierto && pagoSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Detalles del pago</h3>
              <Badge
                variant="outline"
                className={
                  pagoSeleccionado.estado === "pagado" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }
              >
                {pagoSeleccionado.estado === "pagado" ? "Pagado" : "Pendiente"}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {pagoSeleccionado.estado === "pagado"
                ? `Transacción del ${pagoSeleccionado.fecha}`
                : `Vencimiento: ${pagoSeleccionado.fechaVencimiento}`}
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {pagoSeleccionado.transactionId && (
                  <div>
                    <p className="text-sm text-gray-500">ID de Transacción</p>
                    <p className="font-medium">{pagoSeleccionado.transactionId}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">{pagoSeleccionado.fecha}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monto</p>
                  <p className="font-medium">${pagoSeleccionado.monto}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Método de pago</p>
                  <p className="font-medium">{pagoSeleccionado.metodoPago}</p>
                </div>
                {pagoSeleccionado.referencia && (
                  <div>
                    <p className="text-sm text-gray-500">Referencia</p>
                    <p className="font-medium">{pagoSeleccionado.referencia}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Tasa de interés</p>
                  <p className="font-medium">{pagoSeleccionado.tasaInteres}% mensual</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comisión</p>
                  <p className="font-medium">${pagoSeleccionado.comision}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {pagoSeleccionado.estado === "pagado" ? "Total pagado" : "Total a pagar"}
                  </p>
                  <p className="font-medium">${pagoSeleccionado.totalPagado}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de vencimiento</p>
                  <p className="font-medium">{pagoSeleccionado.fechaVencimiento}</p>
                </div>
                {pagoSeleccionado.descripcion && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Descripción</p>
                    <p className="font-medium">{pagoSeleccionado.descripcion}</p>
                  </div>
                )}
              </div>

              {pagoSeleccionado.estado === "pagado" && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    {pagoSeleccionado.diasAtraso === 0
                      ? "¡Excelente! Tu pago fue realizado a tiempo. Esto mejora tu historial crediticio."
                      : `Tu pago fue realizado con ${pagoSeleccionado.diasAtraso} días de retraso. Procura pagar a tiempo para mantener un buen historial crediticio.`}
                  </p>
                </div>
              )}

              {pagoSeleccionado.estado === "pendiente" && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    Este pago está pendiente. Recuerda realizarlo antes de la fecha de vencimiento para evitar cargos
                    adicionales.
                  </p>
                </div>
              )}

              {pagoSeleccionado.estado === "pendiente" && (
                <div className="flex justify-center mt-4">
                  <Button className="bg-accent hover:bg-accent/90">Realizar pago ahora</Button>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={() => setModalPagoAbierto(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Componente de onboarding */}
      <GuideAvatar
        message="¡Aquí puedes ver tu historial y nivel de confianza! Paga a tiempo para subir de nivel y obtener más beneficios."
        position="bottom-right"
      />
    </main>
  )
}
