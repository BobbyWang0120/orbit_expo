/**
 * Chat Message Component
 * 
 * A modern, clean chat message bubble component that supports:
 * - Different styles for user and AI messages
 * - Clean typography and spacing
 * - Subtle shadows and rounded corners
 * - Optimized for readability
 */

import { Colors } from '@/constants/Colors';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai';

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 16,
    maxWidth: '85%', // 限制消息气泡最大宽度
  },
  aiContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
    // 优化阴影效果
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  aiBubble: {
    backgroundColor: Colors.light.messageBubble,
    borderBottomLeftRadius: 4, // 左下角尖角效果
  },
  userBubble: {
    backgroundColor: Colors.light.primary,
    borderBottomRightRadius: 4, // 右下角尖角效果
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24, // 稍微紧凑的字间距
  },
  aiText: {
    color: Colors.light.text,
  },
  userText: {
    color: Colors.light.background,
  },
});
