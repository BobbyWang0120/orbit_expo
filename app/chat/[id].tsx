/**
 * 聊天详情页面
 * 显示与AI的对话内容和地图
 */

import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatMap } from '@/components/ChatMap';
import { Colors } from '@/constants/Colors';
import { mockChatHistories, mockTokyoMessages } from '@/constants/MockData';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

// 自定义返回按钮组件
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
        size={24}
        color={Colors.light.text}
      />
    </Pressable>
  );
}

// 切换按钮组件
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
      <View style={styles.container}>
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
            />
          )}
        </View>
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
  content: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
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
