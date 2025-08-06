'use client';

import React from 'react';

import { cn } from '@/shared/lib/cn';
import { formatPrice } from '@/shared/lib/formatPrice';

import { inputVariants } from './index';

import type { InputFieldProps } from './index';

export const InputField: React.FC<InputFieldProps> = ({
  label,
  variant = 'user',
  icon,
  className,
  errorMessage,
  isRequired = false,
  value,
  onChange,
  ...props
}) => {
  const isPrice = variant === 'price';
  const hasError = isRequired && !value?.toString().trim();

  const baseStyle = inputVariants[variant];
  const borderColor = hasError
    ? 'border-[var(--main-5)]'
    : variant === 'user'
      ? 'border-[var(--gray-light)]'
      : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const rawValue = e.target.value;

    if (isPrice) {
      const formatted = formatPrice(rawValue);
      onChange({ ...e, target: { ...e.target, value: formatted } });
    } else {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-[14px] text-[var(--gray-dark)] font-medium mb-1 inline-block">
          {label}
          {isRequired && <span className="text-[var(--main-5)] ml-1">*</span>}
        </label>
      )}
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
          onChange={handleChange}
          inputMode={isPrice ? 'numeric' : undefined}
          {...props}
        />
      </div>
      {hasError && errorMessage && (
        <p className="text-[12px] text-[var(--red)] mt-1 pl-4">{errorMessage}</p>
      )}
    </div>
  );
};
