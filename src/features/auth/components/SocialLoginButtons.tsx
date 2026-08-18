import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Button} from '@components/ui/Button';
import {Text} from '@components/ui/Text';

export interface SocialLoginButtonsProps {
  onGoogle: () => void;
  loading?: boolean;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogle,
  loading,
}) => {
  const {colors, spacing} = useTheme();
  return (
    <View>
      <Button
        label="Continue with Google"
        variant="outline"
        iconLeft="google"
        onPress={onGoogle}
        loading={loading}
        testID="google-signin-button"
      />
      <View style={[styles.dividerRow, {marginVertical: spacing.md}]}>
        <View style={[styles.line, {backgroundColor: colors.divider}]} />
        <Text
          variant="caption"
          color="textTertiary"
          style={{marginHorizontal: spacing.md}}>
          OR
        </Text>
        <View style={[styles.line, {backgroundColor: colors.divider}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dividerRow: {flexDirection: 'row', alignItems: 'center'},
  line: {flex: 1, height: 1},
});
