"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CreditCard, AlertCircle, Calendar, Info, Settings, Trash2, CheckCheck } from "lucide-react"

// Tipos de notificaciones
type NotificationType = "prestamo" | "pago" | "sistema" | "promocion"

// Interfaz para las notificaciones
interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: string
  isRead: boolean
  link?: string
  transactionId?: string // ID de transacción para historial
}

export default function Notificaciones() {
  const router = useRouter()

  // Estado para las notificaciones (simuladas)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "prestamo",
      title: "Préstamo aprobado",
      message: "Tu solicitud de préstamo por $250 ha sido aprobada. El dinero será depositado en tu cuenta en breve.",
      date: "Hoy, 10:30 AM",
      isRead: false,
      link: "/perfil",
      transactionId: "LOAN-123456",
    },
    {
      id: "2",
      type: "pago",
      title: "Recordatorio de pago",
      message: "Tu próximo pago de $120 vence en 3 días. Asegúrate de tener fondos disponibles.",
      date: "Ayer, 2:45 PM",
      isRead: false,
      link: "/pagos",
      transactionId: "PAY-789012",
    },
    {
      id: "3",
      type: "sistema",
      title: "Actualización de términos",
      message: "Hemos actualizado nuestros términos y condiciones. Por favor, revísalos en la sección legal.",
      date: "12/04/2023",
      isRead: true,
      link: "/legal",
    },
    {
      id: "4",
      type: "promocion",
      title: "Aumento de límite disponible",
      message: "¡Felicidades! Por tus pagos puntuales, ahora puedes solicitar hasta $350 en tu próximo préstamo.",
      date: "10/04/2023",
      isRead: true,
      link: "/solicitar",
    },
    {
      id: "5",
      type: "pago",
      title: "Pago recibido",
      message: "Hemos recibido tu pago de $150. Gracias por tu puntualidad.",
      date: "05/04/2023",
      isRead: true,
      link: "/pagos",
      transactionId: "PAY-345678",
    },
  ])

  // Función para marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    )
  }

  // Función para marcar una notificación como leída
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              isRead: true,
            }
          : notification,
      ),
    )
  }

  // Función para eliminar todas las notificaciones
  const deleteAllNotifications = () => {
    setNotifications([])
  }

  // Función para navegar al historial con el ID de transacción
  const navigateToTransaction = (notification: Notification) => {
    markAsRead(notification.id)

    if (notification.transactionId) {
      // Navegar al historial con el ID de transacción
      router.push(`/perfil?tab=historial&transaction=${notification.transactionId}`)
    } else {
      // Si no hay ID de transacción, usar el enlace normal
      router.push(notification.link || "/perfil")
    }
  }

  // Filtrar notificaciones por tipo
  const filterNotifications = (type: NotificationType | "todas") => {
    if (type === "todas") {
      return notifications
    }
    return notifications.filter((notification) => notification.type === type)
  }

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  // Obtener icono según el tipo de notificación
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "prestamo":
        return <CreditCard className="h-5 w-5" />
      case "pago":
        return <Calendar className="h-5 w-5" />
      case "sistema":
        return <Info className="h-5 w-5" />
      case "promocion":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Obtener color según el tipo de notificación
  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case "prestamo":
        return "bg-primary/10 text-primary"
      case "pago":
        return "bg-accent/10 text-accent"
      case "sistema":
        return "bg-secondary/10 text-secondary"
      case "promocion":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-gray-100 text-gray-500"
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Notificaciones</h1>
              <p className="text-gray-600">Mantente al día con actualizaciones importantes</p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Marcar todas como leídas
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" size="sm" onClick={deleteAllNotifications}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar todas
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <a href="/configuracion">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar notificaciones
                </a>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="todas">
            <TabsList className="mb-6">
              <TabsTrigger value="todas">
                Todas
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="prestamo">Préstamos</TabsTrigger>
              <TabsTrigger value="pago">Pagos</TabsTrigger>
              <TabsTrigger value="sistema">Sistema</TabsTrigger>
              <TabsTrigger value="promocion">Promociones</TabsTrigger>
            </TabsList>

            {["todas", "prestamo", "pago", "sistema", "promocion"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {tabValue === "todas"
                        ? "Todas las notificaciones"
                        : tabValue === "prestamo"
                          ? "Notificaciones de préstamos"
                          : tabValue === "pago"
                            ? "Notificaciones de pagos"
                            : tabValue === "sistema"
                              ? "Notificaciones del sistema"
                              : "Promociones"}
                    </CardTitle>
                    <CardDescription>
                      {filterNotifications(tabValue as NotificationType | "todas").length} notificaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filterNotifications(tabValue as NotificationType | "todas").length === 0 ? (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-500">No hay notificaciones</h3>
                        <p className="text-gray-400 mt-1">
                          Las notificaciones importantes aparecerán aquí cuando estén disponibles
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filterNotifications(tabValue as NotificationType | "todas").map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${
                              notification.isRead ? "bg-white" : "bg-blue-50 border-blue-100"
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-2 rounded-full ${getNotificationColor(notification.type)} flex-shrink-0`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-bold">{notification.title}</h3>
                                  <span className="text-xs text-gray-500">{notification.date}</span>
                                </div>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                                {notification.link && (
                                  <Button
                                    variant="link"
                                    className="p-0 h-auto text-primary hover:underline text-sm mt-2"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      navigateToTransaction(notification)
                                    }}
                                  >
                                    Ver detalles
                                  </Button>
                                )}
                              </div>
                              {!notification.isRead && (
                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Configuración de notificaciones</h3>
                <p className="text-gray-600 mb-4">
                  Puedes personalizar qué notificaciones recibes y cómo las recibes en la sección de configuración de tu
                  perfil.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/configuracion">Ir a configuración</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
