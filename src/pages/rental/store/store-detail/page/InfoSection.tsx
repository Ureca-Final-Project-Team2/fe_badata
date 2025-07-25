import Image from 'next/image';

import { Phone, Share } from 'lucide-react';

import { ICONS } from '@/shared/config/iconPath';

interface InfoSectionProps {
  reviewRating: number;
  distanceFromMe: number;
  phoneNumber: string;
  liked: boolean;
  onLikeToggle: () => void;
}

interface InfoActionProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

function InfoAction({ icon, label, active, onClick, href }: InfoActionProps) {
  const content = (
    <div className="flex flex-col items-center flex-1 py-2 cursor-pointer" onClick={onClick}>
      <div className="h-[30px] flex items-center justify-center mb-2">{icon}</div>
      <span
        className={`font-label-regular transition-colors ${active ? 'text-[var(--main-5)]' : 'text-[var(--gray-dark)]'}`}
      >
        {label}
      </span>
    </div>
  );
  return href ? (
    <a href={href} className="flex-1" style={{ textDecoration: 'none' }}>
      {content}
    </a>
  ) : (
    content
  );
}

export default function InfoSection({
  reviewRating,
  distanceFromMe,
  phoneNumber,
  liked,
  onLikeToggle,
}: InfoSectionProps) {
  // 찜 상태에 따라 아이콘 선택
  const likeIcon = liked ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE;
  const likeStoreIcon = typeof likeIcon === 'string' ? likeIcon : likeIcon.src;

  const ratingIcon =
    typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
      ? ICONS.ETC.LIKE_NONACTIVE
      : ICONS.ETC.LIKE_NONACTIVE.src;

  return (
    <div className="w-full bg-[var(--white)] flex flex-col items-center mb-4">
      <div className="flex items-center w-full justify-between mb-2">
        <div className="flex items-center gap-1">
          <Image src={ratingIcon} alt="평점" width={30} height={30} />
          <span className="font-label-semibold">{reviewRating.toFixed(1)}</span>
        </div>
        <span className="font-label-regular text-[var(--black)] pr-4">
          나와의 거리{' '}
          <span className="text-[var(--main-5)] font-label-semibold">
            {distanceFromMe.toFixed(1)}m
          </span>
        </span>
      </div>
      {/* 구분선 위 */}
      <div className="w-full border-t border-[var(--gray-light)] my-2" />
      <div className="flex items-stretch w-full relative">
        <InfoAction
          icon={<Phone size={24} className="text-[var(--gray-dark)]" />}
          label="전화"
          href={`tel:${phoneNumber}`}
        />
        <div className="w-px bg-[var(--gray-light)] mx-2" />
        <InfoAction
          icon={<Image src={likeStoreIcon} alt="찜" width={30} height={30} />}
          label="찜"
          active={liked}
          onClick={onLikeToggle}
        />
        <div className="w-px bg-[var(--gray-light)] mx-2" />
        <InfoAction icon={<Share size={24} className="text-[var(--gray-dark)]" />} label="공유" />
      </div>
      {/* 구분선 아래 */}
      <div className="w-full border-t border-[var(--gray-light)] mt-2" />
      <div className="w-full flex justify-start mt-2"></div>
    </div>
  );
}
