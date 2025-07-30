import { Pencil } from 'lucide-react';

interface CommentSectionProps {
  comment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CommentSection({ comment, onCommentChange }: CommentSectionProps) {
  const maxLength = 255;
  const currentLength = comment.length;
  const isOverLimit = currentLength > maxLength;

  return (
    <div className="bg-[var(--main-1)] rounded-2xl mb-6 p-4 relative">
      <div className="flex items-center gap-2 mb-2">
        <Pencil size={16} color="var(--main-5)" />
        <p className="font-label-semibold text-[var(--gray-dark)]">리뷰를 작성해주세요</p>
      </div>
      <textarea
        value={comment}
        onChange={onCommentChange}
        placeholder={`실제 구매 및 사용 경험을 바탕으로 리뷰를 작성해주세요.\n허위 사실 유포나 비방 목적의 리뷰는 삭제될 수 있으며, 관련 법규에 따라 처벌받을 수 있습니다.`}
        className={`w-full min-h-[120px] resize-y rounded-xl placeholder-[var(--gray-mid)] font-caption-regular transition-colors ${
          isOverLimit ? 'border border-[var(--red)]' : 'border border-[var(--main-1)]'
        } focus:outline-none no-scrollbar`}
      />

      <div
        className={`absolute bottom-3 right-3 font-small-regular ${isOverLimit ? 'text-[var(--red)]' : 'text-[var(--gray-mid)]'}`}
      >
        {currentLength} / {maxLength}
      </div>

      {isOverLimit && (
        <p className="font-caption-regular text-[var(--red)] mt-2">
          최대 {maxLength}자까지 입력 가능합니다.
        </p>
      )}
    </div>
  );
}
