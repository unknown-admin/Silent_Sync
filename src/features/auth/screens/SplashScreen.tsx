import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {APP_NAME, APP_TAGLINE} from '@constants/index';

export const SplashScreen: React.FC = () => {
  const {colors, theme, spacing} = useTheme();
  return (
    <View
      testID="splash-screen"
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Image
        source={theme.mascotImage}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="display" weight="bold" style={{marginTop: spacing.lg}}>
        {APP_NAME}
      </Text>
      <Text color="textSecondary" style={{marginTop: spacing.sm}}>
        {APP_TAGLINE}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  logo: {width: 160, height: 160},
});
