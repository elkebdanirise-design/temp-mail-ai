import { memo } from 'react';

export const AuraLogo = memo(({
  className = ''
}: {
  className?: string;
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img 
        alt="Temp Mail AI Logo" 
        className="w-full h-full object-contain animate-ai-bloom"
        style={{ 
          background: 'transparent',
          filter: 'drop-shadow(0 0 6px hsl(25 100% 55%)) drop-shadow(0 0 12px hsl(25 100% 50% / 0.7)) drop-shadow(0 0 20px hsl(350 85% 55% / 0.5))',
        }} 
        src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.webp"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});

AuraLogo.displayName = 'AuraLogo';
