'use client';

import { useRouter } from 'next/navigation';

import { FOLLOW_TYPES, useDeleteFollow, useFollows } from '@/entities/follow';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { Profile } from '@/shared/ui/Profile';

import type { FollowType } from '@/entities/follow/lib/types';

interface FollowListPageProps {
  followType: FollowType;
  title: string;
  emptyMessage: string;
}

export default function FollowListPage({ followType, title, emptyMessage }: FollowListPageProps) {
  const router = useRouter();
  const { followItems, isLoading, isError } = useFollows(followType);
  const deleteFollowMutation = useDeleteFollow();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const handleRemove = async (id: number) => {
    try {
      await deleteFollowMutation.mutateAsync(id);
    } catch (error) {
      console.error(`${followType === FOLLOW_TYPES.FOLLOWERS ? '팔로워' : '팔로잉'} 삭제 실패:`, error);
    }
  };

  return (
    <BaseLayout header={<PageHeader title={title} onBack={() => router.back()} />} showBottomNav>
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {!followItems || followItems.length === 0 ? (
          <div className="py-4 text-center text-[var(--gray)]">{emptyMessage}</div>
        ) : (
          followItems.map((user) => (
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