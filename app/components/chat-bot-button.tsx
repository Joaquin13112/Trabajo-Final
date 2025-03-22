import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import { MessageCircle, X, ExternalLink } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFonts, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as Haptics from 'expo-haptics';

interface ChatBotButtonProps {
  botUrl: string;
  position?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
  primaryColor?: string;
  secondaryColor?: string;
}

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 1,
};

export default function ChatBotButton({
  botUrl = 'https://landbot.io/u/your-bot-id',
  position = 'bottomRight',
  primaryColor = '#7C3AED',
  secondaryColor = '#4C1D95',
}: ChatBotButtonProps) {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const scale = useSharedValue(1);
  const expandProgress = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    'worklet';
    scale.value = withSpring(0.95, SPRING_CONFIG);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const handlePressOut = useCallback(() => {
    'worklet';
    scale.value = withSpring(1, SPRING_CONFIG);
  }, []);

  const toggleExpand = useCallback(() => {
    'worklet';
    expandProgress.value = withSpring(expandProgress.value === 0 ? 1 : 0, SPRING_CONFIG);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  const openBot = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      await Linking.openURL(botUrl);
    } catch (error) {
      console.error('Error opening bot URL:', error);
    }
  }, [botUrl]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${interpolate(expandProgress.value, [0, 1], [0, 45], Extrapolate.CLAMP)}deg` },
    ],
  }));

  const expandedContentStyle = useAnimatedStyle(() => ({
    opacity: expandProgress.value,
    transform: [
      { scale: interpolate(expandProgress.value, [0, 1], [0.8, 1], Extrapolate.CLAMP) },
      { translateY: interpolate(expandProgress.value, [0, 1], [20, 0], Extrapolate.CLAMP) },
    ],
  }));

  const getPositionStyle = () => {
    const base = { margin: 20 };
    switch (position) {
      case 'bottomLeft':
        return { ...base, bottom: 0, left: 0 };
      case 'topRight':
        return { ...base, top: 0, right: 0 };
      case 'topLeft':
        return { ...base, top: 0, left: 0 };
      case 'bottomRight':
      default:
        return { ...base, bottom: 0, right: 0 };
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, getPositionStyle()]}>
      <Animated.View style={[styles.expandedContainer, expandedContentStyle]}>
        {Platform.OS === 'web' ? (
          <View style={styles.expandedContent}>
            <TouchableOpacity
              style={styles.botButton}
              onPress={openBot}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.botButtonText}>Chat with our assistant</Text>
              <ExternalLink size={18} color="#1A1D1F" style={styles.externalIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <BlurView intensity={80} tint="light" style={styles.expandedContent}>
            <TouchableOpacity
              style={styles.botButton}
              onPress={openBot}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.botButtonText}>Chat with our assistant</Text>
              <ExternalLink size={18} color="#1A1D1F" style={styles.externalIcon} />
            </TouchableOpacity>
          </BlurView>
        )}
      </Animated.View>

      <TouchableOpacity
        onPress={toggleExpand}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <LinearGradient
            colors={[primaryColor, secondaryColor]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {expandProgress.value === 0 ? (
              <MessageCircle size={24} color="#FFFFFF" strokeWidth={2.5} />
            ) : (
              <X size={24} color="#FFFFFF" strokeWidth={2.5} />
            )}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    shadowColor: '#000',
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  expandedContainer: {
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  expandedContent: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.95)' : undefined,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backdropFilter: 'blur(12px)',
  },
  botButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    minWidth: 260,
  },
  botButtonText: {
    color: '#1A1D1F',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginRight: 8,
    letterSpacing: -0.3,
  },
  externalIcon: {
    marginLeft: 6,
  },
});