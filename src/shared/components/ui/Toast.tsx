import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@theme/ThemeContext';
import {Text} from './Text';
import {Icon} from './Icon';

export type ToastType = 'success' | 'error' | 'info';
interface ToastData {
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  show: (message: string, type?: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
};

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {colors, theme, shadows, spacing} = useTheme();
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastData | null>(null);
  const anim = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setToast(null));
  }, [anim]);

  const show = useCallback(
    (message: string, type: ToastType = 'info') => {
      setToast({message, type});
      Animated.timing(anim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(hide, 2800);
    },
    [anim, hide],
  );

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const toneColor =
    toast?.type === 'success'
      ? colors.success
      : toast?.type === 'error'
      ? colors.error
      : colors.primary;
  const iconName =
    toast?.type === 'success'
      ? 'check-circle'
      : toast?.type === 'error'
      ? 'alert-circle'
      : 'information';

  return (
    <ToastContext.Provider value={{show}}>
      {children}
      {toast ? (
        <Animated.View
          testID="toast"
          pointerEvents="none"
          style={[
            styles.container,
            {
              top: insets.top + spacing.sm,
              opacity: anim,
              transform: [
                {
                  translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}>
          <View
            style={[
              styles.toast,
              {
                backgroundColor: colors.card,
                borderColor: toneColor,
                borderRadius: theme.borderRadius.lg,
              },
              shadows.lg,
            ]}>
            <Icon name={iconName} size={22} color={toneColor} />
            <Text style={{marginLeft: spacing.sm, flex: 1}}>
              {toast.message}
            </Text>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {position: 'absolute', left: 16, right: 16, zIndex: 9999},
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1.5,
  },
});
