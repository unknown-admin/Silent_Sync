import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Circle, Marker, Region} from 'react-native-maps';
import {useTheme} from '@theme/ThemeContext';
import {MAPS_PROVIDER, DARK_MAP_STYLE} from '@config/maps';
import {GeoCoordinates} from '@app-types/common.types';

export interface ZoneMapViewProps {
  region: Region;
  center: GeoCoordinates;
  radius: number;
  onPressMap?: (coords: GeoCoordinates) => void;
  height?: number;
  testID?: string;
}

export const ZoneMapView: React.FC<ZoneMapViewProps> = ({
  region,
  center,
  radius,
  onPressMap,
  height = 220,
  testID,
}) => {
  const {colors, theme, isDark} = useTheme();
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {height, borderRadius: theme.componentDefaults.cardBorderRadius},
      ]}>
      <MapView
        provider={MAPS_PROVIDER}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        customMapStyle={isDark ? DARK_MAP_STYLE : []}
        onPress={e => onPressMap?.(e.nativeEvent.coordinate)}>
        <Marker coordinate={center} />
        <Circle
          center={center}
          radius={radius}
          strokeWidth={2}
          strokeColor={colors.mapZoneStroke}
          fillColor={colors.mapZoneCircle}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {overflow: 'hidden', width: '100%'},
});
