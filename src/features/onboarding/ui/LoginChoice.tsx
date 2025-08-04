'use client';

import { useRouter } from 'next/navigation';

interface LoginChoiceProps {
  onComplete: () => void;
}

export function LoginChoice({ onComplete }: LoginChoiceProps) {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 페이지로 이동
    router.push('/auth/kakao');
  };

  const handleGuestMode = () => {
    // 온보딩 완료 상태를 저장
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('guestMode', 'true');

    // 홈으로 이동
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col items-center justify-center px-8 text-center">
      {/* 아이콘 */}
      <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mb-8">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">바다타를 시작해보세요</h1>

      {/* 설명 */}
      <p className="text-lg text-gray-600 mb-12 leading-relaxed">
        로그인하여 모든 기능을 이용하거나
        <br />
        게스트 모드로 둘러보세요
      </p>

      {/* 선택 버튼들 */}
      <div className="w-full max-w-sm space-y-4">
        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full px-8 py-4 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>카카오로 로그인</span>
        </button>

        {/* 구분선 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-purple-50 text-gray-500">또는</span>
          </div>
        </div>

        {/* 게스트 모드 버튼 */}
        <button
          onClick={handleGuestMode}
          className="w-full px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>게스트로 둘러보기</span>
        </button>
      </div>

      {/* 기능 비교 */}
      <div className="mt-12 w-full max-w-sm">
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">기능 비교</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">서비스 둘러보기</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">좋아요/팔로우</span>
              <span className="text-red-500">✗</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">거래/대여</span>
              <span className="text-red-500">✗</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SOS 기능</span>
              <span className="text-red-500">✗</span>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="mt-8 p-4 bg-white/30 rounded-lg">
        <p className="text-sm text-gray-600">언제든지 설정에서 로그인할 수 있습니다</p>
      </div>
    </div>
  );
}
