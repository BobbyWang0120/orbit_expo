/**
 * 聊天消息组件
 * 用于显示单条聊天消息，支持不同类型的消息展示
 */

import { Colors } from '@/constants/Colors';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai';

  // 渲染行程安排
  const renderItinerary = () => {
    if (message.type !== 'itinerary' || !message.metadata?.itinerary) return null;

    return (
      <View style={styles.itinerary}>
        {message.metadata.itinerary.map((day) => (
          <View key={day.day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>第{day.day}天</Text>
            {day.activities.map((activity, index) => (
              <View key={index} style={styles.activity}>
                <Text style={styles.activityTime}>{activity.time}</Text>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityDescription}>
                    {activity.description}
                  </Text>
                  {activity.location && (
                    <Text style={styles.activityLocation}>
                      📍 {activity.location}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  // 渲染位置信息
  const renderLocation = () => {
    if (message.type !== 'location' || !message.metadata?.locations) return null;

    return (
      <View style={styles.locations}>
        {message.metadata.locations.map((location, index) => (
          <View key={index} style={styles.location}>
            <Text style={styles.locationName}>📍 {location.name}</Text>
            {location.description && (
              <Text style={styles.locationDescription}>
                {location.description}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        isAI ? styles.aiContainer : styles.userContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isAI ? styles.aiBubble : styles.userBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isAI ? styles.aiText : styles.userText,
          ]}
        >
          {message.content}
        </Text>
        {renderItinerary()}
        {renderLocation()}
        <Text style={styles.timestamp}>
          {format(message.timestamp, 'HH:mm', { locale: zhCN })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  aiBubble: {
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.light.primary,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiText: {
    color: Colors.light.text,
  },
  userText: {
    color: Colors.light.background,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.textLight,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  itinerary: {
    marginTop: 8,
    gap: 12,
  },
  dayContainer: {
    gap: 8,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  activity: {
    flexDirection: 'row',
    gap: 12,
  },
  activityTime: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    width: 60,
  },
  activityDetails: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    color: Colors.light.text,
  },
  activityLocation: {
    fontSize: 12,
    color: Colors.light.textLight,
    marginTop: 2,
  },
  locations: {
    marginTop: 8,
    gap: 8,
  },
  location: {
    gap: 4,
  },
  locationName: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  locationDescription: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
});
