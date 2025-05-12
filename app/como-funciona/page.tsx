"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ComoFunciona() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the homepage with the como-funciona hash and force a page reload
    // to ensure the browser processes the hash for scrolling
    window.location.href = "/#como-funciona"
  }, [])

  return null // No rendering needed as we're redirecting
}
