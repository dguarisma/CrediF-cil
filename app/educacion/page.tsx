"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Award,
  ArrowRight,
  BookMarked,
  Lightbulb,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function Educacion() {
  const [activeTab, setActiveTab] = useState("conceptos")
  const tabsListRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  // Función para comprobar si se necesitan flechas de navegación
  const checkScrollArrows = () => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5) // 5px de margen para evitar problemas de redondeo
    }
  }

  // Comprobar flechas al cargar y al cambiar el tamaño de la ventana
  useEffect(() => {
    checkScrollArrows()

    // Pequeño retraso para asegurar que los elementos estén renderizados
    const timer = setTimeout(() => {
      checkScrollArrows()
    }, 300)

    const handleResize = () => {
      checkScrollArrows()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Comprobar flechas cuando se hace scroll en la lista de tabs
  useEffect(() => {
    const tabsList = tabsListRef.current
    if (tabsList) {
      tabsList.addEventListener("scroll", checkScrollArrows)
      return () => tabsList.removeEventListener("scroll", checkScrollArrows)
    }
  }, [])

  // Asegurar que el tab activo sea visible al cargar la página
  useEffect(() => {
    // Pequeño retraso para asegurar que los elementos estén renderizados
    const timer = setTimeout(() => {
      if (tabsListRef.current) {
        // Ajustar el scroll para mostrar completamente el primer tab
        tabsListRef.current.scrollLeft = 0
        checkScrollArrows()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Encontrar el elemento del tab seleccionado
    const tabElement = document.querySelector(`[data-value="${value}"]`) as HTMLElement

    if (tabElement && tabsListRef.current) {
      // Calcular la posición para centrar el tab en la vista
      const tabsListRect = tabsListRef.current.getBoundingClientRect()
      const tabRect = tabElement.getBoundingClientRect()

      const scrollLeftPosition = tabElement.offsetLeft - tabsListRect.width / 2 + tabRect.width / 2

      // Hacer scroll suave al tab seleccionado
      tabsListRef.current.scrollTo({
        left: scrollLeftPosition,
        behavior: "smooth",
      })

      // Actualizar estado de las flechas después del scroll
      setTimeout(checkScrollArrows, 300)
    }
  }

  // Funciones para navegar con las flechas
  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: "smooth" })
      setTimeout(checkScrollArrows, 300)
    }
  }

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: "smooth" })
      setTimeout(checkScrollArrows, 300)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Educación Financiera</h1>
            <p className="text-gray-600">
              Aprende a mejorar tu historial crediticio y tomar decisiones financieras inteligentes
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                  aria-label="Desplazar a la izquierda"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide" ref={tabsListRef}>
                <TabsList className="mb-6 w-full md:w-auto inline-flex whitespace-nowrap pl-[20px]">
                  <TabsTrigger className="text-xs md:text-sm px-3" value="conceptos" data-value="conceptos">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                      <span>Conceptos básicos</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger className="text-xs md:text-sm px-3" value="historial" data-value="historial">
                    <span className="flex items-center gap-1">
                      <BarChart2 className="h-3 w-3 md:h-4 md:w-4" />
                      <span>Historial crediticio</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger className="text-xs md:text-sm px-3" value="consejos" data-value="consejos">
                    <span className="flex items-center gap-1">
                      <Lightbulb className="h-3 w-3 md:h-4 md:w-4" />
                      <span>Consejos prácticos</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger className="text-xs md:text-sm px-3" value="glosario" data-value="glosario">
                    <span className="flex items-center gap-1">
                      <BookMarked className="h-3 w-3 md:h-4 md:w-4" />
                      <span>Glosario</span>
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                  aria-label="Desplazar a la derecha"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            <TabsContent value="conceptos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>¿Qué es un préstamo personal?</CardTitle>
                    <CardDescription>Conceptos fundamentales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Un préstamo personal es un tipo de financiamiento que te permite obtener dinero para cubrir
                      necesidades específicas. A diferencia de otros préstamos, no requiere garantía y se basa en tu
                      historial crediticio.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/educacion/prestamos">
                        Leer más <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                      <DollarSign className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle>Intereses y comisiones</CardTitle>
                    <CardDescription>Entendiendo los costos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Los intereses son el costo por usar el dinero prestado, mientras que las comisiones son cargos
                      adicionales por servicios específicos. Es importante entender ambos para evaluar el costo total de
                      un préstamo.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/educacion/intereses">
                        Leer más <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Preguntas frecuentes</CardTitle>
                  <CardDescription>Respuestas a las dudas más comunes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Cómo se calcula el interés en CrediFácil?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          En CrediFácil, calculamos el interés de forma mensual sobre el monto prestado. La tasa de
                          interés varía entre 15% y 20% mensual, dependiendo de tu historial crediticio y nivel de
                          confianza. Por ejemplo, si solicitas un préstamo de $100 con una tasa del 15%, pagarías $15 de
                          interés por mes.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Qué pasa si no puedo pagar a tiempo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Si prevés que no podrás pagar a tiempo, es importante que te comuniques con nosotros antes de
                          la fecha de vencimiento. Podemos ofrecerte opciones como una extensión del plazo (con cargos
                          adicionales) o un plan de pagos. Si no pagas y no te comunicas, se aplicarán recargos por mora
                          y podría afectar tu historial crediticio.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Cómo puedo aumentar mi límite de crédito?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Para aumentar tu límite de crédito en CrediFácil, debes construir un buen historial de pagos.
                          Cada préstamo pagado puntualmente suma puntos a tu perfil. Generalmente, después de 3-5
                          préstamos pagados a tiempo, evaluamos automáticamente un aumento en tu límite. También
                          influyen factores como el monto de tus préstamos anteriores y tu comportamiento de pago.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Qué documentos necesito para solicitar un préstamo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Para solicitar un préstamo en CrediFácil necesitas: un documento de identidad oficial vigente
                          (cédula, pasaporte), comprobante de domicilio reciente (no mayor a 3 meses), y acceso a una
                          cámara para tomar una selfie de verificación. Para préstamos mayores, podríamos solicitar
                          comprobantes de ingresos adicionales.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <div className="bg-primary/5 rounded-lg p-4 md:p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">¿Necesitas más información?</h3>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo está disponible para resolver todas tus dudas sobre préstamos personales y finanzas.
                </p>
                <Button asChild>
                  <Link href="/contacto">Contactar soporte</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="historial">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Importancia del historial crediticio</CardTitle>
                  <CardDescription>Tu pasaporte financiero</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Tu historial crediticio es como tu reputación financiera. Refleja tu comportamiento de pago y es
                      consultado por instituciones financieras cuando solicitas créditos. Un buen historial te abre
                      puertas a mejores oportunidades financieras.
                    </p>

                    <h3 className="text-lg font-bold text-primary">Factores que afectan tu historial</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Pagos puntuales:</span> Cada pago realizado a tiempo suma puntos
                          positivos a tu historial.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Pagos tardíos:</span> Los retrasos en tus pagos afectan
                          negativamente tu historial, especialmente si son recurrentes.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Nivel de endeudamiento:</span> Mantener un nivel de deuda
                          manejable demuestra responsabilidad financiera.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Antigüedad crediticia:</span> Un historial más largo y estable
                          genera mayor confianza.
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Cómo mejorar tu historial crediticio</CardTitle>
                  <CardDescription>Estrategias efectivas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                      <h3 className="font-bold text-accent mb-2">1. Paga puntualmente</h3>
                      <p className="text-gray-600">
                        El factor más importante para un buen historial es realizar tus pagos antes o en la fecha de
                        vencimiento. Configura recordatorios o pagos automáticos para no olvidar las fechas.
                      </p>
                    </div>

                    <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                      <h3 className="font-bold text-secondary mb-2">2. Mantén un nivel de deuda bajo</h3>
                      <p className="text-gray-600">
                        Procura no utilizar más del 30% de tu capacidad crediticia. Si tienes múltiples deudas,
                        considera consolidarlas para facilitar su manejo.
                      </p>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <h3 className="font-bold text-primary mb-2">3. Diversifica tus créditos</h3>
                      <p className="text-gray-600">
                        Tener diferentes tipos de crédito (préstamos personales, tarjetas, etc.) demuestra que puedes
                        manejar responsablemente distintas obligaciones financieras.
                      </p>
                    </div>

                    <div className="bg-neutral p-4 rounded-lg">
                      <h3 className="font-bold mb-2">4. Revisa regularmente tu historial</h3>
                      <p className="text-gray-600">
                        Verifica periódicamente tu reporte crediticio para detectar y corregir posibles errores que
                        podrían afectar tu puntuación.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consejos">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Presupuesto inteligente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Crea un presupuesto mensual detallando ingresos y gastos. Asigna un porcentaje para ahorro y
                      emergencias antes de considerar préstamos.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ahorro estratégico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Establece un fondo de emergencia que cubra 3-6 meses de gastos básicos antes de solicitar
                      préstamos para gastos no esenciales.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Prioriza deudas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Si tienes múltiples deudas, enfócate primero en las que tienen mayor tasa de interés para
                      minimizar el costo financiero total.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Consejos para usar CrediFácil responsablemente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 mt-1">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Solicita solo lo necesario</h3>
                        <p className="text-gray-600">
                          Evalúa si realmente necesitas el préstamo y solicita solo la cantidad que puedas devolver
                          cómodamente.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 mt-1">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Planifica tu pago</h3>
                        <p className="text-gray-600">
                          Antes de solicitar, asegúrate de tener un plan claro para devolver el préstamo en la fecha
                          acordada.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 mt-1">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Evita refinanciamientos constantes</h3>
                        <p className="text-gray-600">
                          Refinanciar repetidamente puede llevarte a un ciclo de deuda. Intenta pagar completamente
                          antes de solicitar un nuevo préstamo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 mt-1">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Comunícate ante dificultades</h3>
                        <p className="text-gray-600">
                          Si prevés problemas para pagar, contáctanos inmediatamente. Siempre es mejor buscar soluciones
                          antes del vencimiento.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 mt-1">
                        <span className="text-primary font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Aprovecha los beneficios por pago puntual</h3>
                        <p className="text-gray-600">
                          Pagar a tiempo te permite acceder a mayores montos y mejores condiciones en futuros préstamos.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-accent/5 rounded-lg p-6 border border-accent/20">
                <h3 className="text-xl font-bold text-accent mb-4">Herramientas financieras</h3>
                <p className="text-gray-600 mb-4">
                  Descarga nuestra calculadora de préstamos y plantilla de presupuesto para mejorar tu planificación
                  financiera.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline">Calculadora de préstamos</Button>
                  <Button variant="outline">Plantilla de presupuesto</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="glosario">
              <Card>
                <CardHeader>
                  <CardTitle>Glosario financiero</CardTitle>
                  <CardDescription>Términos clave para entender mejor tus finanzas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <h3 className="font-bold text-primary">Tasa de interés</h3>
                        <p className="text-gray-600">
                          Porcentaje que se aplica al capital prestado como costo por el uso del dinero durante un
                          período determinado.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">CAT (Costo Anual Total)</h3>
                        <p className="text-gray-600">
                          Indicador que representa el costo total anualizado de un crédito, incluyendo intereses,
                          comisiones y otros cargos.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Plazo</h3>
                        <p className="text-gray-600">
                          Período de tiempo establecido para la devolución completa de un préstamo.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Mora</h3>
                        <p className="text-gray-600">
                          Situación en la que el deudor no ha realizado el pago correspondiente al vencimiento acordado.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Capacidad de pago</h3>
                        <p className="text-gray-600">
                          Potencial económico del solicitante para hacer frente a las obligaciones de pago adquiridas.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Historial crediticio</h3>
                        <p className="text-gray-600">
                          Registro del comportamiento de pago de una persona en relación a sus créditos anteriores.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Refinanciamiento</h3>
                        <p className="text-gray-600">
                          Proceso de modificar las condiciones originales de un préstamo, generalmente extendiendo el
                          plazo.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Garantía</h3>
                        <p className="text-gray-600">
                          Bien o derecho que asegura el cumplimiento de una obligación de pago.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Scoring crediticio</h3>
                        <p className="text-gray-600">
                          Sistema de puntuación que evalúa la probabilidad de que un solicitante devuelva el préstamo.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Amortización</h3>
                        <p className="text-gray-600">
                          Proceso de pago gradual de una deuda mediante cuotas periódicas que incluyen capital e
                          intereses.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Préstamo personal</h3>
                        <p className="text-gray-600">
                          Crédito otorgado a una persona física sin necesidad de especificar su destino ni ofrecer
                          garantías específicas.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary">Comisión por apertura</h3>
                        <p className="text-gray-600">
                          Cargo único que se cobra al momento de otorgar un préstamo, generalmente calculado como
                          porcentaje del monto.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
