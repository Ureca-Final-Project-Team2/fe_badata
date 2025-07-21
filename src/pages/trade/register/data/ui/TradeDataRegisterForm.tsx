import { useState } from 'react';

import { toRawPrice } from '@/shared/lib/formatPrice';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import { usePostTradeDataMutation } from '../model/mutations';

export function TradeDataRegisterForm() {
  const [form, setForm] = useState({
    title: '',
    deadLine: '',
    capacity: '',
    price: '',
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = usePostTradeDataMutation();

  const handleSubmit = () => {
    if (!form.title || !form.deadLine || !form.capacity || !form.price) return;

    setIsSubmitting(true);

    mutate(
      {
        title: form.title,
        mobileCarrier: 'UPLUS',
        deadLine: form.deadLine,
        capacity: Number(form.capacity),
        price: toRawPrice(form.price),
        comment: form.comment,
      },
      {
        onSettled: () => setIsSubmitting(false),
      },
    );
  };

  const isFormValid = !!(form.title && form.deadLine && form.capacity && form.price);

  return (
    <form
      className="flex flex-col items-center gap-4 pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <InputField
        label="데이터 상품명"
        isRequired
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="데이터 상품명"
        errorMessage="상품명을 입력해주세요."
      />
      <InputField label="통신사" value="LGU+" readOnly variant="ocr" />

      <InputField
        label="만료일"
        isRequired
        type="date"
        value={form.deadLine}
        onChange={(e) => setForm({ ...form, deadLine: e.target.value })}
        placeholder="만료일"
        errorMessage="만료일을 입력해주세요."
      />
      <InputField
        label="데이터 용량"
        isRequired
        type="number"
        value={form.capacity}
        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        placeholder="용량 (MB)"
        errorMessage="용량을 입력해주세요."
      />
      <InputField
        label="판매 가격"
        isRequired
        variant="price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="판매 가격"
        errorMessage="가격을 입력해주세요."
      />
      <TextAreaField
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        placeholder="설명 (선택)"
      />

      <RegisterButton type="submit" loading={isSubmitting} isFormValid={isFormValid}>
        등록하기
      </RegisterButton>
    </form>
  );
}
