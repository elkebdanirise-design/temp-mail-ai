import { motion } from 'framer-motion';
import { Mail, Inbox, RefreshCw, Settings } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onRefresh: () => void;
}

export const MobileNav = ({ activeTab, onTabChange, onRefresh }: MobileNavProps) => {
  const tabs = [
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'inbox', icon: Inbox, label: 'Inbox' },
    { id: 'refresh', icon: RefreshCw, label: 'Refresh' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'refresh') {
      onRefresh();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="glass-panel rounded-none border-x-0 border-b-0 px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
