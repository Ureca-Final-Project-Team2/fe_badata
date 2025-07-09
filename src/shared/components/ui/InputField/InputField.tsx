'use client';

import React from 'react';
import { InputFieldProps } from '@/shared/components/ui/InputField/InputField.types';
import { inputVariants } from '@/shared/components/ui/InputField/InputField.variants';
import { cn } from '@lib/cn';

export const InputField: React.FC<InputFieldProps> = ({
  variant = 'user',
  icon,
  className,
  errorMessage,
  isRequired = false,
  value,
  ...props
}) => {
  const hasError = isRequired && !value?.toString().trim();

  const baseStyle = inputVariants[variant];
  const borderColor = hasError
    ? 'border-[var(--point-1)]'
    : variant === 'user'
      ? 'border-[var(--gray-light)]'
      : '';

  return (
    <div className="w-[380px]">
      <div className="relative h-[45px]">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          className={cn(
            baseStyle,
            borderColor,
            icon ? 'pl-10' : 'pl-4', // 아이콘 있을 때는 40px, 없을 땐 16px
            'pr-4',
            className,
          )}
          value={value}
          {...props}
        />
      </div>
      {hasError && errorMessage && (
        <p className="text-[12px] text-[var(--red)] mt-1 pl-4">{errorMessage}</p>
      )}
    </div>
  );
};
