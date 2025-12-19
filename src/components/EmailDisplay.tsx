import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Trash2, Mail, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCodeModal } from './QRCodeModal';

interface EmailDisplayProps {
  email: string | null;
  loading: boolean;
  onRefresh: () => void;
  onDelete: () => void;
}

export const EmailDisplay = ({ email, loading, onRefresh, onDelete }: EmailDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    if (!email) return;
    
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel p-6 md:p-8 relative overflow-hidden"
      >
        {/* Neon glow effect */}
        <div className="absolute inset-0 animate-pulse-neon rounded-xl pointer-events-none" />
        
        {/* Background gradient orb */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-[hsl(var(--neon-glow-secondary))]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Your Disposable Email</h2>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground/60">Auto-refreshes every 5 seconds</p>
                {/* Live Pulse Dot */}
                <div className="relative flex items-center">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div 
              className="flex-1 w-full bg-secondary/50 rounded-lg px-4 py-3 border border-border cursor-pointer hover:border-primary/50 transition-colors group"
              onClick={handleCopy}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-muted-foreground">Generating...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg md:text-xl font-mono neon-text truncate block group-hover:scale-[1.01] transition-transform"
                  >
                    {email || 'No email generated'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowQR(true)}
                disabled={!email || loading}
                className="border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
                title="Show QR Code"
              >
                <QrCode className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!email || loading}
                className="border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={onRefresh}
                disabled={loading}
                className="border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                disabled={!email || loading}
                className="border-border hover:border-destructive/50 hover:bg-destructive/10 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <QRCodeModal
        email={email}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />
    </>
  );
};
