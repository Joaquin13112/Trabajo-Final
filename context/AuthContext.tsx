"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { router, useSegments, useRootNavigationState } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"
import { jwtDecode } from "jwt-decode"

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
  register: (data: RegisterData) => Promise<any> // Cambiado para devolver la respuesta
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
        const token = await SecureStore.getItemAsync("userToken")
        const email = await SecureStore.getItemAsync("userEmail")

        if (token && email) {
          const decoded = jwtDecode<JwtPayload>(token)
          setUser({
            id: decoded.sub,
            email,
            token,
          })
        }
      } catch (error) {
        console.error("Error loading user:", error)
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

      const response = await fetch("http://192.168.101.77:8080/api/clientes/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log(`[AUTH] Respuesta de registro: ${response.status}`)

      const contentType = response.headers.get("content-type")
      let responseData

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json()
        console.log("[AUTH] Datos de registro recibidos:", JSON.stringify(responseData))
      } else {
        const textResponse = await response.text()
        console.log("[AUTH] Respuesta no-JSON:", textResponse)
        throw new Error("Respuesta del servidor no es JSON válido")
      }

      if (!response.ok) {
        throw new Error(responseData.message || `Error ${response.status}: ${response.statusText}`)
      }

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
      // Determinar la URL según la plataforma
      const apiUrl = "http://192.168.101.77:8080/api/clientes/login"

      // Para depuración - muestra la URL que se está usando
      console.log(`[AUTH] Intentando conectar a: ${apiUrl}`)
      console.log(`[AUTH] Datos: email=${email}, password=****`)

      // Configuración de la petición con timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 segundos de timeout

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
        signal: controller.signal,
      })

      // Limpiar el timeout
      clearTimeout(timeoutId)

      // Para depuración
      console.log(`[AUTH] Respuesta del servidor: ${response.status}`)

      // Verificar si la respuesta es JSON antes de parsearla
      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
        console.log("[AUTH] Datos recibidos:", JSON.stringify(data))
      } else {
        const textResponse = await response.text()
        console.log("[AUTH] Respuesta no-JSON:", textResponse)
        throw new Error("Respuesta del servidor no es JSON válido")
      }

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`)
      }

      if (!data.token) {
        throw new Error("No se recibió token en la respuesta")
      }

      const decoded = jwtDecode<JwtPayload>(data.token)
      const userData = {
        id: decoded.sub,
        email: email.trim().toLowerCase(),
        token: data.token,
      }

      await SecureStore.setItemAsync("userToken", data.token)
      await SecureStore.setItemAsync("userEmail", email.trim().toLowerCase())

      setUser(userData)
      console.log("[AUTH] Login exitoso para:", email)
    } catch (error: any) {
      console.error("[AUTH] Login error:", error)

      // Mejorar el mensaje de error para problemas de red
      let errorMessage = error.message || "Error de conexión"

      if (error.name === "AbortError") {
        errorMessage = "La conexión tardó demasiado tiempo. Verifica tu conexión a internet."
      } else if (error.message?.includes("Network request failed")) {
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
      await SecureStore.deleteItemAsync("userToken")
      await SecureStore.deleteItemAsync("userEmail")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      Alert.alert("Error", "No se pudo cerrar sesión")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>{children}</AuthContext.Provider>
  )
}

