'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@features/auth/stores/authStore';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const hasLogged = useRef(false);

  useEffect(() => {
    if (user && !hasLogged.current) {
      console.log('현재 사용자 정보:', user);
      hasLogged.current = true;
    }
  }, [user]);

  return <></>;
}
