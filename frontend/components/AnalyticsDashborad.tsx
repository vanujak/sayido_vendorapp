import { StyleSheet, Text, View } from 'react-native';

// Mock analytics data
const analytics = {
  views: 1240,
  clicks: 320,
  inquiries: 58,
  bookings: 22,
};

export default function AnalyticsDashboard() {
  const conversionRate = analytics.bookings && analytics.clicks
    ? ((analytics.bookings / analytics.clicks) * 100).toFixed(1)
    : '0';

  return (
    <View style={styles.dashboard}>
      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{analytics.views}</Text>
          <Text style={styles.metricLabel}>Views</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{analytics.clicks}</Text>
          <Text style={styles.metricLabel}>Clicks</Text>
        </View>
      </View>
      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{analytics.inquiries}</Text>
          <Text style={styles.metricLabel}>Inquiries</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{conversionRate}%</Text>
          <Text style={styles.metricLabel}>Booking Rate</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FC7B54',
  },
  metricLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
