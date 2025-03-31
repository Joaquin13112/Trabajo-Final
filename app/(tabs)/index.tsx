"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { api } from "@/app/utils/api-client"
import { Alert } from "react-native"
import { useAuth } from "@/context/AuthContext"

// Tipo para los viajes disponibles de la API
type ViajeDisponible = {
  id?: string
  categoria: string
  ciudadDestino: string
  fechaIda: string
  precioBase: number
  imagen: string
}

const POPULAR_EXPERIENCES = [
  {
    id: "1",
    name: "Tour Gastronómico",
    location: "Lima",
    image:
      "https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Tour.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9Ub3VyLmpwZWciLCJpYXQiOjE3NDI2NTkxNjIsImV4cCI6MTc3NDE5NTE2Mn0.EJdGB_Aftwcm5jOUIYbTdHRfs9VVni3ipvpIwcUWbzc",
    price: 100,
  },
  {
    id: "2",
    name: "Líneas de Nazca",
    location: "Nazca",
    image:
      "https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Nazca%20Lines,%20Peru.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9OYXpjYSBMaW5lcywgUGVydS5qcGVnIiwiaWF0IjoxNzQyNjU5MzA2LCJleHAiOjE3NzQxOTUzMDZ9.gTewhQlvkZksY8qOCnng3AE_FuctFSJkEnbKMC5WikE",
    price: 349,
  },
]

export default function HomeScreen() {
  const { user } = useAuth() // Obtenemos el usuario y su token
  const [destinos, setDestinos] = useState<ViajeDisponible[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarDestinos = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log("[HOME] Cargando destinos disponibles...")

        // Usamos includeAuth: true para que incluya el token automáticamente
        // O podemos especificar el token manualmente si es necesario
        const data = await api.get<ViajeDisponible[]>("/viajes/disponibles", {
          includeAuth: false, // Desactivamos el manejo automático
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          }
        })

        console.log(`[HOME] Se cargaron ${data.length} destinos`)
        setDestinos(data)
      } catch (err: any) {
        console.error("[HOME] Error al cargar destinos:", err)
        setError("No se pudieron cargar los destinos. Por favor, intenta de nuevo más tarde.")

        // Solo mostrar alerta si es un error grave
        if (!err.message?.includes("Network request failed")) {
          Alert.alert("Error", "No se pudieron cargar los destinos")
        }
      } finally {
        setIsLoading(false)
      }
    }

    // Solo cargar destinos si hay un usuario autenticado
    if (user?.token) {
      cargarDestinos()
    } else {
      setIsLoading(false)
      setError("Inicia sesión para ver los destinos disponibles")
    }
  }, [user]) // Dependencia en user para recargar cuando cambie el usuario/token

  // Extraer ciudad y país de la cadena "Ciudad, País"
  const extraerUbicacion = (ciudadDestino: string) => {
    const partes = ciudadDestino.split(",")
    if (partes.length >= 2) {
      return {
        ciudad: partes[0].trim(),
        pais: partes[1].trim(),
      }
    }
    return {
      ciudad: ciudadDestino,
      pais: "",
    }
  }

  const recargarDestinos = async () => {
    if (!user?.token) {
      setError("Inicia sesión para ver los destinos disponibles")
      return
    }

    setIsLoading(true)
    try {
      const data = await api.get<ViajeDisponible[]>("viajes/disponibles", {
        includeAuth: true,
        headers: {
          Authorization: 'Bearer ${user.token}',
          "Content-Type": "application/json",
        },
      })
      setDestinos(data)
      setError(null)
    } catch (err: any) {
      console.error("[HOME] Error al recargar destinos:", err)
      setError("No se pudieron cargar los destinos. Por favor, intenta de nuevo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenido a</Text>
        <Text style={styles.appName}>Travelling-Viajes</Text>
        {user && <Text style={styles.userEmail}>Hola, {user.email}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destinos Destacados</Text>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF385C" />
            <Text style={styles.loadingText}>Cargando destinos...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            {user?.token && (
              <TouchableOpacity style={styles.retryButton} onPress={recargarDestinos}>
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {destinos.map((destino, index) => {
              const ubicacion = extraerUbicacion(destino.ciudadDestino)
              return (
                <TouchableOpacity key={destino.id || index.toString()} style={styles.destinationCard}>
                  <Image source={{ uri: destino.imagen }} style={styles.destinationImage} />
                  <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradient} />
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{ubicacion.ciudad}</Text>
                    <Text style={styles.destinationLocation}>{ubicacion.pais}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.destinationPrice}>Desde ${destino.precioBase.toFixed(2)}</Text>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{destino.categoria}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencias Populares</Text>
        {POPULAR_EXPERIENCES.map((experience) => (
          <TouchableOpacity key={experience.id} style={styles.experienceCard}>
            <Image source={{ uri: experience.image }} style={styles.experienceImage} />
            <View style={styles.experienceInfo}>
              <View>
                <Text style={styles.experienceName}>{experience.name}</Text>
                <Text style={styles.experienceLocation}>{experience.location}</Text>
              </View>
              <Text style={styles.experiencePrice}>${experience.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#72777A",
  },
  appName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#1A1D1F",
    marginTop: 4,
  },
  userEmail: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FF385C",
    marginTop: 8,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1A1D1F",
    marginBottom: 16,
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  destinationCard: {
    width: 280,
    height: 350,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  destinationInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  destinationName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#FFFFFF",
  },
  destinationLocation: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  destinationPrice: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#FFFFFF",
  },
  categoryBadge: {
    backgroundColor: "rgba(255, 56, 92, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#FFFFFF",
  },
  experienceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  experienceImage: {
    width: "100%",
    height: 200,
  },
  experienceInfo: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  experienceName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1A1D1F",
  },
  experienceLocation: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
    marginTop: 4,
  },
  experiencePrice: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#FF385C",
  },
  loadingContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#72777A",
    marginTop: 12,
  },
  errorContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FF385C",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#FF385C",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
})

