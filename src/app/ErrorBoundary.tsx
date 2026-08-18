import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/ui/Text';
import {Button} from '@components/ui/Button';

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  message?: string;
}

/** Global error boundary — catches render crashes and shows a recovery UI. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {hasError: false};

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, message: error.message};
  }

  componentDidCatch(error: Error): void {
    // Wire Crashlytics here in production.
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error);
  }

  reset = (): void => this.setState({hasError: false, message: undefined});

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.container} testID="error-boundary">
          <Text variant="h2" weight="bold" center>
            Something went wrong
          </Text>
          <Text color="textSecondary" center style={styles.msg}>
            {this.state.message ?? 'An unexpected error occurred.'}
          </Text>
          <View style={styles.btn}>
            <Button label="Try Again" onPress={this.reset} />
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0A0A1A',
  },
  msg: {marginTop: 8},
  btn: {marginTop: 24, width: '60%'},
});
