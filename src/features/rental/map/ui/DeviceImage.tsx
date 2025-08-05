import Image from 'next/image';

interface DeviceImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export default function DeviceImage({ url, alt = 'device', className }: DeviceImageProps) {
  // 외부 URL인지 확인
  const isExternalUrl = url.startsWith('http');

  return (
    <div className={`relative w-full h-full ${className ?? ''}`}>
      {isExternalUrl ? (
        // 외부 URL은 일반 img 태그 사용
        <img
          src={url}
          alt={alt}
          className="object-cover m-0 p-0 block w-full h-full"
          draggable={false}
          sizes="100vw"
        />
      ) : (
        // 내부 이미지는 Next.js Image 사용
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover m-0 p-0 block"
          draggable={false}
          sizes="100vw"
          priority
        />
      )}
    </div>
  );
}
