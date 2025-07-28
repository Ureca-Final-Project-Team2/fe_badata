import { useDeleteFollow, useFollows } from '@/entities/follow';
import { FOLLOW_TYPES } from '@/entities/follow/lib/types';

export function useFollowings(cursor?: number, size: number = 10) {
  return useFollows(FOLLOW_TYPES.FOLLOWINGS, cursor, size);
}

export function useDeleteFollowing() {
  return useDeleteFollow();
} 