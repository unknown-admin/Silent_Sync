import React from 'react';
import {View} from 'react-native';
import {Modal} from '../ui/Modal';
import {Text} from '../ui/Text';
import {Button} from '../ui/Button';
import {useTheme} from '@theme/ThemeContext';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive,
  onConfirm,
  onCancel,
}) => {
  const {spacing} = useTheme();
  return (
    <Modal visible={visible} onClose={onCancel} testID="confirm-dialog">
      <Text variant="h3" weight="bold">
        {title}
      </Text>
      {message ? (
        <Text color="textSecondary" style={{marginTop: spacing.sm}}>
          {message}
        </Text>
      ) : null}
      <View style={{flexDirection: 'row', marginTop: spacing.lg, gap: spacing.md}}>
        <View style={{flex: 1}}>
          <Button
            label={cancelLabel}
            variant="secondary"
            onPress={onCancel}
            testID="confirm-cancel"
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            label={confirmLabel}
            variant={destructive ? 'danger' : 'primary'}
            onPress={onConfirm}
            testID="confirm-accept"
          />
        </View>
      </View>
    </Modal>
  );
};
