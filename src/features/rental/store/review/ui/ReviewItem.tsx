import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { MoreHorizontal } from 'lucide-react';

import { useDeleteReviewMutation } from '@/features/rental/store/register-review/model/mutations';
import { formatDateToDash } from '@/features/rental/store/review/lib/utils';
import { ICONS } from '@/shared/config/iconPath';
import { PATH } from '@/shared/config/path';
import { Drawer, DrawerButton } from '@/shared/ui/Drawer';
import { Profile } from '@/shared/ui/Profile';

import type { ReviewItem as ReviewItemType } from '@/features/rental/store/review/lib/types.ts';

interface ReviewItemProps {
  review: ReviewItemType;
  isOwner: boolean;
}

const QuickReplyTag = ({ text }: { text: string }) => {
  return (
    <span className="inline-block px-3 py-1 bg-[var(--main-3)] font-small-medium rounded-sm">
      {text}
    </span>
  );
};

export default function ReviewItem({ review, isOwner }: ReviewItemProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const deleteReviewMutation = useDeleteReviewMutation();

  const handleEdit = () => {
    setIsDrawerOpen(false);
    router.push(`${PATH.RENTAL.REGISTER_REVIEW}?mode=edit&reviewId=${review.reviewId}`);
  };

  const handleDelete = () => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      deleteReviewMutation.mutate(review.reviewId);
    }
  };

  const maxLength = 100;
  const shouldShowMore = review.comment.length > maxLength;
  const displayText =
    isExpanded || !shouldShowMore ? review.comment : review.comment.slice(0, maxLength) + '...';

  const formattedDate = formatDateToDash(review.rentalStartDate);

  return (
    <>
      <div className="relative border-b border-[var(--gray-light)] pb-6 mb-6 last:border-b-0">
        <Profile
          avatar={review.userImageUrl}
          name={review.name}
          size="sm"
          bottomContent={
            <>
              <div className="flex items-center gap-1">
                <img src={ICONS.ETC.LIKE_ACTIVE.src} width={18} height={18} alt="별점" />
                <span className="font-label-medium text-[var(--main-5)]">
                  {review.rating.toFixed(1)}
                </span>
              </div>
              <span className="font-caption-regular text-[var(--gray-dark)]">
                {formattedDate} · {review.countOfVisit}번째 방문
              </span>
            </>
          }
        />

        {isOwner && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="absolute top-0 right-0 p-2 hover:bg-[var(--gray-light)] rounded-full"
          >
            <MoreHorizontal width={20} height={20} />
          </button>
        )}

        {review.reviewImageUrl && (
          <div className="mt-4 mb-2">
            <img
              src={review.reviewImageUrl}
              alt="리뷰 이미지"
              className="w-full h-full object-contain rounded-lg bg-[var(--gray-light)]"
            />
          </div>
        )}

        <div className="flex flex-row gap-4">
          {review.reservedDeviceOnReviewResponses.map((device, index) => (
            <span
              key={index}
              className="inline-block my-2 px-3 py-1 bg-[var(--gray-light)] text-[var(--black)] font-small-regular rounded-sm"
            >
              <span className="text-[var(--main-5)] font-small-semibold">
                {device.dataCapacity}GB&nbsp;
              </span>
              {device.deviceName}
            </span>
          ))}
        </div>
        <div className="mb-4 space-y-2">
          <p className="font-label-regular leading-relaxed whitespace-pre-wrap break-all">
            {displayText}
          </p>
          {shouldShowMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[var(--gray-mid)] font-small-regular hover:underline mt-1"
            >
              {isExpanded ? '접기' : '더보기'}
            </button>
          )}

          {review.quickReplyNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {review.quickReplyNames.map((tag, index) => (
                <QuickReplyTag key={index} text={tag} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="space-y-2">
          <div>
            <DrawerButton onClick={handleEdit}>리뷰 수정</DrawerButton>
            <DrawerButton onClick={handleDelete} variant="point">
              리뷰 삭제
            </DrawerButton>
          </div>

          <div>
            <DrawerButton onClick={() => setIsDrawerOpen(false)} variant="close">
              닫기
            </DrawerButton>
          </div>
        </div>
      </Drawer>
    </>
  );
}
