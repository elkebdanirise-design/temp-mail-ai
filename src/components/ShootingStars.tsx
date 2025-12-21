import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useReducedMotion, useIsLowEndDevice } from '@/hooks/useReducedMotion';

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  size: number;
}

interface StaticStar {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseDelay: number;
}

export const ShootingStars = memo(() => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const isLowEnd = useIsLowEndDevice();

  const shouldRender = !prefersReducedMotion && !isLowEnd;
  const starCount = shouldRender ? 30 : 0;

  const staticStars = useMemo<StaticStar[]>(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
      pulseDelay: Math.random() * 5,
    }));
  }, [starCount]);

  const createShootingStar = useCallback(() => {
    if (!shouldRender) return;
    const id = Date.now() + Math.random();
    const duration = 0.8 + Math.random() * 0.6;

    const newStar: ShootingStar = {
      id,
      startX: Math.random() * 100,
      startY: Math.random() * 40,
      angle: 30 + Math.random() * 30,
      duration,
      size: 1 + Math.random() * 1.5,
    };

    setShootingStars(prev => [...prev, newStar]);
    setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== id)), duration * 1000 + 500);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNextStar = () => {
      timeoutId = setTimeout(() => {
        createShootingStar();
        scheduleNextStar();
      }, 3000 + Math.random() * 6000);
    };

    const initialTimeout = setTimeout(createShootingStar, 2000);
    scheduleNextStar();

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [createShootingStar, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden will-change-transform" style={{ transform: 'translateZ(0)' }}>
      {staticStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'hsl(0 0% 100%)',
            boxShadow: `0 0 ${star.size * 2}px hsl(0 0% 100% / 0.5)`,
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.pulseDelay,
          }}
        />
      ))}

      <AnimatePresence>
        {shootingStars.map((star) => {
          const distance = 300 + Math.random() * 200;
          const endX = star.startX + distance * Math.cos(star.angle * Math.PI / 180);
          const endY = star.startY + distance * Math.sin(star.angle * Math.PI / 180);

          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{ left: `${star.startX}%`, top: `${star.startY}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.5],
                x: [0, (endX - star.startX) * 10],
                y: [0, (endY - star.startY) * 10],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: star.duration, ease: "easeOut", times: [0, 0.1, 0.7, 1] }}
            >
              <div className="relative" style={{ width: star.size * 3, height: star.size * 3 }}>
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, hsl(35 100% 95%) 0%, hsl(25 100% 70%) 40%, transparent 70%)',
                    boxShadow: `0 0 ${star.size * 8}px hsl(25 95% 65% / 0.8), 0 0 ${star.size * 15}px hsl(330 80% 60% / 0.4)`,
                  }}
                />
              </div>
              <motion.div
                className="absolute"
                style={{
                  width: star.size * 80,
                  height: star.size * 2,
                  top: '50%',
                  right: '100%',
                  transform: `translateY(-50%) rotate(${star.angle}deg)`,
                  transformOrigin: 'right center',
                  background: `linear-gradient(90deg, transparent 0%, hsl(330 80% 60% / 0.1) 30%, hsl(25 95% 65% / 0.4) 70%, hsl(35 100% 85% / 0.8) 100%)`,
                  filter: `blur(${star.size * 0.5}px)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1, 1, 0.3], opacity: [0, 0.8, 0.6, 0] }}
                transition={{ duration: star.duration, ease: "easeOut", times: [0, 0.15, 0.6, 1] }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});