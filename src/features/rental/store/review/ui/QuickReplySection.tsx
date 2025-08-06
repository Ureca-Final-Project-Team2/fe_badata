import { useMemo } from 'react';

import Image from 'next/image';

import { CheckIcon } from 'lucide-react';

import { ICONS } from '@/shared/config/iconPath';

import type { QuickReplyCount } from '@/features/rental/store/review/lib/types';

interface QuickReplySectionProps {
  quickReplies: QuickReplyCount[];
}

const QuickReplyProgressBar = ({
  text,
  count,
  percentage,
}: {
  text: string;
  count: number;
  percentage: number;
}) => {
  return (
    <div className="mb-2 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <span className="font-caption-regular text-[var(--gray-dark)]">{text}</span>
        <span className="font-small-regular text-[var(--gray-mid)]">{count}개</span>
      </div>

      <div className="w-full bg-[var(--gray-light)] rounded-full h-[20px]">
        <div
          className="bg-[var(--main-2)] h-[20px] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function QuickReplySection({ quickReplies }: QuickReplySectionProps) {
  const totalQuickReplyCount = quickReplies.reduce((acc, cur) => acc + cur.count, 0);

  const top3QuickReplies = useMemo(() => {
    return [...quickReplies].sort((a, b) => b.count - a.count).slice(0, 3);
  }, [quickReplies]);

  const quickRepliesWithPercentage = top3QuickReplies.map((item) => ({
    ...item,
    percentage: totalQuickReplyCount > 0 ? (item.count / totalQuickReplyCount) * 100 : 0,
  }));

  return (
    <div className="mb-6">
      <h2 className="font-body-semibold text-[var(--black)] my-2">이런 점이 특히 좋았어요!</h2>
      <div className="border border-[var(--gray)] px-4 py-2 rounded-lg">
        {totalQuickReplyCount > 0 ? (
          <div>
            {quickRepliesWithPercentage.map((item, index) => (
              <QuickReplyProgressBar
                key={index}
                text={item.quickReplyName}
                count={item.count}
                percentage={item.percentage}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            {/* 리뷰 아이콘 */}
            <Image
              src={ICONS.MYPAGE.COIN}
              alt="review"
              width={64}
              height={64}
              className="w-16 h-16 mb-4"
              loading="lazy"
              decoding="async"
            />

            {/* 메인 메시지 */}
            <h3 className="font-body-semibold text-[var(--black)] text-center mb-2">
              첫 리뷰를 작성해보세요!
            </h3>

            {/* 서브 메시지 */}
            <p className="font-caption-regular text-[var(--gray-mid)] text-center leading-relaxed">
              리뷰를 작성하면{' '}
              <span className="text-[var(--main-5)] font-caption-semibold">포인트</span>를 적립할 수
              있어요
            </p>

            {/* 포인트 아이콘과 함께 추가 메시지 */}
            <div className="flex items-center mt-3 gap-2">
              <CheckIcon className="w-4 h-4 text-[var(--main-5)]" />
              <span className="font-small-regular text-[var(--gray-dark)]">
                다른 고객님들에게 도움이 되는 리뷰를 남겨보세요
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
