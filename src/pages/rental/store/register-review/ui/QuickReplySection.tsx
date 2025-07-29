import type { QuickReply } from '@/pages/rental/store/register-review/lib/types';

interface QuickReplySectionProps {
  quickReplies: QuickReply[];
  selectedQuickReplies: number[];
  onQuickReplyToggle: (quickReplyId: number) => void;
}

export default function QuickReplySection({
  quickReplies,
  selectedQuickReplies,
  onQuickReplyToggle,
}: QuickReplySectionProps) {
  return (
    <div className="bg-[var(--main-1)] rounded-2xl mb-6 p-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-label-semibold">어떤 점이 좋았나요?</h3>
        <span className="bg-[var(--main-3)] text-white font-small-regular px-2 rounded-full">
          필수
        </span>
      </div>

      <p className="font-small-regular text-[var(--gray-mid)] mb-4">
        이곳에 어울리는 키워드를 골라주세요 (1개~5개)
      </p>

      <div className="flex flex-wrap gap-3">
        {quickReplies.map((reply) => {
          const isSelected = selectedQuickReplies.includes(reply.quickReplyId);
          return (
            <button
              key={reply.quickReplyId}
              type="button"
              onClick={() => onQuickReplyToggle(reply.quickReplyId)}
              className={`px-2.5 py-1.5 rounded-sm text-left transition-all duration-200 font-caption-regular ${
                isSelected
                  ? 'bg-[var(--main-2)] border border-[var(--main-2)]'
                  : 'bg-[var(--white)] border border-[var(--white)] hover:border-[var(--gray-light)] text-[var(--gray-dark)]'
              }`}
            >
              <div className="flex items-center gap-2">{reply.quickReplyName}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
