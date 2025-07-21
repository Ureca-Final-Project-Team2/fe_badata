'use client';

import { useRouter } from 'next/navigation';

import { BottomNav } from '@/shared/ui/BottomNav';
import { PageHeader } from '@/shared/ui/Header';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

// 거래 완료된 더미 데이터 예시
const completedPosts = [
  {
    id: 1,
    imageUrl: '/assets/trade-detail.jpg',
    title: '스타벅스 아메리카노',
    partner: '스타벅스',
    price: 4500,
    likeCount: 8,
    isCompleted: true,
    isLiked: false,
    hasDday: true,
    dday: 5,
  },
  {
    id: 2,
    imageUrl: '/assets/trade-detail.jpg',
    title: '올리브영 기프티콘',
    partner: '올리브영',
    price: 10000,
    likeCount: 12,
    isCompleted: true,
    isLiked: false,
    hasDday: false,
  },
];

// 프로필 더미 데이터
const profile = {
  name: '홍길동',
  days: 15, // BADATA와 함께한 일수
  avatarSrc: '/assets/profile-default.png', // 임시 이미지
  tradeCount: 14,
  follower: 4,
  following: 7,
};

export default function PurchaseHistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center relative">
      <div className="w-full max-w-[428px]">
        <PageHeader title="구매 내역" onBack={() => router.back()} />

        {/* 상단 프로필 카드 */}
        <div className="flex flex-col items-center px-4 mt-4">
          <MyProfileCard name={profile.name} days={profile.days} avatarSrc={profile.avatarSrc} />

          {/* 거래 내역/팔로워/팔로잉 요약 박스 */}
          <div className="flex justify-between items-center w-full bg-[var(--main-1)] rounded-xl px-4 py-3 mt-4 mb-6">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[16px] font-semibold text-[var(--black)]">거래 내역</span>
              <span className="text-[18px] font-bold text-[var(--black)] mt-1">{profile.tradeCount}</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[16px] font-semibold text-[var(--black)]">팔로워</span>
              <span className="text-[18px] font-bold text-[var(--black)] mt-1">{profile.follower}</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[16px] font-semibold text-[var(--black)]">팔로잉</span>
              <span className="text-[18px] font-bold text-[var(--black)] mt-1">{profile.following}</span>
            </div>
          </div>
        </div>

        {/* 거래 완료된 게시글 목록 */}
        <div className="px-4 pb-[96px]">
          <div className="grid grid-cols-2 gap-4">
            {completedPosts.map((item) => (
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