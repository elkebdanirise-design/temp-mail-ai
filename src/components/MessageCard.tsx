import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
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
  subject: string;
  intro: string;
  createdAt: string;
  seen: boolean;
}

interface MessageCardProps {
  message: Message;
  index: number;
  onOpen: () => void;
  onDelete: () => void;
}

export const MessageCard = ({ message, index, onOpen, onDelete }: MessageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      className="glass-panel p-5 cursor-pointer group relative overflow-hidden hover:scale-[1.02] transition-all duration-300"
      onClick={onOpen}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[hsl(var(--neon-glow-secondary))]/5" />
      </div>

      {/* Unread indicator glow */}
      {!message.seen && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      )}

      <div className="relative z-10 flex items-start gap-4">
        <div className={`p-2.5 rounded-xl ${message.seen ? 'bg-secondary/50 border border-border' : 'bg-primary/10 border border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.2)]'}`}>
          {message.seen ? (
            <MailOpen className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Mail className="w-5 h-5 text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-sm font-semibold truncate">
              {message.from.name || message.from.address}
            </span>
            {!message.seen && (
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
            )}
          </div>
          
          <h4 className={`text-sm mb-2 truncate ${message.seen ? 'text-muted-foreground' : 'font-medium text-foreground'}`}>
            {message.subject || '(No subject)'}
          </h4>
          
          <p className="text-xs text-muted-foreground/70 line-clamp-2 leading-relaxed">
            {message.intro || 'No preview available'}
          </p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
              <Clock className="w-3 h-3" />
              <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
