"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface LegalTabLinksProps {
  className?: string
}

export function LegalTabLinks({ className }: LegalTabLinksProps) {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "terminos"

  const tabs = [
    { id: "terminos", label: "Términos y condiciones" },
    { id: "privacidad", label: "Política de privacidad" },
    { id: "contrato", label: "Contrato de préstamo" },
    { id: "cookies", label: "Política de cookies" },
  ]

  return (
    <div className={cn("flex flex-wrap gap-2 mb-4", className)}>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`/legal?tab=${tab.id}`}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            currentTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground",
          )}
          aria-current={currentTab === tab.id ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}
