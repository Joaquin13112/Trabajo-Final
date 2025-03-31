import { Stack } from "expo-router"
import { Toaster } from "sonner-native"

export default function AuthLayout() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

