"use client"

import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Features />
      <HowItWorks />
      <FAQ />
      <CTASection />
    </main>
  )
}
