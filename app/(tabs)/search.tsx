"use client"

import React from "react"
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from "react-native"
import { Search as SearchIcon, MapPin, Calendar, Users, DollarSign } from "lucide-react-native"
import { Link } from "expo-router"

// Definir tipos para nuestros datos
type Trip = {
  id: string
  title: string
  duration: string
  price: number
  people: string
  image: string
}

type Destination = {
  id: string
  name: string
  image: string
  trips: Trip[]
}

const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Cusco",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
    trips: [
      {
        id: "1",
        title: "Machu Picchu Express",
        duration: "3 días",
        price: 299,
        people: "2-10",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "2",
        title: "Valle Sagrado Completo",
        duration: "5 días",
        price: 499,
        people: "2-8",
        image: "https://images.unsplash.com/photo-1581875403743-a3bf92862c94?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "2",
    name: "Lima",
    image: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?q=80&w=800&auto=format&fit=crop",
    trips: [
      {
        id: "1",
        title: "Tour Gastronómico",
        duration: "1 día",
        price: 89,
        people: "2-6",
        image: "https://images.unsplash.com/photo-1633436374961-09b92742047b?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "3",
    name: "Arequipa",
    image: "https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Arequipa.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9BcmVxdWlwYS5qcGciLCJpYXQiOjE3NDI2NTk1MTYsImV4cCI6MTc3NDE5NTUxNn0._l90vn5JehyzmDr6Yk0fgLVT4c7HSwEg2_7fyyBfyYY",
    trips: [],
  },
  {
    id: "4",
    name: "Puno",
    image: "https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Puno.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9QdW5vLmpwZyIsImlhdCI6MTc0MjY1OTU4OSwiZXhwIjoxNzc0MTk1NTg5fQ.kWnCQpvQHvFE9LQpl00KFMnEgdVrVwfc0FsAbwZfD3U",
    trips: [],
  },
]

export default function SearchScreen() {
  // Especificar el tipo correcto para selectedDestination
  const [selectedDestination, setSelectedDestination] = React.useState<Destination | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredDestinations = POPULAR_DESTINATIONS.filter((destination) =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar</Text>
        <Text style={styles.subtitle}>Encuentra tu próximo destino</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#72777A" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="¿A dónde quieres ir?"
          placeholderTextColor="#72777A"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedDestination ? (
          <>
            <Text style={styles.sectionTitle}>Destinos Populares</Text>
            <View style={styles.destinationsGrid}>
              {filteredDestinations.map((destination) => (
                <TouchableOpacity
                  key={destination.id}
                  style={styles.destinationCard}
                  onPress={() => setSelectedDestination(destination)}
                >
                  <Image source={{ uri: destination.image }} style={styles.destinationImage} />
                  <View style={styles.destinationOverlay} />
                  <View style={styles.destinationContent}>
                    <MapPin size={20} color="#FFFFFF" />
                    <Text style={styles.destinationText}>{destination.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.selectedDestinationHeader}>
              <TouchableOpacity style={styles.backButton} onPress={() => setSelectedDestination(null)}>
                <Text style={styles.backButtonText}>← Volver</Text>
              </TouchableOpacity>
              <Text style={styles.selectedDestinationTitle}>Viajes en {selectedDestination.name}</Text>
            </View>

            {selectedDestination.trips.length > 0 ? (
              selectedDestination.trips.map((trip) => (
                <Link key={trip.id} href={`/trip/${trip.id}` as any} asChild>
                  <TouchableOpacity style={styles.tripCard}>
                    <Image source={{ uri: trip.image }} style={styles.tripImage} />
                    <View style={styles.tripInfo}>
                      <Text style={styles.tripTitle}>{trip.title}</Text>
                      <View style={styles.tripDetails}>
                        <View style={styles.tripDetail}>
                          <Calendar size={16} color="#72777A" />
                          <Text style={styles.tripDetailText}>{trip.duration}</Text>
                        </View>
                        <View style={styles.tripDetail}>
                          <Users size={16} color="#72777A" />
                          <Text style={styles.tripDetailText}>{trip.people} personas</Text>
                        </View>
                        <View style={styles.tripDetail}>
                          <DollarSign size={16} color="#72777A" />
                          <Text style={styles.tripDetailText}>${trip.price}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))
            ) : (
              <View style={styles.noTrips}>
                <Text style={styles.noTripsText}>No hay viajes disponibles para este destino en este momento.</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
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
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#1A1D1F",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#72777A",
    marginTop: 4,
  },
  searchContainer: {
    margin: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#1A1D1F",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1A1D1F",
    marginBottom: 16,
  },
  destinationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  destinationCard: {
    position: "relative",
    width: "45%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  destinationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  destinationContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  destinationText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
  },
  selectedDestinationHeader: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FF385C",
  },
  selectedDestinationTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#1A1D1F",
  },
  tripCard: {
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
  tripImage: {
    width: "100%",
    height: 200,
  },
  tripInfo: {
    padding: 16,
  },
  tripTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1A1D1F",
    marginBottom: 12,
  },
  tripDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tripDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  tripDetailText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
    marginLeft: 6,
  },
  noTrips: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
  },
  noTripsText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#72777A",
    textAlign: "center",
  },
})

