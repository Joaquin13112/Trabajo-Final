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
import { Link, router } from "expo-router"
import { useAuth } from "@/context/AuthContext"
import { Mail, Lock, User, ArrowRight } from "lucide-react-native"

export default function RegisterScreen() {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { register, isLoading } = useAuth()

  const handleRegister = async () => {
    setError("")
    setSuccessMessage("")

    // Validaciones
    if (!nombre || !apellido || !email || !password) {
      setError("Por favor complete todos los campos")
      Alert.alert("Error", "Por favor complete todos los campos")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un email válido")
      Alert.alert("Error", "Por favor ingrese un email válido")
      return
    }

    if (password.length < 2) {
      setError("La contraseña debe tener al menos 2 caracteres")
      Alert.alert("Error", "La contraseña debe tener al menos 2 caracteres")
      return
    }

    try {
      console.log("[REGISTER] Intentando registrar usuario")
      const userData = await register({
        nombre,
        apellido,
        email: email.trim().toLowerCase(),
        password,
      })

      console.log("[REGISTER] Usuario registrado:", userData)
      
      // Mostrar mensaje de éxito en la pantalla
      setSuccessMessage(`¡Cuenta creada exitosamente para ${userData.email || email}!`)
      
      // Mostrar alerta con opción para ir al login
      Alert.alert(
        "Registro exitoso", 
        `Tu cuenta ha sido creada correctamente con el email ${userData.email || email}. Ahora puedes iniciar sesión.`, 
        [
          {
            text: "Iniciar sesión",
            onPress: () => router.replace("/login"),
          },
        ]
      )
      
      // Limpiar el formulario
      setNombre("")
      setApellido("")
      setEmail("")
      setPassword("")
      
    } catch (err: any) {
      console.error("[REGISTER] Error en registro:", err)

      let errorMessage = "Error al registrar usuario"

      if (err.message?.includes("Network request failed")) {
        errorMessage = "Error de conexión. Verifique su internet y la dirección IP del servidor"
      } else if (err.message?.includes("already exists") || err.message?.includes("ya existe")) {
        errorMessage = "Este email ya está registrado"
      }

      setError(errorMessage)
      Alert.alert("Error", errorMessage)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=3000&auto=format&fit=crop",
            }}
            style={styles.headerImage}
          />
          <View style={styles.overlay} />
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Travelling-Viajes</Text>
            <Text style={styles.tagline}>Crea tu cuenta y comienza a viajar</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Ingresa tus datos para registrarte</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

          <View style={styles.inputContainer}>
            <User size={20} color="#72777A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#72777A"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <User size={20} color="#72777A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor="#72777A"
              value={apellido}
              onChangeText={setApellido}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

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
              textContentType="newPassword"
              autoComplete="password-new"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              (!nombre || !apellido || !email || !password || isLoading) && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={!nombre || !apellido || !email || !password || isLoading}
            accessibilityLabel="Registrarse"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.registerButtonText}>Crear cuenta</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Inicia sesión</Text>
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
    height: 250,
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
  successText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#4CAF50",
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
  registerButton: {
    backgroundColor: "#FF385C",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  registerButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  registerButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 8,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
  },
  loginLink: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FF385C",
  },
})
  