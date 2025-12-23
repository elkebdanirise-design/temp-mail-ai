import { memo } from 'react';
export const AuraLogo = memo(({
  className = ''
}: {
  className?: string;
}) => {
  return <div className={`relative ${className}`}>
      <img alt="Temp Mail AI Logo" className="w-full h-full object-cover opacity-100 animate-ai-bloom" style={{
      background: 'transparent'
    }} loading="eager" decoding="async" fetchPriority="high" src="/lovable-uploads/5d54e278-684c-48d4-9f39-5964e6c17dd8.png" />
    </div>;
});
AuraLogo.displayName = 'AuraLogo';