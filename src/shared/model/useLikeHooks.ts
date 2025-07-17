'use client';

import { useState } from 'react';

interface UseLikeHooksProps {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
}

export function useLikeHooks({ defaultLiked = false, onChange }: UseLikeHooksProps = {}) {
  const [liked, setLiked] = useState(defaultLiked);

  const toggle = () => {
    const newValue = !liked;
    setLiked(newValue);
    onChange?.(newValue);
  };

  return { liked, toggle };
}
