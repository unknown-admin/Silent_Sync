import React from 'react';
import {View} from 'react-native';
import {
  BannerAd as GoogleBannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {AD_UNITS} from '@config/ads';
import {AdWrapper} from './AdWrapper';

export const BannerAd: React.FC = () => (
  <AdWrapper>
    <View
      testID="banner-ad"
      style={{alignItems: 'center', marginVertical: 8}}>
      <GoogleBannerAd
        unitId={AD_UNITS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{requestNonPersonalizedAdsOnly: true}}
      />
    </View>
  </AdWrapper>
);
