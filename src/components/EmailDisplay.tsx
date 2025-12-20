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
      className="relative overflow-hidden rounded-2xl border-trace glow-pulse"
    >
      {/* Premium glass background */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, hsl(210 30% 8% / 0.85), hsl(210 30% 5% / 0.95))',
          backdropFilter: 'blur(24px)',
        }}
      />
      
      {/* Cyan aurora glow effects */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 left-[10%] w-[80%] h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at center, hsl(190 100% 55% / 0.2) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-1/3 right-[10%] w-[60%] h-2/3"
          style={{
            background: 'radial-gradient(ellipse, hsl(210 100% 55% / 0.1) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />
      </div>
      
      {/* Glowing border */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '1px solid hsl(190 80% 50% / 0.25)',
          boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03)',
        }}
      />
      
      <div className="relative z-10 p-5 sm:p-6 md:p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-5">
          <div 
            className="p-2.5 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(190 80% 50% / 0.15), hsl(210 100% 55% / 0.08))',
              border: '1px solid hsl(190 80% 50% / 0.25)',
              boxShadow: '0 0 20px hsl(190 100% 55% / 0.15)',
            }}
          >
            <Mail className="w-5 h-5 text-[hsl(190,100%,60%)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground tracking-tight">Your Disposable Email</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[260px] text-center glass-panel border-[hsl(190,80%,50%,0.25)]">
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
            className="w-full rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 group relative overflow-hidden min-h-[56px] flex items-center"
            onClick={handleCopy}
            style={{
              background: 'hsl(210 30% 6% / 0.9)',
              border: '1.5px solid hsl(190 80% 50% / 0.35)',
              boxShadow: '0 0 25px hsl(190 100% 55% / 0.08), inset 0 0 15px hsl(190 100% 55% / 0.03)',
            }}
          >
            {/* Hover glow effect */}
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ 
                boxShadow: '0 0 40px hsl(190 100% 55% / 0.2), inset 0 0 25px hsl(190 100% 55% / 0.05)',
                border: '1.5px solid hsl(190 100% 55% / 0.5)',
              }} 
            />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center w-full gap-3"
                >
                  <Loader2 className="w-5 h-5 text-[hsl(190,100%,60%)] animate-spin" />
                  <span className="text-muted-foreground font-medium">Creating secure mailbox...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="email"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-base sm:text-lg md:text-xl font-mono block group-hover:scale-[1.01] transition-transform relative z-10 break-all tracking-wide aurora-gradient-text"
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
                  className="flex-1 sm:flex-none h-12 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'hsl(210 30% 8% / 0.9)',
                    border: '1px solid hsl(190 80% 50% / 0.25)',
                    backdropFilter: 'blur(12px)',
                  }}
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
              <TooltipContent className="glass-panel border-[hsl(190,80%,50%,0.25)]">
                <p>Copy email to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={onRefresh}
            disabled={loading}
            className="flex-1 mesh-gradient-btn-intense text-white font-bold h-12 rounded-xl transition-all duration-300 hover:scale-[1.02] tracking-wide"
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