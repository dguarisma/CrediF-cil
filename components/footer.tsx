"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export function Footer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const legalTab = searchParams.get("tab") || "terminos"

  // Función para verificar si un enlace legal está activo
  const isLegalLinkActive = (tab: string) => {
    return pathname === "/legal" && legalTab === tab
  }

  // Función para verificar si un enlace de producto está activo
  const isProductLinkActive = (path: string) => {
    return pathname === path
  }

  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/images/logo.png" alt="CrediFácil Logo" width={40} height={40} className="mr-2" />
              <span className="text-lg font-bold dark:text-white">CrediFácil</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Tu solución financiera rápida y confiable.</p>
          </div>

          <div>
            <h3 className="font-bold mb-4 dark:text-white">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solicitar"
                  className={cn(
                    "text-sm transition-colors",
                    isProductLinkActive("/solicitar")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isProductLinkActive("/solicitar") ? "page" : undefined}
                >
                  Solicitar préstamo
                </Link>
              </li>
              <li>
                <Link
                  href="/pagos"
                  className={cn(
                    "text-sm transition-colors",
                    isProductLinkActive("/pagos")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isProductLinkActive("/pagos") ? "page" : undefined}
                >
                  Realizar pagos
                </Link>
              </li>
              <li>
                <Link
                  href="/educacion"
                  className={cn(
                    "text-sm transition-colors",
                    isProductLinkActive("/educacion")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isProductLinkActive("/educacion") ? "page" : undefined}
                >
                  Educación financiera
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal?tab=terminos"
                  className={cn(
                    "text-sm transition-colors",
                    isLegalLinkActive("terminos")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isLegalLinkActive("terminos") ? "page" : undefined}
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/legal?tab=privacidad"
                  className={cn(
                    "text-sm transition-colors",
                    isLegalLinkActive("privacidad")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isLegalLinkActive("privacidad") ? "page" : undefined}
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal?tab=contrato"
                  className={cn(
                    "text-sm transition-colors",
                    isLegalLinkActive("contrato")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isLegalLinkActive("contrato") ? "page" : undefined}
                >
                  Contrato de préstamo
                </Link>
              </li>
              <li>
                <Link
                  href="/legal?tab=cookies"
                  className={cn(
                    "text-sm transition-colors",
                    isLegalLinkActive("cookies")
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary",
                  )}
                  aria-current={isLegalLinkActive("cookies") ? "page" : undefined}
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 dark:text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">soporte@credifacil.com</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 123-4567</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Lunes a Viernes: 9am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} CrediFácil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
