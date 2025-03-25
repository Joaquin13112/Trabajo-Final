import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(255, 56, 92, ${opacity})`,
      strokeWidth: 2
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 56, 92, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(114, 119, 122, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#FF385C'
  },
  propsForBackgroundLines: {
    strokeDasharray: ''
  }
};

export function VisitorsChart() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#fff8f9']}
        style={styles.cardContainer}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Estadísticas de Visitas</Text>
            <Text style={styles.subtitle}>Últimos 6 meses</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsValue}>+27%</Text>
            <Text style={styles.statsLabel}>vs mes anterior</Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={screenWidth - 48}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withVerticalLines={false}
            withHorizontalLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            fromZero={true}
            segments={4}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2,847</Text>
            <Text style={styles.statLabel}>Total Visitas</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>486</Text>
            <Text style={styles.statLabel}>Este Mes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>32</Text>
            <Text style={styles.statLabel}>Hoy</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1A1D1F',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#72777A',
    marginTop: 2,
  },
  statsContainer: {
    backgroundColor: '#E8FFF1',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#00BA88',
  },
  statsLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#00BA88',
    marginTop: 2,
  },
  chartContainer: {
    marginHorizontal: -16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#1A1D1F',
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#72777A',
    marginTop: 4,
  },
});