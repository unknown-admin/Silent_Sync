import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from '@react-native-firebase/firestore';
import {UserSettings} from '@app-types/user.types';

export const settingsService = {
  async save(userId: string, settings: UserSettings): Promise<void> {
    await setDoc(
      doc(getFirestore(), 'users', userId),
      {settings},
      {merge: true},
    );
  },
  async load(userId: string): Promise<UserSettings | null> {
    const snap = await getDoc(doc(getFirestore(), 'users', userId));
    const data = snap.data() as {settings?: UserSettings} | undefined;
    return data?.settings ?? null;
  },
};
