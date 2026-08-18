import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@app-types/navigation.types';
import {OnboardingScreen} from '@features/auth/screens/OnboardingScreen';
import {LoginScreen} from '@features/auth/screens/LoginScreen';
import {SignupScreen} from '@features/auth/screens/SignupScreen';
import {ForgotPasswordScreen} from '@features/auth/screens/ForgotPasswordScreen';
import {useOnboarding} from '@features/auth/hooks/useOnboarding';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  const {onboardingCompleted} = useOnboarding();
  return (
    <Stack.Navigator
      initialRouteName={onboardingCompleted ? 'Login' : 'Onboarding'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
