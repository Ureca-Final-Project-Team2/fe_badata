'use client';

import { useEffect, useReducer } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ImageUp } from 'lucide-react';

import { getCategoryByPartner } from '@/features/trade/register/gifticon/lib/getCategoryByPartner';
import {
  initialState,
  reducer,
} from '@/features/trade/register/gifticon/model/gifticonRegisterReducer';
import {
  usePostTradeGifticonMutation,
  useValidateGifticonImageMutation,
} from '@/features/trade/register/gifticon/model/mutations';
import { PATH } from '@/shared/config/path';
import { toRawPrice } from '@/shared/lib/formatPrice';
import { makeToast } from '@/shared/lib/makeToast';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import type {
  PostTradeGifticonRequest,
  ValidationResponse,
} from '@/features/trade/register/gifticon/lib/types';
import type { State } from '@/features/trade/register/gifticon/model/gifticonRegisterReducer';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';

export function TradeGifticonRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = usePostTradeGifticonMutation();
  const { mutate: validateImage, isPending: isValidating } = useValidateGifticonImageMutation();
  const router = useRouter();

  useEffect(() => {
    const cat = getCategoryByPartner(state.ocrResult.partner);
    if (cat) dispatch({ type: 'SET_CATEGORY', payload: cat });
  }, [state.ocrResult.partner]);

  const handleFieldChange =
    (field: keyof State['form']) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'CHANGE_FIELD', field, value: e.target.value });
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/jpeg') {
        makeToast('jpeg 파일만 업로드 가능합니다.', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => {
        makeToast('이미지 파일을 읽는데 실패했습니다.', 'warning');
      };
      reader.onloadend = () => {
        dispatch({
          type: 'SET_IMAGE_FILE',
          payload: { file, preview: reader.result as string },
        });

        // 이미지 유효성 검증 API 호출
        validateImage(file, {
          onSuccess: (data: ApiResponse<ValidationResponse>) => {
            makeToast('유효한 기프티콘 이미지입니다.', 'success');

            dispatch({
              type: 'SET_OCR_RESULT',
              payload: {
                title: data.content.couponName,
                partner: data.content.partner,
                gifticonNumber: data.content.barcode,
                deadLine: data.content.expirationDate,
              },
            });
          },
          onError: (error) => {
            console.error('이미지 검증 실패:', error);
            makeToast('조작된 이미지이거나 유효하지 않은 기프티콘입니다.', 'warning');
            dispatch({ type: 'RESET_IMAGE' });
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!state.category || !state.form.price || !state.imageFile) return;

    dispatch({ type: 'SET_SUBMITTING', value: true });
    const basePayload: Omit<PostTradeGifticonRequest, 'comment'> = {
      title: state.ocrResult.title,
      partner: state.ocrResult.partner,
      gifticonNumber: state.ocrResult.gifticonNumber,
      deadLine: state.ocrResult.deadLine.replace(/^(\d{4})\.(\d{2})\.(\d{2})$/, '$1-$2-$3'), // 2025.09.31 -> 2025-09-31로 변환,
      file: state.imageFile,
      category: state.category,
      price: toRawPrice(state.form.price),
    };

    const payload: PostTradeGifticonRequest =
      state.form.comment.trim() !== ''
        ? { ...basePayload, comment: state.form.comment }
        : basePayload;

    mutate(payload, {
      onSuccess: () => {
        makeToast('게시물이 성공적으로 등록되었습니다!', 'success');
        dispatch({ type: 'RESET' });
        router.push(`${PATH.TRADE.MAIN}?page=gifticon`);
      },
      onError: () => {
        makeToast('게시물 등록에 실패했습니다.', 'warning');
      },
      onSettled: () => dispatch({ type: 'SET_SUBMITTING', value: false }),
    });
  };

  const isFormValid = !!(state.category && state.form.price && state.imageFile);

  return (
    <form
      className="flex flex-col items-center gap-4 pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="relative w-[380px] h-[330px] border-2 border-[var(--gray-light)] shadow-sm rounded-2xl overflow-hidden cursor-pointer">
        {state.imagePreview ? (
          <Image
            src={state.imagePreview}
            width={380}
            height={330}
            alt="이미지 미리보기"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <ImageUp size={30} color="var(--main-5)" />
            <span className="text-[var(--gray-dark)]">이미지 파일 업로드</span>
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isValidating}
        />
        {isValidating && (
          <div className="absolute inset-0 bg-[var(--black)]/50 flex items-center justify-center">
            <div className="text-white">이미지 검증 중...</div>
          </div>
        )}
      </label>
      {state.imageFile && (
        <p className="text-[16px] text-[var(--gray-mid)] mb-4">
          이미지 선택됨: {state.imageFile.name}
        </p>
      )}
      <InputField
        label="상품명"
        readOnly
        variant="ocr"
        value={state.ocrResult.title}
        placeholder="상품명"
      />
      <InputField
        label="제휴사"
        readOnly
        variant="ocr"
        value={state.ocrResult.partner}
        placeholder="제휴사명"
      />
      <InputField
        label="카테고리"
        readOnly
        variant="ocr"
        value={state.category ?? ''}
        placeholder="카테고리"
      />
      <InputField
        label="쿠폰번호"
        readOnly
        variant="ocr"
        value={state.ocrResult.gifticonNumber}
        placeholder="쿠폰 번호"
      />
      <InputField
        label="유효기간"
        readOnly
        variant="ocr"
        value={state.ocrResult.deadLine}
        placeholder="유효기간"
      />
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
        등록하기
      </RegisterButton>
    </form>
  );
}
