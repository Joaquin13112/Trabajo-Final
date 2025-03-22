import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Plus, CreditCard } from 'lucide-react-native';

const PAYMENT_METHODS = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    expiry: '12/24',
    image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '8888',
    expiry: '06/25',
    image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=200&auto=format&fit=crop',
  },
];

export default function PaymentMethodsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Métodos de pago</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.addCard}>
          <View style={styles.addCardIcon}>
            <Plus size={24} color="#FF385C" />
          </View>
          <Text style={styles.addCardText}>Agregar nueva tarjeta</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Tarjetas guardadas</Text>

        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity key={method.id} style={styles.cardItem}>
            <View style={styles.cardIcon}>
              <CreditCard size={24} color="#1A1D1F" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardType}>
                {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
              </Text>
              <Text style={styles.cardNumber}>•••• {method.last4}</Text>
            </View>
            <Text style={styles.cardExpiry}>Expira {method.expiry}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            Tus datos de pago están seguros y encriptados
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
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  addCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF1F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addCardText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#FF385C',
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1A1D1F',
    marginBottom: 16,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cardType: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1A1D1F',
  },
  cardNumber: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    marginTop: 2,
  },
  cardExpiry: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
  },
  securityNote: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
  },
  securityText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    textAlign: 'center',
  },
});