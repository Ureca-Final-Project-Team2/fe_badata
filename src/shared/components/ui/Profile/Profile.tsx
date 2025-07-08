import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/cn';

const profileVariants = cva('inline-flex items-center transition-colors', {
  variants: {
    size: {
      sm: 'w-[320px] h-[56px] px-4 gap-3',
      md: 'w-[380px] h-[70px] px-4 gap-4',
      lg: 'w-[440px] h-[80px] px-5 gap-5',
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

export interface ProfileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileVariants> {
  name: string;
  avatar?: string;
  showCloseButton?: boolean;
  onClose?: () => void;

  subtitle?: string;
  showFollowButton?: boolean;
  isFollowing?: boolean;
  onFollowClick?: () => void;
}

export const Profile = React.forwardRef<HTMLDivElement, ProfileProps>(
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
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(profileVariants({ size }), className)} ref={ref} {...props}>
        {/* Avatar */}
        {avatar ? (
          <img src={avatar} alt={`${name} avatar`} className={avatarVariants({ size })} />
        ) : (
          <div className={cn(avatarVariants({ size }), 'flex items-center justify-center')}>
            <span className="text-[var(--gray-dark)] font-semibold text-xl">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[20px] text-black truncate">{name}</div>
          {size === 'sm' && subtitle && (
            <div className="font-light text-[12px] text-[var(--gray-dark)] truncate">
              {subtitle}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {showFollowButton && size === 'sm' && (
            <button
              onClick={onFollowClick}
              className={followButtonVariants({
                followState: isFollowing ? 'following' : 'follow',
              })}
              type="button"
            >
              {isFollowing ? '팔로잉' : '팔로우'}
            </button>
          )}

          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-[var(--gray-light)] rounded-full transition-colors flex-shrink-0 w-6 h-6 flex items-center justify-center"
              type="button"
            >
              <span className="text-[var(--gray-mid)] text-lg leading-none">×</span>
            </button>
          )}
        </div>
      </div>
    );
  },
);

Profile.displayName = 'Profile';
