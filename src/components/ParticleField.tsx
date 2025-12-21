import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, memo } from 'react';
import { useReducedMotion, useIsLowEndDevice } from '@/hooks/useReducedMotion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const ParticleField = memo(() => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const isLowEnd = useIsLowEndDevice();

  // Skip rendering entirely on reduced motion or low-end devices
  const shouldRender = !prefersReducedMotion && !isLowEnd;

  const particleY = useTransform(scrollY, [0, 1000], [0, -60]);
  const sparkleY = useTransform(scrollY, [0, 1000], [0, -30]);

  // Reduce particle count for performance
  const particleCount = shouldRender ? 25 : 0;
  const sparkleCount = shouldRender ? 8 : 0;

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, [particleCount]);

  const sparkles = useMemo(() => {
    return Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 3,
    }));
  }, [sparkleCount]);

  if (!shouldRender) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden will-change-transform"
      style={{ y: particleY, transform: 'translateZ(0)' }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(190 100% 70% / ${particle.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 3}px hsl(190 100% 60% / ${particle.opacity * 0.5})`,
          }}
          animate={{
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <motion.div style={{ y: sparkleY }} className="absolute inset-0">
        {sparkles.map((sparkle) => (
          <motion.div
            key={`sparkle-${sparkle.id}`}
            className="absolute"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative" style={{ width: sparkle.size * 2, height: sparkle.size * 2 }}>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(0deg, transparent 40%, hsl(190 100% 75%) 50%, transparent 60%),
                               linear-gradient(90deg, transparent 40%, hsl(190 100% 75%) 50%, transparent 60%)`,
                  filter: `blur(${sparkle.size * 0.3}px)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle, hsl(190 100% 80%) 0%, transparent 50%)`,
                  filter: `blur(${sparkle.size * 0.5}px)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});
