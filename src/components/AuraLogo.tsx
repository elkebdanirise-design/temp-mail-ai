import { memo } from 'react';
export const AuraLogo = memo(({
  className = ''
}: {
  className?: string;
}) => {
  return <div className={`relative ${className}`}>
      <img alt="Temp Mail AI Logo" style={{
      background: 'transparent'
    }} loading="eager" decoding="async" fetchPriority="high" src="/lovable-uploads/3adbffe2-da95-4479-9e23-1b90b4afb42d.png" className="w-full h-full object-cover animate-ai-bloom shadow-md rounded-none border-0 opacity-95" />
    </div>;
});
AuraLogo.displayName = 'AuraLogo';