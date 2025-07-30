'use client';

import { useAuthStore } from '@/entities/auth/model/authStore';

export const UserInfoSection = () => {
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!isLoggedIn || !user) {
    return <p className="text-red-500 font-semibold">로그인이 필요합니다.</p>;
  }

  return (
    <div className="text-[20px] font-sans font-semibold">
      안녕하세요! {user.name ?? '사용자'}님 반가워요~!
    </div>
  );
};
