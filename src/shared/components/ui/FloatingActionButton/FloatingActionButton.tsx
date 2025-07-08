import React, { useState } from 'react';

export interface FABAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  actions: [FABAction, FABAction];
}

export function FloatingActionButton({ actions }: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end">
      {open && (
        <div className="mb-2 overflow-hidden flex flex-col rounded-[20px] border bg-[var(--main-1)] shadow-md divide-y divide-white">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className="w-[120px] h-[50px] flex items-center justify-between px-4 py-2 text-white text-[20px]"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-[var(--main-1)] text-white text-[20px] flex items-center justify-center shadow-md"
      >
        {open ? '✕' : '+'}
      </button>
    </div>
  );
}
