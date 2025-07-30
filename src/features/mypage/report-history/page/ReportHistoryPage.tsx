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
          ></div>
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
  const { data, isLoading, isError, error, refetch } = useReportHistoryListQuery();
  const [selectedIdx, setSelectedIdx] = useState(0);

  // 상세한 디버깅을 위한 콘솔 로그
  console.log('=== ReportHistoryPage 디버깅 ===');
  console.log('전체 data 객체:', data);
  console.log('data 타입:', typeof data);
  console.log('data가 null인가?', data === null);
  console.log('data가 undefined인가?', data === undefined);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('error:', error);
  
  if (data) {
    console.log('data.data:', data.data);
    console.log('data.data 타입:', typeof data.data);
    console.log('data.data가 null인가?', data.data === null);
    console.log('data.data가 undefined인가?', data.data === undefined);
    
    if (data.data) {
      console.log('data.data.content:', data.data.content);
      console.log('data.data.content 타입:', typeof data.data.content);
      console.log('data.data.content가 null인가?', data.data.content === null);
      console.log('data.data.content가 undefined인가?', data.data.content === undefined);
      
      if (data.data.content) {
        console.log('data.data.content.item:', data.data.content.item);
        console.log('data.data.content.item 타입:', typeof data.data.content.item);
        console.log('data.data.content.item이 배열인가?', Array.isArray(data.data.content.item));
        console.log('data.data.content.item 길이:', data.data.content.item?.length);
      }
    }
  }

  // 데이터 추출
  const items: ReportHistoryItem[] = data?.data?.content?.item ?? [];
  const selectedItem = items[selectedIdx];

  console.log('추출된 items:', items);
  console.log('items 길이:', items.length);
  console.log('selectedItem:', selectedItem);

  // 타임라인 단계 정의
  const TIMELINE_STEPS = [
    {
      key: 'SALE',
      label: '판매',
      getText: () => '구매 결제',
      getDate: () => '',
    },
    {
      key: 'QUESTION',
      label: '문의',
      getText: () => '신고 접수',
      getDate: () => '',
    },
    {
      key: 'ANSWER',
      label: '답변',
      getText: () => '처리 중',
      getDate: () => '',
    },
    {
      key: 'COMPLETE',
      label: '완료',
      getText: () => '처리 완료',
      getDate: () => '',
    },
  ];

  // 조건부 렌더링 상태 확인
  console.log('조건부 렌더링 체크:');
  console.log('- isLoading:', isLoading);
  console.log('- isError:', isError);
  console.log('- items 존재:', !!items);
  console.log('- items 길이:', items.length);
  console.log('- items가 빈 배열인가?', items.length === 0);

  // 조건부 렌더링
  if (isLoading) {
    console.log('로딩 상태 - 로딩 UI 렌더링');
    return (
      <BaseLayout
        header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">불러오는 중...</div>
            <div className="text-sm text-gray-500">신고 내역을 불러오고 있습니다</div>
          </div>
        </div>
      </BaseLayout>
    );
  }
  
  if (isError) {
    console.log('에러 상태 - 에러 UI 렌더링');
    return (
      <BaseLayout
        header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
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
    console.log('빈 데이터 상태 - 빈 데이터 UI 렌더링');
    return (
      <BaseLayout
        header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">신고 내역이 없습니다</div>
            <div className="text-sm text-gray-500">신고한 게시물이 없습니다</div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  console.log('정상 데이터 상태 - 메인 UI 렌더링');

  return (
    <BaseLayout
      header={<PageHeader title="신고 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div className="px-4 pt-6 pb-24">
          <h2 className="font-body-semibold mb-4">신고 게시물</h2>
          <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar pb-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="w-[178px] flex-shrink-0"
                onClick={() => setSelectedIdx(idx)}
              >
                <TradePostCard
                  imageUrl={item.thumbnailUrl || '/assets/trade-sample.png'}
                  title={item.title}
                  partner={item.partner || undefined}
                  mobileCarrier={item.mobileCarrier as MobileCarrier}
                  price={item.price}
                  likeCount={item.postLikes}
                  isCompleted={item.isSold}
                  isLiked={false}
                />
              </div>
            ))}
          </div>
          <SectionDivider className="my-6" />
          <h2 className="font-body-semibold mb-4">신고 진행 과정</h2>
          {selectedItem && (
            <ul className="flex flex-col gap-6">
              {TIMELINE_STEPS.map((step, idx) => {
                // 현재 진행중인 단계 index 계산
                const currentStepIdx = 1; 
                return (
                  <TimelineItem
                    key={step.key}
                    label={step.label}
                    text={step.getText()}
                    date={step.getDate()}
                    color={idx <= currentStepIdx ? 'main' : 'gray'}
                    isLast={idx === TIMELINE_STEPS.length - 1}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
