import { useEffect, useReducer } from 'react';

import { useRouter } from 'next/navigation';

import {
  useTradePostDetailQuery,
  useUpdateTradePostMutation,
} from '@/entities/trade-post/model/queries';
import {
  initialState,
  reducer,
} from '@/pages/trade/register/gifticon/model/gifticonRegisterReducer';
import { PATH } from '@/shared/config/path';
import { formatPrice, toRawPrice } from '@/shared/lib/formatPrice';
import { makeToast } from '@/shared/lib/makeToast';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import type { State } from '@/pages/trade/register/gifticon/model/gifticonRegisterReducer';

interface GifticonEditFormProps {
  postId: number;
}

export function TradeGifticonEditForm({ postId }: GifticonEditFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = useUpdateTradePostMutation();
  const { post, isLoading, error } = useTradePostDetailQuery(postId);
  const router = useRouter();

  // 게시물 상세 정보를 폼에 자동으로 채우기
  useEffect(() => {
    if (post) {
      // axios interceptor에서 이미 content를 반환하므로 post 자체가 content입니다
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
          makeToast('게시물이 성공적으로 수정되었습니다!', 'success');
          router.push(`${PATH.TRADE.GIFTICON}/${postId}`);
        },
        onError: (error) => {
          console.error('수정 실패:', error);
          makeToast('게시물 수정에 실패했습니다.', 'warning');
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
      <div className="flex justify-center items-center h-64 text-red-500">
        게시물 정보를 불러올 수 없습니다.
        <br />
        <span className="text-sm">에러: {error.message}</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        게시물 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <form
      className="flex flex-col items-center gap-4 pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <InputField
        label="판매 가격"
        isRequired
        variant="price"
        value={state.form.price}
        onChange={handleFieldChange('price')}
        placeholder="판매 가격"
        errorMessage="가격을 입력해주세요."
      />
      <TextAreaField
        value={state.form.comment}
        onChange={handleFieldChange('comment')}
        placeholder="설명 (선택)"
      />
      <RegisterButton type="submit" loading={state.isSubmitting} isFormValid={isFormValid}>
        수정하기
      </RegisterButton>
    </form>
  );
}
