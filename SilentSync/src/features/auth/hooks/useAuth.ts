import {useCallback, useState} from 'react';
import {useAuthStore} from '../store/authStore';
import {authService} from '../services/authService';

export function useAuth() {
  const {user, isAuthenticated, hydrated, setUser, logout} = useAuthStore();
  const [loading, setLoading] = useState(false);

  const wrap = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T> => {
      setLoading(true);
      try {
        return await fn();
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const login = useCallback(
    (email: string, password: string) =>
      wrap(async () => {
        const u = await authService.login(email, password);
        setUser(u);
        return u;
      }),
    [wrap, setUser],
  );

  const signup = useCallback(
    (email: string, password: string, displayName: string) =>
      wrap(async () => {
        const u = await authService.signup(email, password, displayName);
        setUser(u);
        return u;
      }),
    [wrap, setUser],
  );

  const googleSignIn = useCallback(
    () =>
      wrap(async () => {
        const u = await authService.googleSignIn();
        setUser(u);
        return u;
      }),
    [wrap, setUser],
  );

  const forgotPassword = useCallback(
    (email: string) => wrap(() => authService.forgotPassword(email)),
    [wrap],
  );

  const signOut = useCallback(
    () =>
      wrap(async () => {
        await authService.logout();
        logout();
      }),
    [wrap, logout],
  );

  const deleteAccount = useCallback(
    () =>
      wrap(async () => {
        await authService.deleteAccount();
        logout();
      }),
    [wrap, logout],
  );

  return {
    user,
    isAuthenticated,
    hydrated,
    loading,
    login,
    signup,
    googleSignIn,
    forgotPassword,
    signOut,
    deleteAccount,
  };
}
