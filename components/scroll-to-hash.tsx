"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ScrollToHash() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Esta función maneja el desplazamiento suave a un elemento por ID
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Calcular la posición considerando la altura de la navbar
      const navbarHeight = 80 // Altura aproximada de la navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      // Esperar un poco para que la página se renderice completamente
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  // Efecto para manejar el hash en la URL al cargar la página
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      scrollToElement(id)
    }
  }, [pathname, searchParams])

  // Efecto para agregar listeners a los enlaces con hash
  useEffect(() => {
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const link = target.closest("a")

      if (link && link.hash && link.pathname === window.location.pathname) {
        event.preventDefault()
        const id = link.hash.substring(1)
        scrollToElement(id)

        // Actualizar la URL sin recargar la página
        window.history.pushState(null, "", link.hash)
      }
    }

    document.addEventListener("click", handleHashLinkClick)
    return () => document.removeEventListener("click", handleHashLinkClick)
  }, [])

  return null
}
