import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Profile} from '@app-types/profile.types';

const profilesCol = (userId: string) =>
  collection(getFirestore(), 'users', userId, 'profiles');

export const profileService = {
  async list(userId: string): Promise<Profile[]> {
    const snap = await getDocs(profilesCol(userId));
    return snap.docs.map(
      (d: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
        d.data() as Profile,
    );
  },
  async create(userId: string, profile: Profile): Promise<void> {
    await setDoc(doc(profilesCol(userId), profile.id), profile);
  },
  async update(
    userId: string,
    id: string,
    patch: Partial<Profile>,
  ): Promise<void> {
    await updateDoc(doc(profilesCol(userId), id), patch);
  },
  async remove(userId: string, id: string): Promise<void> {
    await deleteDoc(doc(profilesCol(userId), id));
  },
};
