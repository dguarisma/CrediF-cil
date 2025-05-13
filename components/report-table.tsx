"use client"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Report {
  id: string
  nombre: string
  fecha: string
  tipo: string
  periodo?: string
  monto?: number
  año?: string
}

interface ReportTableProps {
  reports: Report[]
  onViewReport: (report: Report) => void
  onDownloadReport: (report: Report) => void
  type: "estado-cuenta" | "comprobante" | "resumen-anual"
}

export function ReportTable({ reports, onViewReport, onDownloadReport, type }: ReportTableProps) {
  // Filtrar reportes por tipo
  const filteredReports = reports.filter((report) => report.tipo === type)

  // Determinar las columnas según el tipo
  const getColumns = () => {
    switch (type) {
      case "estado-cuenta":
        return (
          <>
            <div className="hidden md:block">Nombre</div>
            <div>Fecha</div>
            <div>Periodo</div>
            <div>Acciones</div>
          </>
        )
      case "comprobante":
        return (
          <>
            <div className="hidden md:block">Nombre</div>
            <div>Fecha</div>
            <div>Monto</div>
            <div>Acciones</div>
          </>
        )
      case "resumen-anual":
        return (
          <>
            <div className="hidden md:block">Nombre</div>
            <div>Fecha</div>
            <div>Año</div>
            <div>Acciones</div>
          </>
        )
    }
  }

  // Renderizar el contenido de las celdas según el tipo
  const renderCells = (report: Report) => {
    switch (type) {
      case "estado-cuenta":
        return (
          <>
            <div className="hidden md:block">{report.nombre}</div>
            <div>{report.fecha}</div>
            <div>{report.periodo ? format(new Date(`01-${report.periodo}`), "MMMM yyyy", { locale: es }) : ""}</div>
            <div className="flex gap-1 sm:gap-2">
              <Button variant="outline" size="sm" onClick={() => onViewReport(report)} className="px-2 sm:px-3">
                <FileText className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Ver</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDownloadReport(report)} className="px-2 sm:px-3">
                <Download className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </div>
          </>
        )
      case "comprobante":
        return (
          <>
            <div className="hidden md:block">{report.nombre}</div>
            <div>{report.fecha}</div>
            <div>${report.monto}</div>
            <div className="flex gap-1 sm:gap-2">
              <Button variant="outline" size="sm" onClick={() => onViewReport(report)} className="px-2 sm:px-3">
                <FileText className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Ver</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDownloadReport(report)} className="px-2 sm:px-3">
                <Download className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </div>
          </>
        )
      case "resumen-anual":
        return (
          <>
            <div className="hidden md:block">{report.nombre}</div>
            <div>{report.fecha}</div>
            <div>{report.año}</div>
            <div className="flex gap-1 sm:gap-2">
              <Button variant="outline" size="sm" onClick={() => onViewReport(report)} className="px-2 sm:px-3">
                <FileText className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Ver</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDownloadReport(report)} className="px-2 sm:px-3">
                <Download className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </div>
          </>
        )
    }
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-muted/50">{getColumns()}</div>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
              {renderCells(report)}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No hay reportes disponibles</div>
        )}
      </div>
    </div>
  )
}
