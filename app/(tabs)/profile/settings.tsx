import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Lock, Globe, Bell, Eye } from 'lucide-react-native';

const SETTINGS = [
  {
    title: 'Privacidad',
    icon: Lock,
    options: [
      {
        name: 'Perfil privado',
        description: 'Solo usuarios autorizados pueden ver tu perfil',
        type: 'switch',
      },
      {
        name: 'Historial de viajes privado',
        description: 'Ocultar tu historial de viajes',
        type: 'switch',
      },
    ],
  },
  {
    title: 'Preferencias',
    icon: Globe,
    options: [
      {
        name: 'Idioma',
        description: 'Español',
        type: 'select',
      },
      {
        name: 'Moneda',
        description: 'PEN - Sol Peruano',
        type: 'select',
      },
    ],
  },
  {
    title: 'Seguridad',
    icon: Eye,
    options: [
      {
        name: 'Autenticación de dos factores',
        description: 'Aumenta la seguridad de tu cuenta',
        type: 'switch',
      },
      {
        name: 'Cambiar contraseña',
        description: 'Actualiza tu contraseña regularmente',
        type: 'button',
      },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {SETTINGS.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <section.icon size={20} color="#1A1D1F" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {section.options.map((option, optionIndex) => (
              <View key={optionIndex} style={styles.optionItem}>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                {option.type === 'switch' ? (
                  <Switch
                    trackColor={{ false: '#E5E7EB', true: '#FF385C' }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#E5E7EB"
                  />
                ) : (
                  <ChevronLeft size={20} color="#72777A" style={{ transform: [{ rotate: '180deg' }] }} />
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#1A1D1F',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1A1D1F',
    marginLeft: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  optionInfo: {
    flex: 1,
    marginRight: 16,
  },
  optionName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1A1D1F',
  },
  optionDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    marginTop: 2,
  },
});