'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/components/ThemeRegistry';
import { AuthProvider } from '@/components/AuthProvider'; // importa seu AuthProvider

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeRegistry>
  );
}
