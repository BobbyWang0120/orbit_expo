/**
 * Chat Detail Screen
 * 
 * Features:
 * - Real-time chat messages from Firestore
 * - Supports switching between chat and map views
 * - Messages are associated with specific chat conversations
 * - Debug view shows chat ID when no messages exist
 */

import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatMap } from '@/components/ChatMap';
import { Colors } from '@/constants/Colors';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { collection, query, orderBy, onSnapshot, addDoc, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [showMap, setShowMap] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Subscribe to messages from Firestore
  useEffect(() => {
    if (!id || !user) return;

    const messagesQuery = query(
      collection(db, 'messages'),
      where('chatId', '==', id),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages: ChatMessageType[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate(),
        } as ChatMessageType);
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [id, user]);

  // Handle sending new message
  const handleSend = async (content: string) => {
    if (!id || !user || !content.trim()) return;

    try {
      // Add message to Firestore
      await addDoc(collection(db, 'messages'), {
        chatId: id,
        content: content.trim(),
        timestamp: new Date(),
        sender: 'user',
        userId: user.uid,
      });

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // TODO: Call AI API to get response
      // For now, we'll add a simple AI response to Firestore
      setTimeout(async () => {
        await addDoc(collection(db, 'messages'), {
          chatId: id,
          content: "I received your message and I'm thinking about it...",
          timestamp: new Date(),
          sender: 'ai',
          userId: user.uid,
        });

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
          messages.length > 0 ? (
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
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No messages yet</Text>
              <Text style={styles.debugText}>Chat ID: {id}</Text>
            </View>
          )
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    color: Colors.light.textLight,
    fontFamily: 'SpaceMono',
  },
});
