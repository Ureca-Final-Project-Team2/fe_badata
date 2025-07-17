import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'ocr' | 'user' | 'address' | 'price';
  icon?: ReactNode;
  className?: string;
  errorMessage?: string; // 에러 문구
  isRequired?: boolean; // 필수 입력 여부
}
