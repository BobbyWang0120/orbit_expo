/**
 * Chat History List Item Component
 * Displays summary information for a single chat history, including title, destination and time
 */

import { Colors } from '@/constants/Colors';
import { ChatHistory } from '@/types/chat';
import { format } from 'date-fns';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  onPress: (chat: ChatHistory) => void;
}

export function ChatHistoryItem({ chat, onPress }: ChatHistoryItemProps) {
  return (
    <View style={styles.wrapper}>
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
              {format(chat.timestamp, 'MMM dd')}
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
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
