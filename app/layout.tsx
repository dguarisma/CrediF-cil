import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { CookieConsentProvider } from "@/contexts/cookie-consent-context"
import { OnboardingProvider } from "@/contexts/onboarding-context"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { CookieConsent } from "@/components/cookie-consent"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CrediFácil - Préstamos Personales",
  description: "Solicita préstamos personales de forma rápida y segura con CrediFácil",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <CookieConsentProvider>
              <OnboardingProvider>
                <Navbar />
                <main className="pt-16 md:pt-20">{children}</main>
                <Footer />
                <CookieConsent />
                <PWAInstallPrompt />
                <Toaster />
              </OnboardingProvider>
            </CookieConsentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
