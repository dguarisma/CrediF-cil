"use client"

import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <FAQ />
      <CTASection />
     
    </main>
  )
}
