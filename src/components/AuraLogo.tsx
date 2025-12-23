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
        className="w-full h-full object-contain"
        style={{
          background: 'transparent',
          filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.9)) drop-shadow(0 0 16px rgba(219, 39, 119, 0.6)) drop-shadow(0 0 2px rgba(249, 115, 22, 1))',
        }}
        loading="eager" 
        decoding="async" 
        fetchPriority="high" 
        src="/lovable-uploads/5d54e278-684c-48d4-9f39-5964e6c17dd8.png" 
      />
    </div>
  );
});

AuraLogo.displayName = 'AuraLogo';
