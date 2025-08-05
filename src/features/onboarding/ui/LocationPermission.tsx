'use client';

import { useState } from 'react';

import { useLocationContext } from '@/shared/contexts/LocationContext';

interface LocationPermissionProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function LocationPermission({ onComplete, onSkip }: LocationPermissionProps) {
  const [permissionStatus, setPermissionStatus] = useState<
    'idle' | 'requesting' | 'granted' | 'denied'
  >('idle');
  const [error, setError] = useState<string>('');
  const { setUserLocation } = useLocationContext();

  const requestLocationPermission = async () => {
    setPermissionStatus('requesting');
    setError('');

    try {
      // 브라우저가 위치 권한을 지원하는지 확인
      if (!navigator.geolocation) {
        setError('이 브라우저는 위치 서비스를 지원하지 않습니다.');
        setPermissionStatus('denied');
        return;
      }

      // 위치 권한 요청
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      // 권한이 승인되면 위치 정보를 Context를 통해 저장
      if (position) {
        const { latitude, longitude } = position.coords;
        const locationData = {
          latitude,
          longitude,
          timestamp: Date.now(),
        };

        // Context를 통해 위치 정보 저장
        setUserLocation(locationData);
      }

      setPermissionStatus('granted');

      // 잠시 후 다음 단계로 이동
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('위치 권한 요청 실패:', error);

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('위치 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('위치 정보를 사용할 수 없습니다.');
            break;
          case error.TIMEOUT:
            setError('위치 정보 요청 시간이 초과되었습니다.');
            break;
          default:
            setError('위치 정보를 가져오는 중 오류가 발생했습니다.');
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }

      setPermissionStatus('denied');
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const handleRetry = () => {
    setPermissionStatus('idle');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-8 text-center">
      {/* 아이콘 */}
      <div className="w-24 h-24 bg-[var(--main-5)] rounded-full flex items-center justify-center mb-8">
        <svg
          className="w-12 h-12 text-[var(--white)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      {/* 제목 */}
      <h1 className="font-title-bold text-[var(--black)] mb-4">위치 정보가 필요합니다</h1>

      {/* 설명 */}
      <p className="font-label-medium text-[var(--gray-dark)] mb-8 leading-relaxed">
        주변 매장을 찾기 위해
        <br />
        위치 정보 접근 권한이 필요합니다
      </p>

      {/* 권한 상태에 따른 UI */}
      {permissionStatus === 'idle' && (
        <div className="space-y-4">
          <button
            onClick={requestLocationPermission}
            className="w-full px-8 py-4 bg-[var(--main-5)] rounded-full text-[var(--white)] font-label-medium hover:bg-[var(--main-4)] transition-colors"
          >
            위치 권한 허용하기
          </button>
          <button
            onClick={handleSkip}
            className="w-full px-8 py-4 text-[var(--gray-dark)] font-label-medium hover:text-[var(--black)] transition-colors"
          >
            나중에 설정하기
          </button>
        </div>
      )}

      {permissionStatus === 'requesting' && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-[var(--main-5)] rounded-full animate-bounce"></div>
            <div
              className="w-4 h-4 bg-[var(--main-5)] rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-4 h-4 bg-[var(--main-5)] rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <p className="font-label-medium text-[var(--gray-dark)]">
            위치 권한을 요청하고 있습니다...
          </p>
        </div>
      )}

      {permissionStatus === 'granted' && (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-[var(--green)] rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-[var(--white)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="font-label-medium text-[var(--green)]">위치 권한이 허용되었습니다!</p>
        </div>
      )}

      {permissionStatus === 'denied' && (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-[var(--red)] rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-[var(--white)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {error && <p className="font-label-medium text-[var(--red)] mb-4">{error}</p>}
          <div className="space-y-2">
            <button
              onClick={handleRetry}
              className="w-full px-8 py-4 bg-[var(--main-5)] rounded-full text-[var(--white)] font-label-medium hover:bg-[var(--main-4)] transition-colors"
            >
              다시 시도하기
            </button>
            <button
              onClick={handleSkip}
              className="w-full px-8 py-4 text-[var(--gray-dark)] font-label-medium hover:text-[var(--black)] transition-colors"
            >
              나중에 설정하기
            </button>
          </div>
        </div>
      )}

      {/* 추가 정보 */}
      <div className="mt-8 p-4 bg-[var(--white)]/50 rounded-lg">
        <p className="font-caption-medium text-[var(--gray-dark)]">
          위치 정보는 대여 매장 검색에서만 사용되며,
          <br />
          개인정보 보호를 위해 안전하게 관리됩니다.
        </p>
      </div>
    </div>
  );
}
