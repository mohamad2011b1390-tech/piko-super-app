import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const StoryView = ({ story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const duration = story.duration || 24;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onNext && onNext();
          return 100;
        }
        return prev + (100 / (duration * 60));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onNext]);

  const formatTimeLeft = () => {
    const hoursLeft = Math.floor((duration * 60 * 60 * (100 - progress)) / 100 / 3600);
    if (hoursLeft > 1) return `${hoursLeft} ساعت`;
    if (hoursLeft === 1) return '1 ساعت';
    
    const minutesLeft = Math.floor((duration * 60 * 60 * (100 - progress)) / 100 / 60);
    return `${minutesLeft} دقیقه`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {story.userName?.charAt(0) || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.userName}>{story.userName || 'کاربر'}</Text>
            <Text style={styles.timeLeft}>{formatTimeLeft()} مانده</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {story.type === 'text' ? (
          <View style={styles.textContent}>
            <Text style={styles.storyText}>{story.content}</Text>
          </View>
        ) : (
          <View style={styles.mediaContent}>
            <Text style={styles.mediaPlaceholder}>🎬 {story.type === 'image' ? 'عکس' : 'ویدیو'}</Text>
            <Text style={styles.mediaText}>{story.content}</Text>
          </View>
        )}
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{story.views?.length || 0}</Text>
          <Text style={styles.statLabel}>مشاهده</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{story.reactions?.length || 0}</Text>
          <Text style={styles.statLabel}>ری‌اکشن</Text>
        </View>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={onPrev}>
          <Text style={styles.navText}>⬅️ قبلی</Text>
        </TouchableOpacity>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>➡️</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.navButton} onPress={onNext}>
          <Text style={styles.navText}>بعدی ➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressContainer: {
    padding: 10,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeLeft: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContent: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
    maxWidth: '90%',
  },
  storyText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  mediaContent: {
    alignItems: 'center',
  },
  mediaPlaceholder: {
    fontSize: 60,
    marginBottom: 20,
  },
  mediaText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  actionIcon: {
    fontSize: 20,
  },
});

export default StoryView;
