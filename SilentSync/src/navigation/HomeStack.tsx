import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@app-types/navigation.types';
import {HomeScreen} from '@features/zones/screens/HomeScreen';
import {AddEditZoneScreen} from '@features/zones/screens/AddEditZoneScreen';
import {ZoneDetailsScreen} from '@features/zones/screens/ZoneDetailsScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="AddEditZone" component={AddEditZoneScreen} />
    <Stack.Screen name="ZoneDetails" component={ZoneDetailsScreen} />
  </Stack.Navigator>
);
