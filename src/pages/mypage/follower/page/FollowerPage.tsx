'use client';

import { useRouter } from 'next/navigation';

import { useDeleteFollower, useFollowers } from '@/pages/mypage/follower/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { Profile } from '@/shared/ui/Profile';

export default function FollowerPage() {
  const router = useRouter();
  const { followerItems, isLoading, isError } = useFollowers();
  const deleteFollowerMutation = useDeleteFollower();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const handleRemove = async (id: number) => {
    try {
      await deleteFollowerMutation.mutateAsync(id);
    } catch (error) {
      console.error('팔로워 삭제 실패:', error);
    }
  };

  return (
    <BaseLayout header={<PageHeader title="팔로워 목록" onBack={() => router.back()} />} showBottomNav>
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {!followerItems || followerItems.length === 0 ? (
          <div className="py-4 text-center text-[var(--gray)]">팔로워가 없습니다.</div>
        ) : (
          followerItems.map((user) => (
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