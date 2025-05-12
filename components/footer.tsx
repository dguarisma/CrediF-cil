export function Footer() {
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
                <a
                  href="/solicitar"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Solicitar préstamo
                </a>
              </li>
              <li>
                <a
                  href="/pagos"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Realizar pagos
                </a>
              </li>
              <li>
                <a
                  href="/educacion"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Educación financiera
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/legal?tab=terminos"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a
                  href="/legal?tab=privacidad"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="/legal?tab=contrato"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Contrato de préstamo
                </a>
              </li>
              <li>
                <a
                  href="/legal?tab=cookies"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                >
                  Política de cookies
                </a>
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
