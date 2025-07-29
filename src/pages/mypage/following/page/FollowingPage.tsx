'use client';

import { FOLLOW_TYPES, FollowListPage } from '@/entities/follow';

export default function FollowingPage() {
  return (
    <FollowListPage
      followType={FOLLOW_TYPES.FOLLOWINGS}
      title="팔로잉 목록"
      emptyMessage="팔로잉이 없습니다."
    />
  );
}
