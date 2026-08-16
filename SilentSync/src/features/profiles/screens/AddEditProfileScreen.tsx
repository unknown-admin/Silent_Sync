import React, {useState} from 'react';
import {View} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Input} from '@components/ui/Input';
import {Button} from '@components/ui/Button';
import {Text} from '@components/ui/Text';
import {useToast} from '@components/ui/Toast';
import {IconPicker} from '../components/IconPicker';
import {ColorPicker} from '../components/ColorPicker';
import {useProfiles} from '../hooks/useProfiles';
import {ProfileStackParamList} from '@app-types/navigation.types';
import {PROFILE_COLORS, PROFILE_ICONS} from '@constants/defaults';

export const AddEditProfileScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'AddEditProfile'>>();
  const editingId = route.params?.profileId;
  const {getProfile, createProfile, editProfile} = useProfiles();
  const toast = useToast();

  const existing = editingId ? getProfile(editingId) : undefined;
  const [name, setName] = useState(existing?.name ?? '');
  const [icon, setIcon] = useState(existing?.icon ?? PROFILE_ICONS[0]);
  const [color, setColor] = useState(existing?.color ?? PROFILE_COLORS[0]);

  const onSave = () => {
    if (name.trim().length === 0) {
      toast.show('Enter a profile name', 'error');
      return;
    }
    if (editingId) {
      editProfile(editingId, {name: name.trim(), icon, color});
      toast.show('Profile updated', 'success');
    } else {
      const created = createProfile({name: name.trim(), icon, color});
      if (!created) {
        toast.show('Free limit reached. Upgrade to Premium.', 'error');
        return;
      }
      toast.show('Profile created', 'success');
    }
    navigation.goBack();
  };

  return (
    <Screen scroll testID="add-edit-profile-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header
          title={editingId ? 'Edit Profile' : 'Create Profile'}
          onBack={() => navigation.goBack()}
        />

        <View style={{marginTop: spacing.md}}>
          <Input
            label="Profile Name"
            placeholder="e.g. Gym"
            value={name}
            onChangeText={setName}
            maxLength={30}
            testID="profile-name-input"
          />
        </View>

        <View style={{marginTop: spacing.lg}}>
          <Text
            variant="label"
            weight="semibold"
            color="textSecondary"
            style={{
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: spacing.sm,
            }}>
            Choose Symbol
          </Text>
          <IconPicker value={icon} color={color} onChange={setIcon} />
        </View>

        <View style={{marginTop: spacing.lg}}>
          <Text
            variant="label"
            weight="semibold"
            color="textSecondary"
            style={{
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: spacing.sm,
            }}>
            Accent Color
          </Text>
          <ColorPicker value={color} onChange={setColor} />
        </View>

        <View style={{marginTop: spacing.xl}}>
          <Button
            label="Save Profile"
            onPress={onSave}
            testID="save-profile-button"
          />
        </View>
      </View>
    </Screen>
  );
};
