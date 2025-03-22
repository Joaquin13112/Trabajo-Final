import { Tabs } from "expo-router"
import { Chrome as Home, Search, Calendar, Heart, User } from "lucide-react-native"
import { StyleSheet, Platform } from "react-native"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          // En iOS, ajusta el estilo para evitar que aparezca el botón "más"
          ...(Platform.OS === "ios"
            ? {
                height: 88,
                paddingBottom: 34,
              }
            : {}),
        },
        tabBarActiveTintColor: "#FF385C",
        tabBarInactiveTintColor: "#72777A",
        tabBarLabelStyle: styles.tabBarLabel,
        // Asegúrate de que las etiquetas siempre sean visibles
        tabBarShowLabel: true,
        // Desactiva la característica que muestra el botón "más"
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Mis Viajes",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Guardados",
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
})

