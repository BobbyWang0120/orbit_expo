/**
 * 聊天历史记录列表项组件
 * 展示单条聊天历史的概要信息，包括标题、目的地和时间等
 * 支持左滑删除功能
 */

import { Colors } from '@/constants/Colors';
import { ChatHistory } from '@/types/chat';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  onPress: (chat: ChatHistory) => void;
  onDelete: (chatId: string) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const DELETE_BUTTON_WIDTH = 80;
const SWIPE_THRESHOLD = DELETE_BUTTON_WIDTH / 2;

export function ChatHistoryItem({ chat, onPress, onDelete }: ChatHistoryItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // 只响应水平滑动
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2);
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: 0
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        // 限制只能向左滑动，且最大滑动距离为删除按钮宽度
        const x = Math.min(0, Math.max(-DELETE_BUTTON_WIDTH, gestureState.dx));
        pan.setValue({ x, y: 0 });
        
        // 根据滑动距离设置删除按钮的透明度
        const opacity = Math.min(1, Math.abs(x) / DELETE_BUTTON_WIDTH);
        deleteOpacity.setValue(opacity);
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        
        // 判断是否应该展开删除按钮
        const shouldOpen = -gestureState.dx > SWIPE_THRESHOLD;
        
        Animated.spring(pan, {
          toValue: { x: shouldOpen ? -DELETE_BUTTON_WIDTH : 0, y: 0 },
          useNativeDriver: false,
          bounciness: 8
        }).start();
        
        Animated.timing(deleteOpacity, {
          toValue: shouldOpen ? 1 : 0,
          duration: 200,
          useNativeDriver: false
        }).start();
        
        setIsDeleting(shouldOpen);
      }
    })
  ).current;

  const handleDelete = () => {
    // 执行删除动画
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: -SCREEN_WIDTH, y: 0 },
        duration: 250,
        useNativeDriver: false
      }),
      Animated.timing(deleteOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      })
    ]).start(() => {
      onDelete(chat.id);
    });
  };

  return (
    <View style={styles.wrapper}>
      {/* 删除按钮 */}
      <Animated.View
        style={[
          styles.deleteButton,
          {
            opacity: deleteOpacity,
            transform: [{
              translateX: pan.x.interpolate({
                inputRange: [-DELETE_BUTTON_WIDTH, 0],
                outputRange: [0, DELETE_BUTTON_WIDTH]
              })
            }]
          }
        ]}
      >
        <TouchableOpacity
          style={styles.deleteButtonInner}
          onPress={handleDelete}
          disabled={!isDeleting}
        >
          <IconSymbol name="trash" size={24} color={Colors.light.background} />
        </TouchableOpacity>
      </Animated.View>

      {/* 卡片内容 */}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: pan.x }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.leftBorder} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{chat.title}</Text>
            <Text style={styles.timestamp}>
              {format(chat.timestamp, 'MM月dd日', { locale: zhCN })}
            </Text>
          </View>
          
          <View style={styles.details}>
            {chat.destination && (
              <View style={styles.detailItem}>
                <IconSymbol name="mappin" size={14} color={Colors.light.textSecondary} />
                <Text style={styles.detail}>{chat.destination}</Text>
              </View>
            )}
            {chat.duration && (
              <View style={styles.detailItem}>
                <IconSymbol name="clock" size={14} color={Colors.light.textSecondary} />
                <Text style={styles.detail}>{chat.duration}</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginHorizontal: 16,
    marginVertical: 6,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DELETE_BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonInner: {
    width: DELETE_BUTTON_WIDTH - 16,
    height: '100%',
    backgroundColor: Colors.light.error,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBorder: {
    width: 4,
    backgroundColor: Colors.light.primary,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 8,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detail: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.textLight,
  },
});
