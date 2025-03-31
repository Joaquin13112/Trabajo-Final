"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { router, useSegments, useRootNavigationState } from "expo-router"
import { Alert } from "react-native"
import { jwtDecode } from "jwt-decode"
import { storage } from "@/app/utils/storage"
import { api } from "@/app/utils/api-client"

type User = {
  id: string
  email: string
  token: string
} | null

// Tipo para el registro de usuarios
type RegisterData = {
  nombre: string
  apellido: string
  email: string
  password: string
}

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<any>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

interface JwtPayload {
  sub: string
  iat: number
  exp: number
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const segments = useSegments()
  const navigationState = useRootNavigationState()

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true)
      try {
        const token = await storage.getItem("userToken")
        const email = await storage.getItem("userEmail")

        if (token && email) {
          try {
            const decoded = jwtDecode<JwtPayload>(token)
            setUser({
              id: decoded.sub,
              email,
              token,
            })
            console.log("[AUTH] Usuario cargado:", email)
          } catch (e) {
            console.error("[AUTH] Error decodificando token:", e)
            // Token inválido, lo eliminamos
            await storage.removeItem("userToken")
            await storage.removeItem("userEmail")
          }
        }
      } catch (error) {
        console.error("[AUTH] Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // Redirección basada en autenticación
  useEffect(() => {
    if (!navigationState?.key) return

    const inAuthGroup = segments[0] === "(auth)"

    if (!user && !inAuthGroup) {
      router.replace("/login")
    } else if (user && inAuthGroup) {
      router.replace("/")
    }
  }, [user, segments, navigationState?.key])

  // Función para registrar un nuevo usuario
  const register = async (data: RegisterData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("[AUTH] Intentando registrar usuario:", data.email)

      // Usar nuestro cliente API sin autenticación
      const responseData = await api.post("clientes/registrar", data, { includeAuth: false })

      console.log("[AUTH] Registro exitoso para:", data.email)

      // Devolvemos los datos para que el componente pueda mostrar información específica
      return responseData
    } catch (error: any) {
      console.error("[AUTH] Error de registro:", error)

      let errorMessage = error.message || "Error al registrar usuario"

      if (error.message?.includes("Network request failed")) {
        errorMessage = "Error de conexión a la red. Verifica tu conexión y la dirección IP del servidor."
      }

      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log(`[AUTH] Intentando iniciar sesión con: ${email}`)

      // Usar nuestro cliente API sin autenticación
      const data = await api.post(
        "clientes/login",
        {
          email: email.trim().toLowerCase(),
          password,
        },
        { includeAuth: false },
      )

      if (!data.token) {
        throw new Error("No se recibió token en la respuesta")
      }

      const decoded = jwtDecode<JwtPayload>(data.token)
      const userData = {
        id: decoded.sub,
        email: email.trim().toLowerCase(),
        token: data.token,
      }

      // Guardar datos del usuario
      await storage.setItem("userToken", data.token)
      await storage.setItem("userEmail", email.trim().toLowerCase())

      setUser(userData)
      console.log("[AUTH] Login exitoso para:", email)
    } catch (error: any) {
      console.error("[AUTH] Login error:", error)

      // Mejorar el mensaje de error para problemas de red
      let errorMessage = error.message || "Error de conexión"

      if (error.message?.includes("Network request failed")) {
        errorMessage = "Error de conexión a la red. Verifica tu conexión y la dirección IP del servidor."
      } else if (error.message?.includes("JSON")) {
        errorMessage = "Error en la respuesta del servidor. Formato incorrecto."
      }

      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Obtener el token antes de eliminarlo
      const token = await storage.getItem("userToken")

      if (token) {
        console.log("[AUTH] Intentando cerrar sesión en el servidor")

        // Llamar a la API de logout
        try {
          await api.post(
            "auth/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          )
          console.log("[AUTH] Sesión cerrada en el servidor correctamente")
        } catch (apiError) {
          console.error("[AUTH] Error al cerrar sesión en el servidor:", apiError)
          // Continuamos con el logout local incluso si falla el servidor
        }
      }

      // Eliminar datos de sesión localmente
      await storage.removeItem("userToken")
      await storage.removeItem("userEmail")
      setUser(null)
      console.log("[AUTH] Sesión local cerrada correctamente")
    } catch (error) {
      console.error("[AUTH] Error en logout:", error)
      Alert.alert("Error", "No se pudo cerrar sesión")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>{children}</AuthContext.Provider>
  )
}

