import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Avatar} from '@components/ui/Avatar';
import {Card} from '@components/ui/Card';
import {Text} from '@components/ui/Text';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {ConfirmDialog} from '@components/feedback/ConfirmDialog';
import {useToast} from '@components/ui/Toast';
import {useAuth} from '@features/auth/hooks/useAuth';
import {SettingsStackParamList} from '@app-types/navigation.types';

export const AccountScreen: React.FC = () => {
  const {user, signOut, deleteAccount} = useAuth();
  const toast = useToast();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <Screen scroll testID="account-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="Account" onBack={() => navigation.goBack()} />

        <Card>
          <View style={{alignItems: 'center'}}>
            <Avatar name={user?.displayName} uri={user?.photoURL} size={72} />
            <Text weight="bold" variant="title" style={{marginTop: 12}}>
              {user?.displayName ?? 'Guest'}
            </Text>
            <Text variant="caption" color="textSecondary">
              {user?.email}
            </Text>
          </View>
        </Card>

        <SettingsGroup title="Session">
          <SettingsItem
            icon="logout"
            label="Sign Out"
            onPress={() => setConfirmLogout(true)}
            testID="sign-out-item"
          />
        </SettingsGroup>

        <SettingsGroup title="Danger Zone">
          <SettingsItem
            icon="account-remove-outline"
            label="Delete Account"
            description="Permanently delete your account (GDPR)"
            danger
            onPress={() => setConfirmDelete(true)}
            testID="delete-account-item"
          />
        </SettingsGroup>
      </View>

      <ConfirmDialog
        visible={confirmLogout}
        title="Sign out?"
        confirmLabel="Sign Out"
        onConfirm={async () => {
          setConfirmLogout(false);
          await signOut();
        }}
        onCancel={() => setConfirmLogout(false)}
      />
      <ConfirmDialog
        visible={confirmDelete}
        title="Delete your account?"
        message="This permanently removes your account and all data. This cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={async () => {
          setConfirmDelete(false);
          try {
            await deleteAccount();
          } catch {
            toast.show('Please re-login and try again', 'error');
          }
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </Screen>
  );
};
