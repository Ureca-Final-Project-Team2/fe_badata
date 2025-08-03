import Image from 'next/image';

interface RankingItemProps {
  rank: number;
  imageUrl: string;
  title: string;
  onCardClick?: () => void;
}

export default function RankingItem({ rank, imageUrl, title, onCardClick }: RankingItemProps) {
  return (
    <div
      onClick={onCardClick}
      className="relative w-[160px] h-[180px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[var(--gray-light)] transition-transform duration-300 hover:scale-[1.05]"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute top-2 left-2 z-20 text-white text-[36px] font-head-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">
        {rank}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black/60 to-transparent z-10" />

      <div className="absolute bottom-2 left-2 z-20 text-white font-label-semibold drop-shadow-md line-clamp-2">
        {title}
      </div>
    </div>
  );
}
