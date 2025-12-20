import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Inbox as InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MessageCard } from './MessageCard';
import { MessageModal } from './MessageModal';
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
  getMessageDetail: (id: string) => Promise<Message | null>;
  isRefreshing?: boolean;
}

export const InboxComponent = ({ messages, onRefresh, onDeleteMessage, getMessageDetail, isRefreshing = false }: InboxProps) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);

  const handleOpenMessage = async (messageId: string) => {
    setIsModalOpen(true);
    setIsLoadingMessage(true);
    
    const detail = await getMessageDetail(messageId);
    setSelectedMessage(detail);
    setIsLoadingMessage(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMessage(null), 300);
  };

  const handleDeleteFromModal = () => {
    if (selectedMessage) {
      onDeleteMessage(selectedMessage.id);
      handleCloseModal();
    }
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
          <InboxIcon className="w-5 h-5 text-[hsl(280,100%,70%)]" />
          <h3 className="text-lg font-semibold">Inbox</h3>
          {messages.length > 0 && (
            <span 
              className="px-2 py-0.5 text-xs font-medium rounded-full"
              style={{
                background: 'hsl(280 80% 60% / 0.15)',
                color: 'hsl(280 100% 75%)',
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
                className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </TooltipTrigger>
            <TooltipContent className="glass-panel border-[hsl(280,80%,60%,0.3)]">
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

      {/* Message Modal */}
      <MessageModal
        message={selectedMessage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteFromModal}
        isLoading={isLoadingMessage}
      />
    </div>
  );
};