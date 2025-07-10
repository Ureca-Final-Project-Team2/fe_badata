'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@features/auth/stores/authStore';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log('✅ 현재 사용자 정보:', user);
  }, [user]);

  return <></>;
}
