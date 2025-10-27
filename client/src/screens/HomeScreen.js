import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const features = [
    { icon: '💬', title: 'چت هوشمند', desc: 'مکالمه آنلاین', screen: 'چت‌ها' },
    { icon: '👥', title: 'گروه‌ها', desc: 'اجتماعات آنلاین', screen: 'گروه‌ها' },
    { icon: '📢', title: 'کانال‌ها', desc: 'انتشار محتوا', screen: 'Channel' },
    { icon: '📞', title: 'تماس', desc: 'صوتی و تصویری', screen: 'Call' },
    { icon: '🤖', title: 'ربات‌ها', desc: 'هوشمند', screen: 'Bot' },
    { icon: '🎬', title: 'استوری', desc: 'Rubox', screen: 'استوری' },
    { icon: '🔒', title: 'چت مخفی', desc: 'self-destruct', screen: 'چت‌ها' },
    { icon: '🎮', title: 'بازی‌ها', desc: 'سرگرمی', screen: 'چت‌ها' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🦸</Text>
        <Text style={styles.title}>سوپر پیکو</Text>
        <Text style={styles.subtitle}>ترکیب کامل روبیکا + تلگرام</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۱۰۰+</Text>
          <Text style={styles.statLabel}>ویژگی</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>∞</Text>
          <Text style={styles.statLabel}>گروه</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>۲GB</Text>
          <Text style={styles.statLabel}>فایل</Text>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.sectionTitle}>همه ویژگی‌ها در یک برنامه</Text>
        
        <View style={styles.featureGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.featureCard} 
              onPress={() => navigation.navigate(feature.screen)}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>دسترسی سریع</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>گروه جدید</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🤖</Text>
            <Text style={styles.actionText}>ساخت ربات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🎬</Text>
            <Text style={styles.actionText}>استوری</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#F8F9FA' },
  logo: { fontSize: 60, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2196F3' },
  subtitle: { fontSize: 16, color: '#4CAF50' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#2196F3' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  statLabel: { fontSize: 14, color: '#E3F2FD' },
  features: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: { 
    width: '48%', 
    backgroundColor: '#F8F9FA', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  featureIcon: { fontSize: 30, marginBottom: 10 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5, textAlign: 'center' },
  featureDesc: { fontSize: 12, color: '#666', textAlign: 'center' },
  quickActions: { padding: 20, paddingTop: 0 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { 
    backgroundColor: '#4CAF50', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  actionIcon: { fontSize: 20, color: '#FFFFFF', marginBottom: 5 },
  actionText: { fontSize: 12, color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' },
});
