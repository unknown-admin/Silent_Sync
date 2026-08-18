import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {THEME_LIST} from '@theme/themeStore';
import {ThemeId} from '@app-types/theme.types';
import {ThemeCard} from './ThemeCard';

export interface ThemeSelectorProps {
  selectedId: ThemeId;
  onSelect: (id: ThemeId) => void;
  testID?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedId,
  onSelect,
  testID,
}) => {
  const {spacing} = useTheme();
  return (
    <View testID={testID} style={[styles.grid, {gap: spacing.md}]}>
      {THEME_LIST.map(theme => (
        <View key={theme.id} style={styles.cell}>
          <ThemeCard
            theme={theme}
            selected={theme.id === selectedId}
            onPress={() => onSelect(theme.id)}
            testID={`theme-card-${theme.id}`}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {flexDirection: 'row', flexWrap: 'wrap'},
  cell: {width: '47%', flexGrow: 1},
});
