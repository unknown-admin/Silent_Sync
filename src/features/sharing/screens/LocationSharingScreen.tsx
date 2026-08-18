import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {Card} from '@components/ui/Card';
import {Button} from '@components/ui/Button';
import {Icon, IconProps} from '@components/ui/Icon';
import {Badge} from '@components/ui/Badge';
import {DurationPicker} from '../components/DurationPicker';
import {useToast} from '@components/ui/Toast';
import {useLocationSharing} from '../hooks/useLocationSharing';
import {ShareDuration, ShareMethod} from '@app-types/sharing.types';
import {hexToRgba} from '@utils/helpers';
import {usePremiumStore} from '@features/premium/store/premiumStore';

type Tab = 'current' | 'live';

const SHARE_METHODS: {method: ShareMethod; icon: IconProps['name']; label: string}[] =
  [
    {method: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp'},
    {method: 'sms', icon: 'message-text', label: 'SMS'},
    {method: 'email', icon: 'email', label: 'Email'},
    {method: 'copy', icon: 'share-variant', label: 'Share'},
  ];

export const LocationSharingScreen: React.FC = () => {
  const {colors, theme, spacing} = useTheme();
  const toast = useToast();
  const isPremium = usePremiumStore(s => s.isPremium);
  const [tab, setTab] = useState<Tab>('current');
  const [duration, setDuration] = useState<ShareDuration>('10min');
  const {
    activeShare,
    loading,
    sharesToday,
    canShareToday,
    isDurationAllowed,
    shareCurrentLocation,
    startLiveShare,
    stopLiveShare,
  } = useLocationSharing();

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.8, {duration: 1200}), -1, true);
  }, [pulse]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{scale: pulse.value}],
    opacity: 2 - pulse.value,
  }));

  const onShareCurrent = async (method: ShareMethod) => {
    try {
      await shareCurrentLocation(method);
    } catch {
      toast.show('Could not open sharing app', 'error');
    }
  };

  const onStartLive = async () => {
    if (!canShareToday) {
      toast.show('Daily share limit reached. Upgrade for unlimited.', 'error');
      return;
    }
    const ok = await startLiveShare(duration, 1);
    if (!ok) {
      toast.show('This duration requires Premium.', 'error');
    } else {
      toast.show('Live sharing started', 'success');
    }
  };

  return (
    <Screen scroll testID="location-sharing-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header title="Location Sharing" subtitle="Share safely, on your terms" />

        <View
          style={[
            styles.tabs,
            {backgroundColor: colors.surfaceVariant, borderRadius: theme.borderRadius.full},
          ]}>
          {(['current', 'live'] as Tab[]).map(t => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              accessibilityRole="tab"
              accessibilityState={{selected: tab === t}}
              testID={`share-tab-${t}`}
              style={[
                styles.tab,
                {
                  backgroundColor: tab === t ? colors.primary : 'transparent',
                  borderRadius: theme.borderRadius.full,
                },
              ]}>
              <Text
                weight="semibold"
                style={{
                  color: tab === t ? colors.onPrimary : colors.textSecondary,
                }}>
                {t === 'current' ? 'Current' : 'Live'}
              </Text>
            </Pressable>
          ))}
        </View>

        {tab === 'current' ? (
          <Card style={{marginTop: spacing.lg}}>
            <Text weight="semibold">Share your current location</Text>
            <Text variant="caption" color="textSecondary">
              A one-time Google Maps pin of where you are now.
            </Text>
            <View style={[styles.methods, {marginTop: spacing.lg}]}>
              {SHARE_METHODS.map(m => (
                <Pressable
                  key={m.method}
                  onPress={() => onShareCurrent(m.method)}
                  testID={`share-method-${m.method}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Share via ${m.label}`}
                  style={styles.method}>
                  <View
                    style={[
                      styles.methodIcon,
                      {backgroundColor: hexToRgba(colors.primary, 0.14)},
                    ]}>
                    <Icon name={m.icon} size={26} color={colors.primary} />
                  </View>
                  <Text variant="caption" style={{marginTop: 6}}>
                    {m.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>
        ) : (
          <View style={{marginTop: spacing.lg}}>
            {activeShare ? (
              <Card glow>
                <View style={styles.liveHeader}>
                  <View style={styles.liveDotWrap}>
                    <Animated.View
                      style={[
                        styles.pulse,
                        {backgroundColor: colors.success},
                        pulseStyle,
                      ]}
                    />
                    <View
                      style={[styles.liveDot, {backgroundColor: colors.success}]}
                    />
                  </View>
                  <Text weight="bold" style={{marginLeft: spacing.md}}>
                    Live sharing active
                  </Text>
                </View>
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={{marginTop: spacing.sm}}>
                  {activeShare.recipientCount} recipient(s) · {activeShare.duration}
                </Text>
                <View style={{marginTop: spacing.lg}}>
                  <Button
                    label="Stop Sharing"
                    variant="danger"
                    onPress={async () => {
                      await stopLiveShare();
                      toast.show('Live sharing stopped', 'success');
                    }}
                    testID="stop-live-share-button"
                  />
                </View>
              </Card>
            ) : (
              <Card>
                <Text weight="semibold">Share live location</Text>
                <Text variant="caption" color="textSecondary">
                  Your location updates in real-time for the chosen duration.
                </Text>
                {!isPremium ? (
                  <View style={{marginTop: spacing.sm, alignItems: 'flex-start'}}>
                    <Badge
                      label={`${sharesToday}/3 shares today`}
                      tone={canShareToday ? 'primary' : 'warning'}
                    />
                  </View>
                ) : null}
                <View style={{marginTop: spacing.lg}}>
                  <Text
                    variant="label"
                    weight="semibold"
                    color="textSecondary"
                    style={{marginBottom: spacing.sm}}>
                    DURATION
                  </Text>
                  <DurationPicker
                    value={duration}
                    onChange={setDuration}
                    isAllowed={isDurationAllowed}
                  />
                </View>
                <View style={{marginTop: spacing.lg}}>
                  <Button
                    label="Start Live Sharing"
                    loading={loading}
                    onPress={onStartLive}
                    testID="start-live-share-button"
                  />
                </View>
              </Card>
            )}
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  tabs: {flexDirection: 'row', padding: 4, marginTop: 12},
  tab: {flex: 1, alignItems: 'center', paddingVertical: 10},
  methods: {flexDirection: 'row', justifyContent: 'space-between'},
  method: {alignItems: 'center', flex: 1},
  methodIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveHeader: {flexDirection: 'row', alignItems: 'center'},
  liveDotWrap: {width: 16, height: 16, alignItems: 'center', justifyContent: 'center'},
  pulse: {position: 'absolute', width: 16, height: 16, borderRadius: 8},
  liveDot: {width: 12, height: 12, borderRadius: 6},
});
