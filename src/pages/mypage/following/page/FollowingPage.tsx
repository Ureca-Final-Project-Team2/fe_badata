'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { Profile } from '@/shared/ui/Profile';

const initialFollowings = [
  { id: 1, name: '박아무개', avatar: '/assets/profile-default.png' },
  { id: 2, name: '박아무개', avatar: '/assets/profile-default.png' },
  { id: 3, name: '박아무개', avatar: '/assets/profile-default.png' },
];

export default function FollowingPage() {
  const [followings, setFollowings] = useState(initialFollowings);
  const router = useRouter();

  const handleRemove = (id: number) => {
    setFollowings((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <BaseLayout header={<PageHeader title="팔로잉 목록" onBack={() => router.back()} />} showBottomNav>
      <ul className="px-4 pt-6 pb-[96px] flex flex-col gap-4">
        {followings.map((user) => (
          <li key={user.id} className="w-full">
            <Profile
              name={user.name}
              avatar={user.avatar}
              showCloseButton
              onClose={() => handleRemove(user.id)}
            />
          </li>
        ))}
      </ul>
    </BaseLayout>
  );
} 