import Image from "next/image"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Image src="/images/logo.png" alt="CrediFácil Logo" width={120} height={120} className="mb-8" />
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse rounded-full"></div>
        </div>
        <p className="text-primary font-medium mt-4">Cargando...</p>
      </div>
    </div>
  )
}
