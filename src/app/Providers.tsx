import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from '@theme/ThemeContext';
import {ToastProvider} from '@components/ui/Toast';
import {queryClient} from '@config/queryClient';
import {ErrorBoundary} from './ErrorBoundary';

export const Providers: React.FC<{children: React.ReactNode}> = ({
  children,
}) => (
  <GestureHandlerRootView style={{flex: 1}}>
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  </GestureHandlerRootView>
);
