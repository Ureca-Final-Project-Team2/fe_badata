'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { BottomNav } from '@/shared/ui/BottomNav';
import { FlatTab } from '@/shared/ui/FlatTab';
import { PageHeader } from '@/shared/ui/Header';
import { Switch } from '@/shared/ui/Switch/Switch';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

const profile = {
  name: '홍길동',
  days: 15,
  avatarSrc: '/assets/profile-default.png',
  tradeCount: 14,
  follower: 4,
  following: 7,
};

const allPosts = [
  {
    id: 1,
    imageUrl: '/assets/trade-detail.jpg',
    title: '쇼콜라 바니드라',
    partner: '제휴처',
    price: 2050,
    likeCount: 5,
    isCompleted: false,
    isLiked: false,
    hasDday: true,
    dday: 5,
    type: '전체',
  },
  {
    id: 2,
    imageUrl: '/assets/trade-detail.jpg',
    title: '쇼콜라 바니드라',
    partner: '제휴처',
    price: 2050,
    likeCount: 5,
    isCompleted: false,
    isLiked: false,
    hasDday: true,
    dday: 5,
    type: '데이터',
  },
  {
    id: 3,
    imageUrl: '/assets/trade-detail.jpg',
    title: '쇼콜라 바니드라',
    partner: '제휴처',
    price: 2050,
    likeCount: 5,
    isCompleted: false,
    isLiked: false,
    hasDday: true,
    dday: 5,
    type: '쿠폰',
  },
];

const tabList = [
  { label: '전체', value: '전체' },
  { label: '데이터', value: '데이터' },
  { label: '쿠폰', value: '쿠폰' },
];

export default function SalesHistoryPage() {
  const router = useRouter();
  const [tab, setTab] = useState('전체');
  const [isCompleted, setIsCompleted] = useState(false);

  const filteredPosts = allPosts.filter(
    (item) =>
      item.hasDday && (tab === '전체' || item.type === tab) && item.isCompleted === isCompleted,
  );

  return (
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center relative">
      <div className="w-full max-w-[428px]">
        <PageHeader title="판매 내역" onBack={() => router.back()} />
        <div className="flex flex-col items-center px-4 mt-4">
          <MyProfileCard name={profile.name} days={profile.days} avatarSrc={profile.avatarSrc} />

          <div className="flex justify-between items-center w-full bg-[var(--main-1)] rounded-xl px-4 py-3 mt-4 mb-6">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[16px] font-semibold text-[var(--black)]">거래 내역</span>
              <span className="text-[18px] font-bold text-[var(--black)] mt-1">
                {profile.tradeCount}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer"
              onClick={() => router.push('/mypage/follower')}
            >
              <span className="text-[16px] font-semibold text-[var(--black)]">팔로워</span>
              <span className="text-[18px] font-bold text-[var(--black)] mt-1">
                {profile.follower}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer"
              onClick={() => router.push('/mypage/following')}
            >
              <span className="text-[16px] font-semibold text-[var(--black)]">팔로잉</span>
              <span className="text-[18px] font-bold text-[var(--black)] mt-1">
                {profile.following}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4">
          <FlatTab items={tabList} value={tab} onValueChange={setTab} />
        </div>

        <div className="flex justify-center mt-4 mb-4">
          <Switch
            checked={isCompleted}
            onCheckedChange={setIsCompleted}
            labels={['판매중', '판매완료']}
          />
        </div>

        <div className="px-4 pb-[96px]">
          <div className="grid grid-cols-2 gap-4">
            {filteredPosts.map((item) => (
              <TradePostCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[428px]">
        <BottomNav />
      </div>
    </div>
  );
}
