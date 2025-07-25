import { makeToast } from '../lib/makeToast';

import type { KakaoShare } from '../lib/kakao';

interface ShareParams {
  title: string;
  price?: number;
  imageUrl?: string;
  url?: string;
}

export const useShareHooks = () => {
  const share = ({ title, price, imageUrl, url = window.location.href }: ShareParams) => {
    const kakao = window.Kakao as KakaoShare;

    const shareTitle = `${title} - ${price?.toLocaleString()}원`;
    const shareDesc = '이 상품 어때요?';
    const shareImage = imageUrl || `${window.location.origin}/assets/trade-detail.jpg`;

    if (kakao?.Share?.sendDefault) {
      try {
        kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: shareTitle,
            description: shareDesc,
            imageUrl: shareImage,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        });
        return;
      } catch (err) {
        console.warn('카카오톡 공유 실패', err);
      }
    }

    if (navigator.share) {
      try {
        navigator.share({
          title: shareTitle,
          text: shareDesc,
          url,
        });
        return;
      } catch (err) {
        console.warn('Web Share API 실패', err);
      }
    }
    try {
      navigator.clipboard.writeText(url);
      makeToast('링크가 복사되었습니다!', 'success');
    } catch (err) {
      makeToast(`링크 복사에 실패했습니다. ${err}`, 'warning');
    }
  };
  return { share };
};
