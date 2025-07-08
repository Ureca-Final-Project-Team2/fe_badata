'use client';

import { useState } from 'react';

export function useLikeToggle(defaultLiked = false) {
  const [liked, setLiked] = useState(defaultLiked);
  const toggle = () => setLiked((prev) => !prev);
  return { liked, toggle };
}
