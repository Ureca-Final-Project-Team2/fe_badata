import React from 'react';

export interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
  className?: string;
}

const OptionButtonComponent = ({
  selected = false,
  children,
  className = '',
  ...rest
}: OptionButtonProps) => (
  <button
    type="button"
    className={`w-[85px] h-[34px] rounded-full flex items-center justify-center font-label-semilbold border-none shadow-none transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--main-5)] ${
      selected ? 'bg-[var(--main-5)] text-white' : 'bg-white text-[var(--main-5)]'
    } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

OptionButtonComponent.displayName = 'OptionButton';

export const OptionButton = React.memo(OptionButtonComponent);

export default OptionButton;
