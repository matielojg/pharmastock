'use client';

import { useAuth } from '@/components/AuthProvider';

export const useApi = () => {
  const { token, logout } = useAuth();

  const handleResponse = async (res: Response) => {
    if (res.status === 401) {
      logout();
      throw new Error('Sessão expirada, desconectado.');
    }
    return res.json();
  };

  const get = async (url: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(res);
  };

  const post = async (url: string, body: object) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  };

  return { get, post, token };
};
