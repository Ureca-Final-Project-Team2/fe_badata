'use client';

import { useRouter } from 'next/navigation';

import { useFollowings } from '@/pages/mypage/following/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { Profile } from '@/shared/ui/Profile';

export default function FollowingPage() {
  const router = useRouter();
  const { followingItems, isLoading, isError } = useFollowings();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!followingItems || followingItems.length === 0) {
    return <div className="py-4 text-center text-[var(--gray)]">팔로잉이 없습니다.</div>;
  }

  const handleRemove = (id: number) => {
    // TODO: 팔로우 취소 API 연동
    console.log('팔로우 취소:', id);
  };

  return (
    <BaseLayout header={<PageHeader title="팔로잉 목록" onBack={() => router.back()} />} showBottomNav>
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {followingItems.map((user) => (
          <div key={user.id} className="w-full max-w-[400px] flex justify-center">
            <Profile
              name={user.nickname}
              avatar={user.profileImageUrl}
              showCloseButton
              onClose={() => handleRemove(user.userId)}
            />
          </div>
        ))}
      </div>
    </BaseLayout>
  );
} 