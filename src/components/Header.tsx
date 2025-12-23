import { useState, memo, useCallback } from 'react';
import { Zap, Key, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from './AuraLogo';
import { VIPBadge } from './VIPBadge';
import { PremiumModal } from './PremiumModal';
import { MobileNavSidebar } from './MobileNavSidebar';
import { usePremium } from '@/contexts/PremiumContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Blog', href: '#blog-section' },
  { label: 'Pricing', href: '#pricing' },
];

export const Header = memo(() => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { isPremium, activatePremium } = usePremium();
  const { handleAnchorClick } = useSmoothScroll();
  const [activeNav, setActiveNav] = useState('Home');

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
      handleAnchorClick(e, href);
      setActiveNav(label);
    },
    [handleAnchorClick]
  );

  return (
    <>
      <header className="py-4 sm:py-6 md:py-8 relative z-20 animate-fade-in">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Unified brand unit */}
            <div className="items-center gap-0 -ml-1 sm:ml-0 flex flex-row">
              {/* Logo */}
              <AuraLogo className="w-10 h-10 sm:w-14 sm:h-14 md:w-[5.5rem] md:h-[5.5rem] lg:w-[6.25rem] lg:h-[6.25rem] -mr-0.5 sm:-mr-1.5 md:-mr-2" />

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1
                    className="font-display text-lg sm:text-2xl md:text-[1.65rem] font-extrabold"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {/* Premium silver/white "Temp Mail" */}
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
                    <span className="mx-0.5" />
                    {/* Vibrant neon orange "AI" with pulsing bloom animation */}
                    <span
                      className="font-extrabold relative animate-ai-bloom"
                      style={{
                        background:
                          'linear-gradient(135deg, hsl(var(--aurora-orange)) 0%, hsl(var(--aurora-sunset)) 55%, hsl(var(--aurora-orange)) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AI
                    </span>
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                <span
                  className="text-[7px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
                  style={{ color: 'hsl(0 0% 50%)' }}
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
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
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
              {/* Mobile hamburger menu */}
              <button
                onClick={() => setShowMobileNav(true)}
                className="lg:hidden p-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  background: 'hsla(var(--aurora-orange), 0.1)',
                  boxShadow: '0 0 20px hsla(var(--aurora-orange), 0.2)',
                }}
                aria-label="Open menu"
              >
                <Menu
                  className="w-5 h-5"
                  style={{
                    color: 'hsl(var(--aurora-orange))',
                    filter: 'drop-shadow(0 0 4px hsla(var(--aurora-orange), 0.6))',
                  }}
                />
              </button>

              {isPremium ? (
                <Button
                  variant="outline"
                  onClick={() => setShowPremiumModal(true)}
                  className="border-amber-500/20 text-amber-400/90 hover:bg-amber-500/8 rounded-xl text-xs sm:text-sm"
                >
                  <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="hidden sm:inline">Manage License</span>
                  <span className="sm:hidden">License</span>
                </Button>
              ) : (
                <Button
                  asChild
                  className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-102 transition-transform text-white font-semibold rounded-xl text-xs sm:text-sm"
                >
                  <a
                    href="#pro-systems"
                    onClick={(e) => handleAnchorClick(e, '#pro-systems')}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Get Pro Systems</span>
                    <span className="sm:hidden">Pro</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileNavSidebar isOpen={showMobileNav} onClose={() => setShowMobileNav(false)} />
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onActivate={activatePremium}
      />
    </>
  );
});

Header.displayName = 'Header';