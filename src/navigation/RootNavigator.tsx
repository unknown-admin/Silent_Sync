import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@app-types/navigation.types';
import {useAuth} from '@features/auth/hooks/useAuth';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import {SplashScreen} from '@features/auth/screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Auth guard: shows Splash until store hydrates, then Auth or Main. */
export const RootNavigator: React.FC = () => {
  const {isAuthenticated, hydrated} = useAuth();

  if (!hydrated) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
