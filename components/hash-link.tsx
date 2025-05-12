"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface HashLinkProps {
  href: string
  hash: string
  className?: string
  children: React.ReactNode
}

export function HashLink({ href, hash, className, children }: HashLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si estamos en la página principal, prevenir la navegación por defecto
    if (pathname === "/") {
      e.preventDefault()
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        // Actualizar la URL sin recargar la página
        window.history.pushState(null, "", `/#${hash}`)
      }
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
