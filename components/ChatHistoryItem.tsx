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
import * as Haptics from 'expo-haptics';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  onPress: (chat: ChatHistory) => void;
  onDelete: (chatId: string) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const DELETE_THRESHOLD = SCREEN_WIDTH * 0.3; // 30% 屏幕宽度为删除阈值
const HAPTIC_THRESHOLD = DELETE_THRESHOLD * 0.6; // 60% 删除阈值时触发震动

export function ChatHistoryItem({ chat, onPress, onDelete }: ChatHistoryItemProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [hasTriggeredHaptic, setHasTriggeredHaptic] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // 只响应水平滑动
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2);
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        setHasTriggeredHaptic(false);
        pan.setOffset({
          x: pan.x._value,
          y: 0
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        // 只允许向左滑动
        const x = Math.min(0, gestureState.dx);
        pan.setValue({ x, y: 0 });

        // 当滑动距离达到震动阈值时触发震动
        if (!hasTriggeredHaptic && Math.abs(x) > HAPTIC_THRESHOLD) {
          setHasTriggeredHaptic(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        pan.flattenOffset();

        if (Math.abs(gestureState.dx) > DELETE_THRESHOLD) {
          // 触发删除动画
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            duration: 250,
            useNativeDriver: false
          }).start(() => {
            onDelete(chat.id);
          });
        } else {
          // 回弹动画
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            bounciness: 8
          }).start();
        }
      }
    })
  ).current;

  return (
    <View style={styles.wrapper}>
      {/* 背景层 - 显示删除状态 */}
      <Animated.View
        style={[
          styles.deleteBackground,
          {
            opacity: pan.x.interpolate({
              inputRange: [-DELETE_THRESHOLD, 0],
              outputRange: [1, 0],
            })
          }
        ]}
      >
        <IconSymbol name="trash" size={24} color={Colors.light.background} />
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
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => !isDragging && onPress(chat)}
          activeOpacity={0.7}
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
        </TouchableOpacity>
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
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.light.error,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  touchable: {
    flex: 1,
    flexDirection: 'row',
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
