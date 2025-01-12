/**
 * Chat History List Item Component
 * 
 * A modern, minimalist card design for chat history entries.
 * Features:
 * - Clean, spacious layout with subtle hover effects
 * - Prominent title with elegant typography
 * - Subtle date display
 * - Smooth interaction feedback
 * - Minimal visual noise with refined shadows
 * 
 * Design Principles:
 * - Focus on content hierarchy
 * - Whitespace for better readability
 * - Subtle animations for better UX
 * - Consistent with Airbnb-inspired design language
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
  Platform,
} from 'react-native';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  onPress: (chat: ChatHistory) => void;
}

export function ChatHistoryItem({ chat, onPress }: ChatHistoryItemProps) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => onPress(chat)}
      activeOpacity={0.9} // Subtle press effect
    >
      {/* Main card container */}
      <View style={styles.container}>
        {/* Accent line for visual interest */}
        <View style={styles.accentLine} />
        
        {/* Content area */}
        <View style={styles.content}>
          {/* Title with modern typography */}
          <Text 
            style={styles.title} 
            numberOfLines={1}
          >
            {chat.title}
          </Text>

          {/* Date with refined styling */}
          <Text style={styles.timestamp}>
            {format(chat.timestamp, 'MMM dd')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Wrapper container with improved spacing
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    // Platform-specific shadows for better depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  // Main container with refined styling
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)', // Subtle border
  },

  // Modern accent line
  accentLine: {
    width: 3,
    backgroundColor: Colors.light.primary,
    opacity: 0.8,
  },

  // Content container with improved spacing
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },

  // Enhanced title typography
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    letterSpacing: -0.2, // Tighter letter spacing for modern look
  },

  // Refined timestamp styling
  timestamp: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.light.textSecondary,
    opacity: 0.8,
  },
});
