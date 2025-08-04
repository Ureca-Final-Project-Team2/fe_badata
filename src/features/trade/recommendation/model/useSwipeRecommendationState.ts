import { useCallback, useState } from 'react';

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

  // 초기 데이터 반영
  if (fetchedPosts && cards.length === 0 && !isFinished) {
    setCards(fetchedPosts);
    setTotalCards((prev) => (isStart ? fetchedPosts.length : prev + fetchedPosts.length));
  }

  const handleSwipe = useCallback(
    (postId: number) => (liked: boolean) => {
      setAnimatingCardId(postId);
      setTimeout(() => {
        if (liked) {
          setLikedCount((prev) => prev + 1);
          likePost(postId);
        }
        const updatedCards = cards.filter((card) => card.id !== postId);
        setCards(updatedCards);
        setAnimatingCardId(null);

        if (updatedCards.length === 0 && totalCards > 0) {
          updateRecommendVector();
          setIsFinished(true);
        }
      }, 300);
    },
    [cards, totalCards, likePost, updateRecommendVector],
  );

  const handleNewRecommendation = () => {
    setLikedCount(0);
    setTotalCards(0);
    setCards([]);
    setIsStart(true);
    setIsFinished(false);
    queryClient.invalidateQueries({ queryKey: ['recommendPosts', true] });
  };

  const handleContinueRecommendation = () => {
    setCards([]);
    setTotalCards(0);
    setLikedCount(0);
    setIsStart(false);
    setIsFinished(false);
    queryClient.removeQueries({ queryKey: ['recommendPosts'] });
    queryClient.invalidateQueries({ queryKey: ['recommendPosts', false] });
  };

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
