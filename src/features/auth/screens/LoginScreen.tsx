import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Text} from '@components/ui/Text';
import {Input} from '@components/ui/Input';
import {Button} from '@components/ui/Button';
import {useToast} from '@components/ui/Toast';
import {SocialLoginButtons} from '../components/SocialLoginButtons';
import {loginSchema, LoginForm} from '../schemas/authSchemas';
import {useAuth} from '../hooks/useAuth';
import {AuthStackParamList} from '@app-types/navigation.types';

export const LoginScreen: React.FC = () => {
  const {theme, spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {login, googleSignIn, loading} = useAuth();
  const toast = useToast();

  const {control, handleSubmit, formState} = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''},
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
    } catch (e) {
      toast.show(
        e instanceof Error ? e.message : 'Login failed',
        'error',
      );
    }
  };

  const onGoogle = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      toast.show(
        e instanceof Error ? e.message : 'Google sign-in failed',
        'error',
      );
    }
  };

  return (
    <Screen scroll testID="login-screen">
      <View style={[styles.header, {marginTop: spacing['3xl']}]}>
        <Image
          source={theme.mascotImage}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="h1" weight="bold" style={{marginTop: spacing.md}}>
          Welcome back
        </Text>
        <Text color="textSecondary">Sign in to continue to SilentSync</Text>
      </View>

      <View style={{marginTop: spacing.xl}}>
        <SocialLoginButtons onGoogle={onGoogle} loading={loading} />

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
              testID="login-email-input"
            />
          )}
        />
        <View style={{height: spacing.base}} />
        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange, onBlur}}) => (
            <Input
              label="Password"
              placeholder="Enter your password"
              isPassword
              iconLeft="lock-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={formState.errors.password?.message}
              testID="login-password-input"
            />
          )}
        />

        <Text
          color="primary"
          weight="semibold"
          style={{marginTop: spacing.md, alignSelf: 'flex-end'}}
          onPress={() => navigation.navigate('ForgotPassword')}
          testID="forgot-password-link">
          Forgot Password?
        </Text>

        <View style={{marginTop: spacing.lg}}>
          <Button
            label="Sign In"
            loading={loading}
            onPress={handleSubmit(onSubmit)}
            testID="login-submit-button"
          />
        </View>

        <View style={styles.footer}>
          <Text color="textSecondary">Don't have an account? </Text>
          <Text
            color="primary"
            weight="bold"
            onPress={() => navigation.navigate('Signup')}
            testID="go-to-signup">
            Sign Up
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {alignItems: 'center'},
  logo: {width: 96, height: 96},
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});
