import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';

export const usePendingRequestExecutor = () => {
  const { pendingRequest, executePendingRequest } = useAuthErrorStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // 로그인된 상태이고 pendingRequest가 있으면 실행
    if (isLoggedIn && pendingRequest) {
      executePendingRequest();
    }
  }, [isLoggedIn, pendingRequest, executePendingRequest]);
};
