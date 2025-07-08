'use client';

import { useState } from 'react';

interface UseLikeProps {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
}

export function useLike({ defaultLiked = false, onChange }: UseLikeProps = {}) {
  const [liked, setLiked] = useState(defaultLiked);

  const toggle = () => {
    const newValue = !liked;
    setLiked(newValue);
    onChange?.(newValue);
  };

  return { liked, toggle };
}
