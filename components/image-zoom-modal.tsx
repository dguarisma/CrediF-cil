"use client"

import { useEffect, useState } from "react"
import { X, ZoomIn, ZoomOut } from "lucide-react"

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export function ImageZoomModal({ isOpen, onClose, imageSrc, imageAlt }: ImageZoomModalProps) {
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Resetear el zoom cuando se abre una nueva imagen
  useEffect(() => {
    if (isOpen) {
      setScale(1)
    }
  }, [isOpen, imageSrc])

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  if (!mounted) return null

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-w-[95vw] max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-4 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 bg-[#0A305F] dark:bg-[#22C0A8] text-white rounded-full flex items-center justify-center z-10 shadow-md hover:scale-110 transition-transform"
          aria-label="Cerrar"
        >
          <X size={16} className="sm:hidden" />
          <X size={18} className="hidden sm:block" />
        </button>

        <div className="flex justify-center space-x-1 sm:space-x-2 mb-2 sm:mb-4">
          <button
            onClick={zoomOut}
            className="bg-gray-100 dark:bg-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Reducir zoom"
            disabled={scale <= 0.5}
          >
            <ZoomOut size={16} className="sm:hidden text-[#0A305F] dark:text-[#22C0A8]" />
            <ZoomOut size={20} className="hidden sm:block text-[#0A305F] dark:text-[#22C0A8]" />
          </button>
          <button
            onClick={zoomIn}
            className="bg-gray-100 dark:bg-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Aumentar zoom"
            disabled={scale >= 3}
          >
            <ZoomIn size={16} className="sm:hidden text-[#0A305F] dark:text-[#22C0A8]" />
            <ZoomIn size={20} className="hidden sm:block text-[#0A305F] dark:text-[#22C0A8]" />
          </button>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <h2 id="modal-title" className="sr-only">
          {imageAlt}
        </h2>

        <div
          className="overflow-auto w-full"
          style={{
            height: "calc(90vh - 80px)",
            maxWidth: "90vw",
          }}
        >
          <div
            className="flex items-center justify-center min-h-full transition-transform duration-200 ease-out"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="relative">
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                className="max-w-full h-auto object-contain"
                style={{ maxHeight: "calc(90vh - 80px)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
