import { Check, Percent, UserCheck } from "lucide-react"

export function Features() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-accent dark:text-primary">
          ¿Por qué elegir CrediFácil?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/20 dark:to-secondary/30 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 border border-secondary/20 dark:border-secondary/40">
            <div className="rounded-full bg-secondary/10 dark:bg-secondary/30 p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
              <Check className="w-8 h-8 text-secondary dark:text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-secondary dark:text-secondary-foreground">Rápido y sencillo</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Solicita tu préstamo en minutos y recibe respuesta inmediata. Sin trámites complicados.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/20 dark:to-primary/30 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 border border-primary/20 dark:border-primary/40">
            <div className="rounded-full bg-primary/10 dark:bg-primary/30 p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
              <Percent className="w-8 h-8 text-primary dark:text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary dark:text-primary-foreground">Tasas competitivas</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Interés mensual del 15%-20% con comisiones transparentes. Sin sorpresas ni cargos ocultos.
            </p>
          </div>

          <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/20 dark:to-accent/30 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 border border-accent/20 dark:border-accent/40">
            <div className="rounded-full bg-accent/10 dark:bg-accent/30 p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
              <UserCheck className="w-8 h-8 text-accent dark:text-accent-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-accent dark:text-accent-foreground">Construye confianza</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Empieza con montos pequeños y aumenta tu límite con pagos puntuales. Premiamos tu responsabilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
