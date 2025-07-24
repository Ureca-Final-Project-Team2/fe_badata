import Image from 'next/image';

interface ImageSectionProps {
  imageUrl: string;
}

export default function ImageSection({ imageUrl }: ImageSectionProps) {
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
