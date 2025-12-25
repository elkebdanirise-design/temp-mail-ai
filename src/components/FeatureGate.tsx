import { memo, ReactNode } from 'react';
import { Crown, Lock, Sparkles } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FeatureGateProps {
  feature: 'custom-domain' | '7-day-retention' | '25mb-attachments' | 'ai-spam-filter';
  children: ReactNode;
  fallback?: ReactNode;
  variant?: 'inline' | 'overlay' | 'badge';
}

const featureDetails: Record<FeatureGateProps['feature'], { name: string; description: string }> = {
  'custom-domain': {
    name: 'Custom Domain Access',
    description: 'Use your own domain for personalized email addresses.',
  },
  '7-day-retention': {
    name: '7-Day Email Retention',
    description: 'Keep your emails accessible for up to 7 days instead of 24 hours.',
  },
  '25mb-attachments': {
    name: '25MB Attachments',
    description: 'Receive larger file attachments up to 25MB.',
  },
  'ai-spam-filter': {
    name: 'AI-Powered Spam Filtering',
    description: 'Advanced AI filters to keep your inbox clean.',
  },
};

export const FeatureGate = memo(({ feature, children, fallback, variant = 'inline' }: FeatureGateProps) => {
  const { isPremium } = usePremium();

  if (isPremium) {
    return <>{children}</>;
  }

  const { name, description } = featureDetails[feature];

  // Badge variant - compact pro badge
  if (variant === 'badge') {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full cursor-pointer transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-magenta) / 0.1))',
                border: '1px solid hsl(var(--aurora-orange) / 0.3)',
                boxShadow: '0 2px 8px hsl(var(--aurora-orange) / 0.1)',
              }}
            >
              <Lock className="w-3 h-3" style={{ color: 'hsl(var(--aurora-orange))' }} />
              <span 
                className="text-[10px] font-bold uppercase tracking-wide"
                style={{ color: 'hsl(var(--aurora-orange))' }}
              >
                Pro
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            sideOffset={8}
            className="p-0 overflow-hidden rounded-xl border-0 max-w-xs"
            style={{
              background: 'linear-gradient(165deg, hsl(240 20% 10% / 0.98), hsl(240 25% 6% / 0.99))',
              boxShadow: '0 25px 50px -12px hsl(var(--aurora-orange) / 0.2), 0 0 0 1px hsl(var(--aurora-orange) / 0.15)',
            }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'hsl(var(--aurora-orange) / 0.15)' }}
                >
                  <Crown className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-[10px] text-muted-foreground">Pro Feature</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{description}</p>
              <a 
                href="#pricing-section"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                  color: 'white',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Upgrade to Pro
              </a>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Overlay variant - locks content with overlay
  if (fallback || variant === 'overlay') {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <div className="relative cursor-pointer group">
              <div className="opacity-40 pointer-events-none blur-[0.5px]">
                {fallback || children}
              </div>
              <div 
                className="absolute inset-0 flex items-center justify-center rounded-lg transition-all group-hover:bg-background/60"
                style={{
                  background: 'hsl(var(--background) / 0.5)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-transform group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.15))',
                    border: '1px solid hsl(var(--aurora-orange) / 0.4)',
                    boxShadow: '0 4px 12px hsl(var(--aurora-orange) / 0.15)',
                  }}
                >
                  <Lock className="w-3.5 h-3.5" style={{ color: 'hsl(var(--aurora-orange))' }} />
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: 'hsl(var(--aurora-orange))' }}
                  >
                    Pro Only
                  </span>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            sideOffset={8}
            className="p-0 overflow-hidden rounded-xl border-0 max-w-xs"
            style={{
              background: 'linear-gradient(165deg, hsl(240 20% 10% / 0.98), hsl(240 25% 6% / 0.99))',
              boxShadow: '0 25px 50px -12px hsl(var(--aurora-orange) / 0.2), 0 0 0 1px hsl(var(--aurora-orange) / 0.15)',
            }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5" style={{ color: 'hsl(var(--aurora-orange))' }} />
                <p className="text-sm font-semibold text-foreground">{name}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{description}</p>
              <a 
                href="#pricing-section"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                  color: 'white',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Upgrade to Pro
              </a>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Default inline variant - compact locked badge
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div 
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer transition-all hover:scale-105"
            style={{
              background: 'hsl(var(--aurora-orange) / 0.1)',
              border: '1px solid hsl(var(--aurora-orange) / 0.2)',
            }}
          >
            <Lock className="w-3 h-3" style={{ color: 'hsl(var(--aurora-orange) / 0.8)' }} />
            <span 
              className="text-[10px] font-medium"
              style={{ color: 'hsl(var(--aurora-orange) / 0.9)' }}
            >
              Pro
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          sideOffset={8}
          className="p-0 overflow-hidden rounded-xl border-0 max-w-xs"
          style={{
            background: 'linear-gradient(165deg, hsl(240 20% 10% / 0.98), hsl(240 25% 6% / 0.99))',
            boxShadow: '0 25px 50px -12px hsl(var(--aurora-orange) / 0.2), 0 0 0 1px hsl(var(--aurora-orange) / 0.15)',
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" style={{ color: 'hsl(var(--aurora-orange))' }} />
              <p className="text-sm font-semibold text-foreground">{name}</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{description}</p>
            <a 
              href="#pricing-section"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                color: 'white',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Upgrade to Pro
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

FeatureGate.displayName = 'FeatureGate';
