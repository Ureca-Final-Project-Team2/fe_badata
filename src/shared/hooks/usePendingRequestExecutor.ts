import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';

export const usePendingRequestExecutor = () => {
  const { pendingRequest, executePendingRequest } = useAuthErrorStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // 로그인된 상태이고 pendingRequest가 있으면 실행
    if (isLoggedIn && pendingRequest) {
      // 약간의 지연을 두어 상태가 안정화된 후 실행
      setTimeout(() => {
        executePendingRequest();
      }, 100);
    }
  }, [isLoggedIn, pendingRequest, executePendingRequest]);
};
