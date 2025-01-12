/**
 * Home Screen Component
 * 
 * Features:
 * - Displays a list of user's chat histories
 * - Shows empty state when no chats exist
 * - Provides a floating action button to create new chat
 * - Modal dialog for entering new chat title
 * - Real-time sync with Firestore database
 */

import { StyleSheet, ScrollView, View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChatHistoryItem } from '@/components/ChatHistoryItem';
import { ChatHistory } from '@/types/chat';
import { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets(); // Get safe area insets
  const router = useRouter();
  const { user } = useAuth(); // Get current user from AuthContext
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to user's chat histories from Firestore
  useEffect(() => {
    if (!user) return;

    // Create query for user's chats
    const chatsQuery = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const chats: ChatHistory[] = [];
      snapshot.forEach((doc) => {
        chats.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate(),
        } as ChatHistory);
      });
      setChatHistories(chats);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [user]);

  // Handle creating new chat
  const handleCreateChat = async () => {
    if (!user || !newChatTitle.trim()) return;

    setIsLoading(true);
    try {
      // Add new chat document to Firestore
      const docRef = await addDoc(collection(db, 'chats'), {
        title: newChatTitle.trim(),
        userId: user.uid,
        timestamp: new Date(),
      });

      // Navigate to new chat
      router.push(`/chat/${docRef.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
      setNewChatTitle('');
    }
  };

  // Navigate to chat detail
  const handlePress = (chat: ChatHistory) => {
    router.push(`/chat/${chat.id}`);
  };

  return (
    <View style={styles.container}>
      {/* Chat list or empty state */}
      {chatHistories.length > 0 ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 80 }} // Add padding for FAB
        >
          <View style={styles.list}>
            {chatHistories.map((chat) => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                onPress={handlePress}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol 
            name="bubble.left.and.bubble.right" // 修复图标名称
            size={48} 
            color={Colors.light.textSecondary} 
          />
          <Text style={styles.emptyStateText}>
            No conversations yet.{'\n'}Start a new chat to begin planning!
          </Text>
        </View>
      )}

      {/* Floating action button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: insets.bottom + 80, // Adjust bottom position based on safe area + extra space for tabs
          }
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        <IconSymbol 
          name="plus" 
          size={24} 
          color={Colors.light.background} 
        />
      </TouchableOpacity>

      {/* New chat modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Conversation</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter conversation title"
              value={newChatTitle}
              onChangeText={setNewChatTitle}
              autoFocus
              maxLength={50}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  setNewChatTitle('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={handleCreateChat}
                disabled={isLoading || !newChatTitle.trim()}
              >
                <Text style={styles.createButtonText}>
                  {isLoading ? 'Creating...' : 'Create'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  list: {
    paddingVertical: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.light.messageBubble,
  },
  createButton: {
    backgroundColor: Colors.light.primary,
  },
  cancelButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
  },
  createButtonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: '500',
  },
});
