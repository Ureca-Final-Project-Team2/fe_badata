'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { BottomNav } from '@/shared/ui/BottomNav';
import { PageHeader } from '@/shared/ui/Header';
import { Profile } from '@/shared/ui/Profile';

const initialFollowers = [
  { id: 1, name: '박아무개', avatar: '/assets/profile-default.png' },
  { id: 2, name: '박아무개', avatar: '/assets/profile-default.png' },
  { id: 3, name: '박아무개', avatar: '/assets/profile-default.png' },
  { id: 4, name: '박아무개', avatar: '/assets/profile-default.png' },
  { id: 5, name: '박아무개', avatar: '/assets/profile-default.png' },
];

export default function FollowerPage() {
  const [followers, setFollowers] = useState(initialFollowers);
  const router = useRouter();

  const handleRemove = (id: number) => {
    setFollowers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center relative">
      <div className="w-full max-w-[428px]">
        <PageHeader title="팔로워 목록" onBack={() => router.back()} />
        <ul className="px-4 pt-6 pb-[96px] flex flex-col gap-4">
          {followers.map((user) => (
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
      </div>
      <div className="fixed bottom-0 w-full max-w-[428px]">
        <BottomNav />
      </div>
    </div>
  );
} 