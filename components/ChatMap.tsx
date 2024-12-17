/**
 * 聊天地图组件
 * 用于在聊天界面中显示地图
 */

import { StyleSheet, View, Pressable, Modal, Text, ScrollView } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as Haptics from 'expo-haptics';
import { mockMapLocationsByDay } from '@/constants/MockData';

export function ChatMap() {
  const mapRef = useRef<MapView>(null);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const currentLocations = mockMapLocationsByDay[selectedDay];

  // 计算所有标记点的边界和中心点
  const initialRegion = useMemo<Region>(() => {
    if (!currentLocations?.length) return {
      latitude: 35.6762,
      longitude: 139.6503,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

    // 找出所有坐标的最大最小值
    const bounds = currentLocations.reduce(
      (acc, location) => {
        return {
          minLat: Math.min(acc.minLat, location.coordinate.latitude),
          maxLat: Math.max(acc.maxLat, location.coordinate.latitude),
          minLng: Math.min(acc.minLng, location.coordinate.longitude),
          maxLng: Math.max(acc.maxLng, location.coordinate.longitude),
        };
      },
      {
        minLat: currentLocations[0].coordinate.latitude,
        maxLat: currentLocations[0].coordinate.latitude,
        minLng: currentLocations[0].coordinate.longitude,
        maxLng: currentLocations[0].coordinate.longitude,
      }
    );

    // 计算中心点
    const centerLat = (bounds.minLat + bounds.maxLat) / 2;
    const centerLng = (bounds.minLng + bounds.maxLng) / 2;

    // 计算需要显示的范围（添加一些边距）
    const padding = 1.1; // 10% 的边距
    const latDelta = Math.max((bounds.maxLat - bounds.minLat) * padding, 0.02);
    const lngDelta = Math.max((bounds.maxLng - bounds.minLng) * padding, 0.02);

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  }, [currentLocations]);

  // 当选中的天数改变时，自动调整地图视角
  useEffect(() => {
    mapRef.current?.animateToRegion(initialRegion, 500);
  }, [selectedDay, initialRegion]);

  // 处理回正按钮点击
  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    mapRef.current?.animateToRegion(initialRegion, 500);
  };

  // 处理日期选择
  const handleDaySelect = (day: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDay(day);
    setShowDayPicker(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {currentLocations?.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.coordinate}
            title={location.name}
            description={location.description}
            pinColor={Colors.light.tint}
          />
        ))}
      </MapView>
      
      {/* 回正按钮 */}
      <Pressable
        style={({ pressed }) => [
          styles.resetButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleReset}
      >
        <IconSymbol
          name="scope"
          size={24}
          color={Colors.light.text}
        />
      </Pressable>

      {/* 日期选择按钮 */}
      <Pressable
        style={({ pressed }) => [
          styles.dayButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setShowDayPicker(true)}
      >
        <IconSymbol
          name="calendar"
          size={24}
          color={Colors.light.text}
        />
        <Text style={styles.dayText}>第{selectedDay}天</Text>
      </Pressable>

      {/* 日期选择弹窗 */}
      <Modal
        visible={showDayPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDayPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDayPicker(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {[1, 2, 3, 4, 5].map((day) => (
                <Pressable
                  key={day}
                  style={({ pressed }) => [
                    styles.dayOption,
                    day === selectedDay && styles.selectedDayOption,
                    pressed && styles.dayOptionPressed,
                  ]}
                  onPress={() => handleDaySelect(day)}
                >
                  <Text style={[
                    styles.dayOptionText,
                    day === selectedDay && styles.selectedDayOptionText
                  ]}>
                    第{day}天
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  resetButton: {
    position: 'absolute',
    right: 16,
    bottom: 72, // 调整到日期按钮的位置
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayButton: {
    position: 'absolute',
    right: 16,
    bottom: 16, // 调整到回正按钮的位置
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: Colors.light.background,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
  },
  buttonPressed: {
    opacity: 0.7,
    backgroundColor: Colors.light.messageBubble,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayOption: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedDayOption: {
    backgroundColor: Colors.light.tint,
  },
  dayOptionPressed: {
    opacity: 0.7,
    backgroundColor: Colors.light.messageBubble,
  },
  dayOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    textAlign: 'center',
  },
  selectedDayOptionText: {
    color: Colors.light.background,
    fontWeight: '600',
  },
});