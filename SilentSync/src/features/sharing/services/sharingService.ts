import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from '@react-native-firebase/firestore';
import {
  LocationShare,
  ShareDuration,
  ShareCurrentLocation,
} from '@app-types/sharing.types';
import {genId} from '@utils/helpers';
import {durationToMs} from '@utils/formatters';
import {buildGoogleMapsUrl} from '@utils/geoUtils';

const sharesCol = () => collection(getFirestore(), 'locationShares');

export const sharingService = {
  async createLiveShare(
    userId: string,
    duration: ShareDuration,
    recipientCount: number,
    initial: ShareCurrentLocation,
  ): Promise<LocationShare> {
    const now = Date.now();
    const ms = durationToMs(duration);
    const id = genId('share');
    const share: LocationShare = {
      id,
      userId,
      shareUrl: buildGoogleMapsUrl(initial.latitude, initial.longitude),
      isLive: true,
      duration,
      createdAt: new Date(now).toISOString(),
      expiresAt: ms ? new Date(now + ms).toISOString() : undefined,
      status: 'active',
      recipientCount,
      currentLocation: initial,
    };
    await setDoc(doc(sharesCol(), id), share);
    return share;
  },

  async updateLocation(
    shareId: string,
    location: ShareCurrentLocation,
  ): Promise<void> {
    await updateDoc(doc(sharesCol(), shareId), {currentLocation: location});
  },

  async stopShare(shareId: string): Promise<void> {
    await updateDoc(doc(sharesCol(), shareId), {
      status: 'stopped',
      isLive: false,
      stoppedAt: new Date().toISOString(),
    });
  },

  subscribeToShare(
    shareId: string,
    onUpdate: (share: LocationShare | null) => void,
  ): () => void {
    return onSnapshot(doc(sharesCol(), shareId), snapshot => {
      onUpdate(snapshot.exists() ? (snapshot.data() as LocationShare) : null);
    });
  },
};
