'use client';

import { useEffect, useState } from 'react';

import { ICONS } from '@/shared/config/iconPath';

interface InAppNotificationProps {
  title: string;
  content: string;
  duration?: number;
  onClose?: () => void;
}

export const InAppNotification = ({
  title,
  content,
  duration = 5000,
  onClose,
}: InAppNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg">
      <div className="bg-[var(--black)] rounded-2xl px-4 py-3 flex items-center gap-5 shadow-lg">
        {/* BADATA 로고 아이콘 */}
        <div className="w-8 h-8 flex items-center justify-center">
          {!imageError ? (
            <img
              src={ICONS.LOGO.BADATA}
              alt="BADATA"
              className="w-6 h-6 object-contain"
              onError={() => {
                console.error('로고 이미지 로드 실패');
                setImageError(true);
              }}
            />
          ) : (
            <div className="w-6 h-6 bg-[var(--main-4)] rounded-full flex items-center justify-center">
              <span className="text-[var(--black)] text-xs font-bold">B</span>
            </div>
          )}
        </div>

        {/* 텍스트 내용 */}
        <div className="flex-1 text-[var(--main-4)]">
          <div className="font-small-semibold">{title}</div>
          <div className="text-[var(--white)] font-small-regular">{content}</div>
        </div>
      </div>
    </div>
  );
};
