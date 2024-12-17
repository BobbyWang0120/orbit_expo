/**
 * 聊天地图组件
 * 用于在聊天界面中显示地图
 */

import { StyleSheet, View, Pressable } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import React, { useMemo, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as Haptics from 'expo-haptics';
import { mockMapLocations } from '@/constants/MockData';

export function ChatMap() {
  const mapRef = useRef<MapView>(null);

  // 计算所有标记点的边界和中心点
  const initialRegion = useMemo<Region>(() => {
    // 找出所有坐标的最大最小值
    const bounds = mockMapLocations.reduce(
      (acc, location) => {
        return {
          minLat: Math.min(acc.minLat, location.coordinate.latitude),
          maxLat: Math.max(acc.maxLat, location.coordinate.latitude),
          minLng: Math.min(acc.minLng, location.coordinate.longitude),
          maxLng: Math.max(acc.maxLng, location.coordinate.longitude),
        };
      },
      {
        minLat: mockMapLocations[0].coordinate.latitude,
        maxLat: mockMapLocations[0].coordinate.latitude,
        minLng: mockMapLocations[0].coordinate.longitude,
        maxLng: mockMapLocations[0].coordinate.longitude,
      }
    );

    // 计算中心点
    const centerLat = (bounds.minLat + bounds.maxLat) / 2;
    const centerLng = (bounds.minLng + bounds.maxLng) / 2;

    // 计算需要显示的范围（添加一些边距）
    const padding = 1.1; // 10% 的边距
    const latDelta = (bounds.maxLat - bounds.minLat) * padding;
    const lngDelta = (bounds.maxLng - bounds.minLng) * padding;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: Math.max(latDelta, 0.02), // 设置最小缩放级别
      longitudeDelta: Math.max(lngDelta, 0.02),
    };
  }, []);

  // 处理回正按钮点击
  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    mapRef.current?.animateToRegion(initialRegion, 500); // 500ms的动画时长
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {mockMapLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.coordinate}
            title={location.name}
            description={location.description}
            pinColor={Colors.light.tint}
          />
        ))}
      </MapView>
      <Pressable
        style={({ pressed }) => [
          styles.resetButton,
          pressed && styles.resetButtonPressed,
        ]}
        onPress={handleReset}
      >
        <IconSymbol
          name="scope"
          size={24}
          color={Colors.light.text}
        />
      </Pressable>
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
    bottom: 16,
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
  resetButtonPressed: {
    opacity: 0.7,
    backgroundColor: Colors.light.messageBubble,
  },
});
