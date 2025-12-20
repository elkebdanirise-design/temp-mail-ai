import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (key: string) => void;
}

export const PremiumModal = ({ isOpen, onClose, onActivate }: PremiumModalProps) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleActivate = async () => {
    if (!licenseKey.trim()) {
      setError('Please enter a license key');
      return;
    }

    setIsActivating(true);
    setError(null);

    // Simulate activation check
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Valid format: AURA-PRO-2026-XXXX (where XXXX is any 4 characters)
    const validKeyPattern = /^AURA-PRO-2026-.{4}$/;
    
    if (validKeyPattern.test(licenseKey.toUpperCase())) {
      onActivate(licenseKey);
      onClose();
    } else {
      setError('Invalid license key format. Expected: AURA-PRO-2026-XXXX');
    }

    setIsActivating(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
          >
            <div className="relative bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              {/* Gold glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-50" />
              
              <div className="relative">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2 rounded-full bg-background/80 border border-white/10 hover:bg-destructive/20"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
                    <Crown className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      Upgrade to Pro
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-sm text-muted-foreground">Unlock premium features</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {[
                    'Remove all advertisements',
                    'Priority email delivery',
                    'Extended inbox retention',
                    'VIP Gold badge',
                  ].map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-1 rounded-full bg-emerald-500/20">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* License Key Input */}
                <div className="space-y-3">
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter your license key..."
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border focus:border-amber-500/50"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    onClick={handleActivate}
                    disabled={isActivating}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold"
                  >
                    {isActivating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Activating...
                      </div>
                    ) : (
                      'Activate License'
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Don't have a key?{' '}
                    <a
                      href="#pro-systems"
                      onClick={onClose}
                      className="text-amber-400 hover:underline"
                    >
                      Get Pro Systems
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
