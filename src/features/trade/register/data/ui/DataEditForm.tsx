import { useEffect, useReducer } from 'react';

import { useRouter } from 'next/navigation';

import { useUpdateDataPostMutation } from '@/entities/trade-post/model/mutations';
import { useTradePostDetailQuery } from '@/entities/trade-post/model/queries';
import { initialState, reducer } from '@/features/trade/register/data/model/dataRegisterReducer';
import { PATH } from '@/shared/config/path';
import { formatPrice, toRawPrice } from '@/shared/lib/formatPrice';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

interface DataEditFormProps {
  postId: number;
}

export function TradeDataEditForm({ postId }: DataEditFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = useUpdateDataPostMutation();
  const { post, isLoading, error } = useTradePostDetailQuery(postId);
  const router = useRouter();

  // 게시물 상세 정보를 폼에 자동으로 채우기
  useEffect(() => {
    if (post) {
      const postData = post;
      dispatch({ type: 'CHANGE_FIELD', field: 'title', value: postData.title || '' });
      dispatch({ type: 'CHANGE_FIELD', field: 'comment', value: postData.comment || '' });
      dispatch({
        type: 'CHANGE_FIELD',
        field: 'price',
        value: formatPrice(postData.price.toString()),
      });
    }
  }, [post]);

  const handleSubmit = () => {
    const { price, comment, title } = state.form;
    if (!price || !title) return;

    dispatch({ type: 'SET_SUBMITTING', value: true });
    mutate(
      {
        postId,
        data: {
          title: title || '',
          comment: comment || '',
          price: toRawPrice(price),
        },
      },
      {
        onSuccess: () => {
          router.push(PATH.TRADE.DATA_DETAIL.replace(':id', String(postId)));
        },
        onError: (error) => {
          console.error('수정 실패:', error);
        },
        onSettled: () => dispatch({ type: 'SET_SUBMITTING', value: false }),
      },
    );
  };

  const isFormValid = !!state.form.price && !!state.form.title;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">로딩 중...</div>;
  }

  if (error) {
    console.error('DataEditForm error:', error);
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
    <div className="flex flex-col h-full">
      <form
        className="flex flex-col items-center gap-4 pt-4 flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* 기존 정보 표시 (읽기 전용) */}
        <div className="w-full max-w-md space-y-4">
          <InputField
            label="만료일"
            value={post.deadLine}
            disabled
            className="bg-[var(--gray-light)]"
          />
          <InputField
            label="용량"
            value={post.capacity || '정보 없음'}
            disabled
            className="bg-[var(--gray-light)]"
          />
          <InputField
            label="통신사"
            value={post.mobileCarrier || '정보 없음'}
            disabled
            className="bg-[var(--gray-light)]"
          />
        </div>

        {/* 수정 가능한 필드들 */}
        <div className="w-full max-w-md space-y-4">
          <InputField
            label="제목"
            isRequired
            value={state.form.title}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_FIELD', field: 'title', value: e.target.value })
            }
            placeholder="제목을 입력해주세요"
            errorMessage="제목을 입력해주세요."
            className="border-[var(--main-3)]"
          />
          <InputField
            label="판매 가격"
            isRequired
            variant="price"
            value={state.form.price}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_FIELD', field: 'price', value: e.target.value })
            }
            placeholder="판매 가격"
            errorMessage="가격을 입력해주세요."
            className="bg-[var(--white)] border-[var(--main-3)]"
          />
          <TextAreaField
            label="설명"
            value={state.form.comment}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_FIELD', field: 'comment', value: e.target.value })
            }
            placeholder="설명 (선택)"
            className="border-[var(--main-3)]"
          />
        </div>
      </form>

      {/* 고정된 버튼 위치 */}
      <div className="pb-6 pt-4">
        <RegisterButton
          type="submit"
          loading={state.isSubmitting}
          isFormValid={isFormValid}
          size="lg_thin"
          onClick={handleSubmit}
        >
          수정하기
        </RegisterButton>
      </div>
    </div>
  );
}
