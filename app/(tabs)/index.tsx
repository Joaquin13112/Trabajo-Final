import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FEATURED_DESTINATIONS = [
  {
    id: '1',
    name: 'Machu Picchu',
    location: 'Cusco',
    image: 'https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/machu%20pichu.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9tYWNodSBwaWNodS5qcGVnIiwiaWF0IjoxNzQyNjU4OTY2LCJleHAiOjE3NzQxOTQ5NjZ9.lYkC-mPzpUc-O9B7KGkHmpa-xG5a1yBn48uY6o9a_yg',
    price: 299,
  },
  {
    id: '2',
    name: 'Valle Sagrado',
    location: 'Cusco',
    image: 'https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Valle%20sagrado.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9WYWxsZSBzYWdyYWRvLmpwZyIsImlhdCI6MTc0MjY1OTA0NSwiZXhwIjoxNzc0MTk1MDQ1fQ.3UOtXzTBXgKX92ESczGKPmeNBzVvHQf7Ccr5oGa6ojY',
    price: 199,
  },
  {
    id: '3',
    name: 'Lago Titicaca',
    location: 'Puno',
    image: 'https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/LagoTiticaca.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9MYWdvVGl0aWNhY2EuanBnIiwiaWF0IjoxNzQyNjU5MDcwLCJleHAiOjE3NzQxOTUwNzB9.iZOJHr1CH4AAOVJs-LjUY0h5YzTmVXzsxr6XPfo5Fvs',
    price: 249,
  },
];

const POPULAR_EXPERIENCES = [
  {
    id: '1',
    name: 'Tour Gastronómico',
    location: 'Lima',
    image: 'https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Tour.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9Ub3VyLmpwZWciLCJpYXQiOjE3NDI2NTkxNjIsImV4cCI6MTc3NDE5NTE2Mn0.EJdGB_Aftwcm5jOUIYbTdHRfs9VVni3ipvpIwcUWbzc',
    price: 100,
  },
  {
    id: '2',
    name: 'Líneas de Nazca',
    location: 'Nazca',
    image: 'https://cnssyfptabdtoiefrzik.supabase.co/storage/v1/object/sign/proyectoviajes/Nazca%20Lines,%20Peru.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm95ZWN0b3ZpYWplcy9OYXpjYSBMaW5lcywgUGVydS5qcGVnIiwiaWF0IjoxNzQyNjU5MzA2LCJleHAiOjE3NzQxOTUzMDZ9.gTewhQlvkZksY8qOCnng3AE_FuctFSJkEnbKMC5WikE',
    price: 349,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenido a</Text>
        <Text style={styles.appName}>Travelling-Viajes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destinos Destacados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {FEATURED_DESTINATIONS.map((destination) => (
            <TouchableOpacity key={destination.id} style={styles.destinationCard}>
              <Image source={{ uri: destination.image }} style={styles.destinationImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              />
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationLocation}>{destination.location}</Text>
                <Text style={styles.destinationPrice}>Desde ${destination.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencias Populares</Text>
        {POPULAR_EXPERIENCES.map((experience) => (
          <TouchableOpacity key={experience.id} style={styles.experienceCard}>
            <Image source={{ uri: experience.image }} style={styles.experienceImage} />
            <View style={styles.experienceInfo}>
              <View>
                <Text style={styles.experienceName}>{experience.name}</Text>
                <Text style={styles.experienceLocation}>{experience.location}</Text>
              </View>
              <Text style={styles.experiencePrice}>${experience.price}</Text>
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
  welcomeText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#72777A',
  },
  appName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#1A1D1F',
    marginTop: 4,
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
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  destinationCard: {
    width: 280,
    height: 350,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  destinationInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  destinationName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#FFFFFF',
  },
  destinationLocation: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  destinationPrice: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
  },
  experienceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  experienceImage: {
    width: '100%',
    height: 200,
  },
  experienceInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experienceName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1A1D1F',
  },
  experienceLocation: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    marginTop: 4,
  },
  experiencePrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#FF385C',
  },
});