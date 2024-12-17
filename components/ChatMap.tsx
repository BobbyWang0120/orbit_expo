/**
 * 聊天地图组件
 * 用于在聊天界面中显示地图
 */

import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from 'react';

export function ChatMap() {
  // 默认显示东京的位置
  const initialRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          title="东京"
          description="您的目的地"
        />
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
