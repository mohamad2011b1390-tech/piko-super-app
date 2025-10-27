import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>استوری (Rubox)</Text>
      <Text style={styles.subtitle}>مشاهده و انتشار استوری</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2196F3', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' },
});
