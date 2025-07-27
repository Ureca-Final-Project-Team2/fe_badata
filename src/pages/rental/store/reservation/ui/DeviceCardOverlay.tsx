import React from 'react';

import { BellRing } from 'lucide-react';

interface DeviceCardOverlayProps {
  notifyActive: boolean;
  onNotifyToggle: () => void;
}

const DeviceCardOverlay: React.FC<DeviceCardOverlayProps> = ({ notifyActive, onNotifyToggle }) => {
  return (
    <>
      <div
        className={`absolute inset-0 z-10 backdrop-blur-[8px] transition-colors duration-200 ${
          notifyActive ? 'bg-[var(--main-5)]/60' : 'bg-white/40'
        }`}
      />
      <button
        type="button"
        className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full focus:outline-none"
        onClick={onNotifyToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNotifyToggle();
          }
        }}
        tabIndex={0}
      >
        <BellRing
          size={40}
          className={`mb-2 transition-colors duration-200 ${
            notifyActive ? 'text-white fill-white' : 'text-[var(--main-5)] fill-[var(--main-5)]'
          }`}
        />
        <span
          className={`font-title-semibold transition-colors duration-200 ${
            notifyActive ? 'text-white' : 'text-[var(--main-5)]'
          }`}
        >
          {notifyActive ? '알림 신청 완료' : '재입고 알림 신청'}
        </span>
      </button>
    </>
  );
};

export default React.memo(DeviceCardOverlay);
