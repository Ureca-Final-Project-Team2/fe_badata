import { LikeButton } from '@/shared/ui/LikeButton/LikeButton';

interface LikeButtonCircleProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  size?: 'sm' | 'md';
  shadow?: boolean;
}

export function LikeButtonCircle({
  active = false,
  onClick,
  className,
  size = 'md',
  shadow = true,
}: LikeButtonCircleProps) {
  return (
    <div
      className={`rounded-full bg-white flex items-center justify-center ${className ?? ''} ${size === 'sm' ? 'w-6 h-6' : 'w-14 h-14'}${shadow ? ' shadow-lg' : ''}`}
    >
      <LikeButton active={active} onClick={onClick} size={size} />
    </div>
  );
}
