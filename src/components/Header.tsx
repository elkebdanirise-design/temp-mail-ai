import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <header className="py-3 md:py-6 lg:py-8 relative z-20 animate-fade-in">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Left section: Mobile menu + Logo */}
            <div className="flex items-center gap-2 md:gap-0">
              {/* Mobile hamburger menu - LEFT side, only visible on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-white/5 shrink-0"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4" />
              </Button>

              {/* Unified brand unit - Compact on mobile */}
              <div className="items-center gap-0 flex flex-row">
                <AuraLogo className="w-9 h-9 sm:w-12 sm:h-12 md:w-[5rem] md:h-[5rem] lg:w-[6.25rem] lg:h-[6.25rem] -mr-0.5 sm:-mr-1 md:-mr-2" />
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 md:gap-2">
                    <h1 className="font-display text-base sm:text-lg md:text-[1.65rem] font-extrabold" style={{ letterSpacing: '-0.02em' }}>
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
                  <span className="text-[7px] sm:text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.25em] hidden sm:block" style={{ color: 'hsl(0 0% 50%)' }}>
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
            <div className="flex items-center gap-2 shrink-0">
              {isPremium ? (
                <Button
                  variant="outline"
                  onClick={() => setShowPremiumModal(true)}
                  className="border-amber-500/20 text-amber-400/90 hover:bg-amber-500/8 rounded-lg md:rounded-xl h-8 md:h-10 px-2.5 md:px-4 text-xs md:text-sm"
                >
                  <Key className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  <span className="hidden sm:inline">Manage License</span>
                  <span className="sm:hidden">VIP</span>
                </Button>
              ) : (
                <Button asChild className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-102 transition-transform text-white font-semibold rounded-lg md:rounded-xl h-8 md:h-10 px-3 md:px-4 text-xs md:text-sm">
                  <a href="#pro-systems" onClick={e => handleAnchorClick(e, '#pro-systems')} className="flex items-center gap-1.5 md:gap-2">
                    <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Get Pro Systems</span>
                    <span className="sm:hidden">Pro</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Premium Obsidian-Glass Sidebar for Mobile */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent 
          side="left" 
          className="w-[280px] border-r-0 p-0 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 4% / 0.95) 0%, hsl(0 0% 2% / 0.98) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '4px 0 60px hsl(var(--aurora-orange) / 0.15), inset 1px 0 0 hsl(0 0% 100% / 0.08)'
          }}
        >
          {/* Top gradient accent line with glow pulse */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ 
              opacity: 1, 
              scaleX: 1,
              boxShadow: [
                '0 0 10px hsl(var(--aurora-orange) / 0.3), 0 0 20px hsl(var(--aurora-sunset) / 0.2)',
                '0 0 20px hsl(var(--aurora-orange) / 0.6), 0 0 40px hsl(var(--aurora-sunset) / 0.4)',
                '0 0 10px hsl(var(--aurora-orange) / 0.3), 0 0 20px hsl(var(--aurora-sunset) / 0.2)'
              ]
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              scaleX: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)), hsl(var(--aurora-orange)), transparent)',
              transformOrigin: 'left'
            }}
          />
          
          {/* Inner content wrapper with spring bounce */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.8,
              delay: 0.1
            }}
            className="h-full flex flex-col"
          >
            <SheetHeader className="p-6 pb-5 border-b border-white/5">
              <SheetTitle className="flex items-center gap-3">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 500,
                    damping: 20,
                    delay: 0.2
                  }}
                >
                  <AuraLogo className="w-11 h-11" />
                  
                  {/* Sparkle particles emanating from logo */}
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 rounded-full pointer-events-none"
                      style={{
                        background: i % 2 === 0 
                          ? 'hsl(var(--aurora-orange))' 
                          : 'hsl(var(--aurora-sunset))',
                        top: '50%',
                        left: '50%',
                        boxShadow: `0 0 4px hsl(var(--aurora-orange) / 0.8)`
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0, 
                        scale: 0 
                      }}
                      animate={{ 
                        x: Math.cos((i * 60) * Math.PI / 180) * 28,
                        y: Math.sin((i * 60) * Math.PI / 180) * 28,
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + (i * 0.05),
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                  
                  {/* Secondary ring of smaller sparkles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={`ring2-${i}`}
                      className="absolute w-0.5 h-0.5 rounded-full pointer-events-none"
                      style={{
                        background: 'hsl(0 0% 100%)',
                        top: '50%',
                        left: '50%',
                        boxShadow: `0 0 3px hsl(var(--aurora-sunset) / 0.6)`
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0, 
                        scale: 0 
                      }}
                      animate={{ 
                        x: Math.cos((i * 45 + 22.5) * Math.PI / 180) * 20,
                        y: Math.sin((i * 45 + 22.5) * Math.PI / 180) * 20,
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + (i * 0.03),
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </motion.div>
                <motion.div 
                  className="flex flex-col"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    delay: 0.25
                  }}
                >
                  <span className="font-display text-xl font-bold" style={{
                    background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 80%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Temp Mail AI
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--aurora-orange) / 0.7)' }}>
                    PRIVACY FIRST
                  </span>
                </motion.div>
              </SheetTitle>
            </SheetHeader>
          
          <nav className="flex flex-col gap-2 p-5">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSidebarNavClick(e, item.href, item.label)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ease-out transform hover:translate-x-1"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.18) 0%, hsl(var(--aurora-sunset) / 0.12) 100%)'
                      : 'transparent',
                    boxShadow: isActive 
                      ? '0 0 30px hsl(var(--aurora-orange) / 0.25), inset 0 0 0 1px hsl(var(--aurora-orange) / 0.25), 0 4px 20px hsl(0 0% 0% / 0.3)'
                      : 'none'
                  }}
                >
                  {/* Icon container with glow */}
                  <div 
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.25) 0%, hsl(var(--aurora-sunset) / 0.15) 100%)'
                        : 'hsl(0 0% 100% / 0.03)',
                      boxShadow: isActive 
                        ? '0 0 20px hsl(var(--aurora-orange) / 0.3)'
                        : 'none'
                    }}
                  >
                    <Icon 
                      className="w-5 h-5 transition-all duration-300"
                      style={{
                        color: isActive ? 'hsl(var(--aurora-orange))' : 'hsl(0 0% 55%)',
                        filter: isActive ? 'drop-shadow(0 0 8px hsl(var(--aurora-orange) / 0.7))' : 'none'
                      }}
                    />
                  </div>
                  
                  {/* Label with gradient on active */}
                  <span
                    className="font-semibold text-[15px] tracking-wide transition-all duration-300"
                    style={{
                      color: isActive ? 'hsl(0 0% 98%)' : 'hsl(0 0% 55%)',
                      textShadow: isActive ? '0 0 15px hsl(var(--aurora-orange) / 0.5)' : 'none'
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Right arrow indicator on hover */}
                  <span 
                    className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2"
                    style={{ color: 'hsl(var(--aurora-orange))' }}
                  >
                    →
                  </span>
                  
                  {/* Hover glow overlay */}
                  <span 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.1) 0%, hsl(var(--aurora-sunset) / 0.05) 100%)',
                      boxShadow: 'inset 0 0 0 1px hsl(var(--aurora-orange) / 0.15)'
                    }}
                  />
                  
                  {/* Shimmer sweep animation */}
                  <motion.span
                    className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                  >
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, hsl(var(--aurora-orange) / 0.15) 45%, hsl(0 0% 100% / 0.25) 50%, hsl(var(--aurora-sunset) / 0.15) 55%, transparent 100%)',
                      }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6 + index * 0.12,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    />
                  </motion.span>
                </motion.a>
              );
            })}
          </nav>
          </motion.div>
          
          {/* Bottom ambient glow */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center bottom, hsl(var(--aurora-orange) / 0.08) 0%, transparent 70%)'
            }}
          />
          
          {/* Side gradient accent */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--aurora-orange) / 0.3), transparent 30%, transparent 70%, hsl(var(--aurora-sunset) / 0.3))'
            }}
          />
        </SheetContent>
      </Sheet>

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} onActivate={activatePremium} />
    </>
  );
});

Header.displayName = 'Header';
