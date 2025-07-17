'use client';

import { useEffect, useState } from 'react';

import { ImageUp } from 'lucide-react';

import { getCategoryByPartner } from '@/pages/trade/register/gifticon/lib/getCategoryByPartner';
import { usePostTradeGifticonMutation } from '@/pages/trade/register/gifticon/model/mutations';
import { toRawPrice } from '@/shared/lib/formatPrice';
import { BuyButton } from '@/shared/ui/BuyButton';
import { InputField } from '@/shared/ui/InputField';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import type { GifticonCategory } from '@/pages/trade/register/gifticon/lib/types';

export function TradeCouponRegisterForm() {
  const [ocrResult, setOcrResult] = useState({
    title: '메가커피 아메리카노',
    partner: '메가MGC커피',
    couponNumber: 'MGC123456789',
    deadLine: '2025-07-19',
    issueDate: '2025-06-18',
    image: 'no-image',
  });

  const [price, setPrice] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState<GifticonCategory | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = usePostTradeGifticonMutation();

  useEffect(() => {
    const cat = getCategoryByPartner(ocrResult.partner);
    if (cat) setCategory(cat);
  }, [ocrResult.partner]);

  const handleSubmit = () => {
    if (!category || !price || !imageFile) return;

    setIsSubmitting(true);

    const file = 'no-image';

    mutate(
      {
        title: ocrResult.title,
        partner: ocrResult.partner,
        couponNumber: ocrResult.couponNumber,
        deadLine: new Date(ocrResult.deadLine).toISOString(),
        issueDate: new Date(ocrResult.issueDate).toISOString(),
        file,
        category,
        price: toRawPrice(price),
        comment,
      },
      {
        onSuccess: () => setIsSubmitting(false),
      },
    );
  };

  const isFormValid = !!(category && price && imageFile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // 수정 필요
        setOcrResult({
          title: 'OCR 상품명',
          partner: 'OCR 제휴사',
          couponNumber: 'OCR123456',
          deadLine: '2025-12-31',
          issueDate: '2025-01-01',
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-4 pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="relative w-[380px] h-[330px] border-2 border-[var(--gray-light)] shadow-sm rounded-2xl overflow-hidden cursor-pointer">
        {imagePreview ? (
          <img src={imagePreview} alt="이미지 미리보기" className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <ImageUp size={30} color="var(--point-1)" />
            <span className="text-[var(--gray-dark)]">이미지 파일 업로드</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      {imageFile && (
        <p className="text-[16px] text-[var(--gray-mid)] mb-4">이미지 선택됨: {imageFile.name}</p>
      )}
      <InputField
        label="상품명"
        readOnly
        variant="ocr"
        value={ocrResult.title}
        placeholder="상품명"
      />
      <InputField
        label="제휴사"
        readOnly
        variant="ocr"
        value={ocrResult.partner}
        placeholder="제휴사명"
      />
      <InputField
        label="카테고리"
        readOnly
        variant="ocr"
        value={category ?? ''}
        placeholder="카테고리"
      />
      <InputField
        label="쿠폰번호"
        readOnly
        variant="ocr"
        value={ocrResult.couponNumber}
        placeholder="쿠폰 번호"
      />
      <InputField
        label="발급일"
        readOnly
        variant="ocr"
        value={ocrResult.issueDate}
        placeholder="발급일"
      />
      <InputField
        label="유효기간"
        readOnly
        variant="ocr"
        value={ocrResult.deadLine}
        placeholder="유효기간"
      />
      <InputField
        label="판매 가격"
        isRequired
        variant="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="판매 가격"
        errorMessage="가격을 입력해주세요."
      />
      <TextAreaField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="설명 (선택)"
      />
      <BuyButton
        type="submit"
        loading={isSubmitting}
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        등록하기
      </BuyButton>
    </form>
  );
}
