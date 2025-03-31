import { storage } from "./storage"

// Tipos para las opciones de la petición
type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  includeAuth?: boolean // Si se debe incluir el token de autenticación
}

// URL base de la API
const API_BASE_URL = "http://192.168.101.77:8080/api"

/**
 * Cliente HTTP para realizar peticiones a la API
 * @param endpoint - Ruta relativa del endpoint (sin la URL base)
 * @param options - Opciones de la petición
 * @returns Respuesta de la API
 */
export async function apiClient<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    includeAuth = true, // Por defecto incluye el token
  } = options

  // Construir la URL completa
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  // Preparar las cabeceras
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  }

  // Añadir el token de autenticación si es necesario
  if (includeAuth) {
    const token = await storage.getItem("userToken")
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`
    }
  }

  // Configurar la petición
  const config: RequestInit = {
    method,
    headers: requestHeaders,
  }

  // Añadir el cuerpo de la petición si es necesario
  if (body) {
    config.body = JSON.stringify(body)
  }

  // Para depuración
  console.log(`[API] Realizando petición ${method} a: ${url}`)
  if (body) console.log(`[API] Cuerpo:`, JSON.stringify(body))

  try {
    // Realizar la petición
    const response = await fetch(url, config)

    // Para depuración
    console.log(`[API] Respuesta status: ${response.status}`)

    // Verificar si la respuesta es JSON
    const contentType = response.headers.get("content-type")
    let data

    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
      console.log(`[API] Respuesta data:`, JSON.stringify(data))
    } else {
      const text = await response.text()
      console.log(`[API] Respuesta texto:`, text)
      data = text
    }

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(
        typeof data === "object" && data.message ? data.message : `Error ${response.status}: ${response.statusText}`,
      )
    }

    return data as T
  } catch (error: any) {
    console.error(`[API] Error en petición a ${endpoint}:`, error)
    throw error
  }
}

// Métodos de conveniencia para diferentes tipos de peticiones
export const api = {
  get: <T = any>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body: any, options?: Omit<RequestOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = any>(endpoint: string, body: any, options?: Omit<RequestOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T = any>(endpoint: string, body: any, options?: Omit<RequestOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T = any>(endpoint: string, options?: Omit<RequestOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
}

