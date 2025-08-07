import React from 'react';

interface InfoActionProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

function InfoAction({ icon, label, active, onClick, href, disabled }: InfoActionProps) {
  const content = (
    <div
      className={` flex flex-col items-center flex-1 py-2 transition-opacity ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="h-[30px] flex items-center justify-center mb-2">{icon}</div>
      <span
        className={`font-label-regular transition-colors ${
          active ? 'text-[var(--main-5)]' : 'text-[var(--gray-dark)]'
        }`}
      >
        {label}
      </span>
    </div>
  );

  return href ? (
    <a href={href} className="flex-1" style={{ textDecoration: 'none' }}>
      {content}
    </a>
  ) : (
    content
  );
}

export default React.memo(InfoAction);
