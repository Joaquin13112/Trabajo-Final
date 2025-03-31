import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store"

// Implementación para web
const webStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      console.error("Error reading from localStorage", e)
      return null
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      console.error("Error writing to localStorage", e)
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error("Error removing from localStorage", e)
    }
  },
}

// Implementación para dispositivos nativos
const nativeStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (e) {
      console.error("Error reading from SecureStore", e)
      return null
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (e) {
      console.error("Error writing to SecureStore", e)
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (e) {
      console.error("Error removing from SecureStore", e)
    }
  },
}

// Exportar la implementación adecuada según la plataforma
export const storage = Platform.OS === "web" ? webStorage : nativeStorage

