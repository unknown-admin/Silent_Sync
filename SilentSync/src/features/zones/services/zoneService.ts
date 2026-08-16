import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Zone, ZoneFormData} from '@app-types/zone.types';
import {genId} from '@utils/helpers';

/** Firestore zone CRUD — MODULAR API. Path: users/{uid}/zones/{zoneId}. */
const zonesCol = (userId: string) =>
  collection(getFirestore(), 'users', userId, 'zones');

export const zoneService = {
  async list(userId: string): Promise<Zone[]> {
    const q = query(zonesCol(userId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(
      (d: FirebaseFirestoreTypes.QueryDocumentSnapshot) => d.data() as Zone,
    );
  },

  async create(userId: string, form: ZoneFormData): Promise<Zone> {
    const now = new Date().toISOString();
    const zone: Zone = {
      id: genId('zone'),
      ...form,
      status: form.isActive ? 'active' : 'inactive',
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(doc(zonesCol(userId), zone.id), zone);
    return zone;
  },

  async update(
    userId: string,
    zoneId: string,
    patch: Partial<Zone>,
  ): Promise<void> {
    await updateDoc(doc(zonesCol(userId), zoneId), {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  },

  async remove(userId: string, zoneId: string): Promise<void> {
    await deleteDoc(doc(zonesCol(userId), zoneId));
  },
};
