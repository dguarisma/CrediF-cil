"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Preguntas Frecuentes</h1>
            <p className="text-gray-600">Encuentra respuestas a las preguntas más comunes sobre CrediFácil</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>¿Tienes una pregunta específica?</CardTitle>
              <CardDescription>Selecciona una categoría para encontrar respuestas rápidamente</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="prestamos">Préstamos</TabsTrigger>
                  <TabsTrigger value="pagos">Pagos</TabsTrigger>
                  <TabsTrigger value="cuenta">Mi Cuenta</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Qué es CrediFácil?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          CrediFácil es una plataforma de microfinanzas que ofrece préstamos pequeños de manera rápida y
                          sencilla. Nuestro objetivo es ayudar a personas que necesitan acceso a crédito inmediato
                          mientras construyen un historial crediticio positivo a través de nuestro sistema de niveles de
                          confianza.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Cómo funciona el sistema de niveles?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Nuestro sistema de niveles de confianza te permite acceder a mayores montos y mejores
                          condiciones a medida que demuestras un comportamiento de pago responsable. Comenzarás en el
                          Nivel 1 con acceso a préstamos de hasta $50, y podrás avanzar hasta el Nivel 5 con préstamos
                          de hasta $500 y las mejores tasas. Cada pago puntual te acerca al siguiente nivel.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Está disponible CrediFácil en mi país?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Actualmente, CrediFácil está disponible en México, Colombia, Perú y Argentina. Estamos
                          trabajando para expandirnos a más países de Latinoamérica próximamente. Si tu país no está en
                          la lista, puedes registrarte para recibir una notificación cuando estemos disponibles en tu
                          región.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Cómo protegen mis datos personales?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          En CrediFácil, la seguridad de tus datos es nuestra prioridad. Utilizamos encriptación de
                          nivel bancario para proteger tu información personal y financiera. Nunca compartimos tus datos
                          con terceros sin tu consentimiento explícito. Puedes revisar nuestra
                          <Link href="/legal?tab=privacidad" className="text-primary hover:underline">
                            {" "}
                            política de privacidad{" "}
                          </Link>
                          para más detalles.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="prestamos">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Cuáles son los requisitos para solicitar un préstamo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">Para solicitar un préstamo en CrediFácil necesitas:</p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Ser mayor de 18 años</li>
                          <li>Tener un documento de identidad oficial vigente</li>
                          <li>Tener un teléfono móvil a tu nombre</li>
                          <li>Contar con una cuenta bancaria personal</li>
                          <li>Completar nuestro proceso de verificación de identidad</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          No realizamos verificación de buró de crédito tradicional, lo que nos permite ofrecer
                          oportunidades a personas sin historial crediticio previo.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        ¿Por qué las tasas de interés son más altas que en los bancos tradicionales?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Nuestras tasas de interés (15-20% mensual) reflejan el mayor riesgo asociado con préstamos sin
                          garantía y sin verificación de buró de crédito tradicional. A diferencia de los bancos,
                          ofrecemos:
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Acceso a crédito para personas sin historial crediticio</li>
                          <li>Proceso de aprobación rápido (minutos en lugar de días o semanas)</li>
                          <li>Sin comisiones ocultas o penalizaciones por pago anticipado</li>
                          <li>Oportunidad de construir historial crediticio y acceder a mejores tasas</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          A medida que avanzas en nuestro sistema de niveles, las tasas disminuyen significativamente,
                          premiando tu comportamiento de pago responsable.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Cuánto tiempo tarda la aprobación de un préstamo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">El proceso de aprobación es rápido:</p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Verificación inicial: Inmediata (automática)</li>
                          <li>Verificación de identidad: 5-15 minutos</li>
                          <li>Decisión final: Generalmente en menos de 30 minutos</li>
                          <li>Desembolso: Entre 10 minutos y 2 horas después de la aprobación</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          Para usuarios recurrentes con buen historial, el proceso puede ser aún más rápido, con
                          aprobación y desembolso en cuestión de minutos.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Puedo solicitar otro préstamo si ya tengo uno activo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          No es posible tener múltiples préstamos activos simultáneamente. Debes liquidar completamente
                          tu préstamo actual antes de solicitar uno nuevo. Esta política nos ayuda a promover prácticas
                          de endeudamiento responsable y a asegurar que nuestros usuarios no asuman más deuda de la que
                          pueden manejar.
                        </p>
                        <p className="mt-2 text-gray-600">
                          Sin embargo, los usuarios de nivel "Pro" y "VIP" pueden acceder a una línea de crédito
                          renovable que ofrece mayor flexibilidad.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="pagos">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Qué métodos de pago aceptan?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">Aceptamos los siguientes métodos de pago:</p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Transferencia bancaria</li>
                          <li>Tarjeta de débito o crédito</li>
                          <li>Pago en efectivo a través de nuestros socios (OXXO, Rapipago, etc.)</li>
                          <li>Billeteras digitales (Mercado Pago, PayPal)</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          Recomendamos configurar pagos automáticos para evitar retrasos y mantener un buen historial
                          crediticio.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Qué sucede si no puedo pagar a tiempo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">Si prevés dificultades para realizar tu pago, te recomendamos:</p>
                        <ol className="list-decimal pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Contactarnos inmediatamente antes de la fecha de vencimiento</li>
                          <li>Solicitar una extensión de plazo (disponible una vez por préstamo)</li>
                          <li>Acordar un plan de pagos parciales si es necesario</li>
                        </ol>
                        <p className="mt-2 text-gray-600">Los pagos tardíos sin comunicación previa generan:</p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Cargo por mora del 5% sobre el saldo pendiente</li>
                          <li>Impacto negativo en tu nivel de confianza</li>
                          <li>Posible restricción para futuros préstamos</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          Nuestra prioridad es ayudarte a mantener un buen historial, por lo que siempre buscamos
                          soluciones antes de aplicar penalizaciones.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Puedo pagar mi préstamo anticipadamente?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Sí, puedes pagar tu préstamo antes del plazo sin ninguna penalización. De hecho, incentivamos
                          el pago anticipado con los siguientes beneficios:
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>Ahorro en intereses (calculados por días efectivos del préstamo)</li>
                          <li>Puntos adicionales para tu nivel de confianza</li>
                          <li>Posibilidad de solicitar un nuevo préstamo inmediatamente</li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          Para realizar un pago anticipado, simplemente usa la opción "Pago total" en la sección de
                          pagos de la aplicación.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Cómo afectan los pagos a mi nivel de confianza?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Tu comportamiento de pago es el factor más importante para tu nivel de confianza:
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                          <li>
                            <span className="font-medium">Pagos puntuales:</span> +10 puntos por cada pago realizado
                            antes o en la fecha límite
                          </li>
                          <li>
                            <span className="font-medium">Pagos anticipados:</span> +15 puntos (beneficio adicional por
                            responsabilidad financiera)
                          </li>
                          <li>
                            <span className="font-medium">Pagos tardíos (1-3 días):</span> -5 puntos
                          </li>
                          <li>
                            <span className="font-medium">Pagos tardíos (4+ días):</span> -15 puntos
                          </li>
                          <li>
                            <span className="font-medium">Préstamo no pagado:</span> Regreso al nivel inicial y
                            restricciones temporales
                          </li>
                        </ul>
                        <p className="mt-2 text-gray-600">
                          Cada nivel requiere un número específico de puntos acumulados. Mantener un historial de pagos
                          excelente es la forma más rápida de avanzar a niveles superiores.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="cuenta">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Cómo puedo actualizar mi información personal?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Puedes actualizar la mayoría de tu información personal desde la sección "Perfil" en la
                          aplicación. Para cambios en información crítica (como tu documento de identidad o cuenta
                          bancaria), deberás pasar por un proceso de verificación adicional por motivos de seguridad.
                        </p>
                        <p className="mt-2 text-gray-600">
                          Si necesitas ayuda, puedes contactar a nuestro equipo de soporte a través del chat en la
                          aplicación o por correo electrónico.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Puedo usar CrediFácil en múltiples dispositivos?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Sí, puedes acceder a tu cuenta de CrediFácil desde cualquier dispositivo utilizando tus
                          credenciales de inicio de sesión. Sin embargo, por razones de seguridad, cualquier cambio de
                          dispositivo puede requerir una verificación adicional, especialmente para operaciones
                          sensibles como solicitar un préstamo o realizar pagos.
                        </p>
                        <p className="mt-2 text-gray-600">
                          Recomendamos mantener actualizada la aplicación y utilizar la autenticación de dos factores
                          para mayor seguridad.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Cómo puedo cerrar mi cuenta?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Para cerrar tu cuenta en CrediFácil, debes asegurarte de no tener préstamos activos o saldos
                          pendientes. Una vez confirmado esto, puedes solicitar el cierre de cuenta desde la sección
                          "Configuración" &gt; "Cerrar cuenta".
                        </p>
                        <p className="mt-2 text-gray-600">
                          Alternativamente, puedes contactar a nuestro equipo de soporte para asistencia en el proceso.
                          Ten en cuenta que, por regulaciones financieras, debemos mantener cierta información por un
                          período determinado incluso después del cierre de la cuenta.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>¿Qué hago si olvidé mi contraseña?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">Si olvidaste tu contraseña, sigue estos pasos:</p>
                        <ol className="list-decimal pl-5 mt-2 text-gray-600 space-y-1">
                          <li>En la pantalla de inicio de sesión, selecciona "¿Olvidaste tu contraseña?"</li>
                          <li>Ingresa el correo electrónico asociado a tu cuenta</li>
                          <li>Recibirás un enlace para restablecer tu contraseña</li>
                          <li>Sigue las instrucciones en el correo para crear una nueva contraseña</li>
                        </ol>
                        <p className="mt-2 text-gray-600">
                          Por seguridad, el enlace de restablecimiento expira después de 30 minutos. Si no recibes el
                          correo, revisa tu carpeta de spam o solicita un nuevo enlace.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">¿No encontraste lo que buscabas?</h3>
            <p className="text-gray-600 mb-4">
              Nuestro equipo de soporte está disponible para resolver todas tus dudas sobre CrediFácil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/contacto">Contactar soporte</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/educacion">Explorar educación financiera</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
