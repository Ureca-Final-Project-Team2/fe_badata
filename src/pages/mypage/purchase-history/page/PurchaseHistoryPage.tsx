'use client';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

const completedPosts = [
  {
    id: 1,
    imageUrl: '/assets/trade-detail.jpg',
    title: '올리브영 기프티콘',
    partner: '올리브영',
    price: 10000,
    likeCount: 12,
    isCompleted: true,
    isLiked: false,
    hasDday: false,
  },
  {
    id: 2,
    imageUrl: '/assets/trade-detail.jpg',
    title: '투썸플레이스 케이크',
    partner: '투썸플레이스',
    price: 6500,
    likeCount: 3,
    isCompleted: true,
    isLiked: false,
    hasDday: false,
  },
];

const profile = {
  name: '홍길동',
  days: 15,
  avatarSrc: '/assets/profile-default.png',
  tradeCount: 14,
  follower: 4,
  following: 7,
};

export default function PurchaseHistoryPage() {
  const router = useRouter();

  return (
    <BaseLayout
      header={<PageHeader title="구매 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px]">
        <div className="flex flex-col items-center mt-4">
          <MyProfileCard name={profile.name} days={profile.days} avatarSrc={profile.avatarSrc} />

          <div className="flex justify-between items-center w-full bg-[var(--main-1)] rounded-xl px-4 py-3 mt-4 mb-6">
            <div className="flex flex-col items-center flex-1">
              <span className="font-label-semibold text-[var(--black)]">거래 내역</span>
              <span className="font-body-semibold text-[var(--black)] mt-1">
                {profile.tradeCount}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer group"
              onClick={() => router.push('/mypage/follower')}
            >
              <span className="font-label-semibold text-[var(--black)]">팔로워</span>
              <span className="font-body-semibold text-[var(--black)] mt-1 group-hover:text-[var(--main-3)]">
                {profile.follower}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer group"
              onClick={() => router.push('/mypage/following')}
            >
              <span className="font-label-semibold text-[var(--black)]">팔로잉</span>
              <span className="font-body-semibold text-[var(--black)] mt-1 group-hover:text-[var(--main-3)]">
                {profile.following}
              </span>
            </div>
          </div>
        </div>

        <div className="pb-[96px]">
          <div className="grid grid-cols-2 gap-4">
            {completedPosts
              .filter((item) => !item.hasDday)
              .map((item) => (
                <TradePostCard key={item.id} {...item} />
              ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
