import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'tempmail-aura-bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, [bookmarks]);

  const isBookmarked = useCallback((postId: string): boolean => {
    return bookmarks.includes(postId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((postId: string): boolean => {
    let newState: boolean;
    setBookmarks(prev => {
      if (prev.includes(postId)) {
        newState = false;
        return prev.filter(id => id !== postId);
      } else {
        newState = true;
        return [...prev, postId];
      }
    });
    return newState!;
  }, []);

  const addBookmark = useCallback((postId: string) => {
    setBookmarks(prev => {
      if (prev.includes(postId)) return prev;
      return [...prev, postId];
    });
  }, []);

  const removeBookmark = useCallback((postId: string) => {
    setBookmarks(prev => prev.filter(id => id !== postId));
  }, []);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    addBookmark,
    removeBookmark,
    clearAllBookmarks,
    bookmarkCount: bookmarks.length,
  };
};
