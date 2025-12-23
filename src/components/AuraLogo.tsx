import { memo } from 'react';

export const AuraLogo = memo(({
  className = ''
}: {
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        alt="Temp Mail AI Logo" 
        className="w-full h-full object-cover opacity-100 animate-ai-bloom"
        style={{ background: 'transparent' }} 
        src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.png"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});

AuraLogo.displayName = 'AuraLogo';
