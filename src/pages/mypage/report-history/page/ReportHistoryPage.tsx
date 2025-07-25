'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { SectionDivider } from '@/shared/ui/SectionDivider';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import { useReportHistoryListQuery } from '../model/queries';

import type { ReportHistoryItem } from '../lib/types';

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

  return (
    <li className="relative flex items-start">
      <div className="relative flex flex-col items-center mr-6">
        {!isLast && (
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[2px] bg-[var(--gray)] z-0 h-16"></div>
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
  const { data, isLoading, isError } = useReportHistoryListQuery('QUESTION');
  const items: ReportHistoryItem[] = data?.item ?? [];
  const [selectedIdx, setSelectedIdx] = useState(0); // 가장 최근 신고가 기본 선택

  // 가장 최근 신고가 앞에 오도록 정렬 (createdAt 내림차순)
  const sortedItems = [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const selectedItem = sortedItems[selectedIdx];

  return (
    <BaseLayout
      header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div className="px-4 pt-6 pb-24">
          {isLoading ? (
            <div>불러오는 중...</div>
          ) : isError ? (
            <div>데이터를 불러오지 못했습니다.</div>
          ) : sortedItems.length === 0 ? (
            <div>신고 내역이 없습니다.</div>
          ) : (
            <>
              <h2 className="font-body-semibold mb-4">신고 게시물</h2>
              <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar pb-2">
                {sortedItems.map((item, idx) => (
                  <div key={item.id} className="w-[178px] flex-shrink-0" onClick={() => setSelectedIdx(idx)}>
                    <TradePostCard
                      imageUrl="/assets/trade-sample.png"
                      title={`신고 ID: ${item.id}`}
                      partner={`게시물 ID: ${item.postId}`}
                      price={0}
                      likeCount={0}
                      isCompleted={false}
                      isLiked={false}
                    />
                  </div>
                ))}
              </div>
              <SectionDivider className="my-6" />
              <h2 className="font-body-semibold mb-4">신고 진행 과정</h2>
              {selectedItem && (
                <ul className="flex flex-col gap-6">
                  <TimelineItem
                    label={selectedItem.reportStatus}
                    text={selectedItem.reportReason}
                    date={selectedItem.createdAt}
                    color="main"
                    isLast={true}
                  />
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
