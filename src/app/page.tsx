// src/app/page.tsx

import { redirect } from 'next/navigation'

export default function Home() {
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    redirect('/login');
  } else {
    redirect('/medicines');
  }
}
