import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from './AuraLogo';
import { VIPBadge } from './VIPBadge';
import { PremiumModal } from './PremiumModal';
import { usePremium } from '@/contexts/PremiumContext';

export const Header = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { isPremium, activatePremium } = usePremium();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 md:py-8"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg animate-pulse" />
                <div className="relative p-1.5 rounded-lg bg-primary/10 border border-primary/30">
                  <AuraLogo className="w-8 h-8" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    Aura<span className="neon-text">-Mail</span>
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">
                  Secure AI Mail
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
              </nav>

              {isPremium ? (
                <Button
                  variant="outline"
                  onClick={() => setShowPremiumModal(true)}
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                >
                  <Key className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Manage License</span>
                  <span className="sm:hidden">License</span>
                </Button>
              ) : (
                <Button
                  asChild
                  className="relative overflow-hidden mesh-gradient-btn hover:scale-105 transition-transform text-white font-semibold shadow-lg shadow-cyan-500/25"
                >
                  <a href="#pro-systems" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="hidden sm:inline">Get Pro Systems</span>
                    <span className="sm:hidden">Pro</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onActivate={activatePremium}
      />
    </>
  );
};
