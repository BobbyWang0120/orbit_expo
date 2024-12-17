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
      <View style={styles.content}>
        <Text style={styles.title}>{chat.title}</Text>
        
        <View style={styles.footer}>
          <View style={styles.details}>
            {chat.destination && (
              <View style={styles.detailItem}>
                <IconSymbol name="mappin" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.detail}>{chat.destination}</Text>
              </View>
            )}
            {chat.duration && (
              <View style={styles.detailItem}>
                <IconSymbol name="clock" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.detail}>{chat.duration}</Text>
              </View>
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
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  details: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detail: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
});
