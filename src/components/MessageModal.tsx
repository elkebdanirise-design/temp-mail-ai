import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Clock, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import DOMPurify from 'dompurify';

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

  // Sanitize HTML content to prevent XSS attacks from malicious emails
  const sanitizedHtml = useMemo(() => {
    if (!message?.html || message.html.length === 0) return null;
    return DOMPurify.sanitize(message.html.join(''));
  }, [message?.html]);

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal - Full screen on mobile, centered on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col rounded-2xl overflow-hidden w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] xl:w-[55vw] max-w-3xl"
            style={{
              maxHeight: '80vh',
              background: 'linear-gradient(145deg, hsl(220 30% 8%), hsl(220 30% 5%))',
              border: '1px solid hsl(var(--glass-border))',
              boxShadow: '0 25px 50px -12px hsl(0 0% 0% / 0.6), 0 0 80px hsl(var(--aurora-orange) / 0.15)',
            }}
          >
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-full"
                  style={{
                    border: '3px solid hsl(var(--aurora-orange) / 0.2)',
                    borderTopColor: 'hsl(var(--aurora-orange))',
                  }}
                />
              </div>
            ) : message ? (
              <>
                {/* Header - Sticky */}
                <div 
                  className="flex-shrink-0 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between"
                  style={{
                    borderBottom: '1px solid hsl(var(--glass-border))',
                    background: 'hsl(220 30% 5% / 0.8)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="flex-shrink-0 hover:bg-secondary/50 rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-base sm:text-lg font-semibold truncate text-foreground">
                      {message.subject || '(No subject)'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onDelete}
                      className="hover:bg-destructive/10 hover:text-destructive rounded-full"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="hover:bg-secondary/50 rounded-full"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </div>

                {/* Meta Info */}
                <div 
                  className="flex-shrink-0 px-4 py-3 sm:px-6 sm:py-4 space-y-2 sm:space-y-3"
                  style={{ borderBottom: '1px solid hsl(var(--glass-border))' }}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div 
                      className="flex-shrink-0 p-2.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-magenta) / 0.1))',
                        border: '1px solid hsl(var(--aurora-orange) / 0.25)',
                      }}
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'hsl(var(--aurora-orange))' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate text-sm sm:text-base">
                        {message.from.name || message.from.address}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {message.from.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                      <span className="sm:hidden">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }).replace('about ', '')}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground pl-0 sm:pl-12">
                    To: {message.to.map(t => t.address).join(', ')}
                  </p>
                </div>

                {/* Email Content - Scrollable */}
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-4 sm:p-6 md:p-8">
                    {sanitizedHtml && showHtml ? (
                      <div
                        className="prose prose-invert prose-sm sm:prose-base max-w-none 
                          prose-headings:text-foreground prose-p:text-foreground/85 
                          prose-a:text-[hsl(var(--aurora-orange))] prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-foreground prose-img:rounded-lg prose-img:max-w-full"
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                      />
                    ) : (
                      <pre 
                        className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed"
                        style={{ 
                          color: 'hsl(var(--foreground) / 0.9)',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        {message.text || 'No content available'}
                      </pre>
                    )}
                  </div>
                </ScrollArea>

                {/* Footer - Toggle */}
                {message.html && message.html.length > 0 && (
                  <div 
                    className="flex-shrink-0 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between"
                    style={{
                      borderTop: '1px solid hsl(var(--glass-border))',
                      background: 'hsl(220 30% 5% / 0.8)',
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHtml(!showHtml)}
                      className="text-xs rounded-full px-4"
                      style={{
                        borderColor: 'hsl(var(--aurora-orange) / 0.3)',
                        color: 'hsl(var(--aurora-orange))',
                      }}
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
