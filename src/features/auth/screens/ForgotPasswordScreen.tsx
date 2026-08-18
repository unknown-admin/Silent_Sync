import React, {useState} from 'react';
import {View} from 'react-native';
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
import {EmptyState} from '@components/layout/EmptyState';
import {useToast} from '@components/ui/Toast';
import {
  forgotPasswordSchema,
  ForgotPasswordForm,
} from '../schemas/authSchemas';
import {useAuth} from '../hooks/useAuth';
import {AuthStackParamList} from '@app-types/navigation.types';

export const ForgotPasswordScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {forgotPassword, loading} = useAuth();
  const toast = useToast();
  const [sent, setSent] = useState(false);

  const {control, handleSubmit, formState} = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {email: ''},
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword(data.email);
      setSent(true);
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Failed', 'error');
    }
  };

  return (
    <Screen testID="forgot-password-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base, flex: 1}}>
        <Header title="Reset Password" onBack={() => navigation.goBack()} />
        {sent ? (
          <EmptyState
            icon="email-check-outline"
            title="Check your inbox"
            message="We've sent a password reset link to your email address."
            actionLabel="Back to Login"
            onAction={() => navigation.navigate('Login')}
          />
        ) : (
          <View style={{marginTop: spacing.lg}}>
            <Text color="textSecondary" style={{marginBottom: spacing.lg}}>
              Enter the email associated with your account and we'll send you a
              reset link.
            </Text>
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
                  testID="forgot-email-input"
                />
              )}
            />
            <View style={{marginTop: spacing.xl}}>
              <Button
                label="Send Reset Link"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                testID="forgot-submit-button"
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
};
