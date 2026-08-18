import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@app-types/navigation.types';
import {ProfilesScreen} from '@features/profiles/screens/ProfilesScreen';
import {AddEditProfileScreen} from '@features/profiles/screens/AddEditProfileScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Profiles" component={ProfilesScreen} />
    <Stack.Screen name="AddEditProfile" component={AddEditProfileScreen} />
  </Stack.Navigator>
);
