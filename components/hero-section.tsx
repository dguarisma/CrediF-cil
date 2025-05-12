"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function HeroSection() {
  const { user } = useAuth()

  return (
    <section className="bg-primary py-12 md:py-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Tu crédito en minutos</h1>
          <p className="text-lg text-white/90">
            Obtén préstamos rápidos y confiables directamente desde tu celular. Sin trámites eternos, sin excusas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-white">
              <Link href="/solicitar">Solicitar ahora</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white hover:bg-white/10"
              onClick={() => {
                const section = document.getElementById("como-funciona")
                if (section) {
                  const yOffset = -80 // Ajuste para la altura del navbar
                  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
                  window.scrollTo({ top: y, behavior: "smooth" })
                }
              }}
            >
              Cómo funciona
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/banner.png"
            alt="CrediFácil App"
            width={500}
            height={500}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  )
}
