import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react-native';

const UPCOMING_TRIPS = [
  {
    id: '1',
    destination: 'Machu Picchu',
    date: '15-20 Mar 2024',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop',
    status: 'Confirmado',
  },
];

const PAST_TRIPS = [
  {
    id: '1',
    destination: 'Lima',
    date: '10-12 Ene 2024',
    image: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?q=80&w=800&auto=format&fit=crop',
    status: 'Completado',
  },
];

export default function TripsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Viajes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Viajes</Text>
        {UPCOMING_TRIPS.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.tripCard}>
            <Image source={{ uri: trip.image }} style={styles.tripImage} />
            <View style={styles.tripInfo}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <View style={[styles.statusBadge, styles.statusConfirmed]}>
                  <Text style={styles.statusText}>{trip.status}</Text>
                </View>
              </View>
              <View style={styles.tripDetails}>
                <View style={styles.tripDetail}>
                  <CalendarIcon size={16} color="#72777A" />
                  <Text style={styles.tripDetailText}>{trip.date}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Viajes Pasados</Text>
        {PAST_TRIPS.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.tripCard}>
            <Image source={{ uri: trip.image }} style={styles.tripImage} />
            <View style={styles.tripInfo}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <View style={[styles.statusBadge, styles.statusCompleted]}>
                  <Text style={styles.statusText}>{trip.status}</Text>
                </View>
              </View>
              <View style={styles.tripDetails}>
                <View style={styles.tripDetail}>
                  <CalendarIcon size={16} color="#72777A" />
                  <Text style={styles.tripDetailText}>{trip.date}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    color: '#1A1D1F',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#1A1D1F',
    marginBottom: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  tripImage: {
    width: '100%',
    height: 200,
  },
  tripInfo: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripDestination: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1A1D1F',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusConfirmed: {
    backgroundColor: '#E3F5FF',
  },
  statusCompleted: {
    backgroundColor: '#E6F7E6',
  },
  statusText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#1A1D1F',
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  tripDetailText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    marginLeft: 6,
  },
});