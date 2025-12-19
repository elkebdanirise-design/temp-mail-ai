import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bento-item cursor-pointer group"
      onClick={onOpen}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${message.seen ? 'bg-secondary/50' : 'bg-primary/10 border border-primary/20'}`}>
          {message.seen ? (
            <MailOpen className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Mail className="w-4 h-4 text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-sm font-medium truncate">
              {message.from.name || message.from.address}
            </span>
            {!message.seen && (
              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            )}
          </div>
          
          <h4 className={`text-sm mb-1 truncate ${message.seen ? 'text-muted-foreground' : 'font-medium'}`}>
            {message.subject || '(No subject)'}
          </h4>
          
          <p className="text-xs text-muted-foreground/70 line-clamp-2">
            {message.intro || 'No preview available'}
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground/50">
              <Clock className="w-3 h-3" />
              <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
