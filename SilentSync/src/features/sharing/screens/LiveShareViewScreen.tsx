import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {Card} from '@components/ui/Card';
import {Badge} from '@components/ui/Badge';
import {LoadingScreen} from '@components/feedback/LoadingScreen';
import {DARK_MAP_STYLE, DEFAULT_REGION} from '@config/maps';
import {sharingService} from '../services/sharingService';
import {SharingStackParamList} from '@app-types/navigation.types';
import {LocationShare} from '@app-types/sharing.types';
import {formatRelativeTime} from '@utils/formatters';

export const LiveShareViewScreen: React.FC = () => {
  const {isDark, spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<SharingStackParamList>>();
  const route = useRoute<RouteProp<SharingStackParamList, 'LiveShareView'>>();
  const [share, setShare] = useState<LocationShare | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = sharingService.subscribeToShare(
      route.params.shareId,
      s => {
        setShare(s);
        setLoading(false);
      },
    );
    return unsub;
  }, [route.params.shareId]);

  if (loading) {
    return <LoadingScreen message="Loading live location…" />;
  }

  const loc = share?.currentLocation;
  const region = loc
    ? {
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : DEFAULT_REGION;

  return (
    <Screen testID="live-share-view-screen" padded={false} scroll={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header title="Live Location" onBack={() => navigation.goBack()} />
      </View>
      <View style={styles.mapWrap}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          region={region}
          customMapStyle={isDark ? DARK_MAP_STYLE : []}>
          {loc ? (
            <Marker
              coordinate={{latitude: loc.latitude, longitude: loc.longitude}}
            />
          ) : null}
        </MapView>
      </View>
      <View style={{paddingHorizontal: spacing.base, marginTop: -40}}>
        <Card glow testID="live-share-info-card">
          <View style={styles.row}>
            <Badge
              label={share?.status === 'active' ? 'LIVE' : 'ENDED'}
              tone={share?.status === 'active' ? 'success' : 'neutral'}
            />
            {loc ? (
              <Text variant="caption" color="textSecondary">
                Updated {formatRelativeTime(loc.updatedAt)}
              </Text>
            ) : null}
          </View>
          <Text weight="semibold" style={{marginTop: spacing.sm}}>
            {loc?.address ??
              (loc
                ? `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`
                : 'Waiting for location…')}
          </Text>
        </Card>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mapWrap: {flex: 1, overflow: 'hidden'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
