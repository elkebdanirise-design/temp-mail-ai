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
    } else if (tabId === 'copy') {
      handleCopyEmail();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
    >
      <div className="bg-background/60 backdrop-blur-xl rounded-2xl border border-white/10 px-2 py-3 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isHighlight = tab.highlight;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isHighlight
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 scale-110 -mt-2'
                    : isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className={`${isHighlight ? 'w-6 h-6' : 'w-5 h-5'}`} />
                <span className={`${isHighlight ? 'text-[11px] font-semibold' : 'text-[10px] font-medium'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
