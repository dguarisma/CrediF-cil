"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function PushNotificationManager({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false)

  useEffect(() => {
    // Verificar si el navegador soporta Service Workers y notificaciones
    const checkSupport = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          // Registrar el service worker
          const registration = await navigator.serviceWorker.register("/sw.js")
          setServiceWorkerRegistered(true)

          // Verificar si ya tenemos permiso para notificaciones
          const permission = await Notification.requestPermission()

          if (permission === "granted") {
            // Aquí se podría suscribir al usuario a las notificaciones push
            console.log("Notificaciones permitidas")
          }
        } catch (error) {
          console.error("Error al registrar el service worker:", error)
        }
      }
    }

    checkSupport()

    // Función para mostrar notificaciones de prueba (solo para desarrollo)
    const showTestNotification = () => {
      if (serviceWorkerRegistered && Notification.permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("CrediFácil", {
            body: "Esta es una notificación de prueba",
            icon: "/icons/icon-72x72.png",
            badge: "/icons/icon-72x72.png",
            data: {
              url: window.location.origin + "/notificaciones",
            },
          })
        })
      }
    }

    // Escuchar mensajes del service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "NOTIFICATION_CLICKED") {
        // Manejar clic en notificación
        toast({
          title: "Notificación",
          description: "Has hecho clic en una notificación",
        })
      }
    })

    return () => {
      navigator.serviceWorker.removeEventListener("message", () => {})
    }
  }, [toast, serviceWorkerRegistered])

  return <>{children}</>
}
