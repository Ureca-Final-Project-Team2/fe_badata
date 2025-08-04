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
      className="group relative w-[160px] h-[180px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[var(--gray-light)] transition-all duration-300 ease-out hover:scale-[1.02]"
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={`${rank}위 - ${title}`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="absolute top-2 left-2 z-20 text-white text-[36px] font-head-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none transition-transform duration-300 group-hover:scale-110">
        {rank}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[var(--main-5)]/70 via-[var(--main-5)]/30 to-transparent z-10 transition-opacity duration-300 group-hover:from-[var(--main-5)]/80" />

      <div className="absolute bottom-2 left-2 right-2 z-20 text-white font-label-semibold drop-shadow-md line-clamp-2 transition-transform duration-300 group-hover:translate-y-[-2px]">
        {title}
      </div>

      <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/5 rounded-xl pointer-events-none" />
    </div>
  );
}
