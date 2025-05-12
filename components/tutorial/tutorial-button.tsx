"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle, BookOpen, Lightbulb, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTutorial } from "@/contexts/tutorial-context"
import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"

export function TutorialButton() {
  const { tutorialFlows, startTutorial, completedTutorials } = useTutorial()

  // Memoizar el cálculo de si hay tutoriales nuevos
  const hasNewTutorials = useMemo(() => {
    return tutorialFlows.length > 0 && tutorialFlows.some((flow) => !completedTutorials.includes(flow.id))
  }, [tutorialFlows, completedTutorials])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 relative"
          aria-label="Ayuda y tutoriales"
        >
          <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
          {hasNewTutorials && <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />}
          <span className="sr-only">Ayuda y tutoriales</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium">Tutoriales y ayuda</div>

        <DropdownMenuSeparator />

        {tutorialFlows.length > 0 ? (
          <>
            <div className="px-2 py-1.5 text-xs text-muted-foreground">Tutoriales disponibles</div>
            {tutorialFlows.map((flow) => (
              <DropdownMenuItem
                key={flow.id}
                onClick={() => startTutorial(flow.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Lightbulb className="h-3.5 w-3.5" />
                  {flow.name}
                </span>
                {completedTutorials.includes(flow.id) ? (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Completado
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    Nuevo
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
          </>
        ) : (
          <div className="px-2 py-3 text-center text-sm text-muted-foreground">
            No hay tutoriales disponibles para esta página
          </div>
        )}

        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <BookOpen className="h-4 w-4" />
          <span>Centro de ayuda</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Sparkles className="h-4 w-4" />
          <span>Consejos y trucos</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
