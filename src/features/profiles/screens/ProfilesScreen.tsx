import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Button} from '@components/ui/Button';
import {Badge} from '@components/ui/Badge';
import {useToast} from '@components/ui/Toast';
import {ProfileCard} from '../components/ProfileCard';
import {useProfiles} from '../hooks/useProfiles';
import {ProfileStackParamList} from '@app-types/navigation.types';
import {FREE_LIMITS} from '@constants/limits';
import {usePremiumStore} from '@features/premium/store/premiumStore';

export const ProfilesScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const {profiles, activeProfileId, setActiveProfile, canAddProfile} =
    useProfiles();
  const isPremium = usePremiumStore(s => s.isPremium);
  const toast = useToast();
  const customCount = profiles.filter(p => !p.isDefault).length;

  return (
    <Screen scroll testID="profiles-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header
          title="Sound Profiles"
          subtitle="One active profile at a time"
        />

        {!isPremium ? (
          <View style={{marginBottom: spacing.md, alignItems: 'flex-start'}}>
            <Badge
              label={`${customCount}/${FREE_LIMITS.maxCustomProfiles} custom profiles`}
              tone={canAddProfile ? 'primary' : 'warning'}
              testID="profile-limit-badge"
            />
          </View>
        ) : null}

        {profiles.map(p => (
          <ProfileCard
            key={p.id}
            profile={p}
            active={p.id === activeProfileId}
            onPress={() => {
              setActiveProfile(p.id);
              toast.show(`${p.name} activated`, 'success');
            }}
            testID={`profile-card-${p.id}`}
          />
        ))}

        <View style={{marginTop: spacing.md}}>
          <Button
            label="Create Custom Profile"
            iconLeft="plus"
            onPress={() => {
              if (!canAddProfile) {
                toast.show('Free limit reached. Upgrade to Premium.', 'error');
                return;
              }
              navigation.navigate('AddEditProfile', {});
            }}
            testID="add-profile-button"
          />
        </View>
      </View>
    </Screen>
  );
};
