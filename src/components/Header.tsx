import { useState, memo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Key, Menu, Home, BookOpen, DollarSign, Sparkles, FileText, LogIn, LogOut, User, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from './AuraLogo';
import { VIPBadge } from './VIPBadge';
import { PremiumModal } from './PremiumModal';
import { usePremium } from '@/contexts/PremiumContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Blog', href: '#blog-section', icon: BookOpen },
  { label: 'Pricing', href: '#pricing', icon: DollarSign },
];

const sidebarItems = [
  { label: 'Home', href: '#', icon: Home, sectionId: '' },
  { label: 'Blog', href: '#blog-section', icon: BookOpen, sectionId: 'blog-section' },
  { label: 'Pricing', href: '#pricing', icon: DollarSign, sectionId: 'pricing' },
  { label: 'Features', href: '#features', icon: Sparkles, sectionId: 'features' },
  { label: 'Terms', href: '/terms', icon: FileText, sectionId: '' },
];

export const Header = memo(() => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isPremium, activatePremium } = usePremium();
  const { user, isLoading: isAuthLoading, signOut } = useAuth();
  const { handleAnchorClick } = useSmoothScroll();
  const [activeNav, setActiveNav] = useState('Home');

  const handleSignOut = async () => {
    await signOut();
  };

  // Scroll-based active nav detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (let i = sidebarItems.length - 1; i >= 0; i--) {
        const item = sidebarItems[i];
        if (!item.sectionId) continue;
        
        const section = document.getElementById(item.sectionId);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveNav(item.label);
          return;
        }
      }
      
      if (scrollPosition < 300) {
        setActiveNav('Home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    handleAnchorClick(e, href);
    setActiveNav(label);
  }, [handleAnchorClick]);

  const handleSidebarNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    setSidebarOpen(false);
    
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
      <header className="py-5 md:py-8 lg:py-10 relative z-20 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between gap-6 sm:gap-8 md:gap-8">
            {/* Left section: Mobile menu + Logo - positioned at absolute far left */}
            <div className="flex items-center gap-1 md:gap-0">
              {/* Mobile hamburger menu - LEFT side, only visible on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-white/5 shrink-0"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Unified brand unit - Bold and premium on mobile */}
              <div className="items-center gap-0.5 flex flex-row">
                <AuraLogo className="w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-18 lg:h-18 -mr-0.5 sm:-mr-1 md:-mr-2" />
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 md:gap-2">
                    <h1 className="font-display text-[18px] sm:text-lg md:text-lg lg:text-xl font-extrabold whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
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
                  <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.1em] md:tracking-[0.18em] text-center md:text-left" style={{ color: 'hsl(0 0% 45%)' }}>
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

            {/* Right section: Auth & CTA buttons - Swapped order: Pro first, then Login */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {isAuthLoading ? (
                /* Auth loading skeleton */
                <div className="flex items-center gap-2">
                  <div 
                    className="h-7 md:h-10 w-16 md:w-28 rounded-lg md:rounded-xl animate-pulse"
                    style={{ background: 'hsl(0 0% 100% / 0.05)' }}
                  />
                </div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-7 md:h-10 px-1.5 md:px-3 rounded-lg md:rounded-xl gap-1 md:gap-2"
                      style={{
                        background: isPremium 
                          ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-sunset) / 0.1))'
                          : 'hsl(0 0% 100% / 0.05)',
                        border: isPremium ? '1px solid hsl(var(--aurora-orange) / 0.3)' : '1px solid hsl(0 0% 100% / 0.1)'
                      }}
                    >
                      <div 
                        className="w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center overflow-hidden relative"
                        style={{
                          background: isPremium 
                            ? 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))'
                            : 'hsl(0 0% 100% / 0.1)',
                          boxShadow: isPremium ? '0 0 12px hsl(var(--aurora-orange) / 0.4)' : 'none'
                        }}
                      >
                        {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                          <img 
                            src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : isPremium ? (
                          <Crown className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        ) : (
                          <User className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                        )}
                        {/* Premium ring indicator */}
                        {isPremium && (user.user_metadata?.avatar_url || user.user_metadata?.picture) && (
                          <div 
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                              border: '2px solid hsl(var(--aurora-orange))',
                              boxShadow: 'inset 0 0 4px hsl(var(--aurora-orange) / 0.5)'
                            }}
                          />
                        )}
                      </div>
                      <span className="hidden md:inline text-sm font-medium truncate max-w-[100px]" style={{ color: 'hsl(0 0% 70%)' }}>
                        {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 rounded-xl border-0 p-2"
                    style={{
                      background: 'linear-gradient(180deg, hsl(0 0% 10%) 0%, hsl(0 0% 7%) 100%)',
                      boxShadow: '0 10px 40px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)'
                    }}
                  >
                    <div className="px-2 py-2 mb-2">
                      <p className="text-xs font-medium" style={{ color: 'hsl(0 0% 50%)' }}>Signed in as</p>
                      <p className="text-sm font-semibold truncate" style={{ color: 'hsl(0 0% 90%)' }}>{user.email}</p>
                      {isPremium && (
                        <span 
                          className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-sunset) / 0.15))',
                            color: 'hsl(var(--aurora-orange))'
                          }}
                        >
                          <Crown className="w-3 h-3" /> VIP Member
                        </span>
                      )}
                    </div>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem 
                      asChild
                      className="rounded-lg cursor-pointer gap-2 py-2.5"
                    >
                      <Link to="/profile" style={{ color: 'hsl(0 0% 70%)' }}>
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    {!isPremium && (
                      <DropdownMenuItem 
                        onClick={() => setShowPremiumModal(true)}
                        className="rounded-lg cursor-pointer gap-2 py-2.5"
                        style={{ color: 'hsl(var(--aurora-orange))' }}
                      >
                        <Key className="w-4 h-4" />
                        Redeem License Key
                      </DropdownMenuItem>
                    )}
                    {isPremium && (
                      <DropdownMenuItem 
                        onClick={() => setShowPremiumModal(true)}
                        className="rounded-lg cursor-pointer gap-2 py-2.5"
                        style={{ color: 'hsl(var(--aurora-orange))' }}
                      >
                        <Crown className="w-4 h-4" />
                        Manage VIP
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="rounded-lg cursor-pointer gap-2 py-2.5 text-red-400 focus:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  {/* Pro Button - Premium dimensions with perfect centering */}
                  {!isPremium && (
                    <Button asChild className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-[1.02] transition-transform rounded-xl h-[42px] md:h-10 w-[76px] md:w-[100px] p-0 border border-transparent">
                      <a href="#pro-systems" onClick={e => handleAnchorClick(e, '#pro-systems')} className="w-full h-full flex items-center justify-center gap-1.5">
                        <Zap className="w-4 h-4 md:w-4 md:h-4 text-white shrink-0" />
                        <span className="text-xs md:text-sm font-semibold text-white leading-none">Pro</span>
                      </a>
                    </Button>
                  )}
                  
                  {/* Login Button - Identical dimensions with premium glass effect */}
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="geometric-diamond-btn h-[42px] md:h-10 w-[76px] md:w-[100px] p-0 rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    <Link to="/auth" className="w-full h-full flex items-center justify-center gap-1.5">
                      <LogIn className="w-4 h-4 md:w-4 md:h-4 shrink-0" style={{ color: 'hsl(var(--aurora-orange))' }} />
                      <span className="text-xs md:text-sm font-semibold leading-none" style={{ color: 'hsl(var(--aurora-orange))' }}>Login</span>
                    </Link>
                  </Button>
                </>
              )}
              
              {/* Pro button for logged in non-premium users */}
              {user && !isPremium && (
                <Button asChild className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-[1.02] transition-transform rounded-xl h-[42px] md:h-10 w-[76px] md:w-[100px] p-0 border border-transparent">
                  <a href="#pro-systems" onClick={e => handleAnchorClick(e, '#pro-systems')} className="w-full h-full flex items-center justify-center gap-1.5">
                    <Zap className="w-4 h-4 md:w-4 md:h-4 text-white shrink-0" />
                    <span className="text-xs md:text-sm font-semibold text-white leading-none">Pro</span>
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
          className="w-[280px] border-r-0 p-0 flex flex-col"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 4% / 0.95) 0%, hsl(0 0% 2% / 0.98) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '4px 0 60px hsl(var(--aurora-orange) / 0.15), inset 1px 0 0 hsl(0 0% 100% / 0.08)',
            maxHeight: '100dvh'
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
          
          {/* Inner content wrapper with spring bounce + swipe to close */}
          <motion.div
            initial={{ x: -20, opacity: 0, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 22,
              mass: 0.6,
              delay: 0.05
            }}
            drag="x"
            dragConstraints={{ left: -100, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -300) {
                setSidebarOpen(false);
              }
            }}
            className="flex flex-col h-full overflow-hidden touch-pan-y"
          >
            {/* Compact Brand Header */}
            <SheetHeader className="p-4 pb-3 border-b border-white/5 shrink-0">
              <SheetTitle className="flex items-center gap-2.5">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.7, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 450,
                    damping: 18,
                    delay: 0.12
                  }}
                >
                  <AuraLogo className="w-9 h-9" />
                  
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
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 380,
                    damping: 22,
                    delay: 0.18
                  }}
                >
                  <span className="font-display text-base font-bold leading-tight" style={{
                    background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 80%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Temp Mail AI
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'hsl(var(--aurora-orange) / 0.7)' }}>
                    PRIVACY FIRST
                  </span>
                </motion.div>
              </SheetTitle>
            </SheetHeader>
          
          {/* Scrollable nav area with smooth touch scrolling */}
          <nav 
            className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--aurora-orange) / 0.3) transparent'
            }}
          >
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
                  className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300 ease-out transform hover:translate-x-1"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.18) 0%, hsl(var(--aurora-sunset) / 0.12) 100%)'
                      : 'transparent',
                    boxShadow: isActive 
                      ? '0 0 20px hsl(var(--aurora-orange) / 0.2), inset 0 0 0 1px hsl(var(--aurora-orange) / 0.2), 0 2px 12px hsl(0 0% 0% / 0.25)'
                      : 'none'
                  }}
                >
                  {/* Icon container with glow */}
                  <div 
                    className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.25) 0%, hsl(var(--aurora-sunset) / 0.15) 100%)'
                        : 'hsl(0 0% 100% / 0.03)',
                      boxShadow: isActive 
                        ? '0 0 15px hsl(var(--aurora-orange) / 0.25)'
                        : 'none'
                    }}
                  >
                    <Icon 
                      className="w-4 h-4 transition-all duration-300"
                      style={{
                        color: isActive ? 'hsl(var(--aurora-orange))' : 'hsl(0 0% 55%)',
                        filter: isActive ? 'drop-shadow(0 0 6px hsl(var(--aurora-orange) / 0.6))' : 'none'
                      }}
                    />
                  </div>
                  
                  {/* Label with gradient on active */}
                  <span
                    className="font-medium text-[13px] tracking-wide transition-all duration-300"
                    style={{
                      color: isActive ? 'hsl(0 0% 98%)' : 'hsl(0 0% 55%)',
                      textShadow: isActive ? '0 0 12px hsl(var(--aurora-orange) / 0.4)' : 'none'
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Right arrow indicator on hover */}
                  <span 
                    className="absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2 text-sm"
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
            
            {/* Divider */}
            <div 
              className="my-3 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.08), transparent)' }}
            />
            
            {/* Auth action */}
            {user ? (
              <motion.button
                onClick={() => {
                  setSidebarOpen(false);
                  handleSignOut();
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300 ease-out transform hover:translate-x-1 w-full text-left"
                style={{
                  background: 'hsl(0 70% 50% / 0.08)'
                }}
              >
                <div 
                  className="relative flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{ background: 'hsl(0 70% 50% / 0.15)' }}
                >
                  <LogOut className="w-4 h-4" style={{ color: 'hsl(0 70% 60%)' }} />
                </div>
                <span className="font-medium text-[13px]" style={{ color: 'hsl(0 70% 60%)' }}>
                  Sign Out
                </span>
              </motion.button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setSidebarOpen(false)}
                className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300 ease-out transform hover:translate-x-1"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-sunset) / 0.1))',
                  boxShadow: 'inset 0 0 0 1px hsl(var(--aurora-orange) / 0.2)'
                }}
              >
                <div 
                  className="relative flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.25), hsl(var(--aurora-sunset) / 0.15))'
                  }}
                >
                  <LogIn className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
                </div>
                <span 
                  className="font-medium text-[13px]"
                  style={{ color: 'hsl(var(--aurora-orange))' }}
                >
                  Sign In / Register
                </span>
              </Link>
            )}
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
