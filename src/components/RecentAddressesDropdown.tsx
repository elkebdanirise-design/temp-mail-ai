import { memo, useState } from 'react';
import { ChevronDown, Clock, Check, Crown } from 'lucide-react';
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

export const RecentAddressesDropdown = memo(({ onSwitch, currentEmail }: RecentAddressesDropdownProps) => {
  const { sessions, activeSession, switchSession, getTimeRemaining } = useEmailSessions();
  const { isPremium } = usePremium();
  const [isOpen, setIsOpen] = useState(false);

  // Filter out current/active session from the list
  const recentSessions = sessions.filter(s => s.email_address !== currentEmail);

  const handleSwitch = async (session: EmailSession) => {
    const switched = await switchSession(session.id);
    if (switched) {
      onSwitch(switched);
    }
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
          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Recent</span>
          <span className="sm:hidden">{recentSessions.length}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 bg-background/95 backdrop-blur-xl border-border/50"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center gap-2">
          <Clock className="w-3 h-3" />
          Recent Addresses
          {isPremium ? (
            <span className="ml-auto flex items-center gap-1 text-primary">
              <Crown className="w-3 h-3" />
              7 days
            </span>
          ) : (
            <span className="ml-auto text-muted-foreground/70">24h retention</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {recentSessions.map((session) => (
          <DropdownMenuItem
            key={session.id}
            onClick={() => handleSwitch(session)}
            className="flex flex-col items-start gap-1 py-2 cursor-pointer hover:bg-primary/10"
          >
            <div className="flex items-center gap-2 w-full">
              {session.is_active && (
                <Check className="w-3 h-3 text-primary shrink-0" />
              )}
              <span className="text-sm font-mono truncate flex-1">
                {session.email_address}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground w-full pl-5">
              <Clock className="w-3 h-3" />
              <span>Expires in {getTimeRemaining(session.expires_at)}</span>
            </div>
          </DropdownMenuItem>
        ))}

        {!isPremium && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-2">
              <a 
                href="#pricing-section"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <Crown className="w-3 h-3" />
                Upgrade to Pro for 7-day retention
              </a>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

RecentAddressesDropdown.displayName = 'RecentAddressesDropdown';
