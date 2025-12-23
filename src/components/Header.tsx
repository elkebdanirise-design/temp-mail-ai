import { useState, memo, useCallback } from 'react';
import { Zap, Key, Menu, Home, BookOpen, DollarSign, Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from './AuraLogo';
import { VIPBadge } from './VIPBadge';
import { PremiumModal } from './PremiumModal';
import { usePremium } from '@/contexts/PremiumContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const navItems = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Blog', href: '#blog-section', icon: BookOpen },
  { label: 'Pricing', href: '#pricing', icon: DollarSign },
];

const sidebarItems = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Blog', href: '#blog-section', icon: BookOpen },
  { label: 'Pricing', href: '#pricing', icon: DollarSign },
  { label: 'Features', href: '#features', icon: Sparkles },
  { label: 'Terms', href: '/terms', icon: FileText },
];

export const Header = memo(() => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isPremium, activatePremium } = usePremium();
  const { handleAnchorClick } = useSmoothScroll();
  const [activeNav, setActiveNav] = useState('Home');

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    handleAnchorClick(e, href);
    setActiveNav(label);
  }, [handleAnchorClick]);

  const handleSidebarNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    // Close sidebar first
    setSidebarOpen(false);
    
    // Handle navigation after a short delay for smooth transition
    setTimeout(() => {
      if (href.startsWith('#')) {
        handleAnchorClick(e, href);
      } else {
        window.location.href = href;
      }
      setActiveNav(label);
    }, 150);
  }, [handleAnchorClick]);

  return (
    <>
      <header className="py-6 md:py-8 relative z-20 animate-fade-in">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Left section: Mobile menu + Logo */}
            <div className="flex items-center gap-1 sm:gap-0">
              {/* Mobile hamburger menu - LEFT side, only visible on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-white/5"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Unified brand unit */}
              <div className="items-center gap-0 -ml-1 sm:ml-0 flex flex-row">
                <AuraLogo className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] lg:w-[6.25rem] lg:h-[6.25rem] -mr-1 sm:-mr-1.5 md:-mr-2" />
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-2xl md:text-[1.65rem] font-extrabold" style={{ letterSpacing: '-0.02em' }}>
                      <span style={{
                        background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 85%) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        Temp Mail
                      </span>
                      <span className="mx-0.5" />
                      <span className="font-extrabold relative animate-ai-bloom" style={{
                        background: 'linear-gradient(135deg, hsl(var(--aurora-orange)) 0%, hsl(var(--aurora-sunset)) 55%, hsl(var(--aurora-orange)) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        AI
                      </span>
                    </h1>
                    {isPremium && <VIPBadge />}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'hsl(0 0% 50%)' }}>
                    AI-POWERED PRIVACY
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation - Visible on Tablet (md) and Desktop (lg+) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href, item.label)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors group"
                  style={{ color: activeNav === item.label ? 'hsl(var(--aurora-orange))' : 'hsl(0 0% 55%)' }}
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{
                      width: activeNav === item.label ? '60%' : '0%',
                      background: 'hsl(var(--aurora-orange))'
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* Right section: CTA button */}
            <div className="flex items-center gap-2 sm:gap-4">
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
                <Button asChild className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-102 transition-transform text-white font-semibold rounded-xl">
                  <a href="#pro-systems" onClick={e => handleAnchorClick(e, '#pro-systems')} className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="hidden sm:inline">Get Pro Systems</span>
                    <span className="sm:hidden">Pro</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Obsidian-Glass Sidebar for Mobile */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent 
          side="left" 
          className="w-72 border-r-0 p-0"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 5% / 0.97) 0%, hsl(0 0% 3% / 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '4px 0 40px hsl(var(--aurora-orange) / 0.1), inset 1px 0 0 hsl(0 0% 100% / 0.05)'
          }}
        >
          <SheetHeader className="p-6 pb-4 border-b border-white/5">
            <SheetTitle className="flex items-center gap-2">
              <AuraLogo className="w-10 h-10" />
              <span className="font-display text-xl font-bold" style={{
                background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 85%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Temp Mail AI
              </span>
            </SheetTitle>
          </SheetHeader>
          
          <nav className="flex flex-col gap-1 p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSidebarNavClick(e, item.href, item.label)}
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15) 0%, hsl(var(--aurora-sunset) / 0.1) 100%)'
                      : 'transparent',
                    boxShadow: isActive 
                      ? '0 0 20px hsl(var(--aurora-orange) / 0.2), inset 0 0 0 1px hsl(var(--aurora-orange) / 0.2)'
                      : 'none'
                  }}
                >
                  {/* Icon with glow */}
                  <Icon 
                    className="w-5 h-5 transition-all duration-300"
                    style={{
                      color: isActive ? 'hsl(var(--aurora-orange))' : 'hsl(0 0% 50%)',
                      filter: isActive ? 'drop-shadow(0 0 6px hsl(var(--aurora-orange) / 0.6))' : 'none'
                    }}
                  />
                  
                  {/* Label with gradient */}
                  <span
                    className="font-medium text-sm transition-all duration-300"
                    style={{
                      color: isActive ? 'hsl(0 0% 95%)' : 'hsl(0 0% 60%)',
                      textShadow: isActive ? '0 0 10px hsl(var(--aurora-orange) / 0.4)' : 'none'
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Hover glow effect */}
                  <span 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.08) 0%, transparent 100%)',
                      boxShadow: 'inset 0 0 0 1px hsl(var(--aurora-orange) / 0.1)'
                    }}
                  />
                </a>
              );
            })}
          </nav>
          
          {/* Bottom gradient accent */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--aurora-orange) / 0.05) 0%, transparent 100%)'
            }}
          />
        </SheetContent>
      </Sheet>

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} onActivate={activatePremium} />
    </>
  );
});

Header.displayName = 'Header';
