"use client"

import { CheckCircle2, CreditCard, FileCheck, UserCheck } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { ImageZoomModal } from "./image-zoom-modal"

export function HowItWorks() {
  const [zoomImage, setZoomImage] = useState<{
    open: boolean
    src: string
    alt: string
  }>({
    open: false,
    src: "",
    alt: "",
  })

  const handleImageClick = (src: string, alt: string) => {
    setZoomImage({
      open: true,
      src,
      alt,
    })
  }

  const closeZoom = () => {
    setZoomImage({
      ...zoomImage,
      open: false,
    })
  }

  return (
    <section id="como-funciona" className="py-12 bg-white dark:bg-gray-900 scroll-mt-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0A305F] dark:text-[#22C0A8]">
          ¿Cómo funciona?
        </h2>

        {/* Versión móvil - Vertical */}
        <div className="md:hidden space-y-8">
          {/* Paso 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#22C0A8] flex items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-[#0A305F] dark:text-white text-center">Regístrate</h3>
              <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-[#22C0A8]">
                <span className="text-base sm:text-lg font-bold text-[#22C0A8]">1</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm mt-2 mb-4 px-2">
              Crea tu cuenta con Google o correo electrónico.
            </p>
            <div
              className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg shadow-md w-full cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleImageClick("/images/step1-register.png", "Pantalla de registro de CrediFácil")}
            >
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-[85%] h-[85%] group">
                    <Image
                      src="/images/step1-register.png"
                      alt="Pantalla de registro de CrediFácil"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/80 dark:bg-gray-800/80 p-1 sm:p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#0A305F] dark:text-[#22C0A8]"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pasos 2-4 similares... */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1F71C5] flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-[#0A305F] dark:text-white text-center">Solicita</h3>
              <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-[#1F71C5]">
                <span className="text-base sm:text-lg font-bold text-[#1F71C5]">2</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm mt-2 mb-4 px-2">
              Elige el monto y plazo que necesitas.
            </p>
            <div
              className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg shadow-md w-full cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleImageClick("/images/step2-request.png", "Pantalla de solicitud de préstamo")}
            >
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-[85%] h-[85%] group">
                    <Image
                      src="/images/step2-request.png"
                      alt="Pantalla de solicitud de préstamo"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/80 dark:bg-gray-800/80 p-1 sm:p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#0A305F] dark:text-[#22C0A8]"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0A305F] flex items-center justify-center mb-4">
              <FileCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-[#0A305F] dark:text-white text-center">Verifica</h3>
              <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-[#0A305F]">
                <span className="text-base sm:text-lg font-bold text-[#0A305F]">3</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm mt-2 mb-4 px-2">
              Valida tu identidad con selfie y documento.
            </p>
            <div
              className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg shadow-md w-full cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleImageClick("/images/step3-verify.png", "Pantalla de verificación de identidad")}
            >
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-[85%] h-[85%] group">
                    <Image
                      src="/images/step3-verify.png"
                      alt="Pantalla de verificación de identidad"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/80 dark:bg-gray-800/80 p-1 sm:p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#0A305F] dark:text-[#22C0A8]"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#22C0A8] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-[#0A305F] dark:text-white text-center">Recibe</h3>
              <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 border-[#22C0A8]">
                <span className="text-base sm:text-lg font-bold text-[#22C0A8]">4</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm mt-2 mb-4 px-2">
              Obtén tu dinero en minutos en tu cuenta.
            </p>
            <div
              className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg shadow-md w-full cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleImageClick("/images/step4-receive.png", "Pantalla de préstamo aprobado")}
            >
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-[85%] h-[85%] group">
                    <Image
                      src="/images/step4-receive.png"
                      alt="Pantalla de préstamo aprobado"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/80 dark:bg-gray-800/80 p-1 sm:p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#0A305F] dark:text-[#22C0A8]"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Versión desktop - Horizontal con línea de tiempo */}
        <div className="hidden md:block">
          <div className="flex flex-col items-center">
            {/* Iconos */}
            <div className="flex justify-between w-full px-4 lg:px-8 mb-6">
              <div className="w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-[#22C0A8] flex items-center justify-center">
                <UserCheck className="w-8 lg:w-12 h-8 lg:h-12 text-white" />
              </div>

              <div className="w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-[#1F71C5] flex items-center justify-center">
                <CreditCard className="w-8 lg:w-12 h-8 lg:h-12 text-white" />
              </div>

              <div className="w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-[#0A305F] flex items-center justify-center">
                <FileCheck className="w-8 lg:w-12 h-8 lg:h-12 text-white" />
              </div>

              <div className="w-16 lg:w-24 h-16 lg:h-24 rounded-full bg-[#22C0A8] flex items-center justify-center">
                <CheckCircle2 className="w-8 lg:w-12 h-8 lg:h-12 text-white" />
              </div>
            </div>

            {/* Línea con números */}
            <div className="relative w-full px-4 lg:px-8 mb-6">
              <div className="absolute top-1/2 left-4 lg:left-8 right-4 lg:right-8 h-1 bg-gradient-to-r from-[#22C0A8] via-[#1F71C5] to-[#22C0A8] transform -translate-y-1/2"></div>

              <div className="flex justify-between">
                <div className="bg-white dark:bg-gray-900 w-8 lg:w-10 h-8 lg:h-10 rounded-full flex items-center justify-center border-2 border-[#22C0A8] z-10">
                  <span className="text-lg lg:text-xl font-bold text-[#22C0A8]">1</span>
                </div>

                <div className="bg-white dark:bg-gray-900 w-8 lg:w-10 h-8 lg:h-10 rounded-full flex items-center justify-center border-2 border-[#1F71C5] z-10">
                  <span className="text-lg lg:text-xl font-bold text-[#1F71C5]">2</span>
                </div>

                <div className="bg-white dark:bg-gray-900 w-8 lg:w-10 h-8 lg:h-10 rounded-full flex items-center justify-center border-2 border-[#0A305F] z-10">
                  <span className="text-lg lg:text-xl font-bold text-[#0A305F]">3</span>
                </div>

                <div className="bg-white dark:bg-gray-900 w-8 lg:w-10 h-8 lg:h-10 rounded-full flex items-center justify-center border-2 border-[#22C0A8] z-10">
                  <span className="text-lg lg:text-xl font-bold text-[#22C0A8]">4</span>
                </div>
              </div>
            </div>

            {/* Títulos */}
            <div className="flex justify-between w-full px-4 lg:px-8 mb-6 lg:mb-8">
              <h3 className="text-base lg:text-xl font-bold text-[#0A305F] dark:text-white text-center w-16 lg:w-24">
                Regístrate
              </h3>
              <h3 className="text-base lg:text-xl font-bold text-[#0A305F] dark:text-white text-center w-16 lg:w-24">
                Solicita
              </h3>
              <h3 className="text-base lg:text-xl font-bold text-[#0A305F] dark:text-white text-center w-16 lg:w-24">
                Verifica
              </h3>
              <h3 className="text-base lg:text-xl font-bold text-[#0A305F] dark:text-white text-center w-16 lg:w-24">
                Recibe
              </h3>
            </div>

            {/* Descripciones */}
            <div className="flex justify-between w-full px-2 lg:px-4 mb-6 lg:mb-8">
              <p className="text-gray-600 dark:text-gray-300 text-center text-xs lg:text-sm w-1/4 px-1 lg:px-2">
                Crea tu cuenta con Google o correo electrónico.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center text-xs lg:text-sm w-1/4 px-1 lg:px-2">
                Elige el monto y plazo que necesitas.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center text-xs lg:text-sm w-1/4 px-1 lg:px-2">
                Valida tu identidad con selfie y documento.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center text-xs lg:text-sm w-1/4 px-1 lg:px-2">
                Obtén tu dinero en minutos en tu cuenta.
              </p>
            </div>

            {/* Imágenes */}
            <div className="grid grid-cols-4 gap-2 lg:gap-4 w-full">
              {/* Imagen 1 */}
              <div
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleImageClick("/images/step1-register.png", "Pantalla de registro de CrediFácil")}
                role="button"
                aria-label="Ampliar imagen de registro"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleImageClick("/images/step1-register.png", "Pantalla de registro de CrediFácil")
                  }
                }}
              >
                <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="relative w-[85%] h-[85%] group">
                      <Image
                        src="/images/step1-register.png"
                        alt="Pantalla de registro de CrediFácil"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#0A305F] dark:text-[#22C0A8]"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagen 2 */}
              <div
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleImageClick("/images/step2-request.png", "Pantalla de solicitud de préstamo")}
                role="button"
                aria-label="Ampliar imagen de solicitud"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleImageClick("/images/step2-request.png", "Pantalla de solicitud de préstamo")
                  }
                }}
              >
                <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="relative w-[85%] h-[85%] group">
                      <Image
                        src="/images/step2-request.png"
                        alt="Pantalla de solicitud de préstamo"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#0A305F] dark:text-[#22C0A8]"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagen 3 */}
              <div
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleImageClick("/images/step3-verify.png", "Pantalla de verificación de identidad")}
                role="button"
                aria-label="Ampliar imagen de verificación"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleImageClick("/images/step3-verify.png", "Pantalla de verificación de identidad")
                  }
                }}
              >
                <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="relative w-[85%] h-[85%] group">
                      <Image
                        src="/images/step3-verify.png"
                        alt="Pantalla de verificación de identidad"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#0A305F] dark:text-[#22C0A8]"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagen 4 */}
              <div
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleImageClick("/images/step4-receive.png", "Pantalla de préstamo aprobado")}
                role="button"
                aria-label="Ampliar imagen de recepción"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleImageClick("/images/step4-receive.png", "Pantalla de préstamo aprobado")
                  }
                }}
              >
                <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="relative w-[85%] h-[85%] group">
                      <Image
                        src="/images/step4-receive.png"
                        alt="Pantalla de préstamo aprobado"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#0A305F] dark:text-[#22C0A8]"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para zoom de imágenes */}
        <ImageZoomModal isOpen={zoomImage.open} onClose={closeZoom} imageSrc={zoomImage.src} imageAlt={zoomImage.alt} />
      </div>
    </section>
  )
}
