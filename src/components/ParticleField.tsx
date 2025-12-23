import { memo } from 'react';

// Lightweight CSS-only particle field - no framer-motion overhead
export const ParticleField = memo(() => {
  return (
    <div 
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Static star particles using CSS */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 23) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            background: `radial-gradient(circle, hsl(190 100% 70% / ${0.3 + (i % 3) * 0.15}) 0%, transparent 70%)`,
            animationDelay: `${(i * 0.3) % 5}s`,
          }}
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';
