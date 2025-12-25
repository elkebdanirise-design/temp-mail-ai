import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Crown, Check, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (key: string) => Promise<{ success: boolean; error?: string }>;
}

export const PremiumModal = ({ isOpen, onClose, onActivate }: PremiumModalProps) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleActivate = async () => {
    if (!licenseKey.trim()) {
      setError('Please enter a license key');
      return;
    }

    setIsActivating(true);
    setError(null);

    const result = await onActivate(licenseKey.trim());
    
    if (result.success) {
      setLicenseKey('');
      onClose();
    } else {
      setError(result.error || 'Invalid license key');
    }

    setIsActivating(false);
  };

  const benefits = [
    'Remove all advertisements',
    'Priority email delivery',
    'Extended inbox retention',
    'VIP Gold badge',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-md w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto border-0 p-0 z-50"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 8% / 0.98), hsl(0 0% 4% / 0.99))',
          boxShadow: `
            0 0 80px hsl(45 80% 50% / 0.15),
            0 25px 60px hsl(0 0% 0% / 0.6),
            inset 0 1px 0 hsl(0 0% 100% / 0.08)
          `,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Gold accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(45 80% 55%), hsl(35 90% 50%), hsl(45 80% 55%), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Ambient glow */}
        <div 
          className="absolute -inset-px rounded-xl pointer-events-none opacity-50"
          style={{ 
            background: 'radial-gradient(ellipse at top, hsl(45 80% 50% / 0.1) 0%, transparent 60%)',
          }}
        />

        <div className="relative p-6 sm:p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-3 rounded-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                style={{
                  background: 'linear-gradient(145deg, hsl(45 70% 50% / 0.15), hsl(35 80% 45% / 0.1))',
                  border: '1px solid hsl(45 70% 55% / 0.25)',
                  boxShadow: '0 0 30px hsl(45 80% 50% / 0.15)',
                }}
              >
                <Crown className="w-6 h-6" style={{ color: 'hsl(45 85% 55%)' }} />
              </motion.div>
              <div>
                <DialogTitle 
                  className="text-xl font-bold flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45 80% 60%), hsl(35 90% 55%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Activate VIP Access
                  <Sparkles className="w-4 h-4" style={{ color: 'hsl(45 85% 55%)' }} />
                </DialogTitle>
                <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 50%)' }}>
                  {user ? 'Unlock premium features' : 'Sign in for full benefits'}
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div 
                  className="p-1.5 rounded-full"
                  style={{ background: 'hsl(150 60% 40% / 0.15)' }}
                >
                  <Check className="w-3 h-3" style={{ color: 'hsl(150 70% 50%)' }} />
                </div>
                <span className="text-sm" style={{ color: 'hsl(0 0% 60%)' }}>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Not logged in warning */}
          <AnimatePresence>
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 p-3 rounded-xl text-sm"
                style={{
                  background: 'hsl(var(--aurora-orange) / 0.1)',
                  border: '1px solid hsl(var(--aurora-orange) / 0.2)',
                  color: 'hsl(var(--aurora-orange))'
                }}
              >
                <a href="/auth" className="font-medium hover:underline">Sign in</a> to save your VIP status
              </motion.div>
            )}
          </AnimatePresence>

          {/* License Key Input */}
          <div className="space-y-4">
            <div 
              className="relative rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, hsl(0 0% 6%), hsl(0 0% 4%))',
                border: '1.5px solid hsl(45 70% 50% / 0.2)',
                boxShadow: '0 0 30px hsl(45 80% 50% / 0.08), inset 0 2px 4px hsl(0 0% 0% / 0.3)',
              }}
            >
              <Key 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'hsl(45 70% 55% / 0.6)' }}
              />
              <input
                type="text"
                placeholder="AURA-PRO-2026-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
                className="w-full py-4 pl-12 pr-4 bg-transparent text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.05em',
                  color: 'hsl(0 0% 90%)',
                }}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-destructive pl-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              onClick={handleActivate}
              disabled={isActivating}
              className="w-full h-12 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, hsl(45 80% 50%), hsl(35 90% 48%))',
                color: 'hsl(0 0% 8%)',
                boxShadow: '0 4px 20px hsl(45 80% 50% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.2)',
              }}
            >
              {isActivating ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Activating...
                </div>
              ) : (
                'Activate License'
              )}
            </Button>

            <p className="text-xs text-center pt-2" style={{ color: 'hsl(0 0% 45%)' }}>
              Need a license?{' '}
              <a
                href="#pro-systems"
                onClick={onClose}
                style={{ color: 'hsl(45 80% 55%)' }}
                className="font-medium hover:underline"
              >
                Get Pro Systems
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
