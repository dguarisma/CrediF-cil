"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function LegalPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("terminos")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["terminos", "privacidad", "contrato", "cookies"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    // Actualizar la URL sin recargar la página
    const url = new URL(window.location.href)
    url.searchParams.set("tab", tab)
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal</h1>

      <div className="flex flex-wrap gap-2 mb-8 border-b">
        <button
          onClick={() => handleTabClick("terminos")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "terminos" ? "border-b-2 border-primary text-primary" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Términos y condiciones
        </button>
        <button
          onClick={() => handleTabClick("privacidad")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "privacidad" ? "border-b-2 border-primary text-primary" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Política de privacidad
        </button>
        <button
          onClick={() => handleTabClick("contrato")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "contrato" ? "border-b-2 border-primary text-primary" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Contrato de préstamo
        </button>
        <button
          onClick={() => handleTabClick("cookies")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "cookies" ? "border-b-2 border-primary text-primary" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Política de cookies
        </button>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {activeTab === "terminos" && (
          <div>
            <h2>Términos y Condiciones</h2>
            <p>Última actualización: 12 de mayo de 2025</p>

            <h3>1. Introducción</h3>
            <p>
              Bienvenido a CrediFácil. Estos Términos y Condiciones rigen el uso de nuestros servicios, incluyendo
              nuestra aplicación móvil y sitio web. Al acceder o utilizar nuestros servicios, usted acepta estar sujeto
              a estos términos.
            </p>

            <h3>2. Elegibilidad</h3>
            <p>
              Para utilizar nuestros servicios, debe ser mayor de 18 años y tener capacidad legal para celebrar
              contratos vinculantes. Al registrarse, usted confirma que cumple con estos requisitos.
            </p>

            <h3>3. Servicios de Préstamo</h3>
            <p>
              CrediFácil ofrece servicios de microcréditos y préstamos personales de rápida aprobación. Los montos
              oscilan entre [monto mínimo] y [monto máximo], con plazos de devolución flexibles de [plazo mínimo] a
              [plazo máximo]. Las tasas de interés y condiciones específicas están sujetas a evaluación crediticia
              individual y se presentarán claramente antes de la aceptación del préstamo.
            </p>

            <h3>4. Proceso de Solicitud y Aprobación</h3>
            <p>
              El proceso de solicitud se realiza completamente en línea a través de nuestra aplicación. La verificación
              de identidad requiere documentación válida y puede incluir tecnología de reconocimiento facial. Las
              decisiones de préstamo se basan en múltiples factores, incluyendo pero no limitado a historial crediticio,
              ingresos verificables y capacidad de pago.
            </p>

            <h3>5. Modificaciones</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en
              vigor inmediatamente después de su publicación. El uso continuado de nuestros servicios después de dichas
              modificaciones constituye su aceptación de los nuevos términos.
            </p>
          </div>
        )}

        {activeTab === "privacidad" && (
          <div>
            <h2>Política de Privacidad</h2>
            <p>Última actualización: 12 de mayo de 2025</p>

            <h3>1. Información que Recopilamos</h3>
            <p>
              Recopilamos información personal como nombre, dirección, número de identificación, información de
              contacto, datos financieros y laborales, y otra información necesaria para evaluar solicitudes de
              préstamo.
            </p>

            <h3>1.1 Datos Biométricos</h3>
            <p>
              Para verificar su identidad, podemos recopilar datos biométricos como imágenes faciales o huellas
              dactilares. Estos datos son procesados con su consentimiento explícito y utilizados exclusivamente para
              prevenir fraudes y verificar su identidad durante el proceso de solicitud y acceso a la cuenta.
            </p>

            <h3>2. Uso de la Información</h3>
            <p>
              Utilizamos su información para procesar solicitudes de préstamo, verificar su identidad, evaluar su
              solvencia crediticia, comunicarnos con usted, mejorar nuestros servicios y cumplir con obligaciones
              legales.
            </p>

            <h3>3. Compartir Información</h3>
            <p>
              Podemos compartir su información con bureaus de crédito, instituciones financieras asociadas, proveedores
              de servicios, autoridades reguladoras y otras entidades según lo requiera la ley.
            </p>

            <h3>4. Seguridad</h3>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra
              acceso no autorizado, pérdida o alteración.
            </p>

            <h3>5. Sus Derechos</h3>
            <p>
              Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal.
              También puede oponerse al procesamiento de sus datos en ciertas circunstancias.
            </p>
          </div>
        )}

        {activeTab === "contrato" && (
          <div>
            <h2>Contrato de Préstamo</h2>
            <p>Última actualización: 12 de mayo de 2025</p>

            <h3>1. Partes del Contrato</h3>
            <p>
              Este contrato se celebra entre CrediFácil (el "Prestamista") y el usuario registrado (el "Prestatario")
              que ha sido aprobado para recibir un préstamo.
            </p>

            <h3>2. Monto y Desembolso</h3>
            <p>
              El monto del préstamo será el aprobado por el Prestamista y aceptado por el Prestatario. El desembolso se
              realizará mediante transferencia a la cuenta bancaria proporcionada por el Prestatario.
            </p>

            <h3>3. Tasa de Interés y Cargos</h3>
            <p>
              La tasa de interés anual aplicable se especificará en la oferta de préstamo. Pueden aplicarse cargos
              adicionales por pagos tardíos o procesamiento, los cuales se detallarán en la oferta.
            </p>

            <h3>4. Plazo y Pagos</h3>
            <p>
              El plazo del préstamo y la frecuencia de los pagos se establecerán en la oferta aceptada. Los pagos deben
              realizarse en la fecha acordada mediante los métodos de pago disponibles.
            </p>

            <h3>5. Incumplimiento</h3>
            <p>
              El incumplimiento de los pagos puede resultar en cargos por mora, informes negativos a bureaus de crédito
              y acciones legales para recuperar el monto adeudado.
            </p>

            <h3>6. Educación Financiera</h3>
            <p>
              Como parte de nuestro compromiso con la salud financiera de nuestros usuarios, CrediFácil proporciona
              recursos educativos y herramientas para mejorar la comprensión financiera. El Prestatario reconoce la
              importancia de utilizar los préstamos de manera responsable y se compromete a revisar los materiales
              educativos proporcionados.
            </p>

            <h3>7. Programa de Beneficios</h3>
            <p>
              CrediFácil ofrece un programa de beneficios para usuarios que demuestren buen comportamiento de pago. Los
              usuarios que realicen sus pagos puntualmente podrán acceder a mejores condiciones en préstamos futuros,
              incluyendo tasas preferenciales y montos mayores según su historial.
            </p>
          </div>
        )}

        {activeTab === "cookies" && (
          <div>
            <h2>Política de Cookies</h2>
            <p>Última actualización: 12 de mayo de 2025</p>

            <h3>1. ¿Qué son las Cookies?</h3>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio
              web. Nos permiten reconocer su dispositivo y recordar información sobre su visita.
            </p>

            <h3>2. Tipos de Cookies que Utilizamos</h3>
            <p>
              Utilizamos cookies esenciales para el funcionamiento del sitio, cookies de rendimiento para analizar cómo
              los usuarios interactúan con nuestro sitio, cookies de funcionalidad para recordar sus preferencias y
              cookies de publicidad para mostrar anuncios relevantes.
            </p>

            <h3>3. Control de Cookies</h3>
            <p>
              Puede controlar y gestionar las cookies a través de la configuración de su navegador. Puede eliminar las
              cookies existentes y configurar su navegador para rechazar nuevas cookies.
            </p>

            <h3>4. Cookies de Terceros</h3>
            <p>
              Nuestro sitio puede utilizar cookies de terceros para servicios como análisis web, redes sociales y
              publicidad. Estos terceros pueden recopilar información sobre su actividad en línea en diferentes sitios.
            </p>

            <h3>5. Actualizaciones</h3>
            <p>
              Podemos actualizar esta política de cookies periódicamente para reflejar cambios en nuestras prácticas. Le
              recomendamos revisar esta política regularmente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
