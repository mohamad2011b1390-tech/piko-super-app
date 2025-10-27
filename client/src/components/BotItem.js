import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BotItem = ({ bot, onPress, onStart }) => {
  return (
    <TouchableOpacity style={styles.botItem} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarIcon}>🤖</Text>
      </View>

      <View style={styles.botInfo}>
        <Text style={styles.botName}>{bot.name}</Text>
        <Text style={styles.botUsername}>{bot.username}</Text>
        <Text style={styles.botDescription} numberOfLines={2}>
          {bot.description}
        </Text>
        
        <View style={styles.botStats}>
          <Text style={styles.stat}>
            {bot.stats?.messagesProcessed || 0} پیام
          </Text>
          <Text style={styles.stat}>
            {bot.stats?.users || 0} کاربر
          </Text>
        </View>
      </View>

      <View style={styles.botActions}>
        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={styles.startText}>شروع</Text>
        </TouchableOpacity>
        <Text style={styles.status}>
          {bot.isActive ? '🟢 فعال' : '🔴 غیرفعال'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarIcon: {
    fontSize: 20,
  },
  botInfo: {
    flex: 1,
  },
  botName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  botUsername: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 5,
  },
  botDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  botStats: {
    flexDirection: 'row',
  },
  stat: {
    fontSize: 11,
    color: '#999',
    marginRight: 15,
  },
  botActions: {
    alignItems: 'flex-end',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 5,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 10,
    color: '#666',
  },
});

export default BotItem;
