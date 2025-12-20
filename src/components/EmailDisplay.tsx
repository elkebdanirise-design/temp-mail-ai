import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Mail, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EmailDisplayProps {
  email: string | null;
  loading: boolean;
  onRefresh: () => void;
  onDelete: () => void;
}

export const EmailDisplay = ({ 
  email, 
  loading, 
  onRefresh, 
  onDelete 
}: EmailDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!email) return;
    
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-xl shadow-2xl shadow-primary/10"
    >
      {/* Glassmorphism background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute inset-0 mesh-gradient-bg opacity-20 pointer-events-none" />
      
      {/* Neon glow border effect */}
      <div className="absolute inset-0 rounded-2xl border border-primary/30 animate-pulse-neon pointer-events-none" />
      
      {/* Floating gradient orbs */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-[hsl(var(--neon-glow-secondary))]/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="relative z-10 p-5 sm:p-6 md:p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 shadow-lg shadow-primary/20">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground tracking-tight">Your Disposable Email</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[260px] text-center backdrop-blur-xl bg-background/90 border-primary/20">
                    <p className="text-xs">
                      This is a temporary disposable address for privacy protection — not a permanent email account. Perfect for signups, trials, and avoiding spam.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-muted-foreground">Auto-refreshes every 5 seconds</p>
              {/* Live Pulse Dot */}
              <div className="relative flex items-center">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Email Display */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground mb-2 block tracking-wide uppercase">Current Email Address</label>
          <div 
            className="w-full rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 group relative overflow-hidden min-h-[56px] flex items-center bg-secondary/30 border-2 border-primary/40 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/20"
            onClick={handleCopy}
          >
            {/* Neon border glow on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                 style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.1)' }} />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center w-full gap-3"
                >
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-muted-foreground font-medium">Creating secure mailbox...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="email"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-base sm:text-lg md:text-xl font-mono neon-text block group-hover:scale-[1.01] transition-transform relative z-10 break-all tracking-wide"
                >
                  {email || 'No email generated'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons - Responsive Layout */}
        <div className="flex flex-col sm:flex-row gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!email || loading}
                  className="flex-1 sm:flex-none border-2 border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-[1.02] h-12 rounded-xl font-medium backdrop-blur-sm"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Email</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="backdrop-blur-xl bg-background/90 border-primary/20">
                <p>Copy email to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={onRefresh}
            disabled={loading}
            className="flex-1 mesh-gradient-btn-intense text-white font-bold h-12 shadow-xl shadow-cyan-500/40 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/50 tracking-wide"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5 mr-2" />
            )}
            <span>Generate New Email</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
