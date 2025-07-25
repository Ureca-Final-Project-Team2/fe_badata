declare global {
  interface Window {
    Kakao: unknown;
  }
}

export interface KakaoShare {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (options: {
      objectType: 'feed';
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
    }) => void;
  };
}

export const initKakaoSdk = () => {
  if (typeof window === 'undefined') return;

  try {
    const kakao = window.Kakao as KakaoShare;

    if (!kakao) {
      console.warn('Kakao SDK가 로드되지 않았습니다.');
      return false;
    }
    if (!kakao.isInitialized()) {
      const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
      if (!kakaoKey) {
        console.error('NEXT_PUBLIC_KAKAO_JS_KEY가 설정되지 않았습니다.');
        return;
      }
      kakao.init(kakaoKey);
      console.log('Kakao SDK 초기화 완료');
    }
    return true;
  } catch (error) {
    console.error('Kakao SDK 초기화 실패: ', error);
    return false;
  }
};
