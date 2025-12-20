import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Loader2 } from 'lucide-react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(email);

  // Blur-to-clear transition effect when email changes
  useEffect(() => {
    if (email !== displayEmail && email) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayEmail(email);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    } else if (email) {
      setDisplayEmail(email);
    }
  }, [email, displayEmail]);

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
      className="relative"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ 
              background: 'hsl(190 80% 55%)',
              boxShadow: '0 0 6px hsl(190 80% 55% / 0.5)',
            }}
          />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Secure Address
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] font-medium text-emerald-400/70 uppercase tracking-wider">
            Live Sync
          </span>
        </div>
      </div>

      {/* Unified Tech Module - Elongated Pill Container */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'hsl(220 25% 2%)',
        }}
      >
        {/* Dynamic Glowing Border */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsl(190 70% 45% / 0.2) 0%, hsl(210 60% 40% / 0.1) 50%, hsl(190 70% 45% / 0.15) 100%)',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Digital Scanning Light Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
            className="absolute inset-y-0 w-24"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(190 80% 55% / 0.08), transparent)',
            }}
          />
        </div>

        {/* Inner Container */}
        <div 
          className="relative rounded-2xl m-[1px] overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, hsl(220 30% 4%), hsl(220 35% 2%))',
          }}
        >
          {/* Subtle top edge highlight */}
          <div 
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.04), transparent)',
            }}
          />

          <div className="relative flex items-center">
            {/* Copy Icon - Left Edge */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    disabled={!email || loading}
                    className="relative px-5 py-5 flex items-center justify-center transition-all hover:bg-[hsl(190,60%,50%,0.04)] disabled:opacity-30 disabled:cursor-not-allowed group"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="w-4 h-4 text-[hsl(190,50%,50%)] group-hover:text-[hsl(190,60%,60%)] transition-colors" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="rounded-xl border-[hsl(190,40%,35%,0.15)]"
                  style={{ background: 'hsl(220 30% 5%)' }}
                >
                  <p className="text-xs">{copied ? 'Copied!' : 'Copy to clipboard'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Vertical Divider */}
            <div 
              className="w-px h-8 self-center"
              style={{ background: 'hsl(190 50% 40% / 0.1)' }}
            />

            {/* Email Address - Center */}
            <div 
              className="flex-1 px-5 py-5 flex items-center justify-center cursor-pointer group"
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
                    <Loader2 className="w-4 h-4 text-[hsl(190,60%,50%)] animate-spin" />
                    <span className="text-sm text-muted-foreground/70 font-medium">Generating...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key={displayEmail || 'empty'}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ 
                      opacity: isTransitioning ? 0.3 : 1, 
                      filter: isTransitioning ? 'blur(4px)' : 'blur(0px)' 
                    }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-sm sm:text-base md:text-lg tracking-wide text-center break-all transition-all group-hover:opacity-70"
                    style={{
                      background: 'linear-gradient(90deg, hsl(0 0% 90%) 0%, hsl(185 70% 70%) 35%, hsl(190 80% 60%) 65%, hsl(0 0% 85%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {displayEmail || 'Awaiting generation...'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Vertical Divider */}
            <div 
              className="w-px h-8 self-center"
              style={{ background: 'hsl(190 50% 40% / 0.1)' }}
            />

            {/* Refresh Icon - Right Edge */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="relative px-5 py-5 flex items-center justify-center transition-all hover:bg-[hsl(190,60%,50%,0.04)] disabled:opacity-30 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 text-[hsl(190,50%,50%)] animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 text-[hsl(190,50%,50%)] group-hover:text-[hsl(190,60%,60%)] transition-colors" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="rounded-xl border-[hsl(190,40%,35%,0.15)]"
                  style={{ background: 'hsl(220 30% 5%)' }}
                >
                  <p className="text-xs">Generate new address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Minimal Info Footer */}
      <div className="flex items-center justify-center gap-3 mt-4 text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em]">
        <span>Click to copy</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
        <span>Auto-refresh enabled</span>
      </div>
    </motion.div>
  );
};
