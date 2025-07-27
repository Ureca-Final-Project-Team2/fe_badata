import type { QuickReplyCount } from '../lib/types';

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

  const top3QuickReplies = quickReplies.sort((a, b) => b.count - a.count).slice(0, 3);

  const quickRepliesWithPercentage = top3QuickReplies.map((item) => ({
    ...item,
    percentage: totalQuickReplyCount > 0 ? (item.count / totalQuickReplyCount) * 100 : 0,
  }));

  return (
    <div className="mb-6">
      <h2 className="font-body-semibold text-[var(--black)] mb-1">이런 점이 특히 좋았어요!</h2>
      <div className="border border-[var(--gray)] px-4 py-2 rounded-lg">
        {totalQuickReplyCount > 0 && (
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
        )}
      </div>
    </div>
  );
}
