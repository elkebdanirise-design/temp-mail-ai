import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Clock, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface MessageDetail {
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
  text?: string;
  html?: string[];
  createdAt: string;
}

interface MessageModalProps {
  message: MessageDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

export const MessageModal = ({ message, isOpen, onClose, onDelete, isLoading }: MessageModalProps) => {
  const [showHtml, setShowHtml] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 glass-panel overflow-hidden flex flex-col"
          >
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : message ? (
              <>
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="hover:bg-secondary"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-lg font-semibold truncate max-w-[200px] md:max-w-[400px]">
                      {message.subject || '(No subject)'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onDelete}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="hover:bg-secondary"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-4 md:p-6 border-b border-border space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {message.from.name || message.from.address}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {message.from.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    To: {message.to.map(t => t.address).join(', ')}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                  {message.html && message.html.length > 0 && showHtml ? (
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: message.html.join('') }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90">
                      {message.text || 'No content available'}
                    </pre>
                  )}
                </div>

                {/* Footer */}
                {message.html && message.html.length > 0 && (
                  <div className="p-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHtml(!showHtml)}
                      className="text-xs"
                    >
                      {showHtml ? 'View Plain Text' : 'View HTML'}
                    </Button>
                  </div>
                )}
              </>
            ) : null}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
