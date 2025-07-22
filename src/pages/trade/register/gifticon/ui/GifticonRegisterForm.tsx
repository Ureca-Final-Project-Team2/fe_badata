'use client';

import { useEffect, useReducer } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ImageUp } from 'lucide-react';

import { getCategoryByPartner } from '@/pages/trade/register/gifticon/lib/getCategoryByPartner';
import {
  initialState,
  reducer,
} from '@/pages/trade/register/gifticon/model/gifticonRegisterReducer';
import { usePostTradeGifticonMutation } from '@/pages/trade/register/gifticon/model/mutations';
import { PATH } from '@/shared/config/path';
import { toRawPrice } from '@/shared/lib/formatPrice';
import { makeToast } from '@/shared/lib/makeToast';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import type { PostTradeGifticonRequest } from '@/pages/trade/register/gifticon/lib/types';
import type { State } from '@/pages/trade/register/gifticon/model/gifticonRegisterReducer';

export function TradeGifticonRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = usePostTradeGifticonMutation();
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
        alert('jpeg 파일만 업로드 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'SET_IMAGE_FILE',
          payload: { file, preview: reader.result as string },
        });
        // OCR 결과 예시 반영
        dispatch({
          type: 'SET_OCR_RESULT',
          payload: {
            title: 'OCR 상품명',
            partner: 'OCR 제휴사',
            gifticonNumber: 'OCR123456',
            deadLine: '2025-12-31',
            issueDate: '2025-01-01T00:00:00.099',
            image: reader.result as string,
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
      deadLine: state.ocrResult.deadLine,
      issueDate: state.ocrResult.issueDate,
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
        router.push(PATH.TRADE.GIFTICON);
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
        />
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
        label="발급일"
        readOnly
        variant="ocr"
        value={state.ocrResult.issueDate}
        placeholder="발급일"
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
