import { useEffect, useReducer } from 'react';

import { useRouter } from 'next/navigation';

import { useUpdateGifticonPostMutation } from '@/entities/trade-post/model/mutations';
import { useTradePostDetailQuery } from '@/entities/trade-post/model/queries';
import {
  initialState,
  reducer,
} from '@/pages/trade/register/gifticon/model/gifticonRegisterReducer';
import { PATH } from '@/shared/config/path';
import { formatPrice, toRawPrice } from '@/shared/lib/formatPrice';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import type { State } from '@/pages/trade/register/gifticon/model/gifticonRegisterReducer';

interface GifticonEditFormProps {
  postId: number;
}

export function TradeGifticonEditForm({ postId }: GifticonEditFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = useUpdateGifticonPostMutation();
  const { post, isLoading, error } = useTradePostDetailQuery(postId);
  const router = useRouter();

  // 게시물 상세 정보를 폼에 자동으로 채우기
  useEffect(() => {
    if (post) {
      const postData = post;
      dispatch({ type: 'CHANGE_FIELD', field: 'comment', value: postData.comment || '' });
      dispatch({
        type: 'CHANGE_FIELD',
        field: 'price',
        value: formatPrice(postData.price.toString()),
      });
    }
  }, [post]);

  const handleFieldChange =
    (field: keyof State['form']) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'CHANGE_FIELD', field, value: e.target.value });
    };

  const handleSubmit = () => {
    if (!state.form.price) return;

    dispatch({ type: 'SET_SUBMITTING', value: true });
    mutate(
      {
        postId,
        data: {
          comment: state.form.comment || '',
          price: toRawPrice(state.form.price),
        },
      },
      {
        onSuccess: () => {
          router.push(`${PATH.TRADE.GIFTICON}/${postId}`);
        },
        onError: (error) => {
          console.error('수정 실패:', error);
        },
        onSettled: () => dispatch({ type: 'SET_SUBMITTING', value: false }),
      },
    );
  };

  const isFormValid = !!state.form.price;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">로딩 중...</div>;
  }

  if (error) {
    console.error('GifticonEditForm error:', error);
    return (
      <div className="flex justify-center items-center h-64 text-[var(--red)]">
        게시물 정보를 불러올 수 없습니다.
        <br />
        <span className="text-sm">에러: {error.message}</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-64 text-[var(--red)]">
        게시물 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <form
      className="flex flex-col items-center gap-4 pt-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* 기존 정보 표시 (읽기 전용) */}
      <div className="w-full max-w-md space-y-4">
        <InputField label="제목" value={post.title} disabled className="bg-[var(--gray-light)]" />
        <InputField
          label="만료일"
          value={post.deadLine}
          disabled
          className="bg-[var(--gray-light)]"
        />
        <InputField
          label="발행일"
          value={post.issueDate || '정보 없음'}
          disabled
          className="bg-[var(--gray-light)]"
        />
        <InputField
          label="파트너"
          value={post.partner || '정보 없음'}
          disabled
          className="bg-[var(--gray-light)]"
        />
      </div>

      {/* 수정 가능한 필드들 */}
      <div className="w-full max-w-md space-y-4">
        <InputField
          label="판매 가격"
          isRequired
          variant="price"
          value={state.form.price}
          onChange={handleFieldChange('price')}
          placeholder="판매 가격"
          errorMessage="가격을 입력해주세요."
          className="bg-[var(--white)] border-[var(--main-3)]"
        />
        <TextAreaField
          value={state.form.comment}
          onChange={handleFieldChange('comment')}
          placeholder="설명 (선택)"
          className="border-[var(--main-3)]"
        />
      </div>

      <RegisterButton
        type="submit"
        loading={state.isSubmitting}
        isFormValid={isFormValid}
        size="lg_thin"
      >
        수정하기
      </RegisterButton>
    </form>
  );
}
