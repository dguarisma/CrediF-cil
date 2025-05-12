"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, Camera, Upload, FileText, ChevronRight, AlertCircle, Info } from "lucide-react"
import { LoadingScreen } from "@/components/loading-screen"
import Link from "next/link"

export default function Verificacion() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(25)

  // Estados para cada paso de verificación
  const [identidadVerificada, setIdentidadVerificada] = useState(false)
  const [selfieVerificada, setSelfieVerificada] = useState(false)
  const [documentoVerificado, setDocumentoVerificado] = useState(false)

  // Añadir un estado de carga inicial
  const [pageLoading, setPageLoading] = useState(true)

  // Añadir estos estados adicionales después de los estados existentes
  const [camaraActiva, setCamaraActiva] = useState(false)
  const [permisoCamara, setPermisoCamara] = useState<
    "pendiente" | "concedido" | "denegado" | "no-solicitado" | "error"
  >("no-solicitado")
  const [streamCamara, setStreamCamara] = useState<MediaStream | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Add the following new state variables to the top of the component:
  const [selfieCapturada, setSelfieCapturada] = useState(false)
  const [urlSelfie, setUrlSelfie] = useState<string | null>(null)

  // Referencia al elemento de video
  const videoRef = useRef<HTMLVideoElement>(null)

  // Añadir un useEffect para simular la carga inicial
  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Función mejorada para solicitar permiso de cámara
  const solicitarPermisoCamara = useCallback(async () => {
    setIsLoading(true)
    setPermisoCamara("pendiente")
    setErrorMessage(null)

    try {
      // Verificar si el navegador soporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Tu navegador no soporta acceso a la cámara. Intenta con un navegador más reciente.")
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      setStreamCamara(stream)
      setPermisoCamara("concedido")

      // Asegurarse de que el estado de la cámara se actualice
      setCamaraActiva(true)

      // Conectar el stream al elemento de video
      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // Asegurarse de que el video se reproduzca cuando esté listo
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((e) => {
              console.error("Error al reproducir el video:", e)
              setErrorMessage("No se pudo iniciar la cámara. Por favor, intenta de nuevo.")
              setPermisoCamara("error")
            })
          }
        }
      }

      console.log("Cámara activada correctamente")
    } catch (error) {
      console.error("Error al acceder a la cámara:", error)
      setPermisoCamara("denegado")
      setCamaraActiva(false)

      // Mensaje de error más descriptivo
      if (error instanceof Error) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
          setErrorMessage(
            "Permiso para usar la cámara denegado. Por favor, permite el acceso a la cámara en la configuración de tu navegador.",
          )
        } else if (error.name === "NotFoundError") {
          setErrorMessage("No se detectó ninguna cámara. Asegúrate de tener una cámara conectada y funcionando.")
        } else if (error.name === "NotReadableError" || error.name === "AbortError") {
          setErrorMessage("No se pudo acceder a la cámara. Es posible que esté siendo usada por otra aplicación.")
        } else {
          setErrorMessage(error.message || "Error desconocido al acceder a la cámara.")
        }
      } else {
        setErrorMessage("Error desconocido al acceder a la cámara.")
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Añadir esta función para detener la cámara cuando ya no se necesite
  const detenerCamara = useCallback(() => {
    if (streamCamara) {
      streamCamara.getTracks().forEach((track) => {
        track.stop()
        console.log("Track detenido:", track.kind)
      })
      setStreamCamara(null)
      setCamaraActiva(false)

      // Limpiar el srcObject del video
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }

      console.log("Cámara detenida")
    }
  }, [streamCamara])

  // Añadir este useEffect para limpiar el stream de la cámara cuando el componente se desmonte
  useEffect(() => {
    return () => {
      detenerCamara()
    }
  }, [detenerCamara])

  // Efecto para manejar cambios en el estado de la cámara
  useEffect(() => {
    if (permisoCamara === "concedido" && streamCamara && videoRef.current) {
      videoRef.current.srcObject = streamCamara
      videoRef.current.play().catch((e) => {
        console.error("Error al reproducir el video:", e)
        setErrorMessage("No se pudo iniciar la cámara. Por favor, intenta de nuevo.")
        setPermisoCamara("error")
      })
      console.log("Stream conectado al video")
    }
  }, [permisoCamara, streamCamara])

  // Función mejorada para capturar foto
  const capturePhoto = () => {
    if (!streamCamara || !videoRef.current) {
      console.error("No hay stream de cámara o elemento de video")
      setErrorMessage("No se pudo capturar la foto. Por favor, intenta de nuevo.")
      return
    }

    try {
      // Añadir efecto de flash
      const flashElement = document.createElement("div")
      flashElement.style.position = "fixed"
      flashElement.style.top = "0"
      flashElement.style.left = "0"
      flashElement.style.width = "100%"
      flashElement.style.height = "100%"
      flashElement.style.backgroundColor = "white"
      flashElement.style.opacity = "0.8"
      flashElement.style.zIndex = "9999"
      flashElement.style.transition = "opacity 0.5s"
      document.body.appendChild(flashElement)

      // Eliminar el flash después de un momento
      setTimeout(() => {
        flashElement.style.opacity = "0"
        setTimeout(() => {
          document.body.removeChild(flashElement)
        }, 500)
      }, 100)

      const video = videoRef.current
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error("No se pudo obtener el contexto del canvas")
        setErrorMessage("Error al procesar la imagen. Por favor, intenta de nuevo.")
        return
      }

      // Dibujar el video en el canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convertir a URL de datos
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9)
      setUrlSelfie(dataUrl)
      setSelfieCapturada(true)
      setErrorMessage(null)

      console.log("Selfie capturada correctamente")
    } catch (error) {
      console.error("Error al capturar la selfie:", error)
      setErrorMessage("Error al capturar la selfie. Por favor, intenta de nuevo.")
    }
  }

  const retakePhoto = () => {
    setSelfieCapturada(false)
    setUrlSelfie(null)
    setErrorMessage(null)

    // Asegurarse de que la cámara siga activa
    if (!camaraActiva && permisoCamara === "concedido") {
      solicitarPermisoCamara()
    }
  }

  // Update the handleNextStep function to use the captured photo:
  const handleNextStep = () => {
    setIsLoading(true)
    setErrorMessage(null)

    // Simulación de procesamiento
    setTimeout(() => {
      setIsLoading(false)

      if (currentStep === 1) {
        setIdentidadVerificada(true)
        setProgress(50)
        setCurrentStep(2)
      } else if (currentStep === 2) {
        // Solo avanzar si se ha capturado una selfie
        if (selfieCapturada) {
          // Detener la cámara antes de avanzar al siguiente paso
          detenerCamara()
          setSelfieVerificada(true)
          setProgress(75)
          setCurrentStep(3)
        } else {
          // Mostrar mensaje de error
          setErrorMessage("Por favor, toma una selfie antes de continuar")
        }
      } else if (currentStep === 3) {
        setDocumentoVerificado(true)
        setProgress(100)
        setCurrentStep(4)
      } else if (currentStep === 4) {
        // Redirigir a la página de éxito o al dashboard
        router.push("/perfil")
      }
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {pageLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex-1 p-4 md:p-8 bg-neutral/30">
          <div className="container max-w-2xl">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Verificación de identidad</h1>
              <p className="text-gray-600 text-sm md:text-base">
                Para garantizar la seguridad de todos, necesitamos verificar tu identidad antes de procesar tu préstamo.
              </p>
            </div>

            {/* Guía del proceso de verificación */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-blue-700 mb-2">¿Por qué verificamos tu identidad?</h3>
                    <p className="text-sm text-blue-700 mb-2">La verificación de identidad nos permite:</p>
                    <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1 mb-2">
                      <li>Proteger tu cuenta contra fraudes</li>
                      <li>Cumplir con regulaciones financieras</li>
                      <li>Asegurar que solo tú puedas acceder a tus préstamos</li>
                    </ul>
                    <p className="text-sm text-blue-700">
                      Tus datos están protegidos con encriptación de nivel bancario y nunca los compartimos con
                      terceros.
                      <Link href="/legal?tab=privacidad" className="underline ml-1">
                        Más información
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg md:text-xl">Progreso de verificación</CardTitle>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1.5 ${identidadVerificada ? "bg-green-100" : "bg-gray-100"}`}>
                      {identidadVerificada ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <span className="h-4 w-4 flex items-center justify-center text-xs font-bold">1</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${currentStep === 1 ? "text-primary" : ""}`}>Información personal</p>
                      <p className="text-sm text-gray-500">Verifica tus datos personales</p>
                    </div>
                    {identidadVerificada && <Check className="h-5 w-5 text-green-600" />}
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1.5 ${selfieVerificada ? "bg-green-100" : "bg-gray-100"}`}>
                      {selfieVerificada ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <span className="h-4 w-4 flex items-center justify-center text-xs font-bold">2</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${currentStep === 2 ? "text-primary" : ""}`}>Selfie de verificación</p>
                      <p className="text-sm text-gray-500">Toma una foto de tu rostro para verificación biométrica</p>
                    </div>
                    {selfieVerificada && <Check className="h-5 w-5 text-green-600" />}
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1.5 ${documentoVerificado ? "bg-green-100" : "bg-gray-100"}`}>
                      {documentoVerificado ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <span className="h-4 w-4 flex items-center justify-center text-xs font-bold">3</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${currentStep === 3 ? "text-primary" : ""}`}>Documento de identidad</p>
                      <p className="text-sm text-gray-500">Sube fotos de ambos lados de tu documento oficial</p>
                    </div>
                    {documentoVerificado && <Check className="h-5 w-5 text-green-600" />}
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1.5 ${currentStep === 4 ? "bg-primary/10" : "bg-gray-100"}`}>
                      <span className="h-4 w-4 flex items-center justify-center text-xs font-bold">4</span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${currentStep === 4 ? "text-primary" : ""}`}>Confirmación</p>
                      <p className="text-sm text-gray-500">Revisa y confirma tu solicitud</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Información personal</CardTitle>
                  <CardDescription>Verifica que tus datos sean correctos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nombre completo</p>
                        <p className="font-medium">Juan Pérez</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                        <p className="font-medium">juan@ejemplo.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fecha de nacimiento</p>
                        <p className="font-medium">15/05/1985</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Estos datos se utilizarán para verificar tu identidad. Asegúrate de que sean correctos.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNextStep} disabled={isLoading} className="touch-target">
                    {isLoading ? "Procesando..." : "Confirmar y continuar"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Selfie de verificación</CardTitle>
                  <CardDescription>Toma una foto de tu rostro para verificar tu identidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {permisoCamara === "no-solicitado" || permisoCamara === "denegado" || permisoCamara === "error" ? (
                      <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-center mb-4">
                          {permisoCamara === "denegado"
                            ? "No se pudo acceder a la cámara. Por favor, concede permisos para continuar."
                            : permisoCamara === "error"
                              ? "Hubo un problema al iniciar la cámara. Por favor, intenta de nuevo."
                              : "Necesitamos acceder a tu cámara para tomar una selfie de verificación."}
                        </p>
                        <Button
                          onClick={solicitarPermisoCamara}
                          variant={
                            permisoCamara === "denegado" || permisoCamara === "error" ? "destructive" : "default"
                          }
                          className="touch-target"
                        >
                          {permisoCamara === "denegado" || permisoCamara === "error"
                            ? "Reintentar acceso"
                            : "Permitir acceso a la cámara"}
                        </Button>
                      </div>
                    ) : permisoCamara === "pendiente" ? (
                      <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
                        <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 text-center">Solicitando acceso a la cámara...</p>
                      </div>
                    ) : (
                      <>
                        <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            id="camera-feed"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-4 border-white rounded-full opacity-50"></div>
                          </div>
                          {selfieCapturada && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                              <div className="bg-white p-4 rounded-lg max-w-[90%] w-auto">
                                <h3 className="font-bold mb-2 text-center">Selfie capturada</h3>
                                <img
                                  src={urlSelfie || "/placeholder.svg"}
                                  alt="Selfie capturada"
                                  className="w-48 h-48 object-cover rounded-lg mb-4 mx-auto"
                                />
                                <div className="flex flex-col sm:flex-row justify-between gap-2">
                                  <Button variant="outline" onClick={retakePhoto} className="flex-1 touch-target">
                                    Repetir
                                  </Button>
                                  <Button onClick={() => handleNextStep()} className="flex-1 touch-target">
                                    Confirmar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-700 mb-2">Consejos para una buena selfie:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Asegúrate de estar en un lugar bien iluminado</li>
                        <li>• Mira directamente a la cámara</li>
                        <li>• No uses gafas de sol ni sombreros</li>
                        <li>• Mantén una expresión neutral</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                  {permisoCamara === "concedido" && !selfieCapturada && (
                    <Button variant="outline" onClick={detenerCamara} className="w-full sm:w-auto touch-target">
                      Cancelar
                    </Button>
                  )}
                  {permisoCamara === "concedido" && !selfieCapturada && (
                    <Button
                      onClick={capturePhoto}
                      disabled={isLoading || !camaraActiva}
                      className="w-full sm:w-auto sm:ml-auto touch-target"
                    >
                      {isLoading ? "Procesando..." : "Tomar selfie"}
                      <Camera className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Documento de identidad</CardTitle>
                  <CardDescription>Sube una foto de tu documento oficial de identidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-[3/2] bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-center text-sm">Frente del documento</p>
                        <Button variant="ghost" size="sm" className="mt-2 touch-target">
                          <Upload className="h-4 w-4 mr-1" /> Subir
                        </Button>
                      </div>
                      <div className="aspect-[3/2] bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300">
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-center text-sm">Reverso del documento</p>
                        <Button variant="ghost" size="sm" className="mt-2 touch-target">
                          <Upload className="h-4 w-4 mr-1" /> Subir
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2">Documentos aceptados:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Cédula de identidad</li>
                        <li>• Pasaporte</li>
                        <li>• Licencia de conducir</li>
                      </ul>
                      <p className="text-sm text-blue-700 mt-2">
                        Asegúrate de que el documento sea vigente y que toda la información sea claramente legible.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNextStep} disabled={isLoading} className="touch-target">
                    {isLoading ? "Procesando..." : "Subir documentos"}
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">¡Verificación completada!</CardTitle>
                  <CardDescription>Tu identidad ha sido verificada correctamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center py-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Verificación exitosa</h3>
                    <p className="text-gray-600 text-center mb-6">
                      Hemos verificado tu identidad correctamente. Tu préstamo está siendo procesado.
                    </p>

                    <div className="w-full space-y-4">
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Monto solicitado:</span>
                        <span className="font-bold">$200</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Plazo:</span>
                        <span className="font-bold">30 días</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Fecha de depósito estimada:</span>
                        <span className="font-bold">Hoy (en minutos)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleNextStep}
                    disabled={isLoading}
                    className="bg-accent hover:bg-accent/90 touch-target"
                  >
                    {isLoading ? "Redirigiendo..." : "Ir a mi perfil"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
