'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useReportHistoryListQuery } from '@/features/mypage/report-history/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { SectionDivider } from '@/shared/ui/SectionDivider';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { ReportHistoryItem } from '@/features/mypage/report-history/lib/types';
import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

interface TimelineItemProps {
  label: string;
  text: string;
  date: string;
  color: 'main' | 'gray';
  isLast?: boolean;
}

function TimelineItem({ label, text, date, color, isLast }: TimelineItemProps) {
  const isMain = color === 'main';
  const dotColor = isMain ? 'bg-[var(--main-5)]' : 'bg-[var(--gray)]';
  const lineColor = isMain ? 'bg-[var(--main-5)]' : 'bg-[var(--gray)]';

  return (
    <li className="relative flex items-start">
      <div className="relative flex flex-col items-center mr-6">
        {!isLast && (
          <div
            className={`absolute top-5 left-1/2 transform -translate-x-1/2 w-[2px] ${lineColor} z-0 h-16`}
          />
        )}
        <div
          className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${dotColor} z-10`}
        >
          {label}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <div className="font-body-xs-semibold text-gray-900 mb-1">{text}</div>
        <div className="font-small-regular text-[var(--gray-mid)]">{date}</div>
      </div>
    </li>
  );
}

export default function ReportHistoryPage() {
  const router = useRouter();
  const reportStatus = 'ANSWER'; // 혹은 동적으로 받는 경우 prop 또는 상태 처리
  const { data, isLoading, isError, refetch } = useReportHistoryListQuery(reportStatus);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const items: ReportHistoryItem[] = data?.item ?? [];
  const selectedItem = items[selectedIdx];

  if (isLoading) {
    return (
      <BaseLayout
        header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <div className="text-lg font-semibold mb-2">불러오는 중...</div>
            <div className="text-sm text-gray-500">신고 내역을 불러오고 있습니다</div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (isError) {
    return (
      <BaseLayout
        header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <div className="text-lg font-semibold mb-2">데이터를 불러오지 못했습니다</div>
            <div className="text-sm text-gray-500">잠시 후 다시 시도해주세요</div>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              다시 시도
            </button>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (!items || items.length === 0) {
    return (
      <BaseLayout
        header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <div className="text-lg font-semibold mb-2">신고 내역이 없습니다</div>
            <div className="text-sm text-gray-500">신고한 게시물이 없습니다</div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div className="px-4 pt-6 pb-24">
          <h2 className="font-body-semibold mb-4">신고 게시물</h2>
          <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar pb-2">
            {items.map((item, idx) => {
              const safeCarrier = ['SKT', 'KT', 'UPLUS'].includes(item.mobileCarrier)
                ? (item.mobileCarrier as MobileCarrier)
                : 'SKT';

              return (
                <div
                  key={item.id}
                  className="w-[178px] flex-shrink-0"
                  onClick={() => setSelectedIdx(idx)}
                >
                  <TradePostCard
                    imageUrl={item.thumbnailUrl || '/assets/trade-sample.png'}
                    title={item.title}
                    partner={item.partner || undefined}
                    mobileCarrier={safeCarrier}
                    price={item.price}
                    likeCount={item.postLikes}
                    isCompleted={item.isSold}
                    isLiked={false}
                  />
                </div>
              );
            })}
          </div>
          <SectionDivider className="my-6" />
          <h2 className="font-body-semibold mb-4">신고 진행 과정</h2>
          {selectedItem && (
            <ul className="flex flex-col gap-6">
              {['판매', '문의', '답변', '완료'].map((label, idx) => (
                <TimelineItem
                  key={label}
                  label={label}
                  text={`${label} 단계`}
                  date={''}
                  color={idx <= 1 ? 'main' : 'gray'}
                  isLast={idx === 3}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
