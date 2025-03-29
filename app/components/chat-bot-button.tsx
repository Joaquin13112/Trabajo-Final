import { useCallback, useState } from "react"
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { MessageCircle } from "lucide-react-native"
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import { useFonts, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter"
import * as Haptics from "expo-haptics"
import ChatModal from "./ChatModal"

interface ChatBotButtonProps {
  position?: "bottomRight" | "bottomLeft" | "topRight" | "topLeft"
  primaryColor?: string
  secondaryColor?: string
  botUrl: string
}

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 1,
}

export default function ChatBotButton({
  position = "bottomRight",
  primaryColor = "#FF385C",
  secondaryColor = "#4C1D95",
  botUrl,
}: ChatBotButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
  })

  const scale = useSharedValue(1)

  const handlePressIn = useCallback(() => {
    "worklet"
    scale.value = withSpring(0.95, SPRING_CONFIG)
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }, [])

  const handlePressOut = useCallback(() => {
    "worklet"
    scale.value = withSpring(1, SPRING_CONFIG)
  }, [])

  const openChat = useCallback(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    setIsModalVisible(true)
  }, [])

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const getPositionStyle = () => {
    const base = { margin: 20 }
    switch (position) {
      case "bottomLeft":
        return { ...base, bottom: 120, left: 0 }
      case "topRight":
        return { ...base, top: 0, right: 0 }
      case "topLeft":
        return { ...base, top: 0, left: 0 }
      case "bottomRight":
      default:
        return { ...base, bottom: 50, right: 0 }
    }
  }

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <View style={[styles.container, getPositionStyle()]}>
        <TouchableOpacity onPress={openChat} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.9}>
          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            <LinearGradient
              colors={[primaryColor, secondaryColor]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MessageCircle size={24} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <ChatModal 
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        botUrl={botUrl}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    alignItems: "flex-end",
  },
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    borderRadius: 32,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
})