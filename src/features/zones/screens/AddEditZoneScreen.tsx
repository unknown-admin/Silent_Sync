import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Input} from '@components/ui/Input';
import {Button} from '@components/ui/Button';
import {Text} from '@components/ui/Text';
import {Switch} from '@components/ui/Switch';
import {useToast} from '@components/ui/Toast';
import {ZoneMapView} from '../components/ZoneMapView';
import {RadiusSlider} from '../components/RadiusSlider';
import {SoundModeSelector} from '../components/SoundModeSelector';
import {useZones} from '../hooks/useZones';
import {useLocation} from '@hooks/useLocation';
import {HomeStackParamList} from '@app-types/navigation.types';
import {SoundMode} from '@app-types/user.types';
import {GeoCoordinates} from '@app-types/common.types';
import {ZONE_RADIUS, DEFAULT_REGION} from '@config/maps';
import {regionForRadius} from '@utils/geoUtils';
import {isValidZoneName} from '@utils/validators';

export const AddEditZoneScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'AddEditZone'>>();
  const editingId = route.params?.zoneId;
  const {getZone, createZone, editZone, canAddZone} = useZones();
  const {coords} = useLocation();
  const toast = useToast();

  const existing = editingId ? getZone(editingId) : undefined;

  const [name, setName] = useState(existing?.name ?? '');
  const [radius, setRadius] = useState(existing?.radius ?? ZONE_RADIUS.default);
  const [soundMode, setSoundMode] = useState<SoundMode>(
    existing?.soundModeOnEntry ?? 'silent',
  );
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);
  const [center, setCenter] = useState<GeoCoordinates>({
    latitude: existing?.latitude ?? coords?.latitude ?? DEFAULT_REGION.latitude,
    longitude:
      existing?.longitude ?? coords?.longitude ?? DEFAULT_REGION.longitude,
  });

  const region = useMemo(
    () => regionForRadius(center.latitude, center.longitude, radius),
    [center, radius],
  );

  const onSave = () => {
    if (!isValidZoneName(name)) {
      toast.show('Please enter a valid zone name', 'error');
      return;
    }
    if (!editingId && !canAddZone) {
      toast.show('Free limit reached. Upgrade to Premium.', 'error');
      return;
    }
    const form = {
      name: name.trim(),
      latitude: center.latitude,
      longitude: center.longitude,
      radius,
      soundModeOnEntry: soundMode,
      soundModeOnExit: 'restore' as const,
      profileId: 'default-home',
      isActive,
    };
    if (editingId) {
      editZone(editingId, form);
      toast.show('Zone updated', 'success');
    } else {
      createZone(form);
      toast.show('Zone saved', 'success');
    }
    navigation.goBack();
  };

  return (
    <Screen scroll testID="add-edit-zone-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header
          title={editingId ? 'Edit Silent Zone' : 'Add Silent Zone'}
          onBack={() => navigation.goBack()}
        />

        <ZoneMapView
          region={region}
          center={center}
          radius={radius}
          onPressMap={setCenter}
          testID="zone-map"
        />
        <Text
          variant="caption"
          color="textTertiary"
          center
          style={{marginTop: spacing.sm}}>
          Tap the map to set the zone center
        </Text>

        <View style={{marginTop: spacing.lg}}>
          <Input
            label="Zone Name"
            placeholder="e.g. HQ Office Complex"
            value={name}
            onChangeText={setName}
            maxLength={50}
            testID="zone-name-input"
          />
        </View>

        <View style={{marginTop: spacing.lg}}>
          <RadiusSlider value={radius} onChange={setRadius} />
        </View>

        <View style={{marginTop: spacing.lg}}>
          <Text
            variant="label"
            weight="semibold"
            color="textSecondary"
            style={{
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: spacing.sm,
            }}>
            Sound Mode on Entry
          </Text>
          <SoundModeSelector value={soundMode} onChange={setSoundMode} />
        </View>

        <View style={[styles.toggleRow, {marginTop: spacing.lg}]}>
          <Text weight="medium">Zone Active</Text>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
            testID="zone-active-toggle"
          />
        </View>

        <View style={{marginTop: spacing.xl}}>
          <Button
            label="Save Zone Protocol"
            onPress={onSave}
            testID="save-zone-button"
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
