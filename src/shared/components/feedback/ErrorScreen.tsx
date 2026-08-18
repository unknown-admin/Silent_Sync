import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '../ui/Text';
import {Button} from '../ui/Button';
import {Icon} from '../ui/Icon';

export interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message = 'Something went wrong.',
  onRetry,
}) => {
  const {colors, spacing} = useTheme();
  return (
    <View
      testID="error-screen"
      style={[
        styles.container,
        {backgroundColor: colors.background, padding: spacing.xl},
      ]}>
      <Icon name="alert-circle-outline" size={56} color={colors.error} />
      <Text
        variant="title"
        weight="bold"
        center
        style={{marginTop: spacing.md}}>
        {message}
      </Text>
      {onRetry ? (
        <View style={{marginTop: spacing.lg, width: '60%'}}>
          <Button label="Try Again" onPress={onRetry} testID="error-retry" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
