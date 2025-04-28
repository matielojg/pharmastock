'use client';

import { ReactNode, useState } from 'react';
import ThemeRegistry from '@/components/ThemeRegistry';
import { AuthProvider } from '@/components/AuthProvider';
import PublicNavbar from '@/components/Layout/Public/PublicNavbar';
import PushMenu from '@/components/Layout/Public/PushMenu'; // Importa o PushMenu

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeRegistry>
      <AuthProvider>
        <PushMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="min-h-screen bg-background">
          <PublicNavbar onMenuToggle={() => setMenuOpen(true)} />
          <div className="push-content">
            {children}
          </div>
        </div>
      </AuthProvider>
    </ThemeRegistry>
  );
}
