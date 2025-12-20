import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Inbox, RefreshCw, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onRefresh: () => void;
  email?: string | null;
}

export const MobileNav = ({ activeTab, onTabChange, onRefresh, email }: MobileNavProps) => {
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = useMemo(
    () => [
      { id: 'email', icon: Mail, label: 'Email' },
      { id: 'copy', icon: Copy, label: 'Copy', highlight: true },
      { id: 'inbox', icon: Inbox, label: 'Inbox' },
      { id: 'refresh', icon: RefreshCw, label: 'Refresh' },
    ],
    []
  );

  const handleCopyEmail = useCallback(async () => {
    if (email) {
      await navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard!');
    } else {
      toast.error('No email to copy');
    }
  }, [email]);

  const handleTabClick = useCallback((tabId: string) => {
    // Immediate haptic-like visual feedback
    setPressedId(tabId);
    setTimeout(() => setPressedId(null), 100);

    if (tabId === 'refresh') {
      setIsRefreshing(true);
      toast.success('Generating new email...');
      onRefresh();
      // Reset after animation
      setTimeout(() => setIsRefreshing(false), 1500);
      return;
    }

    if (tabId === 'copy') {
      handleCopyEmail();
      return;
    }

    onTabChange(tabId);
  }, [onRefresh, handleCopyEmail, onTabChange]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-label="Mobile navigation"
    >
      {/* Deep obsidian glass surface */}
      <div
        className="relative px-4 py-3"
        style={{
          background: `linear-gradient(180deg, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.98) 100%)`,
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderTop: '1px solid hsl(var(--border))',
        }}
      >
        {/* Neon top accent - Orange to Magenta */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, hsl(var(--aurora-magenta) / 0.55), hsl(var(--aurora-orange) / 0.85), hsl(var(--aurora-magenta) / 0.55))`,
            boxShadow: `0 0 12px hsl(var(--aurora-orange) / 0.4), 0 0 20px hsl(var(--aurora-magenta) / 0.2)`,
          }}
        />

        <div className="mx-auto w-full max-w-md">
          <div className="grid grid-cols-4 items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isHighlight = !!tab.highlight;
              const isPressed = pressedId === tab.id;
              const isThisRefreshing = tab.id === 'refresh' && isRefreshing;

              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  onPointerDown={() => setPressedId(tab.id)}
                  onPointerUp={() => setPressedId(null)}
                  onPointerCancel={() => setPressedId(null)}
                  animate={{ 
                    scale: isPressed ? 0.9 : 1,
                    opacity: isPressed ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.1 }}
                  className="relative flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-xl transition-colors duration-150 touch-manipulation select-none active:bg-white/5"
                  style={{
                    color: isHighlight
                      ? 'hsl(var(--primary-foreground))'
                      : isActive
                        ? 'hsl(var(--aurora-orange))'
                        : 'hsl(var(--muted-foreground))',
                    background: isHighlight
                      ? `linear-gradient(135deg, hsl(var(--aurora-magenta)) 0%, hsl(var(--aurora-orange)) 100%)`
                      : isActive
                        ? 'hsl(var(--aurora-orange) / 0.1)'
                        : 'transparent',
                    boxShadow: isHighlight
                      ? `0 8px 24px hsl(var(--aurora-orange) / 0.25), 0 0 30px hsl(var(--aurora-magenta) / 0.15)`
                      : isActive
                        ? `0 0 20px hsl(var(--aurora-orange) / 0.15)`
                        : 'none',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active indicator */}
                  {isActive && !isHighlight && (
                    <motion.div
                      layoutId="mobileNavActive"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, hsl(var(--aurora-orange)), transparent)`,
                        boxShadow: `0 0 12px hsl(var(--aurora-orange) / 0.4)`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <motion.div
                    animate={{ rotate: isThisRefreshing ? 360 : 0 }}
                    transition={{ 
                      duration: isThisRefreshing ? 1 : 0, 
                      repeat: isThisRefreshing ? Infinity : 0, 
                      ease: 'linear' 
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};