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
                  className="absolute inset-0 rounded-xl blur-md"
                  style={{ background: 'hsl(190 80% 50% / 0.1)' }}
                />
                <div 
                  className="relative p-2 rounded-xl"
                  style={{
                    background: 'hsl(210 30% 4% / 0.9)',
                    border: '1px solid hsl(190 60% 45% / 0.15)',
                  }}
                >
                  <AuraLogo className="w-8 h-8" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {/* Luxury Brand Title with Clash Display */}
                  <h1 className="font-display text-xl md:text-2xl font-semibold relative flex items-center" style={{ letterSpacing: '-0.04em' }}>
                    <span 
                      className="font-display"
                      style={{
                        background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 95%) 25%, hsl(190 40% 75%) 50%, hsl(200 50% 70%) 75%, hsl(0 0% 90%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Temp Mail
                    </span>
                    <span className="mx-1.5" />
                    <span 
                      className="font-display font-bold"
                      style={{
                        background: 'linear-gradient(135deg, hsl(185 80% 65%) 0%, hsl(190 90% 55%) 40%, hsl(200 85% 60%) 70%, hsl(210 80% 65%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 6px hsl(190 80% 55% / 0.3))',
                      }}
                    >
                      Aura
                    </span>
                    {/* AI Precision Symbol - Three glowing dots */}
                    <span className="hidden sm:inline-flex items-center ml-2 gap-[3px]">
                      <span 
                        className="w-[3px] h-[3px] rounded-full"
                        style={{ 
                          background: 'hsl(190 90% 60%)',
                          boxShadow: '0 0 4px hsl(190 90% 60% / 0.6)',
                        }}
                      />
                      <span 
                        className="w-[3px] h-[4px] rounded-full"
                        style={{ 
                          background: 'hsl(190 85% 55%)',
                          boxShadow: '0 0 6px hsl(190 85% 55% / 0.7)',
                        }}
                      />
                      <span 
                        className="w-[3px] h-[3px] rounded-full"
                        style={{ 
                          background: 'hsl(200 80% 60%)',
                          boxShadow: '0 0 4px hsl(200 80% 60% / 0.6)',
                        }}
                      />
                    </span>
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                {/* Premium Cinematic Tagline */}
                <span 
                  className="text-[9px] sm:text-[10px] font-medium uppercase mt-1"
                  style={{
                    letterSpacing: '0.25em',
                    background: 'linear-gradient(90deg, hsl(0 0% 50%) 0%, hsl(190 30% 55%) 50%, hsl(0 0% 45%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  INSTANT PRIVACY. INFINITE SHIELD.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Blog Link */}
              <a
                href="#blog-section"
                onClick={(e) => handleAnchorClick(e, '#blog-section')}
                className="hidden md:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[hsl(190,80%,50%)] hover:after:w-full after:transition-all"
              >
                Blog
              </a>

              {/* Live Users Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{
                  background: 'hsl(160 60% 35% / 0.06)',
                  border: '1px solid hsl(160 60% 40% / 0.12)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
                  <Users className="w-3.5 h-3.5 text-emerald-400/80" />
                </div>
                <span className="text-xs font-medium text-emerald-400/80">
                  {liveUsers.toLocaleString()} online
                </span>
              </motion.div>

              {isPremium ? (
                <Button
                  variant="outline"
                  onClick={() => setShowPremiumModal(true)}
                  className="border-amber-500/20 text-amber-400/90 hover:bg-amber-500/8 rounded-xl"
                >
                  <Key className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Manage License</span>
                  <span className="sm:hidden">License</span>
                </Button>
              ) : (
                <Button
                  asChild
                  className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-102 transition-transform text-white font-semibold rounded-xl"
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
