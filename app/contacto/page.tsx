import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, Clock, MessageSquare, MapPin, HelpCircle } from "lucide-react"

export default function Contacto() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold text-primary mb-2">Contacto</h1>
          <p className="text-gray-600 mb-8">Estamos aquí para ayudarte. Contáctanos de la manera que prefieras.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Correo Electrónico</h3>
                  <p className="text-gray-600 mb-4">soporte@credifacil.com</p>
                  <p className="text-sm text-gray-500">Respondemos en menos de 24 horas</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-bold mb-2">Teléfono</h3>
                  <p className="text-gray-600 mb-4">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Lunes a Viernes: 9am - 6pm</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">Chat en Vivo</h3>
                  <p className="text-gray-600 mb-4">Disponible en la app</p>
                  <p className="text-sm text-gray-500">Tiempo de respuesta: 5 minutos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="formulario" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="formulario">Formulario de Contacto</TabsTrigger>
              <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
              <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
            </TabsList>

            <TabsContent value="formulario">
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un mensaje</CardTitle>
                  <CardDescription>Completa el formulario y te responderemos lo antes posible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input id="nombre" placeholder="Juan Pérez" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="juan@ejemplo.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="asunto">Asunto</Label>
                      <Input id="asunto" placeholder="Consulta sobre mi préstamo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto">Enviar mensaje</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                  <CardDescription>Respuestas a las consultas más comunes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>¿Cómo puedo solicitar un préstamo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Para solicitar un préstamo, debes registrarte en nuestra aplicación, completar tu perfil con
                          la información requerida, seleccionar el monto y plazo que necesitas, y seguir el proceso de
                          verificación. Una vez aprobado, recibirás el dinero en tu cuenta bancaria en minutos.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>¿Qué documentos necesito para verificar mi identidad?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Necesitarás un documento de identidad oficial vigente (cédula, pasaporte), un comprobante de
                          domicilio reciente (no mayor a 3 meses), y acceso a una cámara para tomar una selfie de
                          verificación. Para préstamos mayores, podríamos solicitar comprobantes de ingresos
                          adicionales.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>¿Cómo puedo realizar el pago de mi préstamo?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Puedes realizar el pago de tu préstamo a través de nuestra aplicación utilizando tarjeta de
                          crédito/débito, transferencia bancaria, o en efectivo en establecimientos afiliados. Ingresa a
                          la sección "Pagos" para ver todas las opciones disponibles.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
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
                    <AccordionItem value="item-5">
                      <AccordionTrigger>¿Cómo puedo aumentar mi límite de crédito?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">
                          Para aumentar tu límite de crédito, debes construir un buen historial de pagos. Cada préstamo
                          pagado puntualmente suma puntos a tu perfil. Generalmente, después de 3-5 préstamos pagados a
                          tiempo, evaluamos automáticamente un aumento en tu límite.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="w-full md:w-auto" asChild>
                    <a href="/educacion">Ver más preguntas frecuentes</a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="ubicacion">
              <Card>
                <CardHeader>
                  <CardTitle>Nuestra Ubicación</CardTitle>
                  <CardDescription>Oficinas centrales y puntos de atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Oficina Central</h3>
                        <p className="text-gray-600">
                          Av. Financiera 123, Piso 5
                          <br />
                          Ciudad Financiera, CP 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Horario de Atención</h3>
                        <p className="text-gray-600">
                          Lunes a Viernes: 9:00 AM - 6:00 PM
                          <br />
                          Sábados: 10:00 AM - 2:00 PM
                          <br />
                          Domingos y Feriados: Cerrado
                        </p>
                      </div>
                    </div>

                    <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Mapa de ubicación</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-primary mb-2">¿Necesitas ayuda inmediata?</h3>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo de soporte está disponible para asistirte con cualquier consulta o problema.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Iniciar chat de soporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
