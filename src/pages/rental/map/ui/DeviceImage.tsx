import Image from 'next/image';

interface DeviceImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export default function DeviceImage({ url, alt = 'device', className }: DeviceImageProps) {
  return (
    <div className={`relative w-full h-full ${className ?? ''}`}>
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover m-0 p-0 block"
        draggable={false}
        sizes="100vw"
        priority
      />
    </div>
  );
}
