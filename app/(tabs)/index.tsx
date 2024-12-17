/**
 * 主页面：展示旅行规划的聊天历史记录
 */

import { ChatHistoryItem } from '@/components/ChatHistoryItem';
import { Colors } from '@/constants/Colors';
import { mockChatHistories } from '@/constants/MockData';
import { ChatHistory } from '@/types/chat';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>(mockChatHistories);

  // 处理聊天记录点击事件
  const handleChatPress = (chat: ChatHistory) => {
    router.push(`/chat/${chat.id}`);
  };

  // 处理删除聊天记录
  const handleDelete = (chatId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setChatHistories(prev => prev.filter(chat => chat.id !== chatId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatHistories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatHistoryItem
            chat={item}
            onPress={handleChatPress}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    paddingVertical: 12,
  },
});
