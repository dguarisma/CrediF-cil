"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LevelSystemProps {
  currentLevel: number
  progress: number
  displayMode?: "horizontal" | "vertical"
}

export function LevelSystem({ currentLevel, progress, displayMode = "horizontal" }: LevelSystemProps) {
  // Estandarización de los niveles en toda la aplicación
  const levels = [
    {
      name: "Explorador",
      maxAmount: 50,
      color: "bg-gray-500",
      description:
        "Nivel inicial. Préstamos hasta $50 para nuevos usuarios que están construyendo su historial crediticio.",
    },
    {
      name: "Responsable",
      maxAmount: 250,
      color: "bg-blue-500",
      description: "Usuarios que han pagado puntualmente al menos 1 préstamo. Acceso a préstamos de hasta $250.",
    },
    {
      name: "Confiable",
      maxAmount: 350,
      color: "bg-green-500",
      description: "Usuarios con historial de 3+ préstamos pagados puntualmente. Límite de préstamo hasta $350.",
    },
    {
      name: "Pro",
      maxAmount: 450,
      color: "bg-purple-500",
      description:
        "Usuarios con excelente historial de pago (5+ préstamos). Acceso a préstamos de hasta $450 y tasas preferenciales.",
    },
    {
      name: "VIP",
      maxAmount: 500,
      color: "bg-yellow-500",
      description:
        "Nuestros mejores clientes con historial impecable. Préstamos hasta $500 con las mejores tasas y beneficios exclusivos.",
    },
  ]

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Tu nivel de confianza</h2>

      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="text-lg font-medium mr-2">Nivel actual:</span>
          <span className="text-lg font-bold">{levels[currentLevel - 1].name}</span>
        </div>
        <span className="text-xl font-bold">{progress}%</span>
      </div>

      <Progress value={progress} className="h-3 mb-6" />

      {displayMode === "horizontal" ? (
        // Visualización horizontal con tooltips informativos
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {levels.map((level, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className={`p-3 rounded-lg text-center ${
                      index + 1 === currentLevel ? `${level.color} text-white shadow-md` : "bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      scale: index + 1 === currentLevel ? [1, 1.05, 1] : 1,
                      transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    <div className="text-sm font-bold mb-1">{level.name}</div>
                    <div className="text-sm">${level.maxAmount}</div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{level.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      ) : (
        // Visualización vertical con descripciones integradas
        <div className="flex flex-col space-y-2">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg ${
                index + 1 === currentLevel ? `${level.color} text-white shadow-md` : "bg-gray-100"
              }`}
              whileHover={{ scale: 1.02 }}
              animate={{
                scale: index + 1 === currentLevel ? [1, 1.02, 1] : 1,
                transition: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="font-bold">{level.name}</div>
                <div>${level.maxAmount}</div>
              </div>
              <p className="text-xs mt-1 opacity-90">{level.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-start gap-2">
        <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-600">
          Avanza de nivel realizando pagos puntuales. Cada nivel te da acceso a mayores montos y mejores condiciones.
        </p>
      </div>
    </div>
  )
}
