'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/login'); // Redireciona para login se não tiver token
    }
  }, [token, router]);

  if (!token) {
    return null; // Ou um loader
  }

  return <>{children}</>;
}
