import { GIFTICON_CATEGORIES } from '@/pages/trade/register/gifticon/lib/types';

import type { GifticonCategory } from '@/pages/trade/register/gifticon/lib/types';

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
