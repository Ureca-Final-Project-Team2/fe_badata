import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

/**
 * 통신사별 디폴트 이미지 경로를 반환하는 함수
 * @param mobileCarrier 통신사 ('UPLUS' | 'KT' | 'SKT')
 * @returns 해당 통신사의 디폴트 이미지 경로
 */
export function getCarrierDefaultImage(mobileCarrier: MobileCarrier): string {
  switch (mobileCarrier) {
    case 'KT':
      return '/assets/data/bg/KT_bg.png';
    case 'SKT':
      return '/assets/data/bg/SKT_bg.png';
    case 'UPLUS':
      return '/assets/data/bg/UPLUS_bg.png';
    default:
      return '/assets/trade-detail.jpg'; // 기본 이미지
  }
}
