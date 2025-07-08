import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

const profileVariants = cva(
  'inline-flex items-center bg-white rounded-lg transition-colors border border-gray-200',
  {
    variants: {
      variant: {
        default: 'w-[380px] h-[70px] px-4 gap-4',
        compact: 'w-[380px] h-[56px] px-4 gap-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const avatarVariants = cva('rounded-full object-cover flex-shrink-0 bg-gray-200', {
  variants: {
    variant: {
      default: 'w-[70px] h-[70px]',
      compact: 'w-[56px] h-[56px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const followButtonVariants = cva(
  'rounded text-white transition-colors w-[40px] h-[20px] flex items-center justify-center text-[16px] font-normal',
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
      variant,
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
      <div className={cn(profileVariants({ variant }), className)} ref={ref} {...props}>
        {/* Avatar */}
        {avatar ? (
          <img src={avatar} alt={`${name} avatar`} className={avatarVariants({ variant })} />
        ) : (
          <div className={cn(avatarVariants({ variant }), 'flex items-center justify-center')}>
            <span className="text-gray-600 font-semibold text-xl">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[20px] text-black truncate">{name}</div>
          {variant === 'compact' && subtitle && (
            <div className="font-light text-[12px] text-gray-600 truncate">{subtitle}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {showFollowButton && variant === 'compact' && (
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
              className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 w-6 h-6 flex items-center justify-center"
              type="button"
            >
              <span className="text-gray-500 text-lg leading-none">×</span>
            </button>
          )}
        </div>
      </div>
    );
  },
);

Profile.displayName = 'Profile';
