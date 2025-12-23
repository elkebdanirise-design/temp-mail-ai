import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

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
            <div 
              className="relative rounded-2xl p-6 shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.98), hsl(220 30% 3% / 0.99))',
                border: '1px solid hsl(45 80% 50% / 0.15)',
              }}
            >
              {/* Gold glow effect */}
              <div 
                className="absolute -inset-1 rounded-2xl blur-xl opacity-30"
                style={{ background: 'linear-gradient(135deg, hsl(45 80% 55% / 0.2), hsl(35 90% 50% / 0.2))' }}
              />
              
              <div className="relative">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2 rounded-full border hover:bg-destructive/20"
                  style={{ 
                    background: 'hsl(220 30% 6%)',
                    borderColor: 'hsl(0 0% 100% / 0.08)',
                  }}
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="p-3 rounded-xl"
                    style={{
                      background: 'linear-gradient(145deg, hsl(45 70% 50% / 0.15), hsl(35 80% 45% / 0.1))',
                      border: '1px solid hsl(45 70% 55% / 0.2)',
                    }}
                  >
                    <Crown className="w-6 h-6" style={{ color: 'hsl(45 85% 55%)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <span 
                        style={{
                          background: 'linear-gradient(135deg, hsl(45 80% 60%), hsl(35 90% 55%))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Redeem License Key
                      </span>
                      <Sparkles className="w-4 h-4" style={{ color: 'hsl(45 85% 55%)' }} />
                    </h3>
                    <p className="text-sm" style={{ color: 'hsl(200 12% 50%)' }}>
                      {user ? 'Activate your VIP membership' : 'Sign in for full benefits'}
                    </p>
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
                      <div 
                        className="p-1 rounded-full"
                        style={{ background: 'hsl(150 60% 40% / 0.15)' }}
                      >
                        <Check className="w-3 h-3" style={{ color: 'hsl(150 70% 50%)' }} />
                      </div>
                      <span className="text-sm" style={{ color: 'hsl(200 12% 55%)' }}>{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Not logged in warning */}
                {!user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl text-sm"
                    style={{
                      background: 'hsl(var(--aurora-orange) / 0.1)',
                      border: '1px solid hsl(var(--aurora-orange) / 0.2)',
                      color: 'hsl(var(--aurora-orange))'
                    }}
                  >
                    <a href="/auth" className="font-medium hover:underline">Sign in</a> to save your VIP status across devices
                  </motion.div>
                )}

                {/* Cyber-Capsule License Key Input */}
                <div className="space-y-3">
                  <div 
                    className="relative rounded-full overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, hsl(220 30% 6%), hsl(220 30% 4%))',
                      border: '1.5px solid hsl(45 70% 50% / 0.2)',
                      boxShadow: '0 0 20px hsl(45 80% 50% / 0.08)',
                    }}
                  >
                    <Key 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: 'hsl(45 70% 55% / 0.6)' }}
                    />
                    <input
                      type="text"
                      placeholder="Enter your license key..."
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="w-full py-3.5 pl-11 pr-4 bg-transparent text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none"
                      style={{ 
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: '0.03em',
                      }}
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive pl-2"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    onClick={handleActivate}
                    disabled={isActivating}
                    className="w-full rounded-full font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(45 80% 50%), hsl(35 90% 50%))',
                      color: 'hsl(220 30% 8%)',
                    }}
                  >
                    {isActivating ? (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 border-2 rounded-full animate-spin"
                          style={{ 
                            borderColor: 'hsl(220 30% 8%)',
                            borderTopColor: 'transparent',
                          }}
                        />
                        Activating...
                      </div>
                    ) : (
                      'Activate License'
                    )}
                  </Button>

                  <p className="text-xs text-center" style={{ color: 'hsl(200 12% 45%)' }}>
                    Don't have a key?{' '}
                    <a
                      href="#pro-systems"
                      onClick={onClose}
                      style={{ color: 'hsl(45 80% 55%)' }}
                      className="hover:underline"
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
