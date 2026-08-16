import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '../ui/Text';
import {Button} from '../ui/Button';
import {Icon, IconProps} from '../ui/Icon';
import {Card} from '../ui/Card';
import {PermissionResult} from '@utils/permissionUtils';

export interface PermissionRequestProps {
  icon?: IconProps['name'];
  title: string;
  description: string;
  result: PermissionResult | null;
  onRequest: () => void;
  testID?: string;
}

/**
 * Contextual permission prompt.
 *  - shows a clear benefit-led message before the native dialog
 *  - if blocked (canAskAgain === false), shows an "Open Settings" button
 */
export const PermissionRequest: React.FC<PermissionRequestProps> = ({
  icon = 'shield-check',
  title,
  description,
  result,
  onRequest,
  testID,
}) => {
  const {colors, spacing} = useTheme();
  const blocked = result != null && !result.granted && !result.canAskAgain;

  return (
    <Card testID={testID} style={styles.card}>
      <View style={styles.center}>
        <Icon name={icon} size={44} color={colors.primary} />
        <Text
          variant="title"
          weight="bold"
          center
          style={{marginTop: spacing.md}}>
          {title}
        </Text>
        <Text
          color="textSecondary"
          center
          style={{marginTop: spacing.sm, marginBottom: spacing.lg}}>
          {description}
        </Text>
        {blocked ? (
          <Button
            label="Open Settings"
            iconLeft="cog"
            onPress={() => Linking.openSettings()}
            testID="permission-open-settings"
          />
        ) : (
          <Button
            label="Grant Permission"
            onPress={onRequest}
            testID="permission-grant"
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {marginVertical: 12},
  center: {alignItems: 'center'},
});
