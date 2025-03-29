import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';

interface ChatModalProps {
  isVisible: boolean;
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
  botUrl: string;
}

export default function ChatModal({ isVisible, onClose, primaryColor, secondaryColor, botUrl }: ChatModalProps) {
  if (!isVisible) return null;

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.overlay}
    >
      <Animated.View 
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={styles.modalContainer}
      >
        <LinearGradient
          colors={[primaryColor, secondaryColor]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </LinearGradient>

        <WebView
          source={{ uri: botUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          allowsFullscreenVideo={true}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    padding: 4,
  },
  webview: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});