import type React from 'react';
import { useReducer } from 'react';

import { useRouter } from 'next/navigation';

import { usePostReviewMutation } from '@/features/rental/store/register-review/model/mutations';
import {
  useQuickReplies,
  useReservationDetails,
} from '@/features/rental/store/register-review/model/queries';
import {
  initialState,
  reviewFormReducer,
} from '@/features/rental/store/register-review/model/reviewFormReducer';
import CommentSection from '@/features/rental/store/register-review/ui/CommentSection';
import ImageUploadSection from '@/features/rental/store/register-review/ui/ImageUploadSection';
import QuickReplySection from '@/features/rental/store/register-review/ui/QuickReplySection';
import RatingSection from '@/features/rental/store/register-review/ui/RatingSection';
import ReservationDetailsSection from '@/features/rental/store/register-review/ui/ReservationDetailsSection';
import { PATH } from '@/shared/config/path';
import { makeToast } from '@/shared/lib/makeToast';
import { RegisterButton } from '@/shared/ui/RegisterButton';

interface ReviewRegisterFormProps {
  reservationId: number;
}
export default function ReviewRegisterForm({ reservationId }: ReviewRegisterFormProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reviewFormReducer, initialState);

  const { data: quickRepliesData, isLoading: isQuickRepliesLoading } = useQuickReplies();
  const { data: reservationDetailsData, isLoading: isReservationDetailsLoading } =
    useReservationDetails(reservationId);

  const postReviewMutation = usePostReviewMutation();

  const handleRatingChange = (rating: number) => {
    dispatch({ type: 'SET_RATING', payload: rating });
  };

  const handleQuickReplyToggle = (quickReplyId: number) => {
    dispatch({ type: 'TOGGLE_QUICK_REPLY', payload: quickReplyId });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_COMMENT', payload: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    dispatch({ type: 'SET_IMAGE', payload: file });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const isFormValid =
    state.rating > 0 &&
    state.rating <= 5 &&
    state.selectedQuickReplies.length >= 1 &&
    state.comment.trim().length > 0 &&
    state.comment.length <= 255;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      makeToast('폼이 유효하지 않습니다.', 'warning');
      return;
    }

    const reviewData = {
      rating: state.rating,
      quickReplyIds: state.selectedQuickReplies,
      comment: state.comment.trim(),
      file: state.image,
    };

    postReviewMutation.mutate(
      { reservationId, reviewData },
      {
        onSuccess: () => {
          makeToast('리뷰가 등록되었습니다!', 'success');
          handleReset();
          router.push(
            PATH.RENTAL.STORE_DETAIL.replace(':storeId', String(reservationDetailsData?.storeId)),
          );
        },
        onError: (error) => {
          console.error('리뷰 등록 실패: ', error);
          makeToast('리뷰 등록에 실패했습니다.', 'warning');
        },
      },
    );
  };

  if (isQuickRepliesLoading || isReservationDetailsLoading) {
    return <div>로딩 중...</div>;
  }

  if (!quickRepliesData || !reservationDetailsData) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }
  return (
    <>
      <ReservationDetailsSection reservationDetails={reservationDetailsData} />
      <RatingSection rating={state.rating} onRatingChange={handleRatingChange} />
      <QuickReplySection
        quickReplies={quickRepliesData}
        selectedQuickReplies={state.selectedQuickReplies}
        onQuickReplyToggle={handleQuickReplyToggle}
      />
      <ImageUploadSection selectedImage={state.image} onImageChange={handleImageChange} />
      <CommentSection comment={state.comment} onCommentChange={handleCommentChange} />
      <RegisterButton
        isFormValid={isFormValid}
        type="button"
        onClick={handleSubmit}
        variant="primary"
        size="lg"
      >
        등록하기
      </RegisterButton>
    </>
  );
}
