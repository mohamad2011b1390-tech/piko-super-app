import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const ChatList = ({ chats, onChatPress, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => onChatPress(item)}
    >
      <View style={styles.avatarContainer}>
        <View style={[
          styles.avatar,
          { backgroundColor: getAvatarColor(item.name) }
        ]}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0)}
          </Text>
        </View>
        {item.isOnline && <View style={styles.onlineIndicator} />}
        {item.isSecret && (
          <View style={styles.secretIndicator}>
            <Text style={styles.secretIcon}>🔒</Text>
          </View>
        )}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>
            {item.time}
          </Text>
        </View>
        
        <View style={styles.chatFooter}>
          <Text 
            style={[
              styles.lastMessage,
              item.unread > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.isSecret ? '🔒 پیام مخفی' : item.lastMessage}
          </Text>
          
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {item.unread > 99 ? '99+' : item.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const getAvatarColor = (name) => {
    const colors = [
      '#2196F3', '#4CAF50', '#FF9800', '#9C27B0', 
      '#F44336', '#00BCD4', '#8BC34A', '#FF5722'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="جستجو در مکالمات..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch && onSearch(text);
          }}
        />
      </View>

      <View style={styles.chatTypes}>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>همه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>شخصی</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>گروه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>کانال</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>ربات</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 25,
    fontSize: 16,
    textAlign: 'right',
  },
  chatTypes: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  chatTypeButton: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  chatTypeText: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  secretIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secretIcon: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadMessage: {
    color: '#333',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatList;
