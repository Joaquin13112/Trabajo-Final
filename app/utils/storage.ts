import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage"

// Implementación para web
const webStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
};

// Implementación para dispositivos nativos
const nativeStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('Error reading from SecureStore', e);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Error writing to SecureStore', e);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('Error removing from SecureStore', e);
    }
  }
};

const setItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.error("Error saving to AsyncStorage", e)
    }
  }
  
  const getItem = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.error("Error reading from AsyncStorage", e)
      return null
    }
  }
  
  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error("Error removing from AsyncStorage", e)
    }
  }
  
  const clear = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.error("Error clearing AsyncStorage", e)
    }
  }

  
export { setItem, getItem, removeItem, clear }
export const storage = Platform.OS === 'web' ? webStorage : nativeStorage;
