'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  useReportHistoryListQuery
} from '@/features/mypage/report-history/model/queries';
import { isMobileCarrier } from '@/shared/lib/typeGuards';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { SectionDivider } from '@/shared/ui/SectionDivider';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { ReportHistoryItem, ReportInfo } from '@/features/mypage/report-history/lib/types';

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray-dark)]">{children}</p>
  </div>
);

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
        <div className="font-label-semibold text-gray-900 mb-1">{text}</div>
        <div className="font-small-regular text-[var(--gray-mid)]">{date}</div>
      </div>
    </li>
  );
}

const STEP_ITEMS = [
  {
    key: 'SALE',
    label: '구매',
    text: '구매 결제',
    getDate: (info: ReportInfo) => info.paymentDateTime,
  },
  {
    key: 'QUESTION',
    label: '문의',
    text: '타인 사용 및 취소',
    getDate: (info: ReportInfo) => info.questionDateTime,
  },
  {
    key: 'ANSWER',
    label: '답변',
    text: '사용 불가 사유 확인',
    getDate: () => '',
  },
  {
    key: 'COMPLETE',
    label: '완료',
    text: '환불 요청',
    getDate: () => '',
  },
] as const;

function getCurrentStepIdx(info: ReportInfo): number {
  if (!info.paymentDateTime) return -1;
  if (info.reportStatus === 'COMPLETE') return 3;
  if (info.reportStatus === 'ANSWER') return 2;
  if (info.questionDateTime) return 1;
  return 0;
}

export default function ReportHistoryPage() {
  const router = useRouter();
  const reportStatus = 'ANSWER';
  const { data, isLoading, isError, refetch } = useReportHistoryListQuery(reportStatus);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const items: ReportHistoryItem[] = data?.item ?? [];
  const selectedItem = items[selectedIdx];

  // 받아온 데이터에서 진행 상태를 추론하는 함수
  const getCurrentStepFromItem = (item: ReportHistoryItem): number => {
    // 실제 데이터 구조에 따라 조정 필요
    // 예시: isSold가 true면 완료, 아니면 진행중 등
    if (item.isSold) return 3; // 완료
    return 1; // 기본적으로 문의 단계
  };

  return (
    <BaseLayout
      header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        {/* 로딩 상태 */}
        {isLoading && <CenteredMessage>불러오는 중...</CenteredMessage>}

        {/* 에러 상태 */}
        {isError && (
          <div>
            <CenteredMessage>데이터를 불러오지 못했습니다</CenteredMessage>
            <div className="text-center">
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-[var(--main-5)] text-white rounded-lg font-label-regular"
              >
                다시 시도
              </button>
            </div>
          </div>
        )}

        {/* 빈 상태 */}
        {!isLoading && !isError && items.length === 0 && (
          <CenteredMessage>신고 내역이 없습니다</CenteredMessage>
        )}

        {/* 데이터 표시 */}
        {!isLoading && !isError && items.length > 0 && (
          <>
            <div className="px-4 pt-6 pb-24">
              <h2 className="font-body-semibold mb-4">신고 게시물</h2>
              <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar pb-2">
                {items.map((item, idx) => {
                  const safeCarrier = isMobileCarrier(item.mobileCarrier)
                    ? item.mobileCarrier
                    : 'UPLUS';

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
              {selectedItem ? (
                <ul className="flex flex-col gap-6">
                  {STEP_ITEMS.map((step, idx) => {
                    const currentStep = getCurrentStepFromItem(selectedItem);
                    const isActive = idx <= currentStep;
                    // 임시 날짜 - 실제로는 selectedItem에서 가져와야 함
                    const date =
                      idx === 0 ? '2025-07-07 17:07' : idx === 1 ? '2025-07-09 11:21' : '';

                    return (
                      <TimelineItem
                        key={step.key}
                        label={step.label}
                        text={step.text}
                        date={date}
                        color={isActive ? 'main' : 'gray'}
                        isLast={idx === STEP_ITEMS.length - 1}
                      />
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <p className="font-label-regular text-[var(--gray-dark)]">
                    게시물을 선택해주세요
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </BaseLayout>
  );
}
