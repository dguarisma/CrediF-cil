"use client"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function LoanCalculatorIntro() {
  const { toast } = useToast()
  const [hasSeenIntro, setHasSeenIntro] = useLocalStorage("credifacil-calculator-intro", false)

  // Ya no mostramos ningún mensaje de introducción
  // El componente se mantiene por si en el futuro se quiere añadir otra funcionalidad
  return null
}
