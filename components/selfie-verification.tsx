"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, RefreshCw, Check, AlertCircle } from "lucide-react"

export function SelfieVerification() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Iniciar la cámara
  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error)
      setCameraError("No se pudo acceder a la cámara. Por favor, verifica los permisos.")
      setIsCameraActive(false)
    }
  }

  // Detener la cámara
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsCameraActive(false)
  }

  // Capturar la foto
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Configurar el canvas con las dimensiones del video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Efecto de flash
      setIsFlashing(true)
      setTimeout(() => setIsFlashing(false), 150)

      // Dibujar el frame actual del video en el canvas
      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convertir a imagen
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9)
        setCapturedImage(imageDataUrl)

        // Detener la cámara después de capturar
        stopCamera()
      }
    }
  }

  // Reiniciar el proceso
  const resetCapture = () => {
    setCapturedImage(null)
    startCamera()
  }

  // Iniciar la cámara al montar el componente
  useEffect(() => {
    if (!capturedImage) {
      startCamera()
    }

    // Limpiar al desmontar
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0 relative">
        {/* Área de visualización de la cámara o imagen capturada */}
        <div className="relative aspect-[3/4] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {isFlashing && <div className="absolute inset-0 bg-white z-10 animate-flash"></div>}

          {capturedImage ? (
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Selfie capturada"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
              />

              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gray-100">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <p className="text-red-500 font-medium">{cameraError}</p>
                  <Button variant="outline" className="mt-4" onClick={startCamera}>
                    Reintentar
                  </Button>
                </div>
              )}

              {!isCameraActive && !cameraError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Canvas oculto para capturar la imagen */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controles */}
        <div className="p-4 bg-white">
          {capturedImage ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-green-600 mb-2">
                <Check className="mr-2 h-5 w-5" />
                <span className="font-medium">Selfie capturada correctamente</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={resetCapture} className="w-full flex items-center justify-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Volver a tomar
                </Button>
                <Button className="w-full">Continuar</Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={capturePhoto}
              disabled={!isCameraActive || !!cameraError}
              className="w-full flex items-center justify-center"
            >
              <Camera className="mr-2 h-5 w-5" />
              Tomar selfie
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
