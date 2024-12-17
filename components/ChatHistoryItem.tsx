/**
 * 聊天历史记录列表项组件
 * 展示单条聊天历史的概要信息，包括标题、最后消息、时间等
 */

import { Colors } from '@/constants/Colors';
import { ChatHistory } from '@/types/chat';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  onPress: (chat: ChatHistory) => void;
}

export function ChatHistoryItem({ chat, onPress }: ChatHistoryItemProps) {
  // 获取状态对应的图标和颜色
  const getStatusIcon = () => {
    switch (chat.status) {
      case 'completed':
        return { name: 'checkmark.circle.fill', color: Colors.light.success };
      case 'planning':
        return { name: 'clock.fill', color: Colors.light.warning };
      case 'cancelled':
        return { name: 'xmark.circle.fill', color: Colors.light.error };
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(chat)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{chat.title}</Text>
          <IconSymbol
            name={statusIcon.name}
            size={20}
            color={statusIcon.color}
          />
        </View>
        
        <Text style={styles.message} numberOfLines={2}>
          {chat.lastMessage}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.details}>
            {chat.destination && (
              <Text style={styles.detail}>📍 {chat.destination}</Text>
            )}
            {chat.duration && (
              <Text style={styles.detail}>⏱ {chat.duration}</Text>
            )}
          </View>
          <Text style={styles.timestamp}>
            {format(chat.timestamp, 'MM月dd日 HH:mm', { locale: zhCN })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  message: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    gap: 12,
  },
  detail: {
    fontSize: 12,
    color: Colors.light.textLight,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.textLight,
  },
});
