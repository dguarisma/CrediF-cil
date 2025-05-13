"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { GuideAvatar } from "@/components/onboarding/guide-avatar"
import { ReportTable } from "@/components/report-table"

export default function ReportesFinancieros() {
  const { user } = useAuth()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<string>(format(new Date(), "MM-yyyy"))
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<any[]>([])

  // Datos de ejemplo para los reportes
  const reportesDisponibles = [
    {
      id: "estado-cuenta-abril",
      nombre: "Estado de Cuenta - Abril 2023",
      fecha: "30/04/2023",
      tipo: "estado-cuenta",
      periodo: "04-2023",
    },
    {
      id: "estado-cuenta-mayo",
      nombre: "Estado de Cuenta - Mayo 2023",
      fecha: "31/05/2023",
      tipo: "estado-cuenta",
      periodo: "05-2023",
    },
    {
      id: "estado-cuenta-junio",
      nombre: "Estado de Cuenta - Junio 2023",
      fecha: "30/06/2023",
      tipo: "estado-cuenta",
      periodo: "06-2023",
    },
    {
      id: "comprobante-pago-1",
      nombre: "Comprobante de Pago #12345",
      fecha: "15/04/2023",
      tipo: "comprobante",
      monto: 120,
    },
    {
      id: "comprobante-pago-2",
      nombre: "Comprobante de Pago #67890",
      fecha: "20/05/2023",
      tipo: "comprobante",
      monto: 150,
    },
    {
      id: "resumen-anual-2023",
      nombre: "Resumen Anual 2023",
      fecha: "31/12/2023",
      tipo: "resumen-anual",
      año: "2023",
    },
  ]

  // Función para generar un reporte
  const generarReporte = () => {
    setIsGenerating(true)

    // Simulamos la generación del reporte
    setTimeout(() => {
      const nuevoReporte = {
        id: `estado-cuenta-${month}`,
        nombre: `Estado de Cuenta - ${format(new Date(`01-${month}`), "MMMM yyyy", { locale: es })}`,
        fecha: format(new Date(), "dd/MM/yyyy"),
        tipo: "estado-cuenta",
        periodo: month,
      }

      setGeneratedReports([nuevoReporte, ...generatedReports])
      setIsGenerating(false)
    }, 1500)
  }

  // Función para descargar un reporte
  const descargarReporte = (reporte) => {
    // En una implementación real, aquí se descargaría el archivo
    console.log(`Descargando reporte: ${reporte.nombre}`)

    // Simulamos la descarga
    alert(`Descargando ${reporte.nombre}...`)
  }

  // Función para ver detalles de un reporte
  const verDetallesReporte = (reporte) => {
    setSelectedReport(reporte.id)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 bg-neutral/30 pt-20">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Reportes Financieros</h1>
              <p className="text-gray-600">Genera y descarga tus estados de cuenta y comprobantes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8">
            <Card className="md:col-span-2 order-2 md:order-1">
              <CardHeader>
                <CardTitle>Mis reportes</CardTitle>
                <CardDescription>Accede a tus estados de cuenta y comprobantes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="estados-cuenta">
                  <TabsList className="mb-4 flex flex-wrap">
                    <TabsTrigger value="estados-cuenta" className="flex-1">
                      <span className="hidden sm:inline">Estados de cuenta</span>
                      <span className="sm:hidden">Estados</span>
                    </TabsTrigger>
                    <TabsTrigger value="comprobantes" className="flex-1">
                      <span className="hidden sm:inline">Comprobantes de pago</span>
                      <span className="sm:hidden">Comprobantes</span>
                    </TabsTrigger>
                    <TabsTrigger value="anuales" className="flex-1">
                      <span className="hidden sm:inline">Reportes anuales</span>
                      <span className="sm:hidden">Anuales</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="estados-cuenta">
                    <ReportTable
                      reports={[...generatedReports, ...reportesDisponibles]}
                      onViewReport={verDetallesReporte}
                      onDownloadReport={descargarReporte}
                      type="estado-cuenta"
                    />
                  </TabsContent>

                  <TabsContent value="comprobantes">
                    <ReportTable
                      reports={reportesDisponibles}
                      onViewReport={verDetallesReporte}
                      onDownloadReport={descargarReporte}
                      type="comprobante"
                    />
                  </TabsContent>

                  <TabsContent value="anuales">
                    <ReportTable
                      reports={reportesDisponibles}
                      onViewReport={verDetallesReporte}
                      onDownloadReport={descargarReporte}
                      type="resumen-anual"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="order-1 md:order-2">
              <CardHeader>
                <CardTitle>Generar reporte</CardTitle>
                <CardDescription>Crea un nuevo estado de cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tipo de reporte</label>
                  <Select defaultValue="estado-cuenta">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="estado-cuenta">Estado de cuenta</SelectItem>
                      <SelectItem value="comprobante">Comprobante de pago</SelectItem>
                      <SelectItem value="resumen">Resumen de actividad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Periodo</label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un mes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01-2023">Enero 2023</SelectItem>
                      <SelectItem value="02-2023">Febrero 2023</SelectItem>
                      <SelectItem value="03-2023">Marzo 2023</SelectItem>
                      <SelectItem value="04-2023">Abril 2023</SelectItem>
                      <SelectItem value="05-2023">Mayo 2023</SelectItem>
                      <SelectItem value="06-2023">Junio 2023</SelectItem>
                      <SelectItem value="07-2023">Julio 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Formato</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-accent hover:bg-accent/90"
                  onClick={generarReporte}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generando..." : "Generar reporte"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {selectedReport && (
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vista previa del reporte</CardTitle>
                  <CardDescription>{reportesDisponibles.find((r) => r.id === selectedReport)?.nombre}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-1" />
                    Imprimir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => descargarReporte(reportesDisponibles.find((r) => r.id === selectedReport))}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 sm:p-6 bg-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-primary">CrediFácil</h2>
                      <p className="text-gray-600">Estado de cuenta</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold">Fecha de emisión:</p>
                      <p>{reportesDisponibles.find((r) => r.id === selectedReport)?.fecha}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold mb-2 text-lg">Información del cliente</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Nombre:</p>
                        <p className="font-medium">Juan Pérez</p>
                      </div>
                      <div>
                        <p className="text-gray-600">ID de cliente:</p>
                        <p className="font-medium">CRF-12345</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Correo electrónico:</p>
                        <p className="font-medium">juan@ejemplo.com</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Teléfono:</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold mb-2 text-lg">Resumen de la cuenta</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Límite de crédito:</p>
                        <p className="font-medium">$250.00</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Saldo disponible:</p>
                        <p className="font-medium">$75.00</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Saldo actual:</p>
                        <p className="font-medium">$175.00</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fecha de corte:</p>
                        <p className="font-medium">30/04/2023</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold mb-2 text-lg">Movimientos del periodo</h3>
                    <div className="rounded-md border overflow-x-auto">
                      <div className="min-w-[500px]">
                        <div className="grid grid-cols-4 gap-4 p-3 font-medium border-b bg-muted/50">
                          <div>Fecha</div>
                          <div>Descripción</div>
                          <div>Tipo</div>
                          <div>Monto</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 p-3 border-b">
                          <div>01/04/2023</div>
                          <div>Préstamo aprobado</div>
                          <div>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Depósito
                            </Badge>
                          </div>
                          <div className="text-green-600">+$200.00</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 p-3 border-b">
                          <div>15/04/2023</div>
                          <div>Pago de préstamo</div>
                          <div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              Pago
                            </Badge>
                          </div>
                          <div className="text-blue-600">-$120.00</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 p-3">
                          <div>25/04/2023</div>
                          <div>Interés mensual</div>
                          <div>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                              Cargo
                            </Badge>
                          </div>
                          <div className="text-yellow-600">+$15.00</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2 text-lg">Información de pago</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Pago mínimo:</p>
                        <p className="font-medium">$50.00</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fecha límite de pago:</p>
                        <p className="font-medium">15/05/2023</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pago para liquidar:</p>
                        <p className="font-medium">$175.00</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tasa de interés:</p>
                        <p className="font-medium">15% mensual</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Componente de onboarding */}
      <GuideAvatar
        message="¡Aquí puedes generar y descargar tus estados de cuenta y comprobantes de pago!"
        position="bottom-right"
      />
      <style jsx global>{`
        @media (max-width: 640px) {
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </main>
  )
}
