import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MessageItem = ({ message, isOwn, onLongPress }) => {
  const handleLongPress = () => {
    Alert.alert(
      'عملیات پیام',
      'چه کاری می‌خواهید انجام دهید؟',
      [
        { text: 'کپی', onPress: () => console.log('کپی شد') },
        { text: 'فوروارد', onPress: () => console.log('فوروارد شد') },
        { text: 'پاسخ', onPress: () => console.log('پاسخ داده شد') },
        { text: 'حذف', onPress: () => console.log('حذف شد'), style: 'destructive' },
        { text: 'انصراف', style: 'cancel' },
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={[
        styles.messageContainer,
        isOwn ? styles.ownMessage : styles.otherMessage
      ]}
      onLongPress={handleLongPress}
      delayLongPress={500}
    >
      {message.isSecret && (
        <View style={styles.secretBadge}>
          <Text style={styles.secretText}>🔒 مخفی</Text>
        </View>
      )}
      
      <Text style={[
        styles.messageText,
        isOwn ? styles.ownMessageText : styles.otherMessageText
      ]}>
        {message.content}
      </Text>
      
      <View style={styles.messageMeta}>
        <Text style={styles.time}>
          {new Date(message.timestamp).toLocaleTimeString('fa-IR', { 
            hour: '2-digit', minute: '2-digit' 
          })}
        </Text>
        {isOwn && (
          <Text style={styles.status}>
            {message.read ? '✅' : '✓'}
          </Text>
        )}
      </View>

      {message.selfDestruct > 0 && (
        <View style={styles.selfDestructBadge}>
          <Text style={styles.selfDestructText}>⏰ {message.selfDestruct}ثانیه</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 5,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#333333',
  },
  messageMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  time: {
    fontSize: 11,
    opacity: 0.7,
    marginRight: 5,
  },
  status: {
    fontSize: 12,
  },
  secretBadge: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  secretText: {
    fontSize: 10,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  selfDestructBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  selfDestructText: {
    fontSize: 10,
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default MessageItem;
