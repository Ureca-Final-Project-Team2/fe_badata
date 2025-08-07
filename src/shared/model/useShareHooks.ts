import { makeToast } from '@/shared/lib/makeToast';

import type { KakaoShare } from '@/shared/lib/kakao';

interface ShareParams {
  title: string;
  price?: number;
  imageUrl?: string;
  url?: string;
}

export const useShareHooks = () => {
  const shareDescriptions = [
    '늦게 보면 없어요! 지금 핫한 상품 🔥',
    '현재 인기 있는 상품이에요👀',
    '지금 안 사면 후회할 걸요?🤔',
  ];

  const getRandomShareDesc = () => {
    const randomIndex = Math.floor(Math.random() * shareDescriptions.length);
    return shareDescriptions[randomIndex];
  };

  const share = async ({ title, price, imageUrl, url = window.location.href }: ShareParams) => {
    const kakao = window.Kakao as KakaoShare;

    const shareTitle = `${title} - ${price?.toLocaleString()}원`;
    const shareDesc = getRandomShareDesc();
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
        await navigator.share({
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
