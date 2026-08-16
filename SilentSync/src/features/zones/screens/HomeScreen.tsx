import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Text} from '@components/ui/Text';
import {Avatar} from '@components/ui/Avatar';
import {IconButton} from '@components/ui/IconButton';
import {Section} from '@components/layout/Section';
import {EmptyState} from '@components/layout/EmptyState';
import {FAB} from '@components/ui/FAB';
import {Badge} from '@components/ui/Badge';
import {BannerAd} from '@components/ads/BannerAd';
import {CurrentStatusCard} from '../components/CurrentStatusCard';
import {ZoneCard} from '../components/ZoneCard';
import {useZones} from '../hooks/useZones';
import {useZoneStatus} from '../hooks/useZoneStatus';
import {useLocation} from '@hooks/useLocation';
import {useAuthStore} from '@features/auth/store/authStore';
import {usePremiumStore} from '@features/premium/store/premiumStore';
import {HomeStackParamList} from '@app-types/navigation.types';
import {FREE_LIMITS} from '@constants/limits';

export const HomeScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const user = useAuthStore(s => s.user);
  const isPremium = usePremiumStore(s => s.isPremium);
  const {zones, canAddZone} = useZones();
  const {coords, requestAndFetch} = useLocation();
  const {zonesWithDistance, activeZone} = useZoneStatus(coords);
  const [systemOn, setSystemOn] = useState(true);

  useEffect(() => {
    requestAndFetch();
  }, [requestAndFetch]);

  return (
    <Screen scroll testID="home-screen">
      <View style={[styles.header, {marginTop: spacing.sm}]}>
        <View style={styles.userRow}>
          <Avatar name={user?.displayName} uri={user?.photoURL} />
          <View style={{marginLeft: spacing.md}}>
            <Text variant="caption" color="textSecondary">
              HELLO,
            </Text>
            <Text variant="title" weight="bold" numberOfLines={1}>
              {user?.displayName ?? 'Welcome'}
            </Text>
          </View>
        </View>
        <IconButton
          icon="bell-outline"
          onPress={() => {}}
          accessibilityLabel="Notifications"
          testID="notifications-button"
        />
      </View>

      <CurrentStatusCard
        activeZone={activeZone}
        systemOn={systemOn}
        onToggleSystem={setSystemOn}
        testID="current-status-card"
      />

      <Section
        title="Configured Zones"
        action={
          !isPremium ? (
            <Badge
              label={`${zones.length}/${FREE_LIMITS.maxZones}`}
              tone={canAddZone ? 'primary' : 'warning'}
              testID="zone-limit-badge"
            />
          ) : (
            <Text
              color="primary"
              weight="semibold"
              onPress={() => navigation.navigate('AddEditZone', {})}>
              Add New
            </Text>
          )
        }>
        {zones.length === 0 ? (
          <EmptyState
            icon="map-marker-plus-outline"
            title="No zones yet"
            message="Create your first silent zone to automate your phone."
            actionLabel="Create Zone"
            onAction={() => navigation.navigate('AddEditZone', {})}
            testID="zones-empty-state"
          />
        ) : (
          zonesWithDistance.map(z => (
            <ZoneCard
              key={z.id}
              zone={z}
              distance={coords ? z.distance : undefined}
              isInside={z.isInside}
              onPress={() =>
                navigation.navigate('ZoneDetails', {zoneId: z.id})
              }
              testID={`zone-card-${z.id}`}
            />
          ))
        )}
      </Section>

      <View style={{marginTop: spacing.lg}}>
        <BannerAd />
      </View>

      <FAB
        icon="plus"
        onPress={() => {
          if (canAddZone) {
            navigation.navigate('AddEditZone', {});
          } else {
            navigation.navigate('AddEditZone', {});
          }
        }}
        accessibilityLabel="Add zone"
        testID="add-zone-fab"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRow: {flexDirection: 'row', alignItems: 'center', flex: 1},
});
