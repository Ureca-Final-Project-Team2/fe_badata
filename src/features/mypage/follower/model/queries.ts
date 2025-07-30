import { useDeleteFollow, useFollows } from '@/entities/follow';
import { FOLLOW_TYPES } from '@/entities/follow/lib/types';

export function useFollowers(cursor?: number, size: number = 10) {
  return useFollows(FOLLOW_TYPES.FOLLOWERS, cursor, size);
}

export function useDeleteFollower() {
  return useDeleteFollow();
}
