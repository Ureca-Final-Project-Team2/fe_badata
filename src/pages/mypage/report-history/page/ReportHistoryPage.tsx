'use client';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

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

  return (
    <BaseLayout header={<PageHeader title="신고 내역" onBack={() => router.back()} />} showBottomNav>
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-1">
        <div className="px-4 pt-6 pb-24">
          <h2 className="font-body-semibold mb-4">신고 게시물</h2>
          <TradePostCard
            imageUrl="/assets/trade-sample.png"
            title="올리브영 기프티콘"
            partner="올리브영"
            price={10000}
            likeCount={12}
            isCompleted={true}
            isLiked={false}
          />

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
