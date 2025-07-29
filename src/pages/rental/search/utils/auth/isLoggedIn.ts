// 로그인 상태 확인 (간단한 토큰 존재 여부로 판단)
export const isLoggedIn = (): boolean => {
  try {
    // localStorage에서 토큰 확인
    const token = localStorage.getItem('accessToken');
    return !!token;
  } catch (error) {
    console.error('로그인 상태 확인 실패:', error);
    return false;
  }
};
