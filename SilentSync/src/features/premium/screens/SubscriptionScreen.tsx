import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {Button} from '@components/ui/Button';
import {Icon} from '@components/ui/Icon';
import {useToast} from '@components/ui/Toast';
import {PlanCard} from '../components/PlanCard';
import {usePremium} from '../hooks/usePremium';
import {PLANS, FREE_TRIAL_DAYS} from '@config/iap';
import {SettingsStackParamList} from '@app-types/navigation.types';

const FEATURES = [
  'Unlimited silent zones',
  'Unlimited custom profiles',
  'Unlimited live sharing + 5 recipients',
  'No advertisements',
  'Cloud backup & sync',
  'Advanced WiFi & time triggers',
  'Priority support',
];

export const SubscriptionScreen: React.FC = () => {
  const {theme, colors, spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const {isPremium, purchase, restore, loading} = usePremium();
  const toast = useToast();
  const [selected, setSelected] = useState<
    'monthly' | 'quarterly' | 'yearly'
  >('yearly');

  const onSubscribe = async () => {
    try {
      const ok = await purchase(selected);
      toast.show(
        ok ? 'Welcome to Premium! 🎉' : 'Purchase not completed',
        ok ? 'success' : 'error',
      );
      if (ok) {
        navigation.goBack();
      }
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Purchase failed', 'error');
    }
  };

  const onRestore = async () => {
    try {
      const ok = await restore();
      toast.show(
        ok ? 'Purchases restored' : 'No purchases found',
        ok ? 'success' : 'info',
      );
    } catch {
      toast.show('Restore failed', 'error');
    }
  };

  return (
    <Screen scroll testID="subscription-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header title="SilentSync Premium" onBack={() => navigation.goBack()} />

        <View style={styles.hero}>
          <Image
            source={theme.mascotImage}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="h2" weight="bold" center style={{marginTop: spacing.sm}}>
            Unlock everything
          </Text>
          <Text color="textSecondary" center>
            {FREE_TRIAL_DAYS}-day free trial · cancel anytime
          </Text>
        </View>

        {isPremium ? (
          <View style={[styles.activeBox, {borderColor: colors.success}]}>
            <Icon name="check-decagram" size={28} color={colors.success} />
            <Text weight="bold" style={{marginTop: 8}}>
              You're a Premium member
            </Text>
          </View>
        ) : (
          <>
            <View style={{marginTop: spacing.lg}}>
              {PLANS.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={selected === plan.id}
                  onPress={() => setSelected(plan.id)}
                  testID={`plan-${plan.id}`}
                />
              ))}
            </View>

            <View style={{marginTop: spacing.sm}}>
              {FEATURES.map(f => (
                <View key={f} style={styles.featureRow}>
                  <Icon name="check-circle" size={18} color={colors.success} />
                  <Text style={{marginLeft: spacing.sm}}>{f}</Text>
                </View>
              ))}
            </View>

            <View style={{marginTop: spacing.xl}}>
              <Button
                label={`Start ${FREE_TRIAL_DAYS}-Day Free Trial`}
                loading={loading}
                iconLeft="crown"
                onPress={onSubscribe}
                testID="subscribe-button"
              />
              <Button
                label="Restore Purchases"
                variant="ghost"
                onPress={onRestore}
                testID="restore-button"
                style={{marginTop: spacing.sm}}
              />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  hero: {alignItems: 'center', marginTop: 8},
  logo: {width: 110, height: 110},
  featureRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 5},
  activeBox: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },
});
