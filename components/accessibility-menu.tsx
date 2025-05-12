"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accessibility, ZoomIn, ZoomOut, Type, RotateCcw, Eye } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useAccessibility } from "@/contexts/accessibility-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function AccessibilityMenu() {
  const { options, setFontSize, toggleHighContrast, toggleReducedMotion, toggleFocusVisible, resetOptions } =
    useAccessibility()

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Opciones de accesibilidad"
        >
          <Accessibility className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Accesibilidad</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <div className="px-2 py-1.5 text-sm font-medium">Opciones de accesibilidad</div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="font-size" className="text-sm">
              Tamaño de texto
            </Label>
            <span className="text-xs text-muted-foreground">{options.fontSize}%</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <ZoomOut className="h-3 w-3 text-muted-foreground" />
            <Slider
              id="font-size"
              value={[options.fontSize]}
              min={80}
              max={150}
              step={5}
              onValueChange={handleFontSizeChange}
              className="flex-1"
            />
            <ZoomIn className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="text-sm flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" />
              Alto contraste
            </Label>
            <Switch id="high-contrast" checked={options.highContrast} onCheckedChange={toggleHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion" className="text-sm flex items-center gap-2">
              <Type className="h-3.5 w-3.5" />
              Reducir animaciones
            </Label>
            <Switch id="reduced-motion" checked={options.reducedMotion} onCheckedChange={toggleReducedMotion} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="focus-visible" className="text-sm flex items-center gap-2">
              <Type className="h-3.5 w-3.5" />
              Resaltar enfoque
            </Label>
            <Switch id="focus-visible" checked={options.focusVisible} onCheckedChange={toggleFocusVisible} />
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={resetOptions} className="justify-center text-center cursor-pointer">
          <RotateCcw className="h-3.5 w-3.5 mr-2" />
          <span>Restablecer ajustes</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
