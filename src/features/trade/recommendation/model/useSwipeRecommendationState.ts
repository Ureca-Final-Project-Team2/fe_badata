import { useCallback, useEffect, useState } from 'react';

import {
  usePatchRecommendVectorMutation,
  usePostRecommendLikeMutation,
} from '@/features/trade/recommendation/model/mutations';
import { useRecommendPostsQuery } from '@/features/trade/recommendation/model/queries';
import { queryClient } from '@/shared/lib/queryClient';

import type { RecommendPost } from '@/features/trade/recommendation/lib/types';

export function useSwipeRecommendationState() {
  const [cards, setCards] = useState<RecommendPost[]>([]);
  const [totalCards, setTotalCards] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [animatingCardId, setAnimatingCardId] = useState<number | null>(null);
  const [isStart, setIsStart] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const { posts: fetchedPosts } = useRecommendPostsQuery(isStart);
  const { mutate: likePost } = usePostRecommendLikeMutation();
  const { mutate: updateRecommendVector } = usePatchRecommendVectorMutation();

  useEffect(() => {
    if (fetchedPosts && cards.length === 0 && !isFinished) {
      setCards(fetchedPosts);
      setTotalCards((prev) => (isStart ? fetchedPosts.length : prev + fetchedPosts.length));
    }
  }, [fetchedPosts, cards.length, isFinished, isStart]);

  const handleSwipe = useCallback(
    (postId: number, liked: boolean) => {
      setAnimatingCardId(postId);

      setTimeout(() => {
        if (liked) {
          setLikedCount((prev) => prev + 1);
          likePost(postId);
        }

        setCards((prevCards) => {
          const updatedCards = prevCards.filter((card) => card.id !== postId);

          if (updatedCards.length === 0 && totalCards > 0) {
            updateRecommendVector();
            setIsFinished(true);
          }

          return updatedCards;
        });

        setAnimatingCardId(null);
      }, 300);
    },
    [totalCards, likePost, updateRecommendVector],
  );

  const handleNewRecommendation = useCallback(() => {
    setLikedCount(0);
    setTotalCards(0);
    setCards([]);
    setIsStart(true);
    setIsFinished(false);
    queryClient.invalidateQueries({ queryKey: ['recommendPosts', true] });
  }, []);

  const handleContinueRecommendation = useCallback(() => {
    setCards([]);
    setTotalCards(0);
    setLikedCount(0);
    setIsStart(false);
    setIsFinished(false);
    queryClient.invalidateQueries({ queryKey: ['recommendPosts', false] });
  }, []);

  return {
    cards,
    totalCards,
    likedCount,
    isFinished,
    animatingCardId,
    remainingCards: cards.length,
    handleSwipe,
    handleNewRecommendation,
    handleContinueRecommendation,
  };
}
