'use client';

import { useEffect, useRef } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const hasLogged = useRef(false);

  useEffect(() => {
    if (user && !hasLogged.current) {
      console.log('현재 사용자 정보:', user);
      hasLogged.current = true;
    }
  }, [user]);

  return (
    <BaseLayout header={<Header />} paddingX>
      홈화면
    </BaseLayout>
  );
}
