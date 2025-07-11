import React, { useState } from 'react';
import { cn } from '@lib/cn';

export interface FABAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

type FloatingActionButtonMode = 'single' | 'expand';

interface FloatingActionButtonProps {
  mode: FloatingActionButtonMode;
  triggerAction: FABAction;
  actions: FABAction[]; // expand 모드에서만 사용
}

export function FloatingActionButton({
  mode = 'expand',
  triggerAction,
  actions = [],
}: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);

  const handleTriggerClick = () => {
    if (mode === 'single') {
      triggerAction.onClick();
    } else {
      setOpen((prev) => !prev);
    }
  };
  return (
    <div className="flex flex-col items-end">
      {mode === 'expand' && (
        <div
          className={cn(
            'mb-2 flex flex-col rounded-[20px] border bg-[var(--main-1)] shadow-md divide-y divide-white transition-all duration-150',
            open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
          )}
        >
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className="w-[120px] h-[46px] flex items-center justify-between px-4 py-2 text-white text-[18px] font-semibold"
            >
              <span className="w-[18px] h-[18px] flex items-center justify-center text-[16px]">
                {action.icon}
              </span>
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={handleTriggerClick}
        className={
          mode === 'expand' && open
            ? 'w-12 h-12 rounded-full bg-[var(--main-1)] text-white text-[18px] flex items-center justify-center shadow-md'
            : 'min-w-[100px] h-[46px] rounded-full bg-[var(--main-1)] text-white text-[18px] font-semibold flex items-center justify-center gap-1 px-4 shadow-md'
        }
      >
        {mode === 'expand' && open ? (
          'x'
        ) : (
          <>
            <span className="w-[18px] h-[18px] flex items-center justify-center text-[16px]">
              {triggerAction.icon}
            </span>
            {triggerAction.label}
          </>
        )}
      </button>
    </div>
  );
}
