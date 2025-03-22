"use client"

import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Settings, CreditCard, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from "lucide-react-native"
import { useAuth } from "@/context/AuthContext"
import { Link } from "expo-router"

// Definir el tipo para los elementos del menú
type MenuItem = {
  icon: any
  title: string
  subtitle: string
  route: string | null
  action?: () => void
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: Settings,
    title: "Configuración",
    subtitle: "Privacidad y seguridad",
    route: "/profile/settings",
  },
  {
    icon: CreditCard,
    title: "Métodos de pago",
    subtitle: "Tarjetas guardadas",
    route: "/profile/payment-methods",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    subtitle: "Mensajes y alertas",
    route: "/profile/notifications",
  },
  {
    icon: HelpCircle,
    title: "Ayuda",
    subtitle: "Centro de soporte",
    route: null,
    action: () => {
      Alert.alert(
        "Centro de Ayuda",
        "¿Necesitas ayuda? Contáctanos:\n\nEmail: ayuda@travelling-viajes.com\nTeléfono: +51 1 234 5678\n\nHorario de atención:\nLunes a Viernes: 9:00 - 18:00\nSábados: 9:00 - 13:00",
        [{ text: "OK" }],
      )
    },
  },
]

export default function ProfileScreen() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí, cerrar sesión",
        style: "destructive",
        onPress: () => logout(),
      },
    ])
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/User.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9Vc2VyLndlYnAiLCJpYXQiOjE3NDI2NTk4OTksImV4cCI6MTc3NDE5NTg5OX0.Nq7JM5x85lkXgWkgJuPH29-6fN9GnzHoGXdpb9Tj1Ag",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || "Usuario"}</Text>
            <Text style={styles.email}>{user?.email || "usuario@email.com"}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Viajes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Países</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3,500</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) =>
          item.route ? (
            <Link key={index.toString()} href={item.route as any} asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <item.icon size={24} color="#1A1D1F" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color="#72777A" />
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity key={index.toString()} style={styles.menuItem} onPress={item.action}>
              <View style={styles.menuIcon}>
                <item.icon size={24} color="#1A1D1F" />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#72777A" />
            </TouchableOpacity>
          ),
        )}

        <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
          <View style={styles.menuIcon}>
            <LogOut size={24} color="#FF385C" />
          </View>
          <View style={styles.menuText}>
            <Text style={[styles.menuTitle, styles.logoutText]}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
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
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#1A1D1F",
  },
  email: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#1A1D1F",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1A1D1F",
  },
  statLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E5E7EB",
  },
  menuSection: {
    padding: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
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
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 16,
    flex: 1,
  },
  menuTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#1A1D1F",
  },
  menuSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#72777A",
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 24,
  },
  logoutText: {
    color: "#FF385C",
  },
})

