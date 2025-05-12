"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserAuthButton } from "@/components/user-auth-button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  // Detectar scroll para cambiar el estilo de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Función para manejar el clic en enlaces con hash
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Si estamos en la página principal, prevenir la navegación por defecto
    if (pathname === "/") {
      e.preventDefault()
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        // Actualizar la URL sin recargar la página
        window.history.pushState(null, "", `/#${hash}`)
        // Cerrar el menú móvil si está abierto
        setIsMenuOpen(false)
      }
    }
  }

  // Modificar el array navItems para eliminar la opción "Cómo funciona"
  const navItems = [
    { name: "Solicitar", href: "/solicitar" },
    { name: "Calculadora", href: "/calculadora" },
    { name: "Educación", href: "/educacion" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-background border-b transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-6">
              <Image
                src="/images/logo.png"
                alt="CrediFácil Logo"
                width={140}
                height={31}
                className="h-auto w-[8.5rem]"
              />
              <span className="sr-only">CrediFácil</span>
            </Link>

            {/* Navegación para escritorio */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={item.hash ? (e) => handleHashClick(e, item.hash) : undefined}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href ||
                    (pathname === "/" && item.hash && window.location.hash === `#${item.hash}`)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Botones de acción para escritorio */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <UserAuthButton />
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t shadow-md">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.hash ? (e) => handleHashClick(e, item.hash) : undefined}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href || (pathname === "/" && item.hash && window.location.hash === `#${item.hash}`)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t mt-2">
              <UserAuthButton className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
