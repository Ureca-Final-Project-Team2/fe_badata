/**
 * 온보딩 완료 상태 관리 유틸리티
 */

/**
 * 온보딩 완료 여부 확인
 */
export const isOnboardingCompleted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('onboardingCompleted') === 'true';
};

/**
 * 온보딩 완료 상태 설정
 */
export const setOnboardingCompleted = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('onboardingCompleted', 'true');
};

/**
 * 게스트 모드 여부 확인
 */
export const isGuestMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('guestMode') === 'true';
};

/**
 * 게스트 모드 설정
 */
export const setGuestMode = (isGuest: boolean): void => {
  if (typeof window === 'undefined') return;
  if (isGuest) {
    localStorage.setItem('guestMode', 'true');
  } else {
    localStorage.removeItem('guestMode');
  }
};

/**
 * 온보딩 상태 초기화 (개발용)
 */
export const resetOnboarding = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('onboardingCompleted');
  localStorage.removeItem('guestMode');
};
