import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

export default function ChatScreen() {
  const [chats, setChats] = useState([
    { id: '1', name: 'گروه دوستان', lastMessage: 'سلام چطوری؟', time: '10:30', unread: 3, isOnline: true, isSecret: false },
    { id: '2', name: 'سارا', lastMessage: 'فردا میای؟', time: '09:15', unread: 0, isOnline: true, isSecret: true },
    { id: '3', name: 'گروه فامیلی', lastMessage: 'عکس جدید گذاشتم', time: 'دیروز', unread: 1, isOnline: false, isSecret: false },
    { id: '4', name: 'ربات پشتیبانی', lastMessage: '/start را بزنید', time: '10:22', unread: 0, isOnline: true, isSecret: false },
  ]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        {item.isOnline && <View style={styles.onlineIndicator} />}
        {item.isSecret && <Text style={styles.secretIcon}>🔒</Text>}
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>
          {item.isSecret ? '🔒 پیام مخفی' : item.lastMessage}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مکالمات</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Text style={styles.newChatText}>💬 چت جدید</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="جستجو در مکالمات..." />
      </View>

      <View style={styles.chatTypes}>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>همه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>🔒 مخفی</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>👥 گروه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>🤖 ربات</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        style={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2196F3',
  },
  headerTitle: { fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' },
  newChatButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  newChatText: { color: '#2196F3', fontWeight: 'bold' },
  searchContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  searchInput: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: 10, fontSize: 16 },
  chatTypes: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  chatTypeButton: { marginRight: 15, paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#F5F5F5', borderRadius: 15 },
  chatTypeText: { fontSize: 14, color: '#666' },
  chatList: { flex: 1 },
  chatItem: { 
    flexDirection: 'row', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0',
    alignItems: 'center'
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#2196F3', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 15,
    position: 'relative'
  },
  avatarText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  secretIcon: { 
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 12
  },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  lastMessage: { fontSize: 14, color: '#666', marginTop: 5 },
  chatMeta: { alignItems: 'flex-end' },
  time: { fontSize: 12, color: '#999' },
  unreadBadge: { 
    backgroundColor: '#FF5722', 
    borderRadius: 10, 
    minWidth: 20, 
    height: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 5
  },
  unreadText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
});
