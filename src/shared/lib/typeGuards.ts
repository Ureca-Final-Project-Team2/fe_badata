import { BRAND_MAPPING } from '@/shared/config/brandMapping';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

/**
 * 문자열이 유효한 MobileCarrier 값인지 확인하는 타입 가드
 * @param val - 검증할 문자열
 * @returns val이 MobileCarrier 유니온에 속하는지 여부
 */
export function isMobileCarrier(val: string | undefined): val is MobileCarrier {
  return val !== undefined && ['UPLUS', 'KT', 'SKT'].includes(val);
}

/**
 * 문자열이 유효한 한국어 브랜드 이름인지 확인하는 타입 가드
 * @param brand - 검증할 브랜드 문자열
 * @returns brand가 BRAND_MAPPING의 키에 속하는지 여부
 */
export const isKoreanBrandName = (brand: string): brand is keyof typeof BRAND_MAPPING => {
  return brand in BRAND_MAPPING;
};

/**
 * 문자열이 데이터 통신사 브랜드인지 확인하는 타입 가드
 * @param brand - 검증할 브랜드 문자열
 * @returns brand가 데이터 통신사 브랜드인지 여부
 */
export const isDataBrandName = (brand: string): brand is 'KT' | 'UPLUS' | 'SKT' => {
  return brand === 'KT' || brand === 'UPLUS' || brand === 'SKT';
};
