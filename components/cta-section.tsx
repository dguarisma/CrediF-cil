"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function CTASection() {
  const { user } = useAuth()

  return (
    <section className="py-16 bg-primary">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">¿Listo para comenzar?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Únete a miles de personas que ya confían en CrediFácil para sus necesidades financieras.
        </p>
        {user ? (
          <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-white">
            <Link href="/solicitar">Solicitar préstamo</Link>
          </Button>
        ) : (
          <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-white">
            <Link href="/registro">Crear cuenta</Link>
          </Button>
        )}
      </div>
    </section>
  )
}
