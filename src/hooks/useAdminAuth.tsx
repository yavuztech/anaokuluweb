import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth, hasFirebaseConfig } from '../lib/firebase';

type AdminAuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isConfigured: hasFirebaseConfig,
      login: async (email: string, password: string) => {
        if (!auth) {
          throw new Error('Firebase ayarlari eksik. Giris yapabilmek icin .env bilgilerini doldurun.');
        }

        await signInWithEmailAndPassword(auth, email, password);
      },
      logout: async () => {
        if (!auth) {
          return;
        }

        await signOut(auth);
      },
    }),
    [isLoading, user],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }

  return context;
}