import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>درباره پیکو</Text>
      <Text style={styles.text}>
        اپلیکیشن پیام‌رسان پیکو با هدف ارائه تجربه‌ای بهتر از ارتباطات توسعه داده شده است.
      </Text>
      <Text style={styles.subTitle}>ویژگی‌ها:</Text>
      <Text style={styles.text}>• چت خصوصی و گروهی</Text>
      <Text style={styles.text}>• تماس صوتی و تصویری</Text>
      <Text style={styles.text}>• استوری و اشتراک‌گذاری لحظات</Text>
      <Text style={styles.text}>• رابط کاربری ساده و زیبا</Text>
      <Text style={styles.contact}>📧 پشتیبانی: mkmk96970@gmail.com</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 8, textAlign: 'right' },
  contact: { fontSize: 14, marginTop: 20, textAlign: 'center', color: '#666' }
});

export default AboutScreen;
