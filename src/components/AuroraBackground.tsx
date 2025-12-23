import { memo } from 'react';

// Simplified static aurora background - no heavy framer-motion animations
export const AuroraBackground = memo(() => {
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ 
        contain: 'strict',
        willChange: 'auto',
      }}
    >
      {/* Deep obsidian-black void base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 3%) 100%)',
        }}
      />
      
      {/* Main flowing wave - deep magenta - CSS animation only */}
      <div
        className="absolute top-[15%] left-[30%] w-[80%] h-[60%] animate-aurora-wave-1"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at center, hsl(330 85% 45% / 0.25) 0%, hsl(330 80% 40% / 0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Second wave - crimson red */}
      <div
        className="absolute top-[25%] left-[-10%] w-[70%] h-[50%] animate-aurora-wave-2"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at center, hsl(350 80% 45% / 0.2) 0%, hsl(10 85% 40% / 0.08) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      {/* Third wave - sunset orange glow */}
      <div
        className="absolute top-[30%] right-[-10%] w-[60%] h-[45%] animate-aurora-wave-3"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at center, hsl(25 95% 50% / 0.2) 0%, hsl(35 90% 45% / 0.06) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Subtle noise texture for depth - inline SVG data URI */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top gradient fade */}
      <div 
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 3% / 0.9) 0%, transparent 100%)',
        }}
      />
    </div>
  );
});

AuroraBackground.displayName = 'AuroraBackground';
