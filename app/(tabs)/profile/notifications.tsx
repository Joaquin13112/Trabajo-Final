import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Bell, Mail, Tag, Megaphone } from 'lucide-react-native';

const NOTIFICATION_SETTINGS = [
  {
    title: 'Notificaciones push',
    icon: Bell,
    options: [
      {
        name: 'Ofertas especiales',
        description: 'Recibe notificaciones sobre descuentos y promociones',
      },
      {
        name: 'Actualizaciones de viaje',
        description: 'Cambios en tus reservas y recordatorios',
      },
      {
        name: 'Nuevos destinos',
        description: 'Entérate cuando agregamos nuevos destinos',
      },
    ],
  },
  {
    title: 'Correos electrónicos',
    icon: Mail,
    options: [
      {
        name: 'Boletín semanal',
        description: 'Resumen semanal de las mejores ofertas',
      },
      {
        name: 'Confirmaciones',
        description: 'Recibos y confirmaciones de reserva',
      },
    ],
  },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Notificaciones</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {NOTIFICATION_SETTINGS.map((section, index) => (
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
                <Switch
                  trackColor={{ false: '#E5E7EB', true: '#FF385C' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E5E7EB"
                />
              </View>
            ))}
          </View>
        ))}

        <View style={styles.preferencesNote}>
          <Text style={styles.preferencesText}>
            Puedes cambiar tus preferencias de notificación en cualquier momento
          </Text>
        </View>
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
  preferencesNote: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
  },
  preferencesText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    textAlign: 'center',
  },
});