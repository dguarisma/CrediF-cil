"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, CreditCard, Settings, Bell, UserCircle, Users } from "lucide-react"

interface UserAuthButtonProps {
  className?: string
}

export function UserAuthButton({ className = "" }: UserAuthButtonProps) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    try {
      setIsPending(true)
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setIsPending(false)
    }
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" disabled className="h-9 w-9">
        <User className="h-5 w-5" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Button asChild className={`bg-primary text-white hover:bg-primary/90 ${className}`} size="sm">
        <Link href="/login">Iniciar sesión</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative rounded-full p-0 h-10 w-10 flex items-center justify-center ${className}`}
          aria-label="Menú de usuario"
          title="Acceder a mi perfil y opciones de cuenta"
        >
          {user.image ? (
            <Image
              src={user.image || "/placeholder.svg"}
              alt={user.name || "Avatar"}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-primary/20"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {user.image ? (
              <Image
                src={user.image || "/placeholder.svg"}
                alt={user.name || "Avatar"}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <User className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm">{user.name || "Usuario"}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {user.email || "usuario@ejemplo.com"}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="cursor-pointer font-medium">
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>Mi perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pagos" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Mis pagos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/reportes" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Reportes financieros</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/referidos" className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Programa de referidos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/notificaciones" className="cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificaciones</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/configuracion" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500"
          onClick={handleLogout}
          disabled={isPending}
          data-logout-button
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isPending ? "Cerrando sesión..." : "Cerrar sesión"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
