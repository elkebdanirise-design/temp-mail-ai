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
  const handleCopyEmail = async () => {
    if (email) {
      await navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard!');
    } else {
      toast.error('No email to copy');
    }
  };

  const tabs = [
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'copy', icon: Copy, label: 'Copy', highlight: true },
    { id: 'inbox', icon: Inbox, label: 'Inbox' },
    { id: 'refresh', icon: RefreshCw, label: 'Refresh' },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'refresh') {
      onRefresh();
      toast.success('Generating new email...');
    } else if (tabId === 'copy') {
      handleCopyEmail();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Neon top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: 'linear-gradient(90deg, hsl(280 80% 55% / 0.6), hsl(190 90% 50% / 0.8), hsl(280 80% 55% / 0.6))',
          boxShadow: '0 0 10px hsl(190 90% 50% / 0.4), 0 0 20px hsl(280 80% 55% / 0.2)',
        }}
      />
      
      {/* Glassmorphism background */}
      <div 
        className="px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, hsl(220 30% 6% / 0.85) 0%, hsl(220 30% 4% / 0.95) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isHighlight = tab.highlight;

            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[56px] rounded-xl transition-all duration-200 touch-manipulation select-none ${
                  isHighlight
                    ? 'text-white'
                    : isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                style={isHighlight ? {
                  background: 'linear-gradient(135deg, hsl(280 80% 55%) 0%, hsl(190 90% 50%) 100%)',
                  boxShadow: '0 4px 20px hsl(190 90% 50% / 0.35), 0 0 30px hsl(280 80% 55% / 0.2)',
                } : isActive ? {
                  background: 'hsl(280 60% 50% / 0.15)',
                  boxShadow: '0 0 20px hsl(280 60% 50% / 0.2)',
                } : {}}
              >
                {/* Active indicator glow */}
                {isActive && !isHighlight && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      border: '1px solid hsl(280 60% 50% / 0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};