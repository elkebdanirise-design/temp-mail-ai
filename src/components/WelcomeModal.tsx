import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Fingerprint, Lock, Zap } from 'lucide-react';
import { LetterAvatar } from './LetterAvatar';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  avatarUrl?: string | null;
}

export const WelcomeModal = ({ isOpen, onClose, userName, avatarUrl }: WelcomeModalProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Securing your digital footprint...');
  const [statusIcon, setStatusIcon] = useState<'fingerprint' | 'lock' | 'zap' | 'shield'>('fingerprint');

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setStatusText('Securing your digital footprint...');
      setStatusIcon('fingerprint');
      return;
    }

    const stages = [
      { progress: 25, text: 'Encrypting private channels...', icon: 'lock' as const },
      { progress: 50, text: 'Initializing your secure vault...', icon: 'zap' as const },
      { progress: 75, text: 'Activating AI privacy shield...', icon: 'shield' as const },
      { progress: 100, text: 'Your sanctuary awaits', icon: 'shield' as const },
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        setStatusText(stages[currentStage].text);
        setStatusIcon(stages[currentStage].icon);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onClose();
        }, 700);
      }
    }, 550);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  const StatusIconComponent = {
    fingerprint: Fingerprint,
    lock: Lock,
    zap: Zap,
    shield: Shield,
  }[statusIcon];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(0 0% 4% / 0.97) 0%, hsl(0 0% 1% / 0.99) 100%)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Multi-layer ambient glow */}
          <motion.div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(circle, hsl(var(--aurora-orange) / 0.2) 0%, transparent 65%)',
              filter: 'blur(80px)',
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              background: 'radial-gradient(circle, hsl(var(--aurora-sunset) / 0.18) 0%, transparent 65%)',
              filter: 'blur(70px)',
            }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="relative w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, hsl(0 0% 9% / 0.95) 0%, hsl(0 0% 5% / 0.98) 100%)',
              border: '1px solid hsl(0 0% 100% / 0.06)',
              boxShadow: `
                0 0 100px hsl(var(--aurora-orange) / 0.2),
                0 30px 60px -15px hsl(0 0% 0% / 0.6),
                inset 0 1px 0 hsl(0 0% 100% / 0.08)
              `,
            }}
          >
            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                background: 'linear-gradient(90deg, transparent 5%, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)), hsl(var(--aurora-orange)), transparent 95%)',
                transformOrigin: 'center',
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full transition-all hover:scale-110 z-10"
              style={{
                background: 'hsl(0 0% 100% / 0.04)',
                color: 'hsl(0 0% 45%)',
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-8 pt-12 sm:p-10 sm:pt-14 flex flex-col items-center text-center">
              {/* Avatar with enhanced glow ring */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 14, stiffness: 180, delay: 0.1 }}
                className="relative mb-7"
              >
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    margin: '-8px',
                    background: 'conic-gradient(from 0deg, hsl(var(--aurora-orange) / 0.4), hsl(var(--aurora-sunset) / 0.3), hsl(var(--aurora-orange) / 0.4))',
                    filter: 'blur(12px)',
                  }}
                />
                
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center overflow-hidden relative"
                  style={{
                    background: avatarUrl
                      ? 'transparent'
                      : 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                    boxShadow: `
                      0 0 40px hsl(var(--aurora-orange) / 0.5),
                      0 0 80px hsl(var(--aurora-sunset) / 0.25)
                    `,
                  }}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <LetterAvatar name={userName} size="lg" />
                  )}
                </div>
                
                {/* Animated dashed ring */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  style={{
                    border: '2px dashed hsl(var(--aurora-orange) / 0.35)',
                    margin: '-6px',
                  }}
                />
              </motion.div>

              {/* Welcome text with gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)) 10%, hsl(var(--aurora-sunset)) 50%, hsl(var(--aurora-orange)) 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome to the Future
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
                className="text-lg sm:text-xl font-medium mb-2"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)) 0%, hsl(var(--aurora-sunset)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                of Privacy, {userName}!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="text-sm mb-8"
                style={{ color: 'hsl(0 0% 45%)' }}
              >
                Your AI-powered secure inbox is ready
              </motion.p>

              {/* Progress section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="w-full"
              >
                {/* Progress bar */}
                <div
                  className="w-full h-2.5 rounded-full overflow-hidden mb-4"
                  style={{ background: 'hsl(0 0% 100% / 0.04)' }}
                >
                  <motion.div
                    className="h-full rounded-full relative"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                      boxShadow: '0 0 20px hsl(var(--aurora-orange) / 0.6)',
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.3), transparent)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Status text with icon */}
                <motion.div
                  key={statusText}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <StatusIconComponent className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'hsl(var(--aurora-orange))' }}
                  >
                    {statusText}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
