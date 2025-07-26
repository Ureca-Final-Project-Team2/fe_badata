'use client';

import React from 'react';

import { cn } from '@/shared/lib/cn';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  isRequired = false,
  errorMessage,
  value,
  className,
  ...props
}) => {
  const hasError = isRequired && (!value || (typeof value === 'string' && value.trim() === ''));

  return (
    <div className="w-[380px]">
      {label && (
        <label className="block text-[14px] font-medium text-[var(--gray-dark)] mb-2">
          {label}
          {isRequired && <span className="text-[var(--red)] ml-1">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          'w-full h-[100px] rounded-[10px] px-4 py-3 bg-gray-light border text-[16px] font-normal text-black font-sans resize-none',
          hasError ? 'border-[var(--main-5)]' : 'border-[var(--gray-light)]',
          className,
        )}
        value={value}
        {...props}
      />
      {hasError && errorMessage && (
        <p className="text-[12px] text-[var(--red)] mt-1 pl-[10px]">{errorMessage}</p>
      )}
    </div>
  );
};
