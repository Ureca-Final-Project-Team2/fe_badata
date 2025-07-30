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
    aria-pressed={selected}
    className={`min-w-[80px] px-2.5 py-1 rounded-full flex items-center justify-center font-label-semibold border-none shadow-none transition-colors duration-150 focus:outline-none ${
      selected ? 'focus:ring-2 focus:ring-[var(--main-5)]' : ''
    } ${selected ? 'bg-[var(--main-5)] text-white' : 'bg-white text-[var(--main-5)]'} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

OptionButtonComponent.displayName = 'OptionButton';

export const OptionButton = React.memo(OptionButtonComponent);

export default OptionButton;
