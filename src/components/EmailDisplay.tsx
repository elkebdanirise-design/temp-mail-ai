import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Loader2, Shield, Cpu } from 'lucide-react';
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
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Outer container with sophisticated border */}
      <div 
        className="relative p-[1px] rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(190 60% 45% / 0.3) 0%, hsl(210 60% 40% / 0.15) 50%, hsl(190 60% 45% / 0.25) 100%)',
        }}
      >
        {/* Inner glass panel */}
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, hsl(210 30% 7% / 0.97), hsl(210 35% 4% / 0.99))',
          }}
        >
          {/* Subtle ambient glow - top */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-32 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 100% 100% at center top, hsl(190 80% 50% / 0.08) 0%, transparent 70%)',
            }}
          />
          
          {/* Tech circuit pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0 30 H20 M40 30 H60 M30 0 V20 M30 40 V60" stroke="hsl(190 100% 60%)" strokeWidth="0.5" fill="none"/>
                  <circle cx="30" cy="30" r="2" fill="hsl(190 100% 60%)" />
                  <circle cx="20" cy="30" r="1" fill="hsl(190 100% 60%)" />
                  <circle cx="40" cy="30" r="1" fill="hsl(190 100% 60%)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>

          <div className="relative z-10 p-6 sm:p-8">
            {/* Header with icon and status */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="relative p-2.5 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(190 60% 45% / 0.12), hsl(210 60% 45% / 0.06))',
                    border: '1px solid hsl(190 60% 50% / 0.2)',
                  }}
                >
                  <Shield className="w-5 h-5 text-[hsl(190,80%,55%)]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground tracking-tight">Secure Disposable Address</h2>
                  <p className="text-[11px] text-muted-foreground/70 mt-0.5">Auto-syncs • End-to-end protected</p>
                </div>
              </div>
              
              {/* Status indicator */}
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'hsl(160 50% 40% / 0.08)',
                  border: '1px solid hsl(160 50% 40% / 0.15)',
                }}
              >
                <div className="relative flex items-center">
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-medium text-emerald-400/80 uppercase tracking-wider">Live</span>
              </div>
            </div>

            {/* Main email display - the hero element */}
            <div className="relative mb-6">
              {/* Email container with unified design */}
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(210 35% 6% / 0.95), hsl(210 30% 4% / 0.98))',
                  border: '1px solid hsl(190 50% 45% / 0.18)',
                }}
              >
                {/* Inner glow */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03), inset 0 0 30px hsl(190 80% 50% / 0.03)',
                  }}
                />
                
                <div className="relative flex flex-col sm:flex-row items-stretch">
                  {/* Email text area */}
                  <div 
                    className="flex-1 px-5 py-4 sm:py-5 flex items-center justify-center sm:justify-start cursor-pointer group"
                    onClick={handleCopy}
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <Loader2 className="w-5 h-5 text-[hsl(190,80%,55%)] animate-spin" />
                          <span className="text-muted-foreground font-medium text-sm">Generating secure mailbox...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="email"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 w-full"
                        >
                          <Cpu className="w-4 h-4 text-[hsl(190,60%,50%)] shrink-0 hidden sm:block" />
                          <span 
                            className="text-base sm:text-lg md:text-xl font-mono tracking-wide break-all transition-all group-hover:opacity-80"
                            style={{
                              background: 'linear-gradient(90deg, hsl(185 90% 65%) 0%, hsl(190 85% 55%) 50%, hsl(205 80% 60%) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            {email || 'No email generated'}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Divider */}
                  <div 
                    className="hidden sm:block w-px self-stretch my-3"
                    style={{ background: 'hsl(190 50% 45% / 0.15)' }}
                  />
                  
                  {/* Integrated action buttons */}
                  <div className="flex sm:flex-col border-t sm:border-t-0 border-[hsl(190,50%,45%,0.1)]">
                    {/* Copy button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={handleCopy}
                            disabled={!email || loading}
                            className="flex-1 sm:flex-none px-5 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all hover:bg-[hsl(190,50%,50%,0.06)] disabled:opacity-40 disabled:cursor-not-allowed group"
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
                                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Copied</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="flex items-center gap-2"
                                >
                                  <Copy className="w-4 h-4 text-[hsl(190,60%,55%)] group-hover:text-[hsl(190,70%,60%)] transition-colors" />
                                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors uppercase tracking-wide">Copy</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="glass-panel border-[hsl(190,50%,45%,0.2)]">
                          <p className="text-xs">Copy to clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Horizontal divider on mobile, vertical on desktop */}
                    <div 
                      className="w-px sm:w-auto sm:h-px self-stretch sm:mx-3"
                      style={{ background: 'hsl(190 50% 45% / 0.1)' }}
                    />
                    
                    {/* Generate button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={onRefresh}
                            disabled={loading}
                            className="flex-1 sm:flex-none px-5 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all hover:bg-[hsl(190,50%,50%,0.06)] disabled:opacity-40 disabled:cursor-not-allowed group"
                          >
                            {loading ? (
                              <Loader2 className="w-4 h-4 text-[hsl(190,60%,55%)] animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4 text-[hsl(190,60%,55%)] group-hover:text-[hsl(190,70%,60%)] transition-colors" />
                            )}
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors uppercase tracking-wide">New</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="glass-panel border-[hsl(190,50%,45%,0.2)]">
                          <p className="text-xs">Generate new email</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom subtle info bar */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/50 uppercase tracking-widest">
              <div className="w-8 h-px bg-[hsl(190,50%,50%,0.1)]" />
              <span>Click email to copy</span>
              <span className="text-[hsl(190,60%,50%,0.4)]">•</span>
              <span>Tap New to refresh</span>
              <div className="w-8 h-px bg-[hsl(190,50%,50%,0.1)]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
