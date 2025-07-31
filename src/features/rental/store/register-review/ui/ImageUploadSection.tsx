import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Upload } from 'lucide-react';

interface ImageUploadSectionProps {
  selectedImage: File | string | undefined;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploadSection({
  selectedImage,
  onImageChange,
}: ImageUploadSectionProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }

    if (typeof selectedImage === 'string') {
      setPreviewUrl(selectedImage);
    } else {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  return (
    <div className="mb-6 bg-[var(--main-1)] rounded-2xl p-4 text-center">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />

      {selectedImage && previewUrl ? (
        <div className="space-y-2">
          <div className="mx-auto w-[300px] h-[140px] rounded-lg overflow-hidden bg-[var(--main-2)]">
            <Image
              src={previewUrl}
              width={200}
              height={160}
              alt="이미지 미리보기"
              className="w-full h-full object-contain"
            />
          </div>
          <label
            htmlFor="image-upload"
            className="inline-block text-[var(--gray-mid)] font-caption-regular cursor-pointer hover:underline"
          >
            다른 사진 선택
          </label>
        </div>
      ) : (
        <div className="space-y-2 flex flex-col items-center">
          <label
            htmlFor="image-upload"
            className="w-12 h-12 flex items-center justify-center bg-white text-[var(--main-3)] rounded-full cursor-pointer hover:bg-[var(--main-1)] transition-colors"
          >
            <Upload size={28} />
          </label>
          <p className="font-label-semibold">사진을 추가해주세요</p>
        </div>
      )}
    </div>
  );
}
