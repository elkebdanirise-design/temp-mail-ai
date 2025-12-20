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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
    >
      <div className="bg-background/40 backdrop-blur-2xl rounded-2xl border border-white/10 px-1.5 py-2 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isHighlight = tab.highlight;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all duration-150 touch-manipulation select-none ${
                  isHighlight
                    ? 'mesh-gradient-btn-intense text-white shadow-md shadow-cyan-500/30 scale-100 active:scale-90'
                    : isActive
                    ? 'text-primary bg-primary/10 active:scale-95'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 active:bg-secondary/70 active:scale-95'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[8px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};