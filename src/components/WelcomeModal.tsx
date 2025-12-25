import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  avatarUrl?: string | null;
}

export const WelcomeModal = ({ isOpen, onClose, userName, avatarUrl }: WelcomeModalProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing secure connection...');

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setStatusText('Initializing secure connection...');
      return;
    }

    const stages = [
      { progress: 25, text: 'Encrypting session...' },
      { progress: 50, text: 'Loading privacy protocols...' },
      { progress: 75, text: 'Accessing your Secure Inbox...' },
      { progress: 100, text: 'Welcome aboard!' },
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        setStatusText(stages[currentStage].text);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onClose();
        }, 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(0 0% 5% / 0.95) 0%, hsl(0 0% 2% / 0.98) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Ambient glow effects */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle, hsl(var(--aurora-orange) / 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            style={{
              background: 'radial-gradient(circle, hsl(var(--aurora-sunset) / 0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, hsl(0 0% 10% / 0.9) 0%, hsl(0 0% 6% / 0.95) 100%)',
              border: '1px solid hsl(0 0% 100% / 0.08)',
              boxShadow: `
                0 0 60px hsl(var(--aurora-orange) / 0.15),
                0 25px 50px -12px hsl(0 0% 0% / 0.5),
                inset 0 1px 0 hsl(0 0% 100% / 0.1)
              `,
            }}
          >
            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)), hsl(var(--aurora-orange)), transparent)',
                transformOrigin: 'center',
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110"
              style={{
                background: 'hsl(0 0% 100% / 0.05)',
                color: 'hsl(0 0% 50%)',
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-8 pt-10 flex flex-col items-center text-center">
              {/* Avatar with glow ring */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                className="relative mb-6"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: avatarUrl
                      ? 'transparent'
                      : 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                    boxShadow: `
                      0 0 30px hsl(var(--aurora-orange) / 0.4),
                      0 0 60px hsl(var(--aurora-sunset) / 0.2)
                    `,
                  }}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Shield className="w-10 h-10 text-white" />
                  )}
                </div>
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    border: '2px dashed hsl(var(--aurora-orange) / 0.4)',
                    margin: '-4px',
                  }}
                />
              </motion.div>

              {/* Welcome text with neon gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)) 0%, hsl(var(--aurora-sunset)) 50%, hsl(var(--aurora-orange)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px hsl(var(--aurora-orange) / 0.3)',
                }}
              >
                Welcome to the Future
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-medium mb-1"
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
                transition={{ delay: 0.5 }}
                className="text-sm mb-8"
                style={{ color: 'hsl(0 0% 50%)' }}
              >
                Your AI-powered secure inbox is ready
              </motion.p>

              {/* Progress section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full"
              >
                {/* Progress bar */}
                <div
                  className="w-full h-2 rounded-full overflow-hidden mb-3"
                  style={{ background: 'hsl(0 0% 100% / 0.05)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                      boxShadow: '0 0 15px hsl(var(--aurora-orange) / 0.5)',
                    }}
                  />
                </div>

                {/* Status text */}
                <motion.p
                  key={statusText}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium"
                  style={{ color: 'hsl(var(--aurora-orange))' }}
                >
                  {statusText}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
