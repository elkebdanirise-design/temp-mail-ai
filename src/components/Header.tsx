import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Key, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from './AuraLogo';
import { VIPBadge } from './VIPBadge';
import { PremiumModal } from './PremiumModal';
import { usePremium } from '@/contexts/PremiumContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export const Header = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { isPremium, activatePremium } = usePremium();
  const [liveUsers, setLiveUsers] = useState(1247);
  const { handleAnchorClick } = useSmoothScroll();

  // Simulate live users fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 md:py-8 relative z-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-lg blur-md"
                  style={{ background: 'hsl(190 100% 55% / 0.15)' }}
                />
                <div 
                  className="relative p-1.5 rounded-lg"
                  style={{
                    background: 'hsl(190 80% 50% / 0.08)',
                    border: '1px solid hsl(190 80% 50% / 0.2)',
                  }}
                >
                  <AuraLogo className="w-8 h-8" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tighter relative">
                    <span className="font-semibold text-foreground">Temp Mail</span>{' '}
                    <span className="aurora-gradient-text font-bold">Aura</span>
                    {/* High-tech ornamental element */}
                    <span className="hidden sm:inline-flex items-center ml-2 relative">
                      <svg viewBox="0 0 32 12" className="w-8 h-3" fill="none">
                        <rect x="0" y="4" width="6" height="4" rx="1" fill="hsl(190 80% 50% / 0.4)" />
                        <rect x="8" y="3" width="4" height="6" rx="1" fill="hsl(190 80% 50% / 0.3)" />
                        <rect x="14" y="2" width="2" height="8" rx="0.5" fill="hsl(190 80% 50% / 0.25)" />
                        <rect x="18" y="4" width="8" height="4" rx="1" fill="hsl(190 80% 50% / 0.35)" />
                        <rect x="28" y="5" width="4" height="2" rx="0.5" fill="hsl(190 80% 50% / 0.2)" />
                        <line x1="0" y1="6" x2="32" y2="6" stroke="hsl(190 80% 50% / 0.15)" strokeWidth="0.5" />
                      </svg>
                    </span>
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                {/* Subtitle tagline */}
                <span 
                  className="text-[10px] sm:text-xs font-medium tracking-widest uppercase mt-0.5"
                  style={{
                    background: 'linear-gradient(90deg, hsl(190 60% 55% / 0.7), hsl(210 60% 60% / 0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Instant Privacy. Infinite Shield.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Blog Link */}
              <a
                href="#blog-section"
                onClick={(e) => handleAnchorClick(e, '#blog-section')}
                className="hidden md:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[hsl(190,100%,55%)] hover:after:w-full after:transition-all"
              >
                Blog
              </a>

              {/* Live Users Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'hsl(160 100% 40% / 0.08)',
                  border: '1px solid hsl(160 100% 40% / 0.2)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse" />
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400">
                  {liveUsers.toLocaleString()} online
                </span>
              </motion.div>

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
                  className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-105 transition-transform text-white font-semibold"
                >
                  <a 
                    href="#pro-systems" 
                    onClick={(e) => handleAnchorClick(e, '#pro-systems')}
                    className="flex items-center gap-2"
                  >
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