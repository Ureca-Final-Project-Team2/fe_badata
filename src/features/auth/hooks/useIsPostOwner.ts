'use client';

import { useAuthStore } from '@features/auth/stores/authStore';

/**
 * 현재 로그인된 사용자가 게시글 작성자인지 판단하는 훅 (이메일 기준)
 * @param postUserEmail 게시글 작성자의 이메일
 * @returns boolean (true: 작성자, false: 일반 사용자)
 */
export const useIsPostOwner = (postUserEmail?: string | null): boolean => {
  const user = useAuthStore((state) => state.user);

  // 로그인한 사용자, 게시글 작성자 확인용 로그
  console.log('user.email:', user?.email, 'postUserEmail:', postUserEmail);

  if (!user?.email || !postUserEmail) return false;

  return user.email === postUserEmail;
};
