import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface BuyButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'outline':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'font-medium rounded-lg transition-colors duration-200',
        getVariantStyles(),
        getSizeStyles(),
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'opacity-70 cursor-wait',
        className,
      )}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>처리중...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default BuyButton;
