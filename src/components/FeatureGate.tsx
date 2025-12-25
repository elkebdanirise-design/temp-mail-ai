import { memo, ReactNode } from 'react';
import { Crown, Lock } from 'lucide-react';
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
}

const featureNames: Record<FeatureGateProps['feature'], string> = {
  'custom-domain': 'Custom Domain Access',
  '7-day-retention': '7-Day Email Retention',
  '25mb-attachments': '25MB Attachments',
  'ai-spam-filter': 'AI-Powered Spam Filtering',
};

export const FeatureGate = memo(({ feature, children, fallback }: FeatureGateProps) => {
  const { isPremium } = usePremium();

  if (isPremium) {
    return <>{children}</>;
  }

  // If fallback provided, render it with upgrade tooltip
  if (fallback) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative cursor-not-allowed">
              <div className="opacity-50 pointer-events-none">
                {fallback}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-lg">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="bg-background/95 backdrop-blur-xl border-primary/30 p-3 max-w-xs"
          >
            <div className="flex items-start gap-2">
              <Crown className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {featureNames[feature]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Upgrade to Pro to unlock this feature.
                </p>
                <a 
                  href="#pricing-section"
                  className="text-xs text-primary hover:underline mt-2 inline-block"
                >
                  View Pricing →
                </a>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Default locked state with upgrade prompt
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 border border-border/50 cursor-not-allowed">
            <Lock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Pro</span>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-background/95 backdrop-blur-xl border-primary/30 p-3 max-w-xs"
        >
          <div className="flex items-start gap-2">
            <Crown className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-foreground">
                {featureNames[feature]}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This is a Pro feature. Upgrade to unlock.
              </p>
              <a 
                href="#pricing-section"
                className="text-xs text-primary hover:underline mt-2 inline-block"
              >
                View Pricing →
              </a>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

FeatureGate.displayName = 'FeatureGate';
