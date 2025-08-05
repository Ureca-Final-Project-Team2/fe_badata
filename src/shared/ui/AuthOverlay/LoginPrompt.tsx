'use client';

import { Coins, Star } from 'lucide-react';

interface LoginPromptProps {
  onLogin: () => void;
  buttonText?: string;
  className?: string;
  noMargin?: boolean;
}

export const LoginPrompt = ({
  onLogin,
  buttonText = '카카오로 3초만에 시작하기',
  className = '',
}: LoginPromptProps) => {
  return (
    <div className={`bg-[var(--white)] rounded-2xl overflow-hidden max-w-[400px]} ${className}`}>
      {/* 헤더 배경 */}
      <div className="bg-gradient-to-r from-[var(--main-4)] to-[var(--main-5)] px-6 pt-8 pb-6 relative">
        <div className="text-center text-[var(--white)]">
          <h2 className="font-body-semibold mb-2">어? 잠깐! 🙋‍♀️</h2>
          <p className="font-small-semibold opacity-90">로그인하고 더 많은 기능을 이용해보세요!</p>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="px-6 py-6">
        {/* 혜택 안내 */}
        <div className="mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[var(--main-1)] rounded-lg">
              <div className="w-8 h-8 bg-[var(--main-4)] rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-[var(--white)]" />
              </div>
              <div>
                <p className="font-small-semibold text-[var(--black)]">거래 게시물 맞춤 추천</p>
                <p className="text-xs text-[var(--gray-dark)]">나에게 딱 맞는 거래를 찾아드려요</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[var(--main-1)] rounded-lg">
              <div className="w-8 h-8 bg-[var(--main-5)] rounded-full flex items-center justify-center flex-shrink-0">
                <Coins className="w-4 h-4 text-[var(--white)]" />
              </div>
              <div>
                <p className="font-small-medium text-[var(--black)] text-sm">리워드 코인 사용</p>
                <p className="text-xs text-[var(--gray-dark)]">
                  활동하며 쌓은 코인으로 혜택을 받아요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={onLogin}
          className="cursor-pointer w-full h-12 bg-yellow-400 hover:bg-yellow-300 text-[var(--black)] text-center font-small-semibold rounded-xl transition-colors shadow-sm"
        >
          {buttonText}
        </button>

        <p className="text-xs text-[var(--gray-mid)] text-center mt-3">
          간편하고 안전한 카카오 로그인으로 시작해보세요
        </p>
      </div>
    </div>
  );
};
