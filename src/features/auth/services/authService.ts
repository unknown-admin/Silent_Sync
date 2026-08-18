import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
  deleteUser,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import env from '@config/env';
import {User, UserSettings} from '@app-types/user.types';
import {DEFAULT_SETTINGS} from '@constants/defaults';
import {secureStorage} from '@services/storage/secureStorage';

GoogleSignin.configure({webClientId: env.googleWebClientId});

const mapFirebaseUser = (
  fbUser: FirebaseAuthTypes.User,
  settings: UserSettings = DEFAULT_SETTINGS,
): User => ({
  id: fbUser.uid,
  email: fbUser.email ?? '',
  displayName: fbUser.displayName ?? 'User',
  photoURL: fbUser.photoURL ?? undefined,
  phoneNumber: fbUser.phoneNumber ?? undefined,
  isPremium: false,
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
  settings,
  onboardingCompleted: true,
});

async function persistToken(fbUser: FirebaseAuthTypes.User): Promise<void> {
  const token = await fbUser.getIdToken();
  await secureStorage.setToken(token);
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const auth = getAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await persistToken(cred.user);
    return mapFirebaseUser(cred.user);
  },

  async signup(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const auth = getAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, {displayName});
    await persistToken(cred.user);
    return mapFirebaseUser(cred.user);
  },

  async googleSignIn(): Promise<User> {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    const idToken =
      // @ts-expect-error runtime shape differs across versions
      response.data?.idToken ?? response.idToken;
    const credential = GoogleAuthProvider.credential(idToken);
    const auth = getAuth();
    const result = await signInWithCredential(auth, credential);
    await persistToken(result.user);
    return mapFirebaseUser(result.user);
  },

  async forgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(getAuth(), email);
  },

  async logout(): Promise<void> {
    await signOut(getAuth());
    await secureStorage.clearToken();
    try {
      await GoogleSignin.signOut();
    } catch {
      // ignore
    }
  },

  async deleteAccount(): Promise<void> {
    const current = getAuth().currentUser;
    if (current) {
      await deleteUser(current);
    }
    await secureStorage.clearToken();
  },
};
