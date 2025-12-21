import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Inbox as InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MessageCard } from './MessageCard';
import { EmptyInbox } from './EmptyInbox';
import { InboxSkeleton } from './InboxSkeleton';
import { NativeAdCard } from './NativeAdCard';
import { TrustBadge } from './TrustBadge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  intro: string;
  text?: string;
  html?: string[];
  createdAt: string;
  seen: boolean;
}

interface InboxProps {
  messages: Message[];
  onRefresh: () => void;
  onDeleteMessage: (id: string) => void;
  isRefreshing?: boolean;
}

export const InboxComponent = ({ messages, onRefresh, onDeleteMessage, isRefreshing = false }: InboxProps) => {
  const navigate = useNavigate();

  const handleOpenMessage = (messageId: string) => {
    navigate(`/message/${messageId}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <InboxIcon className="w-5 h-5" style={{ color: 'hsl(var(--aurora-magenta))' }} />
          <h3 className="text-lg font-semibold">Inbox</h3>
          {messages.length > 0 && (
            <span 
              className="px-2 py-0.5 text-xs font-medium rounded-full"
              style={{
                background: 'hsl(var(--aurora-magenta) / 0.12)',
                color: 'hsl(var(--aurora-magenta))',
              }}
            >
              {messages.length}
            </span>
          )}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                className="text-muted-foreground hover:text-foreground transition-all active:scale-95"
                disabled={isRefreshing}
                style={{
                  background: isRefreshing ? 'hsl(var(--aurora-orange) / 0.08)' : 'transparent',
                }}
              >
                <RefreshCw 
                  className={`w-4 h-4 mr-2 transition-transform ${isRefreshing ? 'animate-spin' : 'hover:rotate-180'}`}
                  style={{ 
                    color: isRefreshing ? 'hsl(var(--aurora-orange))' : 'currentColor',
                    transitionDuration: '0.5s',
                  }}
                />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="glass-panel border-aurora-magenta/25">
              <p>Check for new emails</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Messages Grid */}
      {isRefreshing && messages.length === 0 ? (
        <InboxSkeleton />
      ) : messages.length === 0 ? (
        <EmptyInbox />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Native Ad as first item */}
          <NativeAdCard />
          
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <MessageCard
                key={message.id}
                message={message}
                index={index}
                onOpen={() => handleOpenMessage(message.id)}
                onDelete={() => onDeleteMessage(message.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Trust Badge */}
      <TrustBadge />
    </div>
  );
};