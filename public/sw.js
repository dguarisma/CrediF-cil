// Este es un service worker básico para manejar notificaciones push
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body || "Tienes una nueva notificación",
      icon: data.icon || "/icons/icon-72x72.png",
      badge: data.badge || "/icons/icon-72x72.png",
      data: {
        url: data.url || "/",
      },
      actions: data.actions || [],
    }

    event.waitUntil(self.registration.showNotification(data.title || "CrediFácil", options))
  }
})

// Manejar clics en las notificaciones
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  // Obtener la URL a la que dirigir al usuario
  const urlToOpen =
    event.notification.data && event.notification.data.url ? event.notification.data.url : "/notificaciones"

  // Abrir la URL o enfocar una ventana existente
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Verificar si ya hay una ventana abierta con la URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus()
          }
        }

        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      }),
  )

  // Notificar a la aplicación que se hizo clic en la notificación
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "NOTIFICATION_CLICKED",
        notification: {
          title: event.notification.title,
          body: event.notification.body,
          data: event.notification.data,
        },
      })
    })
  })
})
