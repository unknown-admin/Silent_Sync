import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '../ui/Text';

export const LoadingScreen: React.FC<{message?: string}> = ({message}) => {
  const {colors, spacing} = useTheme();
  return (
    <View
      testID="loading-screen"
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Text color="textSecondary" style={{marginTop: spacing.md}}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
