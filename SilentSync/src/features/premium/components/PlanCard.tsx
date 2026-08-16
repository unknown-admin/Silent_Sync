import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Badge} from '@components/ui/Badge';
import {PlanMeta} from '@config/iap';
import {hexToRgba} from '@utils/helpers';

export interface PlanCardProps {
  plan: PlanMeta;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  selected,
  onPress,
  testID,
}) => {
  const {colors, theme, spacing} = useTheme();
  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{selected}}
      accessibilityLabel={`${plan.title} plan ${plan.price}`}
      style={[
        styles.card,
        {
          borderRadius: theme.componentDefaults.cardBorderRadius,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2.5 : 1.5,
          backgroundColor: selected
            ? hexToRgba(colors.primary, 0.1)
            : colors.card,
          padding: spacing.base,
        },
      ]}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <View style={styles.titleRow}>
            <Text weight="bold" variant="title">
              {plan.title}
            </Text>
            {plan.badge ? (
              <Badge
                label={plan.badge}
                tone={plan.badge === 'BEST VALUE' ? 'success' : 'accent'}
                style={{marginLeft: 8}}
              />
            ) : null}
          </View>
          {plan.savings ? (
            <Text variant="caption" color="success">
              {plan.savings}
            </Text>
          ) : null}
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text variant="h3" weight="bold" color="primary">
            {plan.price}
          </Text>
          <Text variant="caption" color="textSecondary">
            {plan.period}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {marginBottom: 12},
  row: {flexDirection: 'row', alignItems: 'center'},
  titleRow: {flexDirection: 'row', alignItems: 'center'},
});
