import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  delay: number;
  size: number;
}

export const ShootingStars = () => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  const createShootingStar = useCallback(() => {
    const id = Date.now() + Math.random();
    const startX = Math.random() * 100;
    const startY = Math.random() * 40; // Start in upper portion
    const angle = 30 + Math.random() * 30; // 30-60 degrees
    const duration = 0.8 + Math.random() * 0.6; // 0.8-1.4 seconds
    const size = 1 + Math.random() * 1.5;

    const newStar: ShootingStar = {
      id,
      startX,
      startY,
      angle,
      duration,
      delay: 0,
      size,
    };

    setStars(prev => [...prev, newStar]);

    // Remove star after animation
    setTimeout(() => {
      setStars(prev => prev.filter(s => s.id !== id));
    }, duration * 1000 + 500);
  }, []);

  useEffect(() => {
    // Create shooting stars at random intervals
    const scheduleNextStar = () => {
      const delay = 2000 + Math.random() * 5000; // 2-7 seconds between stars
      return setTimeout(() => {
        createShootingStar();
        scheduleNextStar();
      }, delay);
    };

    // Initial star after a short delay
    const initialTimeout = setTimeout(() => {
      createShootingStar();
    }, 1500);

    const recurringTimeout = scheduleNextStar();

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(recurringTimeout);
    };
  }, [createShootingStar]);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {stars.map((star) => {
          const distance = 300 + Math.random() * 200;
          const endX = star.startX + (distance * Math.cos(star.angle * Math.PI / 180));
          const endY = star.startY + (distance * Math.sin(star.angle * Math.PI / 180));

          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.5],
                x: [0, (endX - star.startX) * 10],
                y: [0, (endY - star.startY) * 10],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: star.duration,
                ease: "easeOut",
                times: [0, 0.1, 0.7, 1],
              }}
            >
              {/* Star head */}
              <div
                className="relative"
                style={{
                  width: star.size * 3,
                  height: star.size * 3,
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, hsl(190 100% 90%) 0%, hsl(190 100% 70%) 40%, transparent 70%)',
                    boxShadow: `0 0 ${star.size * 8}px hsl(190 100% 70% / 0.8), 0 0 ${star.size * 15}px hsl(190 100% 60% / 0.4)`,
                  }}
                />
              </div>
              
              {/* Star tail */}
              <motion.div
                className="absolute"
                style={{
                  width: star.size * 80,
                  height: star.size * 2,
                  top: '50%',
                  right: '100%',
                  transform: `translateY(-50%) rotate(${star.angle}deg)`,
                  transformOrigin: 'right center',
                  background: `linear-gradient(90deg, transparent 0%, hsl(190 100% 70% / 0.1) 30%, hsl(190 100% 80% / 0.4) 70%, hsl(190 100% 90% / 0.8) 100%)`,
                  filter: `blur(${star.size * 0.5}px)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1, 0.3],
                  opacity: [0, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: star.duration,
                  ease: "easeOut",
                  times: [0, 0.15, 0.6, 1],
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};