"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  image?: string
} | null

type AuthContextType = {
  user: User
  login: (provider: "google" | "email") => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Verificar si hay un usuario en localStorage
        const storedUser = localStorage.getItem("credifacil_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (provider: "google" | "email") => {
    setIsLoading(true)
    try {
      // Simulación de login
      // En una implementación real, aquí se integraría con el proveedor de autenticación
      const mockUser = {
        id: "user123",
        name: "Usuario de Prueba",
        email: "usuario@ejemplo.com",
        image: "/mystical-forest-spirit.png",
      }

      // Guardar usuario en localStorage
      localStorage.setItem("credifacil_user", JSON.stringify(mockUser))
      setUser(mockUser)

      return mockUser
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // Eliminar usuario de localStorage
      localStorage.removeItem("credifacil_user")
      setUser(null)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
