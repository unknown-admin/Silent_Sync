import React from 'react';
import {Modal as RNModal, Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@theme/ThemeContext';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  testID?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  testID,
}) => {
  const {colors, theme, spacing} = useTheme();
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      testID={testID}>
      <Pressable
        style={[styles.backdrop, {backgroundColor: colors.overlay}]}
        onPress={onClose}
        accessibilityLabel="Close modal">
        <Pressable
          onPress={() => {}}
          style={[
            styles.content,
            {
              backgroundColor: colors.card,
              borderRadius: theme.borderRadius.xl,
              padding: spacing.lg,
              borderWidth: theme.isDark ? 1 : 0,
              borderColor: colors.border,
            },
          ]}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {width: '100%', maxWidth: 420},
});
