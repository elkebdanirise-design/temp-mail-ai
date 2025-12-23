import { memo } from 'react';

export const AuraLogo = memo(({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <img
        alt="Temp Mail AI Logo"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        src="/lovable-uploads/3adbffe2-da95-4479-9e23-1b90b4afb42d.png"
        className="w-full h-full object-contain animate-ai-bloom"
        style={{
          background: 'transparent',
          filter: `
            drop-shadow(0 0 8px hsla(25, 95%, 55%, 0.7))
            drop-shadow(0 0 16px hsla(35, 90%, 60%, 0.5))
            drop-shadow(0 0 32px hsla(25, 95%, 55%, 0.3))
          `,
        }}
      />
    </div>
  );
});

AuraLogo.displayName = 'AuraLogo';