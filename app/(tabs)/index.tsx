/**
 * 主页面：展示旅行规划的聊天历史记录
 */

import { ChatHistoryItem } from '@/components/ChatHistoryItem';
import { Colors } from '@/constants/Colors';
import { mockChatHistories } from '@/constants/MockData';
import { ChatHistory } from '@/types/chat';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  // 处理聊天记录点击事件
  const handleChatPress = (chat: ChatHistory) => {
    router.push(`/chat/${chat.id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockChatHistories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatHistoryItem
            chat={item}
            onPress={handleChatPress}
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
