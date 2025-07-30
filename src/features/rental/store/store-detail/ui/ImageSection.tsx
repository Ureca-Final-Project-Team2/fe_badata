import React from 'react';

import Image from 'next/image';

interface ImageSectionProps {
  imageUrl: string;
}

function ImageSection({ imageUrl }: ImageSectionProps) {
  return (
    <div className="w-full h-[220px] mb-4 flex items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt="매장 이미지"
        width={400}
        height={140}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

// React.memo로 최적화하여 imageUrl이 변경되지 않으면 리렌더링 방지
export default React.memo(ImageSection);
