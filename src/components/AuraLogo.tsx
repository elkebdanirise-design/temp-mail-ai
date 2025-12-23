import { memo } from 'react';

export const AuraLogo = memo(({
  className = ''
}: {
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow layer */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60 animate-ai-bloom"
        style={{
          background: 'radial-gradient(circle, hsl(var(--aurora-orange) / 0.6) 0%, hsl(var(--aurora-sunset) / 0.3) 50%, transparent 70%)',
        }}
      />
      {/* Inner glow layer */}
      <div 
        className="absolute inset-1 rounded-full blur-md opacity-80"
        style={{
          background: 'radial-gradient(circle, hsl(var(--aurora-orange) / 0.4) 0%, transparent 60%)',
        }}
      />
      <img 
        alt="Temp Mail AI Logo" 
        className="relative w-full h-full object-contain drop-shadow-[0_0_20px_hsl(var(--aurora-orange)/0.5)]"
        style={{ background: 'transparent' }} 
        src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.webp"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});

AuraLogo.displayName = 'AuraLogo';
