/**
 * 聊天输入组件
 * 支持文本输入和发送功能，带有动画效果和haptic反馈
 */

import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export function ChatInput({ onSend, placeholder = '发送消息...' }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // 在组件挂载时确保键盘是关闭的
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  // 处理发送按钮动画
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // 处理发送消息
  const handleSend = () => {
    if (!message.trim()) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSend(message.trim());
    setMessage('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder={placeholder}
            placeholderTextColor={Colors.light.textLight}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            blurOnSubmit={true}
          />
          <Pressable
            onPress={handleSend}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={!message.trim()}
            style={({ pressed }) => [
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
              pressed && styles.sendButtonPressed,
            ]}
          >
            <Animated.View
              style={[
                styles.sendButtonInner,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <IconSymbol
                name="paperplane.fill"
                size={20}
                color={message.trim() ? Colors.light.background : Colors.light.textLight}
              />
            </Animated.View>
          </Pressable>
        </View>
        
        {/* 底部安全区域填充 */}
        <View style={styles.bottomSafeArea} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.light.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light.messageBubble,
    borderRadius: 24,
    color: Colors.light.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.light.border,
  },
  sendButtonPressed: {
    opacity: 0.8,
  },
  sendButtonInner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSafeArea: {
    height: Platform.OS === 'ios' ? 34 : 0,
  },
});
