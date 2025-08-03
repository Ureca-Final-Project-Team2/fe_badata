import type { DeadlinePost } from '@/entities/trade-post/lib/types';

export interface DeadlinePostResponse {
  item: DeadlinePost[];
  nextCursor: number;
  hasNext: boolean;
}
