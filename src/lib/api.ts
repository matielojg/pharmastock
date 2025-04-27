import { useAuth } from '@/components/AuthProvider';

export const useApi = () => {
  const { token } = useAuth();
  console.log('TOKEN SENDO USADO:', token);
  const get = async (url: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  };

  const post = async (url: string, body: object) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  return { get, post, token };
};
