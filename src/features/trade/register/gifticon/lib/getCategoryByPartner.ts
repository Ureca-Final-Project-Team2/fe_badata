import { GIFTICON_CATEGORIES } from '@/features/trade/register/gifticon/lib/types';

import type { GifticonCategory } from '@/features/trade/register/gifticon/lib/types';

export function getCategoryByPartner(partner: string): GifticonCategory | undefined {
  for (const [category, partners] of Object.entries(GIFTICON_CATEGORIES) as [
    GifticonCategory,
    readonly string[],
  ][]) {
    if (partners.includes(partner)) {
      return category;
    }
  }
  return undefined;
}
