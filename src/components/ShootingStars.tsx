import { memo } from 'react';

// Lightweight CSS-only shooting stars - no framer-motion overhead
export const ShootingStars = memo(() => {
  return (
    <div 
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Static twinkling stars - CSS only */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${(i * 29 + 7) % 100}%`,
            top: `${(i * 17 + 3) % 100}%`,
            width: `${0.5 + (i % 2)}px`,
            height: `${0.5 + (i % 2)}px`,
            background: 'hsl(0 0% 100%)',
            boxShadow: `0 0 ${2 + (i % 3)}px hsl(0 0% 100% / 0.5)`,
            animationDelay: `${(i * 0.2) % 4}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
});

ShootingStars.displayName = 'ShootingStars';
