import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CallItem = ({ call, onPress }) => {
  const getCallIcon = () => {
    if (call.type === 'video') {
      return call.status === 'answered' ? '📹' : '📹❌';
    } else {
      return call.status === 'answered' ? '📞' : '📞❌';
    }
  };

  const getCallStatus = () => {
    if (call.status === 'missed') return 'از دست رفته';
    if (call.status === 'answered') return `${call.duration} دقیقه`;
    return 'رد شده';
  };

  const getStatusColor = () => {
    if (call.status === 'missed') return '#F44336';
    if (call.status === 'answered') return '#4CAF50';
    return '#FF9800';
  };

  return (
    <TouchableOpacity style={styles.callItem} onPress={onPress}>
      <Text style={styles.callIcon}>{getCallIcon()}</Text>
      
      <View style={styles.callInfo}>
        <Text style={styles.callerName}>{call.callerName}</Text>
        <View style={styles.callDetails}>
          <Text style={styles.callType}>
            {call.type === 'video' ? 'ویدیو' : 'صوتی'} • 
            {call.direction === 'incoming' ? ' ورودی' : ' خروجی'}
          </Text>
        </View>
      </View>

      <View style={styles.callMeta}>
        <Text style={[styles.callStatus, { color: getStatusColor() }]}>
          {getCallStatus()}
        </Text>
        <Text style={styles.callTime}>{call.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  callItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  callInfo: {
    flex: 1,
  },
  callerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callType: {
    fontSize: 14,
    color: '#666',
  },
  callMeta: {
    alignItems: 'flex-end',
  },
  callStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  callTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default CallItem;
