'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    if (params.get('type') === 'recovery') {
      const token = params.get('access_token');
      if (token) {
        router.replace(`/reset-password?token=${token}`);
      }
    }
  }, [router]);

  return null;
}