import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { onSnapshot, setDoc } from 'firebase/firestore';
import { defaultContent } from '../data/defaultContent';
import { contentDocRef, hasFirebaseConfig } from '../lib/firebase';
import { normalizeSiteContent, serializeSiteContent } from '../lib/siteContent';
import type { SiteContent } from '../types/content';

type SiteContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  saveContent: (updater: SiteContent | ((current: SiteContent) => SiteContent)) => Promise<void>;
  resetContent: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (!hasFirebaseConfig || !contentDocRef) {
      setIsLoading(false);
      setError('Firebase baglantisi tanimli degil. Icerik varsayilan veriyle gosteriliyor.');
      return undefined;
    }

    const unsubscribe = onSnapshot(
      contentDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setContent(normalizeSiteContent(snapshot.data()));
        } else {
          setContent(defaultContent);
        }

        setError(null);
        setIsLoading(false);
      },
      () => {
        setError('Firestore icerigi okunamadi. Guvenlik kurallarini ve baglanti ayarlarinizi kontrol edin.');
        setContent(defaultContent);
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const saveContent = async (updater: SiteContent | ((current: SiteContent) => SiteContent)) => {
    const nextContent = typeof updater === 'function' ? updater(contentRef.current) : updater;

    setContent(nextContent);

    if (!contentDocRef) {
      setError('Firebase baglantisi tanimli degil. Kaydetme islemi yapilamadi.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await setDoc(contentDocRef, serializeSiteContent(nextContent));
    } catch {
      setError('Icerik Firestore uzerine kaydedilemedi.');
      throw new Error('Icerik Firestore uzerine kaydedilemedi.');
    } finally {
      setIsSaving(false);
    }
  };

  const value = useMemo(
    () => ({
      content,
      isLoading,
      isSaving,
      error,
      saveContent,
      resetContent: async () => {
        await saveContent(defaultContent);
      },
    }),
    [content, error, isLoading, isSaving],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }

  return context;
}