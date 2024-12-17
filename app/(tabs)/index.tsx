/**
 * 首页组件
 * 展示聊天历史列表，支持创建新的聊天和查看历史聊天记录
 */

import { StyleSheet, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChatHistoryItem } from '@/components/ChatHistoryItem';
import { mockChatHistories } from '@/constants/MockData';
import { ChatHistory } from '@/types/chat';
import { useState, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>(mockChatHistories);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePress = (chat: ChatHistory) => {
    router.push(`/chat/${chat.id}`);
  };

  const handleDelete = (chatId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setChatHistories(prev => prev.filter(chat => chat.id !== chatId));
  };

  const handleSwipeStateChange = (isActive: boolean) => {
    setIsSwipeActive(isActive);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      scrollEnabled={!isSwipeActive}
    >
      <View style={styles.list}>
        {chatHistories.map((chat) => (
          <ChatHistoryItem
            key={chat.id}
            chat={chat}
            onPress={handlePress}
            onDelete={handleDelete}
            onSwipeStateChange={handleSwipeStateChange}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  list: {
    paddingVertical: 12,
  },
});
