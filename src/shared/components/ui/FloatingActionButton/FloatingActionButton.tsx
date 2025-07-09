import React, { useState } from 'react';

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
      {mode === 'expand' && open && actions.length > 0 && (
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
        onClick={handleTriggerClick}
        className={
          mode === 'expand' && open
            ? 'w-12 h-12 rounded-full bg-[var(--main-1)] text-white text-[20px] flex items-center justify-center shadow-md'
            : 'min-w-[120px] h-[50px] rounded-full bg-[var(--main-1)] text-white text-[20px] flex items-center justify-center gap-2 px-4 shadow-md'
        }
      >
        {mode === 'expand' && open ? (
          'x'
        ) : (
          <>
            {triggerAction.icon}
            {triggerAction.label}
          </>
        )}
      </button>
    </div>
  );
}
