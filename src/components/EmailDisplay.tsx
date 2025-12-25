import { useState, useRef, memo, useCallback } from 'react';
import { Copy, Check, RefreshCw, Loader2, ShieldCheck, Clock, Crown } from 'lucide-react';
import { RecentAddressesDropdown } from './RecentAddressesDropdown';
import { EmailSession } from '@/hooks/useEmailSessions';
import { usePremium } from '@/contexts/PremiumContext';

interface EmailDisplayProps {
  email: string | null;
  loading: boolean;
  onRefresh: () => void;
  onDelete: () => void;
  onSessionSwitch?: (session: EmailSession) => void;
  retentionExpiry?: string | null;
}

export const EmailDisplay = memo(({ 
  email, 
  loading, 
  onRefresh, 
  onDelete,
  onSessionSwitch,
  retentionExpiry
}: EmailDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const { isPremium } = usePremium();

  const getTimeRemaining = (expiresAt: string): string => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  const handleCopy = useCallback(async () => {
    if (!email || loading) return;
    
    await navigator.clipboard.writeText(email);
    
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setCopied(true);
    setShowCopiedOverlay(true);
    
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowCopiedOverlay(false), 1500);
  }, [email, loading]);

  return (
    <div className="relative w-full animate-fade-in">
      {/* Section Label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-1 h-1 rounded-full"
            style={{ 
              background: 'hsl(var(--aurora-orange))',
              boxShadow: '0 0 6px hsl(var(--aurora-orange) / 0.6)',
            }}
          />
          <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">
            Secure Address
          </span>
        </div>
        {/* AI Smart Shield Badge */}
        <div className="flex items-center gap-2">
          {/* Retention Timer */}
          {retentionExpiry && (
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{
                background: isPremium 
                  ? 'hsl(var(--aurora-orange) / 0.08)' 
                  : 'hsl(0 0% 50% / 0.08)',
                border: `1px solid ${isPremium 
                  ? 'hsl(var(--aurora-orange) / 0.2)' 
                  : 'hsl(0 0% 50% / 0.2)'}`,
              }}
            >
              {isPremium ? (
                <Crown className="w-3 h-3" style={{ color: 'hsl(var(--aurora-orange))' }} />
              ) : (
                <Clock className="w-3 h-3 text-muted-foreground" />
              )}
              <span 
                className="text-[8px] font-medium uppercase tracking-[0.05em]"
                style={{ color: isPremium ? 'hsl(var(--aurora-orange))' : 'hsl(var(--muted-foreground))' }}
              >
                {getTimeRemaining(retentionExpiry)}
              </span>
            </div>
          )}

          {/* Recent Addresses Dropdown */}
          {onSessionSwitch && (
            <RecentAddressesDropdown 
              onSwitch={onSessionSwitch} 
              currentEmail={email} 
            />
          )}

          {/* AI Verified Badge */}
          <div 
            className="flex items-center gap-1.5 px-2 py-1 rounded-full animate-pulse-neon"
            style={{
              background: 'hsl(var(--aurora-orange) / 0.08)',
              border: '1px solid hsl(var(--aurora-orange) / 0.2)',
            }}
          >
            <ShieldCheck 
              className="w-3 h-3" 
              style={{ color: 'hsl(var(--aurora-orange))' }}
            />
            <span 
              className="text-[8px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: 'hsl(var(--aurora-orange))' }}
            >
              AI-Verified
            </span>
          </div>
        </div>
      </div>

      {/* Cyber-Capsule Container */}
      <div
        ref={capsuleRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        {/* Breathing Glow Border */}
        <div
          className="absolute -inset-[2px] rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--aurora-magenta)) 0%, hsl(var(--aurora-crimson)) 30%, hsl(var(--aurora-orange)) 70%, hsl(var(--aurora-sunset)) 100%)',
            filter: isHovered ? 'blur(4px)' : 'blur(3px)',
            opacity: isHovered ? 0.7 : 0.4,
          }}
        />

        {/* Precision Border */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none animate-gradient-shift"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(135deg, hsl(var(--aurora-magenta)) 0%, hsl(var(--aurora-crimson)) 25%, hsl(var(--aurora-orange)) 50%, hsl(var(--aurora-sunset)) 75%, hsl(var(--aurora-magenta)) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            backgroundSize: '300% 300%',
          }}
        />

        {/* Obsidian Glass Capsule */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, hsl(240 20% 6% / 0.95), hsl(240 25% 3% / 0.98))',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Frosted inner effect */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(0 0% 100% / 0.02) 0%, transparent 60%)',
            }}
          />

          {/* Loading shimmer effect */}
          {loading && (
            <div className="absolute inset-0 pointer-events-none z-10 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 w-1/2 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-magenta) / 0.08), hsl(var(--aurora-orange) / 0.12), transparent)',
                }}
              />
            </div>
          )}

          {/* Copied overlay */}
          {showCopiedOverlay && (
            <div
              className="absolute inset-0 flex items-center justify-center z-20 rounded-full animate-scale-in"
              style={{
                background: 'hsl(160 60% 35% / 0.15)',
                boxShadow: 'inset 0 0 30px hsl(160 70% 45% / 0.2)',
              }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 tracking-wide">Copied!</span>
              </div>
            </div>
          )}

          {/* Inner Content */}
          <div className="relative flex items-center h-14 sm:h-16 px-1.5 sm:px-1">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={!email || loading}
              className="relative flex items-center justify-center w-11 sm:w-14 h-full min-h-[44px] transition-all disabled:opacity-30 disabled:cursor-not-allowed group rounded-l-full hover:bg-[hsl(330,60%,50%,0.06)] active:bg-[hsl(330,60%,50%,0.12)] active:scale-95"
              aria-label="Copy email"
            >
              <Copy 
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors"
                style={{ 
                  color: isHovered ? 'hsl(var(--aurora-orange))' : 'hsl(var(--aurora-sunset) / 0.7)',
                }}
              />
            </button>

            {/* Divider */}
            <div 
              className="w-px h-6 opacity-30"
              style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--aurora-orange) / 0.3), transparent)' }}
            />

            {/* Email Address */}
            <div 
              className="flex-1 flex items-center justify-center px-3 sm:px-4 cursor-pointer overflow-hidden min-w-0"
              onClick={handleCopy}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 
                    className="w-4 h-4 animate-spin"
                    style={{ color: 'hsl(var(--aurora-orange))' }}
                  />
                  <span className="text-xs sm:text-sm text-muted-foreground/60 font-medium">
                    Generating...
                  </span>
                </div>
              ) : (
                <span
                  className="text-center truncate max-w-full text-[0.95rem] sm:text-base font-semibold"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    background: 'linear-gradient(90deg, hsl(0 0% 85%) 0%, hsl(var(--aurora-orange) / 0.9) 25%, hsl(var(--aurora-sunset) / 0.9) 50%, hsl(var(--aurora-magenta) / 0.9) 75%, hsl(0 0% 80%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {email || 'Awaiting generation...'}
                </span>
              )}
            </div>

            {/* Divider */}
            <div 
              className="w-px h-5 xs:h-6 opacity-30"
              style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--aurora-orange) / 0.3), transparent)' }}
            />

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="relative flex items-center justify-center w-11 xs:w-12 sm:w-14 h-full min-h-[44px] transition-all disabled:opacity-30 disabled:cursor-not-allowed group rounded-r-full hover:bg-[hsl(25,80%,50%,0.06)] active:bg-[hsl(25,80%,50%,0.12)] active:scale-95"
              aria-label="Generate new email"
            >
              <RefreshCw 
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors ${loading ? 'animate-spin' : ''}`}
                style={{ 
                  color: isHovered ? 'hsl(var(--aurora-orange))' : 'hsl(var(--aurora-sunset) / 0.7)',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="flex items-center justify-center gap-3 mt-3 text-[8px] text-muted-foreground/30 uppercase tracking-[0.25em]">
        <span>Click to copy</span>
        <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/20" />
        <span>AI Sync enabled</span>
      </div>
    </div>
  );
});

EmailDisplay.displayName = 'EmailDisplay';
