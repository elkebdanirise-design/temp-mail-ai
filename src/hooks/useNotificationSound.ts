import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tempmail-notification-sound';

export const useNotificationSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const playNotification = useCallback(() => {
    if (soundEnabled) {
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Audio play failed (likely autoplay policy)
      });
    }
  }, [soundEnabled]);

  return { soundEnabled, toggleSound, playNotification };
};
