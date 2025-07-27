'use client';

import { FOLLOW_TYPES, FollowListPage } from '@/entities/follow';

export default function FollowerPage() {
  return (
    <FollowListPage
      followType={FOLLOW_TYPES.FOLLOWERS}
      title="팔로워 목록"
      emptyMessage="팔로워가 없습니다."
    />
  );
} 