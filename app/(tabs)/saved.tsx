import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const SAVED_ITEMS = [
  {
    id: '1',
    name: 'Valle Sagrado',
    location: 'Cusco',
    image: 'https://images.unsplash.com/photo-1581875403743-a3bf92862c94?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    price: 199,
  },
  {
    id: '2',
    name: 'Tour Gastronómico',
    location: 'Lima',
    image: 'https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Tour.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9Ub3VyLmpwZWciLCJpYXQiOjE3NDI2NTk2NjMsImV4cCI6MTc3NDE5NTY2M30.aZihwf2h_Sl8gP4sO_PgHh5LzBzf6FGxCUpWuCala_o',
    rating: 4.9,
    price: 89,
  },
];

export default function SavedScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Guardados</Text>
        <Text style={styles.subtitle}>{SAVED_ITEMS.length} experiencias guardadas</Text>
      </View>

      <View style={styles.content}>
        {SAVED_ITEMS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.rating}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.location}>
                <MapPin size={16} color="#72777A" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <Text style={styles.price}>${item.price}</Text>
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
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#72777A',
    marginTop: 4,
  },
  content: {
    padding: 24,
  },
  card: {
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
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1A1D1F',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1A1D1F',
    marginLeft: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    marginLeft: 4,
  },
  price: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#FF385C',
  },
});