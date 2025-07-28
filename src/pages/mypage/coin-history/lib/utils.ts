import { COIN_SOURCE_CONFIG } from './constants';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

export const getSourceText = (source: string) => {
  return COIN_SOURCE_CONFIG[source as keyof typeof COIN_SOURCE_CONFIG]?.text || '기타';
};

export const getSourceIcon = (source: string) => {
  return COIN_SOURCE_CONFIG[source as keyof typeof COIN_SOURCE_CONFIG]?.icon || '💰';
};

export const isPositiveTransaction = (source: string) => {
  return COIN_SOURCE_CONFIG[source as keyof typeof COIN_SOURCE_CONFIG]?.isPositive || false;
}; 