'use client';

import { useAuthStore } from '@/entities/auth/model/authStore';

/**
 * 현재 로그인된 사용자가 게시글 작성자인지 판단하는 훅 (userId 기준)
 * @param postUserId 게시글 작성자의 userId
 * @returns boolean (true: 작성자, false: 일반 사용자)
 */
export const useIsPostOwner = (postUserId?: number | null): boolean => {
  const user = useAuthStore((state) => state.user);

  if (!user?.userId || !postUserId) return false;

  return user.userId === postUserId;
};
