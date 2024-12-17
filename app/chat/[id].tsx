/**
 * 聊天详情页面
 * 显示与AI的对话内容
 */

import { ChatMessage } from '@/components/ChatMessage';
import { Colors } from '@/constants/Colors';
import { mockChatHistories, mockTokyoMessages } from '@/constants/MockData';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // 获取聊天历史记录的标题
  const chatHistory = mockChatHistories.find(chat => chat.id === id);
  
  return (
    <>
      <Stack.Screen
        options={{
          title: chatHistory?.title || '聊天',
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={mockTokyoMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    paddingVertical: 16,
  },
});
