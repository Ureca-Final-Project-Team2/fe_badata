import { useState } from 'react';
import { ImageUp } from 'lucide-react';
import { usePostTradeDataMutation } from '@features/trade/model/useTradeMutations';
import { InputField } from '@ui/InputField';
import { BuyButton } from '@ui/BuyButton';
import { TextAreaField } from '@ui/TextAreaField';
import { toRawPrice } from '@utils/formatPrice';

export function TradeDataRegisterForm() {
  const [form, setForm] = useState({
    title: '',
    deadLine: '',
    capacity: '',
    price: '',
    comment: '',
    file: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = usePostTradeDataMutation();

  const handleSubmit = () => {
    if (!form.title || !form.deadLine || !form.capacity || !form.price || !imageFile) return;

    setIsSubmitting(true);

    const file = 'no-image';

    mutate(
      {
        title: form.title,
        mobileCarrier: 'LGU+',
        deadLine: new Date(form.deadLine).toISOString(),
        capacity: Number(form.capacity),
        price: toRawPrice(form.price),
        comment: form.comment,
        file,
      },
      {
        onSettled: () => setIsSubmitting(false),
      },
    );
  };

  const isFormValid = form.title && form.deadLine && form.capacity && form.price && imageFile;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
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
