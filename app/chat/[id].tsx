/**
 * Chat Detail Screen
 * 
 * Features:
 * - Displays chat messages and map view
 * - Supports switching between chat and map views
 * - Real-time message updates
 * - Dynamic header title based on current view
 */

import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatMap } from '@/components/ChatMap';
import { Colors } from '@/constants/Colors';
import { mockTokyoMessages } from '@/constants/MockData';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';

// Custom back button component
function BackButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.iconButtonPressed,
      ]}
    >
      <IconSymbol
        name="chevron.left"
        size={20}
        color={Colors.light.text}
      />
    </Pressable>
  );
}

// Toggle button component for switching between chat and map views
function ToggleButton({ showMap, onPress }: { showMap: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.iconButtonPressed,
      ]}
    >
      <IconSymbol
        name={showMap ? "message" : "map"}
        size={24}
        color={Colors.light.text}
      />
    </Pressable>
  );
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMessageType[]>(mockTokyoMessages);
  const [showMap, setShowMap] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Handle sending new message
  const handleSend = (content: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // TODO: Call AI API to get response
    // Currently using a simple mock response
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: 'I received your message and I\'m thinking about it...',
        timestamp: new Date(),
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen
        options={{
          title: showMap ? 'Travel Map' : 'Chat',
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <ToggleButton
              showMap={showMap}
              onPress={() => setShowMap(!showMap)}
            />
          ),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <View style={styles.content}>
        {showMap ? (
          <ChatMap />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatMessage message={item} />}
            contentContainerStyle={styles.listContent}
            onLayout={() => {
              flatListRef.current?.scrollToEnd({ animated: false });
            }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: -8,
  },
  iconButtonPressed: {
    opacity: 0.7,
    backgroundColor: Colors.light.messageBubble,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.light.text,
  },
});
