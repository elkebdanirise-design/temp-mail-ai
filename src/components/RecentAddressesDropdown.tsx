import { memo, useState } from 'react';
import { ChevronDown, Clock, Check, Crown, Mail, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { EmailSession, useEmailSessions } from '@/hooks/useEmailSessions';
import { usePremium } from '@/contexts/PremiumContext';

interface RecentAddressesDropdownProps {
  onSwitch: (session: EmailSession) => void;
  currentEmail: string | null;
}

// Format time remaining in a sleek way
const formatTimeRemaining = (expiresAt: string): { value: string; unit: string; urgent: boolean } => {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { value: '0', unit: 'expired', urgent: true };
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return { value: `${days}`, unit: days === 1 ? 'day' : 'days', urgent: false };
  }
  if (hours > 0) {
    return { value: `${hours}`, unit: hours === 1 ? 'hour' : 'hours', urgent: hours < 2 };
  }
  return { value: `${minutes}`, unit: 'min', urgent: true };
};

export const RecentAddressesDropdown = memo(({ onSwitch, currentEmail }: RecentAddressesDropdownProps) => {
  const { sessions, switchSession, getTimeRemaining } = useEmailSessions();
  const { isPremium } = usePremium();
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState<string | null>(null);

  // Filter out current/active session from the list
  const recentSessions = sessions.filter(s => s.email_address !== currentEmail);

  const handleSwitch = async (session: EmailSession) => {
    setSwitching(session.id);
    const switched = await switchSession(session.id);
    if (switched) {
      onSwitch(switched);
    }
    setSwitching(null);
    setIsOpen(false);
  };

  if (recentSessions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 px-2.5 text-xs gap-1.5 rounded-full transition-all duration-300 hover:bg-primary/10 group"
          style={{
            border: '1px solid hsl(var(--aurora-orange) / 0.2)',
            background: 'hsl(var(--aurora-orange) / 0.05)',
          }}
        >
          <div className="relative">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span 
              className="absolute -top-1 -right-1 w-3 h-3 flex items-center justify-center text-[8px] font-bold rounded-full"
              style={{
                background: 'hsl(var(--aurora-orange))',
                color: 'hsl(var(--background))',
              }}
            >
              {recentSessions.length}
            </span>
          </div>
          <span className="hidden sm:inline text-muted-foreground group-hover:text-foreground transition-colors">
            Recent
          </span>
          <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-all group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-80 sm:w-[340px] p-0 overflow-hidden rounded-xl border-0"
        style={{
          background: 'linear-gradient(165deg, hsl(240 20% 8% / 0.98), hsl(240 25% 5% / 0.99))',
          boxShadow: '0 25px 50px -12px hsl(var(--aurora-orange) / 0.15), 0 0 0 1px hsl(var(--aurora-orange) / 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div 
          className="px-4 py-3 border-b"
          style={{ borderColor: 'hsl(var(--aurora-orange) / 0.1)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(var(--aurora-orange) / 0.15)' }}
              >
                <Mail className="w-3.5 h-3.5" style={{ color: 'hsl(var(--aurora-orange))' }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Recent Addresses</p>
                <p className="text-[10px] text-muted-foreground">
                  {recentSessions.length} saved address{recentSessions.length !== 1 ? 'es' : ''}
                </p>
              </div>
            </div>
            
            {/* Retention Badge */}
            <div 
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{
                background: isPremium 
                  ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.15))'
                  : 'hsl(0 0% 50% / 0.1)',
                border: `1px solid ${isPremium ? 'hsl(var(--aurora-orange) / 0.3)' : 'hsl(0 0% 50% / 0.2)'}`,
              }}
            >
              {isPremium ? (
                <>
                  <Crown className="w-3 h-3" style={{ color: 'hsl(var(--aurora-orange))' }} />
                  <span className="text-[10px] font-semibold" style={{ color: 'hsl(var(--aurora-orange))' }}>
                    7 DAY
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-medium text-muted-foreground">24H</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Sessions List */}
        <div className="max-h-[280px] overflow-y-auto py-1.5">
          {recentSessions.map((session, index) => {
            const timeInfo = formatTimeRemaining(session.expires_at);
            const isLoading = switching === session.id;
            
            return (
              <button
                key={session.id}
                onClick={() => handleSwitch(session)}
                disabled={isLoading}
                className="w-full px-3 py-2.5 flex items-center gap-3 transition-all hover:bg-primary/5 active:scale-[0.99] disabled:opacity-50"
                style={{
                  borderBottom: index < recentSessions.length - 1 ? '1px solid hsl(var(--aurora-orange) / 0.05)' : 'none',
                }}
              >
                {/* Avatar/Icon */}
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 relative"
                  style={{
                    background: session.is_active 
                      ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.15))'
                      : 'hsl(0 0% 50% / 0.08)',
                    border: session.is_active ? '1px solid hsl(var(--aurora-orange) / 0.3)' : '1px solid transparent',
                  }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : session.is_active ? (
                    <Check className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
                  ) : (
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                
                {/* Email Info */}
                <div className="flex-1 min-w-0 text-left">
                  <p 
                    className="text-sm font-mono truncate"
                    style={{
                      color: session.is_active ? 'hsl(var(--aurora-orange))' : 'hsl(var(--foreground))',
                    }}
                  >
                    {session.email_address.split('@')[0]}
                    <span className="text-muted-foreground">@{session.email_address.split('@')[1]}</span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground/60" />
                    <span 
                      className={`text-[10px] ${timeInfo.urgent ? 'text-destructive font-medium' : 'text-muted-foreground'}`}
                    >
                      {timeInfo.value} {timeInfo.unit} left
                    </span>
                  </div>
                </div>
                
                {/* Time Badge */}
                <div 
                  className="shrink-0 px-2 py-1 rounded-md text-[10px] font-bold tabular-nums"
                  style={{
                    background: timeInfo.urgent 
                      ? 'hsl(0 70% 50% / 0.15)'
                      : 'hsl(var(--aurora-orange) / 0.1)',
                    color: timeInfo.urgent 
                      ? 'hsl(0 70% 60%)'
                      : 'hsl(var(--aurora-orange))',
                  }}
                >
                  {timeInfo.value}{timeInfo.unit.charAt(0).toUpperCase()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pro Upgrade CTA for Free Users */}
        {!isPremium && (
          <div 
            className="px-4 py-3 border-t"
            style={{ 
              borderColor: 'hsl(var(--aurora-orange) / 0.1)',
              background: 'linear-gradient(180deg, transparent, hsl(var(--aurora-orange) / 0.03))',
            }}
          >
            <a 
              href="#pricing-section"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.2))',
                  border: '1px solid hsl(var(--aurora-orange) / 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  Upgrade to Pro
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Unlock 7-day retention</span>
                </div>
              </div>
              <Crown className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            </a>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

RecentAddressesDropdown.displayName = 'RecentAddressesDropdown';
