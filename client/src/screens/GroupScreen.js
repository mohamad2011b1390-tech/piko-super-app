import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GroupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>گروه‌ها و کانال‌ها</Text>
      <Text style={styles.subtitle}>مدیریت گروه‌های نامحدود</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2196F3', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' },
});
