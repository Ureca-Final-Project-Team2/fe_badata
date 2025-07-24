'use client';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import { useMyReports } from '../model/useMyReportHooks';
import { useTradeDetailsQuery } from '../model/useTradeDetailsQuery';


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
  const { data: reportData, isLoading, isError } = useMyReports('ANSWER');
  
  const reports = reportData?.item ?? [];
  const postIds = reports.map((report) => report.postId);
  const postDetailsQueries = useTradeDetailsQuery(postIds);

  const handleBack = () => {
    router.back();
  };

  return (
    <BaseLayout header={<PageHeader title="신고 내역" onBack={handleBack} />} showBottomNav>
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div className="px-4 pt-6 pb-24">
          <h2 className="font-body-semibold mb-4">신고 게시물</h2>
          {reports.map((report, idx) => {
            const postDetail = postDetailsQueries[idx]?.data?.post;
            const isPostLoading = postDetailsQueries[idx]?.isLoading;
            const isPostError = postDetailsQueries[idx]?.isError;

            return (
              <div key={report.postId} className="mb-8">
                {isPostLoading ? (
                  <p>게시물 불러오는 중...</p>
                ) : postDetail ? (
                  <TradePostCard
                    imageUrl={postDetail.postImage ?? '/assets/default.png'}
                    title={postDetail.title}
                    partner={postDetail.partner || '판매자'}
                    price={postDetail.price}
                    likeCount={postDetail.likesCount}
                    isCompleted={postDetail.isSold}
                    isLiked={postDetail.isLiked}
                  />
                ) : (
                  <p className="text-gray-500 text-sm">거래 게시물 정보를 불러오지 못했습니다.</p>
                )}
                {/* 타임라인 등 추가 가능 */}
              </div>
            );
          })}
          <h2 className="font-body-semibold mt-8 mb-4">신고 진행 과정</h2>
          <ul className="flex flex-col gap-6">
            <TimelineItem label="판매" text="구매 결제" date="2025-07-07 17:07" color="gray" />
            <TimelineItem
              label="문의"
              text="타인 사용 및 취소"
              date="2025-07-09 11:21"
              color="main"
            />
            <TimelineItem
              label="답변"
              text="사용 불가(환불 처리)"
              date="2025-07-10 11:11"
              color="gray"
            />
            <TimelineItem
              label="완료"
              text="환불 요청"
              date="2025-07-10 15:32"
              color="gray"
              isLast={true}
            />
          </ul>
        </div>
      </div>
    </BaseLayout>
  );
}
