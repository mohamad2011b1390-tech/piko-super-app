import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    secretChats: true,
    autoDownload: true,
    showOnlineStatus: true,
    readReceipts: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsSections = [
    {
      title: 'حساب کاربری',
      icon: '👤',
      items: [
        {
          title: 'پروفایل من',
          subtitle: 'مدیریت اطلاعات شخصی',
          icon: '👤',
          onPress: () => navigation.navigate('Profile')
        },
        {
          title: 'حریم خصوصی و امنیت',
          subtitle: 'تنظیمات امنیتی',
          icon: '🔒',
          onPress: () => Alert.alert('حریم خصوصی', 'تنظیمات حریم خصوصی')
        },
        {
          title: 'دستگاه‌های متصل',
          subtitle: 'مدیریت دستگاه‌ها',
          icon: '📱',
          onPress: () => Alert.alert('دستگاه‌ها', 'مدیریت دستگاه‌های متصل')
        },
      ]
    },
    {
      title: 'اعلان‌ها',
      icon: '🔔',
      items: [
        {
          title: 'اعلان‌ها',
          subtitle: 'مدیریت نوتیفیکیشن‌ها',
          icon: '🔔',
          type: 'switch',
          value: settings.notifications,
          onToggle: () => toggleSetting('notifications')
        },
        {
          title: 'صدا و ویبره',
          subtitle: 'تنظیمات صدا',
          icon: '🔊',
          onPress: () => Alert.alert('صدا', 'تنظیمات صدا و ویبره')
        },
      ]
    },
    {
      title: 'چت‌ها',
      icon: '💬',
      items: [
        {
          title: 'چت‌های مخفی',
          subtitle: 'فعال/غیرفعال کردن چت مخفی',
          icon: '🔒',
          type: 'switch',
          value: settings.secretChats,
          onToggle: () => toggleSetting('secretChats')
        },
        {
          title: 'تایید خواندن',
          subtitle: 'نمایش تیک آبی',
          icon: '✓',
          type: 'switch',
          value: settings.readReceipts,
          onToggle: () => toggleSetting('readReceipts')
        },
        {
          title: 'وضعیت آنلاین',
          subtitle: 'نمایش وضعیت آنلاین',
          icon: '🟢',
          type: 'switch',
          value: settings.showOnlineStatus,
          onToggle: () => toggleSetting('showOnlineStatus')
        },
      ]
    },
    {
      title: 'داده و ذخیره‌سازی',
      icon: '💾',
      items: [
        {
          title: 'دانلود خودکار',
          subtitle: 'دانلود مدیا در وایفای',
          icon: '📥',
          type: 'switch',
          value: settings.autoDownload,
          onToggle: () => toggleSetting('autoDownload')
        },
        {
          title: 'پاک‌سازی حافظه',
          subtitle: 'حذف فایل‌های موقت',
          icon: '🗑️',
          onPress: () => Alert.alert('پاک‌سازی', 'حذف فایل‌های موقت')
        },
        {
          title: 'فضای ابری',
          subtitle: 'مدیریت فضای ذخیره‌سازی',
          icon: '☁️',
          onPress: () => Alert.alert('فضای ابری', 'مدیریت فضای ابری')
        },
      ]
    },
    {
      title: 'ظاهر',
      icon: '🎨',
      items: [
        {
          title: 'حالت شب',
          subtitle: 'فعال کردن تم تاریک',
          icon: '🌙',
          type: 'switch',
          value: settings.darkMode,
          onToggle: () => toggleSetting('darkMode')
        },
        {
          title: 'تم',
          subtitle: 'تغییر رنگ برنامه',
          icon: '🎨',
          onPress: () => Alert.alert('تم', 'تغییر تم برنامه')
        },
        {
          title: 'والپیپر چت',
          subtitle: 'تغییر پس‌زمینه چت‌ها',
          icon: '🖼️',
          onPress: () => Alert.alert('والپیپر', 'تغییر والپیپر چت‌ها')
        },
      ]
    },
    {
      title: 'پشتیبانی',
      icon: '❓',
      items: [
        {
          title: 'راهنما',
          subtitle: 'آموزش استفاده از برنامه',
          icon: '❓',
          onPress: () => Alert.alert('راهنما', 'آموزش استفاده از پیکو')
        },
        {
          title: 'تماس با پشتیبانی',
          subtitle: 'گزارش مشکل یا پیشنهاد',
          icon: '📞',
          onPress: () => Alert.alert('پشتیبانی', 'تماس با پشتیبانی')
        },
        {
          title: 'درباره برنامه',
          subtitle: 'نسخه ۲.۰.۰ - سوپر پیکو',
          icon: 'ℹ️',
          onPress: () => Alert.alert(
            'درباره پیکو',
            'سوپر پیکو - نسخه ۲.۰.۰\nترکیب روبیکا و تلگرام\nتوسعه‌یافته با React Native'
          )
        },
      ]
    }
  ];

  const SettingsSection = ({ title, icon, children }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const SettingItem = ({ icon, title, subtitle, type, value, onToggle, onPress }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={type === 'switch' ? onToggle : onPress}
    >
      <Text style={styles.settingIcon}>{icon}</Text>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#2196F3' }}
          thumbColor={value ? '#FFFFFF' : '#f4f3f4'}
        />
      ) : (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>⚙️</Text>
        <Text style={styles.headerTitle}>تنظیمات</Text>
        <Text style={styles.headerSubtitle}>مدیریت حساب و برنامه</Text>
      </View>

      {settingsSections.map((section, index) => (
        <SettingsSection key={index} title={section.title} icon={section.icon}>
          {section.items.map((item, itemIndex) => (
            <SettingItem
              key={itemIndex}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              type={item.type}
              value={item.value}
              onToggle={item.onToggle}
              onPress={item.onPress}
            />
          ))}
        </SettingsSection>
      ))}

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => Alert.alert(
          'خروج',
          'آیا می‌خواهید از حساب خود خارج شوید؟',
          [
            { text: 'انصراف', style: 'cancel' },
            { text: 'خروج', style: 'destructive', onPress: () => navigation.navigate('Login') },
          ]
        )}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>خروج از حساب کاربری</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.version}>سوپر پیکو - نسخه ۲.۰.۰</Text>
        <Text style={styles.copyright}>© 2024 Piko Messenger</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  settingItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 18,
    color: '#BDC3C7',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 15,
    backgroundColor: '#F44336',
    borderRadius: 10,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30,
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});
// درباره ما
