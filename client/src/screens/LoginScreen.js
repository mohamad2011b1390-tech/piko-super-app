import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { api } from '../utils/api';

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.phone || !formData.password) {
      Alert.alert('خطا', 'لطفاً شماره و رمز را وارد کنید');
      return;
    }

    setLoading(true);
    const response = await api.post('/api/auth/login', formData);
    setLoading(false);

    if (response.success) {
      Alert.alert('موفق', 'خوش آمدید!');
      navigation.navigate('Main');
    } else {
      Alert.alert('خطا', response.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🦸</Text>
        <Text style={styles.title}>سوپر پیکو</Text>
        <Text style={styles.subtitle}>ترکیب روبیکا و تلگرام</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="شماره تلفن" value={formData.phone} 
          onChangeText={(text) => setFormData({...formData, phone: text})} keyboardType="phone-pad" />
        
        <TextInput style={styles.input} placeholder="رمز عبور" value={formData.password} 
          onChangeText={(text) => setFormData({...formData, password: text})} secureTextEntry />
        
        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>ورود به پیکو</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>حساب ندارید؟ ساخت حساب جدید</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>ویژگی‌های سوپر پیکو:</Text>
        <Text style={styles.featureItem}>✅ چت مخفی با self-destruct</Text>
        <Text style={styles.featureItem}>✅ استوری (Rubox)</Text>
        <Text style={styles.featureItem}>✅ ربات‌های پیشرفته</Text>
        <Text style={styles.featureItem}>✅ تماس صوتی و تصویری</Text>
        <Text style={styles.featureItem}>✅ گروه‌های نامحدود</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20 },
  header: { alignItems: 'center', marginTop: 60, marginBottom: 40 },
  logo: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2196F3', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#4CAF50', textAlign: 'center' },
  form: { width: '100%', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 15, backgroundColor: '#FFF' },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#90CAF9' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  linkButton: { alignItems: 'center', marginTop: 20, padding: 10 },
  linkText: { color: '#2196F3', fontSize: 16 },
  features: { marginTop: 20 },
  featuresTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  featureItem: { fontSize: 14, color: '#666', marginBottom: 5 },
});
