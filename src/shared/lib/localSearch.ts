const STORAGE_KEY = 'recent-search-keywords';
const MAX_KEYWORDS = 10;

export const getRecentKeywords = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const setRecentKeywords = (keywords: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
};

export const addRecentKeyword = (keyword: string): string[] => {
  const trimmed = keyword.trim();
  if (!trimmed) return getRecentKeywords();

  const keywords = getRecentKeywords();
  const existing = keywords.filter((k) => k !== trimmed);
  const updated = [trimmed, ...existing].slice(0, MAX_KEYWORDS);
  setRecentKeywords(updated);
  return updated;
};

export const removeRecentKeyword = (keyword: string): string[] => {
  const keywords = getRecentKeywords();
  const updated = keywords.filter((k) => k !== keyword);
  setRecentKeywords(updated);
  return updated;
};

export const clearRecentKeywords = () => {
  localStorage.removeItem(STORAGE_KEY);
};