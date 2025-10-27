import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GroupItem = ({ group, onPress, isChannel = false }) => {
  const getMemberCountText = () => {
    if (group.membersCount > 1000) {
      return `${(group.membersCount / 1000).toFixed(1)}K عضو`;
    }
    return `${group.membersCount} عضو`;
  };

  return (
    <TouchableOpacity style={styles.groupItem} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <View style={[
          styles.avatar,
          isChannel ? styles.channelAvatar : styles.groupAvatar
        ]}>
          <Text style={styles.avatarIcon}>
            {isChannel ? '📢' : '👥'}
          </Text>
        </View>
        {group.isPublic && (
          <View style={styles.publicBadge}>
            <Text style={styles.publicText}>عمومی</Text>
          </View>
        )}
      </View>

      <View style={styles.groupInfo}>
        <Text style={styles.groupName} numberOfLines={1}>
          {group.name}
        </Text>
        <Text style={styles.groupDescription} numberOfLines={1}>
          {group.description || (isChannel ? 'کانال عمومی' : 'گروه گفتگو')}
        </Text>
        
        <View style={styles.groupStats}>
          <Text style={styles.memberCount}>
            {getMemberCountText()}
          </Text>
          <Text style={styles.messageCount}>
            {group.messagesCount} پیام
          </Text>
        </View>
      </View>

      <View style={styles.groupMeta}>
        {group.isOnline && <View style={styles.onlineDot} />}
        <Text style={styles.lastActivity}>
          {group.lastActivity || 'فعال'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groupItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupAvatar: {
    backgroundColor: '#2196F3',
  },
  channelAvatar: {
    backgroundColor: '#4CAF50',
  },
  avatarIcon: {
    fontSize: 24,
  },
  publicBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  publicText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  groupStats: {
    flexDirection: 'row',
  },
  memberCount: {
    fontSize: 12,
    color: '#2196F3',
    marginRight: 15,
  },
  messageCount: {
    fontSize: 12,
    color: '#4CAF50',
  },
  groupMeta: {
    alignItems: 'flex-end',
  },
  onlineDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    marginBottom: 5,
  },
  lastActivity: {
    fontSize: 11,
    color: '#999',
  },
});

export default GroupItem;
