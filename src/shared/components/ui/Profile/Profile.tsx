import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/cn';
import type { HTMLAttributes } from 'react';

const profileVariants = cva('inline-flex items-center transition-colors', {
  variants: {
    size: {
      sm: 'w-[380px] h-[56px] gap-3',
      md: 'w-[380px] h-[70px] gap-4',
      lg: 'w-[440px] h-[80px] gap-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const avatarVariants = cva('rounded-full object-cover flex-shrink-0 bg-[var(--gray)]', {
  variants: {
    size: {
      sm: 'w-[56px] h-[56px]',
      md: 'w-[70px] h-[70px]',
      lg: 'w-[80px] h-[80px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const followButtonVariants = cva(
  'w-[80px] h-[30px] rounded-[10px] text-white text-[16px] font-normal flex items-center justify-center transition-colors',
  {
    variants: {
      followState: {
        following: 'bg-[var(--gray-mid)]',
        follow: 'bg-[var(--main-1)]',
      },
    },
    defaultVariants: {
      followState: 'follow',
    },
  },
);

type Size = VariantProps<typeof profileVariants>['size'];

type ProfileProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof profileVariants> & {
    name: string;
    avatar?: string;
    showCloseButton?: boolean;
    onClose?: () => void;
    subtitle?: string;
    showFollowButton?: boolean;
    isFollowing?: boolean;
    onFollowClick?: () => void;
    avatarSize?: Size;
  };

type AvatarProps = {
  name: string;
  avatar?: string;
  size?: Size;
};

function Avatar({ name, avatar, size }: AvatarProps) {
  return avatar ? (
    <img src={avatar} alt={`${name} avatar`} className={avatarVariants({ size })} />
  ) : (
    <div className={cn(avatarVariants({ size }), 'flex items-center justify-center')}>
      <span className="text-[var(--gray-dark)] font-semibold text-xl">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function FollowButton({ isFollowing, onClick }: { isFollowing: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={followButtonVariants({
        followState: isFollowing ? 'following' : 'follow',
      })}
      type="button"
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
}

function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-[var(--gray-light)] rounded-full transition-colors flex-shrink-0 w-6 h-6 flex items-center justify-center"
      type="button"
    >
      <span className="text-[var(--gray-mid)] text-lg leading-none">×</span>
    </button>
  );
}

export const Profile = forwardRef<HTMLDivElement, ProfileProps>(
  (
    {
      className,
      size = 'md',
      name,
      avatar,
      showCloseButton = false,
      onClose,
      subtitle,
      showFollowButton = false,
      isFollowing = false,
      onFollowClick,
      avatarSize,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(profileVariants({ size }), className)} ref={ref} {...props}>
        <Avatar name={name} avatar={avatar} size={avatarSize || size} />

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[20px] text-black truncate">{name}</div>
          {size === 'sm' && subtitle && (
            <div className="font-light text-[12px] text-[var(--gray-dark)] truncate">
              {subtitle}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {showFollowButton && <FollowButton isFollowing={isFollowing} onClick={onFollowClick} />}
          {showCloseButton && <CloseButton onClick={onClose} />}
        </div>
      </div>
    );
  },
);

Profile.displayName = 'Profile';
