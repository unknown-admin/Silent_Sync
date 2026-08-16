import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import type {FlatListProps} from 'react-native';

interface ViewableInfo {
  viewableItems: {index: number | null}[];
}
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Text} from '@components/ui/Text';
import {Button} from '@components/ui/Button';
import {Icon, IconProps} from '@components/ui/Icon';
import {AuthStackParamList} from '@app-types/navigation.types';
import {useOnboarding} from '../hooks/useOnboarding';
import {hexToRgba} from '@utils/helpers';

const {width} = Dimensions.get('window');

interface Slide {
  icon: IconProps['name'];
  title: string;
  description: string;
}

const SLIDES: Slide[] = [
  {
    icon: 'map-marker-radius',
    title: 'Intelligent Location Automation',
    description:
      'SilentSync tracks your entry into specific predefined areas to dynamically adapt your volume profile.',
  },
  {
    icon: 'bell-off',
    title: 'Establish Silent Zones',
    description:
      'Perfect for offices, libraries, or theaters. Set a boundary and watch your device adjust instantly.',
  },
  {
    icon: 'shield-account',
    title: 'Safe Location Sharing',
    description:
      'Share your live location with trusted contacts for a limited, time-bound duration — with total control.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const {colors, spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {completeOnboarding} = useOnboarding();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const finish = () => {
    completeOnboarding();
    navigation.replace('Login');
  };

  const onNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({index: index + 1});
    } else {
      finish();
    }
  };

  const onViewable = useRef(
    ({viewableItems}: ViewableInfo) => {
      if (viewableItems[0]?.index != null) {
        setIndex(viewableItems[0].index);
      }
    },
  ).current;

  return (
    <Screen testID="onboarding-screen" padded={false}>
      <View style={[styles.top, {paddingHorizontal: spacing.base}]}>
        <Text variant="title" weight="bold" color="primary">
          SilentSync
        </Text>
        <Text
          color="textSecondary"
          onPress={finish}
          testID="onboarding-skip">
          Skip
        </Text>
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
        onViewableItemsChanged={
          onViewable as FlatListProps<Slide>['onViewableItemsChanged']
        }
        viewabilityConfig={{itemVisiblePercentThreshold: 60}}
        renderItem={({item}) => (
          <View style={[styles.slide, {width, padding: spacing.xl}]}>
            <View
              style={[
                styles.iconBox,
                {backgroundColor: hexToRgba(colors.primary, 0.14)},
              ]}>
              <Icon name={item.icon} size={72} color={colors.primary} />
            </View>
            <Text
              variant="h2"
              weight="bold"
              center
              style={{marginTop: spacing['2xl']}}>
              {item.title}
            </Text>
            <Text
              color="textSecondary"
              center
              style={{marginTop: spacing.md}}>
              {item.description}
            </Text>
          </View>
        )}
      />

      <View style={[styles.footer, {paddingHorizontal: spacing.xl}]}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === index ? colors.primary : colors.surfaceVariant,
                  width: i === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
        <Button
          label={index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={onNext}
          fullWidth={false}
          style={{paddingHorizontal: spacing['2xl']}}
          testID="onboarding-next"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  slide: {alignItems: 'center', justifyContent: 'center', flex: 1},
  iconBox: {
    width: 160,
    height: 160,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  dots: {flexDirection: 'row', alignItems: 'center', gap: 6},
  dot: {height: 8, borderRadius: 4},
});
