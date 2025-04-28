'use client';

import dynamic from 'next/dynamic';
import { useThemeMode } from '@/components/ThemeRegistry';
import { useLogout } from '@/hooks/useLogout';
import { useState, useEffect } from 'react';

const Header = dynamic(() => import('react-dsgov').then(m => m.Header), { ssr: false });
const Avatar = dynamic(() => import('react-dsgov').then(m => m.Avatar), { ssr: false });

interface PublicNavbarProps {
  onMenuToggle: () => void;
}

export default function PublicNavbar({ onMenuToggle }: PublicNavbarProps) {
  const logout = useLogout();
  const { mode, toggleMode } = useThemeMode();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handler = () => onMenuToggle();

    const tryAttachButton = () => {
      const btn = document.getElementById('navigation');
      if (btn) {
        btn.addEventListener('click', handler);
      } else {
        // Tenta novamente se o botão ainda não existe
        setTimeout(tryAttachButton, 100);
      }
    };

    tryAttachButton();

    return () => {
      const btn = document.getElementById('navigation');
      if (btn) {
        btn.removeEventListener('click', handler);
      }
    };
  }, [onMenuToggle]);

  return (
    <Header
      showMenuButton
      density="large"
      urlLogo="/logo.png"
      systemName="Pharmastock"
      title="Gestão de Medicamentos"
      subTitle="Plataforma Interna"
      quickAccessLinks={[
        { label: 'Medicamentos', href: '/medicines' },
        { label: 'Outro', href: '/outro' },
      ]}
      features={[
        { label: 'Dashboard', icon: 'fas fa-chart-bar', href: '/dashboard' },
        { label: 'Suporte', icon: 'fas fa-headset', onClick: () => alert('Suporte') },
        { label: 'Tema', icon: mode === 'light' ? 'fas fa-moon' : 'fas fa-sun', onClick: toggleMode },
        { label: 'Sair', icon: 'fas fa-sign-out-alt', onClick: logout },
      ]}
      loggedIn={loggedIn}
      onClickLogin={() => setLoggedIn(true)}
      onSearch={(text) => alert(`Buscando por "${text}"`)}
      avatar={loggedIn ? <Avatar imageSrc="https://picsum.photos/id/823/400" /> : undefined}
    />
  );
}
