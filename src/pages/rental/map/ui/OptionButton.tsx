import React, { useState } from 'react';

interface OptionButtonProps {
  children: React.ReactNode;
}

export const OptionButton = ({ children }: OptionButtonProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      className={`w-[85px] h-[34px] rounded-full flex items-center justify-center font-body-medium  border-none shadow-none transition-colors duration-150 ${
        selected ? 'bg-[var(--main-5)] text-white' : 'bg-white text-[var(--main-5)]'
      } `}
      type="button"
      onClick={() => setSelected((prev) => !prev)}
    >
      {children}
    </button>
  );
};

export default OptionButton;
