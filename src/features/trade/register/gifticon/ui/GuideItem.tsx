import Image from 'next/image';

export default function GuideItem({ title, image }: { title: string; image: string }) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-2 px-1">
        <p className="font-label-medium text-[var(--black)] break-words leading-tight">
          {`・ ${title}`}
        </p>
      </div>

      <div className="relative w-full aspect-[3/5] mb-6 rounded-xl overflow-hidden border border-[var(--gray-light)] shadow-sm bg-white mx-auto max-w-[320px]">
        <Image src={image} alt={title} fill sizes="320px" className="object-contain" />
        <div className="absolute bottom-2 left-2 bg-[var(--black)]/60 text-white font-small-regular px-2 py-1 rounded">
          올바른 예시
        </div>
      </div>
    </div>
  );
}
