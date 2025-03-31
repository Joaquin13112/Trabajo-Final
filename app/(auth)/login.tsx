"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native"
import { Link } from "expo-router"
import { useAuth } from "@/context/AuthContext"
import { Mail, Lock, ArrowRight } from "lucide-react-native"
import { toast } from "sonner-native"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleLogin = async () => {
    setError("")

    // Validaciones mejoradas
    if (!email || !password) {
      setError("Por favor complete todos los campos")
      toast.error("Por favor complete todos los campos")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un email válido")
      toast.error("Por favor ingrese un email válido")
      return
    }

    if (password.length < 2) {
      setError("La contraseña debe tener al menos 2 caracteres")
      toast.error("La contraseña debe tener al menos 2 caracteres")
      return
    }

    try {
      console.log(`Intentando iniciar sesión con: ${email}`)
      await login(email, password)
      toast.success("¡Inicio de sesión exitoso!")
    } catch (err: any) {
      console.error("Error en handleLogin:", err)

      let errorMessage = "Error de inicio de sesión"

      // Manejo específico de errores
      if (err.message?.includes("401") || err.message?.includes("Credenciales")) {
        errorMessage = "Email o contraseña incorrectos"
      } else if (err.message?.includes("Network request failed")) {
        errorMessage = "Error de conexión. Verifique su internet y la dirección IP del servidor"
      } else if (err.message?.includes("Failed to fetch")) {
        errorMessage = "No se pudo conectar al servidor"
      }

      setError(errorMessage)
      toast.error(errorMessage)

      // Mostrar alerta con información de depuración en desarrollo
      if (__DEV__) {
        Alert.alert(
          "Error de depuración",
          `Detalles del error:\n${err.message}\n\nVerifica la IP del servidor y tu conexión de red.`,
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=3000&auto=format&fit=crop",
            }}
            style={styles.headerImage}
          />
          <View style={styles.overlay} />
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Travelling-Viajes</Text>
            <Text style={styles.tagline}>Tu próxima aventura comienza aquí</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>¡Bienvenido de vuelta!</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Mail size={20} color="#72777A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#72777A"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              importantForAutofill="yes"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#72777A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#72777A"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              autoComplete="password"
              importantForAutofill="yes"
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => Alert.alert("Recuperar contraseña", "Por favor contacte al soporte técnico")}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, (!email || !password || isLoading) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={!email || !password || isLoading}
            accessibilityLabel="Iniciar sesión"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 300,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  logoContainer: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
  },
  logoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 8,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  welcomeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#1A1D1F",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#72777A",
    marginBottom: 24,
  },
  errorText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#FF385C",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#1A1D1F",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#FF385C",
  },
  loginButton: {
    backgroundColor: "#FF385C",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  loginButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
  },
  registerLink: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FF385C",
  },
})

