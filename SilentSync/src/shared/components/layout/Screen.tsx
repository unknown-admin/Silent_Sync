import React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {useTheme} from '@theme/ThemeContext';

export interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = false,
  padded = true,
  edges = ['top', 'left', 'right'],
  contentStyle,
  testID,
}) => {
  const {colors, isDark, spacing} = useTheme();
  const insets = useSafeAreaInsets();

  const padStyle: ViewStyle = padded
    ? {paddingHorizontal: spacing.base}
    : {};

  return (
    <SafeAreaView
      testID={testID}
      edges={edges}
      style={[styles.flex, {backgroundColor: colors.background}]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            padStyle,
            {paddingBottom: insets.bottom + spacing.xl},
            contentStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, padStyle, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({flex: {flex: 1}});
