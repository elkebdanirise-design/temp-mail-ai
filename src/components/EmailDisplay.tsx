import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Loader2, ShieldCheck } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);
  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
  const capsuleRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (!email || loading) return;
    
    await navigator.clipboard.writeText(email);
    
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short 50ms vibration for tactile feedback
    }
    
    setCopied(true);
    setShowCopiedOverlay(true);
    
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowCopiedOverlay(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
        {/* Section Label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-1 h-1 rounded-full"
            style={{ 
              background: 'hsl(var(--aurora-orange))',
              boxShadow: '0 0 6px hsl(var(--aurora-orange) / 0.6)',
            }}
          />
          <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">
            Secure Address
          </span>
        </div>
        {/* AI Smart Shield Badge */}
        <motion.div 
          className="flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{
            background: 'hsl(var(--aurora-orange) / 0.08)',
            border: '1px solid hsl(var(--aurora-orange) / 0.2)',
          }}
          animate={{
            boxShadow: [
              '0 0 8px hsl(var(--aurora-orange) / 0.2)',
              '0 0 16px hsl(var(--aurora-orange) / 0.35)',
              '0 0 8px hsl(var(--aurora-orange) / 0.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ShieldCheck 
            className="w-3 h-3" 
            style={{ color: 'hsl(var(--aurora-orange))' }}
          />
          <span 
            className="text-[8px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: 'hsl(var(--aurora-orange))' }}
          >
            AI-Verified
          </span>
        </motion.div>
      </div>

      {/* Cyber-Capsule Container */}
      <div
        ref={capsuleRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        {/* Breathing Glow Border - Behind the capsule */}
        <motion.div
          className="absolute -inset-[2px] rounded-full pointer-events-none"
          animate={{
            opacity: isHovered ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: isHovered ? 1.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(135deg, hsl(var(--aurora-magenta)) 0%, hsl(var(--aurora-crimson)) 30%, hsl(var(--aurora-orange)) 70%, hsl(var(--aurora-sunset)) 100%)',
            filter: isHovered ? 'blur(4px)' : 'blur(3px)',
          }}
        />

        {/* Precision Border */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(135deg, hsl(var(--aurora-magenta)) 0%, hsl(var(--aurora-crimson)) 25%, hsl(var(--aurora-orange)) 50%, hsl(var(--aurora-sunset)) 75%, hsl(var(--aurora-magenta)) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            backgroundSize: '300% 300%',
            animation: 'gradient-border-shift 4s ease infinite',
          }}
        />

        {/* Obsidian Glass Capsule */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, hsl(240 20% 6% / 0.95), hsl(240 25% 3% / 0.98))',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Frosted inner effect */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(0 0% 100% / 0.02) 0%, transparent 60%)',
            }}
          />

          {/* Scan-line effect on hover */}
          <AnimatePresence>
            {isHovered && !loading && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-16 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange) / 0.15), transparent)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Loading shimmer effect */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none z-10 rounded-full overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-1/2"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-magenta) / 0.08), hsl(var(--aurora-orange) / 0.12), transparent)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Copied overlay animation */}
          <AnimatePresence>
            {showCopiedOverlay && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-20 rounded-full"
                style={{
                  background: 'hsl(160 60% 35% / 0.15)',
                  boxShadow: 'inset 0 0 30px hsl(160 70% 45% / 0.2)',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400 tracking-wide">Copied!</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inner Content - Fluid height with touch-friendly buttons */}
          <div className="relative flex items-center h-14 sm:h-16 px-1.5 sm:px-1">
            {/* Copy Button - Left - Touch-friendly 44px+ hit area */}
            <button
              onClick={handleCopy}
              disabled={!email || loading}
              className="relative flex items-center justify-center w-11 sm:w-14 h-full min-h-[44px] transition-all disabled:opacity-30 disabled:cursor-not-allowed group rounded-l-full hover:bg-[hsl(330,60%,50%,0.06)] active:bg-[hsl(330,60%,50%,0.12)] active:scale-95"
              aria-label="Copy email"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy 
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors"
                  style={{ 
                    color: isHovered ? 'hsl(var(--aurora-orange))' : 'hsl(var(--aurora-sunset) / 0.7)',
                  }}
                />
              </motion.div>
            </button>

            {/* Subtle divider */}
            <div 
              className="w-px h-6 opacity-30"
              style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--aurora-orange) / 0.3), transparent)' }}
            />

            {/* Email Address - Center - LARGER font on mobile, bold monospace */}
            <div 
              className="flex-1 flex items-center justify-center px-3 sm:px-4 cursor-pointer overflow-hidden min-w-0"
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
                    <Loader2 
                      className="w-4 h-4 animate-spin"
                      style={{ color: 'hsl(var(--aurora-orange))' }}
                    />
                    <span className="text-xs sm:text-sm text-muted-foreground/60 font-medium">
                      Generating...
                    </span>
                  </motion.div>
                ) : (
                  <motion.span
                    key={email || 'empty'}
                    initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center truncate max-w-full text-[0.95rem] sm:text-base font-semibold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      background: 'linear-gradient(90deg, hsl(0 0% 85%) 0%, hsl(var(--aurora-orange) / 0.9) 25%, hsl(var(--aurora-sunset) / 0.9) 50%, hsl(var(--aurora-magenta) / 0.9) 75%, hsl(0 0% 80%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {email || 'Awaiting generation...'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle divider */}
            <div 
              className="w-px h-5 xs:h-6 opacity-30"
              style={{ background: 'linear-gradient(180deg, transparent, hsl(var(--aurora-orange) / 0.3), transparent)' }}
            />

            {/* Refresh Button - Right - Touch-friendly 44px+ hit area */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="relative flex items-center justify-center w-11 xs:w-12 sm:w-14 h-full min-h-[44px] transition-all disabled:opacity-30 disabled:cursor-not-allowed group rounded-r-full hover:bg-[hsl(25,80%,50%,0.06)] active:bg-[hsl(25,80%,50%,0.12)] active:scale-95"
              aria-label="Generate new email"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={loading ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
              >
                <RefreshCw 
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors"
                  style={{ 
                    color: isHovered ? 'hsl(var(--aurora-orange))' : 'hsl(var(--aurora-sunset) / 0.7)',
                  }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="flex items-center justify-center gap-3 mt-3 text-[8px] text-muted-foreground/30 uppercase tracking-[0.25em]">
        <span>Click to copy</span>
        <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/20" />
        <span>AI Sync enabled</span>
      </div>

      {/* Gradient border animation keyframes - injected via style */}
      <style>{`
        @keyframes gradient-border-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};
