import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {Input} from '@components/ui/Input';
import {Button} from '@components/ui/Button';
import {useToast} from '@components/ui/Toast';
import {PasswordStrengthMeter} from '../components/PasswordStrengthMeter';
import {signupSchema, SignupForm} from '../schemas/authSchemas';
import {useAuth} from '../hooks/useAuth';
import {AuthStackParamList} from '@app-types/navigation.types';

export const SignupScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {signup, loading} = useAuth();
  const toast = useToast();

  const {control, handleSubmit, watch, formState} = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data.email, data.password, data.displayName);
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Signup failed', 'error');
    }
  };

  return (
    <Screen scroll testID="signup-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header title="Create Account" onBack={() => navigation.goBack()} />
        <Text color="textSecondary" style={{marginBottom: spacing.lg}}>
          Join SilentSync and automate your silence
        </Text>

        <Controller
          control={control}
          name="displayName"
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              label="Full Name"
              placeholder="Your name"
              iconLeft="account-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={formState.errors.displayName?.message}
              testID="signup-name-input"
            />
          )}
        />
        <View style={{height: spacing.base}} />
        <Controller
          control={control}
          name="email"
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              label="Email Address"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              iconLeft="email-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={formState.errors.email?.message}
              testID="signup-email-input"
            />
          )}
        />
        <View style={{height: spacing.base}} />
        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange, onBlur}}) => (
            <View>
              <Input
                label="Password"
                placeholder="Create a strong password"
                isPassword
                iconLeft="lock-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={formState.errors.password?.message}
                testID="signup-password-input"
              />
              <PasswordStrengthMeter password={password} />
            </View>
          )}
        />
        <View style={{height: spacing.base}} />
        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              isPassword
              iconLeft="lock-check-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={formState.errors.confirmPassword?.message}
              testID="signup-confirm-input"
            />
          )}
        />

        <View style={{marginTop: spacing.xl}}>
          <Button
            label="Create Account"
            loading={loading}
            onPress={handleSubmit(onSubmit)}
            testID="signup-submit-button"
          />
        </View>

        <View style={styles.footer}>
          <Text color="textSecondary">Already have an account? </Text>
          <Text
            color="primary"
            weight="bold"
            onPress={() => navigation.navigate('Login')}
            testID="go-to-login">
            Sign In
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  footer: {flexDirection: 'row', justifyContent: 'center', marginTop: 24},
});
