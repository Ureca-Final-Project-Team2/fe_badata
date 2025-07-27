'use client';

import { useRouter } from 'next/navigation';

import { useDeleteFollowing, useFollowings } from '@/pages/mypage/following/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { Profile } from '@/shared/ui/Profile';

export default function FollowingPage() {
  const router = useRouter();
  const { followingItems, isLoading, isError } = useFollowings();
  const deleteFollowingMutation = useDeleteFollowing();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const handleRemove = async (id: number) => {
    try {
      await deleteFollowingMutation.mutateAsync(id);
    } catch (error) {
      console.error('팔로잉 삭제 실패:', error);
    }
  };

  return (
    <BaseLayout header={<PageHeader title="팔로잉 목록" onBack={() => router.back()} />} showBottomNav>
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {!followingItems || followingItems.length === 0 ? (
          <div className="py-4 text-center text-[var(--gray)]">팔로잉이 없습니다.</div>
        ) : (
          followingItems.map((user) => (
            <div key={user.id} className="w-full max-w-[400px] flex justify-center">
              <Profile
                name={user.nickname}
                avatar={user.profileImageUrl}
                showCloseButton
                onClose={() => handleRemove(user.id)}
              />
            </div>
          ))
        )}
      </div>
    </BaseLayout>
  );
} 