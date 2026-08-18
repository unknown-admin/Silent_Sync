import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SharingStackParamList} from '@app-types/navigation.types';
import {LocationSharingScreen} from '@features/sharing/screens/LocationSharingScreen';
import {LiveShareViewScreen} from '@features/sharing/screens/LiveShareViewScreen';

const Stack = createNativeStackNavigator<SharingStackParamList>();

export const SharingStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="LocationSharing" component={LocationSharingScreen} />
    <Stack.Screen name="LiveShareView" component={LiveShareViewScreen} />
  </Stack.Navigator>
);
