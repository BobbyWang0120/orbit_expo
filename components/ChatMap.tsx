/**
 * 聊天地图组件
 * 用于在聊天界面中显示地图
 */

import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import React, { useMemo } from 'react';
import { Colors } from '@/constants/Colors';

// 定义景点位置数据
const locations = [
  {
    name: '筑地市场',
    description: '世界最大的海鲜市场之一',
    coordinate: { latitude: 35.6654, longitude: 139.7691 }
  },
  {
    name: '浅草寺',
    description: '东京最古老的寺庙',
    coordinate: { latitude: 35.7147, longitude: 139.7966 }
  },
  {
    name: '晴空塔',
    description: '东京地标建筑',
    coordinate: { latitude: 35.7100, longitude: 139.8107 }
  },
  {
    name: '明治神宫',
    description: '东京重要的神道教圣地',
    coordinate: { latitude: 35.6764, longitude: 139.6993 }
  },
  {
    name: '竹下通',
    description: '原宿购物街',
    coordinate: { latitude: 35.6722, longitude: 139.7034 }
  },
  {
    name: '涉谷站',
    description: '著名的涉谷十字路口',
    coordinate: { latitude: 35.6580, longitude: 139.7016 }
  },
  {
    name: '东京迪士尼乐园',
    description: '亚洲第一个迪士尼乐园',
    coordinate: { latitude: 35.6329, longitude: 139.8804 }
  },
  {
    name: '秋叶原',
    description: '电器街和动漫文化中心',
    coordinate: { latitude: 35.6987, longitude: 139.7714 }
  },
  {
    name: '银座',
    description: '高端购物区',
    coordinate: { latitude: 35.6721, longitude: 139.7636 }
  },
  {
    name: '六本木',
    description: '夜生活和美食区域',
    coordinate: { latitude: 35.6627, longitude: 139.7307 }
  },
  {
    name: '皇居',
    description: '日本天皇居住地',
    coordinate: { latitude: 35.6852, longitude: 139.7528 }
  },
  {
    name: '上野公园',
    description: '博物馆和美术馆集中地',
    coordinate: { latitude: 35.7147, longitude: 139.7713 }
  },
  {
    name: '羽田机场',
    description: '东京国际机场',
    coordinate: { latitude: 35.5493, longitude: 139.7798 }
  }
];

export function ChatMap() {
  // 计算所有标记点的边界和中心点
  const initialRegion = useMemo<Region>(() => {
    // 找出所有坐标的最大最小值
    const bounds = locations.reduce(
      (acc, location) => {
        return {
          minLat: Math.min(acc.minLat, location.coordinate.latitude),
          maxLat: Math.max(acc.maxLat, location.coordinate.latitude),
          minLng: Math.min(acc.minLng, location.coordinate.longitude),
          maxLng: Math.max(acc.maxLng, location.coordinate.longitude),
        };
      },
      {
        minLat: locations[0].coordinate.latitude,
        maxLat: locations[0].coordinate.latitude,
        minLng: locations[0].coordinate.longitude,
        maxLng: locations[0].coordinate.longitude,
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        rotateEnabled={false}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.coordinate}
            title={location.name}
            description={location.description}
            pinColor={Colors.light.tint}
          />
        ))}
      </MapView>
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
});
