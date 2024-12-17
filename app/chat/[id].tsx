/**
 * 聊天详情页面
 * 显示与AI的对话内容
 */

import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { Colors } from '@/constants/Colors';
import { mockChatHistories, mockTokyoMessages } from '@/constants/MockData';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMessageType[]>(mockTokyoMessages);
  const flatListRef = useRef<FlatList>(null);
  
  // 获取聊天历史记录的标题
  const chatHistory = mockChatHistories.find(chat => chat.id === id);

  // 处理发送消息
  const handleSend = (content: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);
    
    // 滚动到底部
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // TODO: 这里应该调用AI接口获取回复
    // 现在我们模拟一个简单的回复
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: '收到您的消息，我正在思考中...',
        timestamp: new Date(),
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // 滚动到底部
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };
  
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
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
          contentContainerStyle={styles.listContent}
          onLayout={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
        />
        <ChatInput onSend={handleSend} />
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
