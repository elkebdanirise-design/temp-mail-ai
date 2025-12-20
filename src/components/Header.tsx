import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Key, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from './AuraLogo';
import { VIPBadge } from './VIPBadge';
import { PremiumModal } from './PremiumModal';
import { usePremium } from '@/contexts/PremiumContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Blog', href: '#blog-section' },
  { label: 'Pricing', href: '#pricing' },
];

export const Header = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { isPremium, activatePremium } = usePremium();
  const [liveUsers, setLiveUsers] = useState(1247);
  const { handleAnchorClick } = useSmoothScroll();
  const [activeNav, setActiveNav] = useState('Home');

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
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              {/* Logo - larger size, no background, clean */}
              <AuraLogo className="w-12 h-12 md:w-14 md:h-14" />
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl md:text-[1.65rem] font-extrabold" style={{ letterSpacing: '-0.02em' }}>
                    <span 
                      style={{
                        background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 85%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Temp Mail
                    </span>
                    <span className="mx-1" />
                    <span 
                      className="font-extrabold"
                      style={{
                        background: 'linear-gradient(135deg, hsl(25 95% 55%) 0%, hsl(35 95% 60%) 50%, hsl(25 95% 55%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 12px hsl(25 95% 55% / 0.7)) drop-shadow(0 0 25px hsl(25 95% 55% / 0.4))',
                      }}
                    >
                      AI
                    </span>
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                <span 
                  className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em]"
                  style={{
                    color: 'hsl(0 0% 50%)',
                  }}
                >
                  AI-POWERED PRIVACY
                </span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleAnchorClick(e, item.href);
                    setActiveNav(item.label);
                  }}
                  className="relative px-4 py-2 text-sm font-medium transition-colors group"
                  style={{
                    color: activeNav === item.label ? 'hsl(var(--aurora-orange))' : 'hsl(0 0% 55%)',
                  }}
                >
                  {item.label}
                  {/* Underline hover effect */}
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{
                      width: activeNav === item.label ? '60%' : '0%',
                      background: 'hsl(var(--aurora-orange))',
                    }}
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
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
