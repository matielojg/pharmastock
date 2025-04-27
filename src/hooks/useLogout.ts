'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao chamar API de logout:', error);
    } finally {
      logout(); // Limpa localStorage e contexto
      router.push('/login'); // Volta para login
    }
  };

  return handleLogout;
};
