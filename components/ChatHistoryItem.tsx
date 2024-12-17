/**
 * 聊天历史记录列表项组件
 * 展示单条聊天历史的概要信息，包括标题、目的地和时间等
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
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(chat)}
      activeOpacity={0.7}
    >
      <View style={styles.leftBorder} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{chat.title}</Text>
          <Text style={styles.timestamp}>
            {format(chat.timestamp, 'MM月dd日', { locale: zhCN })}
          </Text>
        </View>
        
        <View style={styles.details}>
          {chat.destination && (
            <View style={styles.detailItem}>
              <IconSymbol name="mappin" size={14} color={Colors.light.textSecondary} />
              <Text style={styles.detail}>{chat.destination}</Text>
            </View>
          )}
          {chat.duration && (
            <View style={styles.detailItem}>
              <IconSymbol name="clock" size={14} color={Colors.light.textSecondary} />
              <Text style={styles.detail}>{chat.duration}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftBorder: {
    width: 4,
    backgroundColor: Colors.light.primary,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 8,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detail: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.textLight,
  },
});
