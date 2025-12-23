import { memo } from 'react';
import { X, Home, BookOpen, Zap, Sparkles, FileText, Mail, Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface MobileNavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Features', href: '#features', icon: Sparkles },
  { label: 'Blog', href: '#blog-section', icon: BookOpen },
  { label: 'Pricing', href: '#pricing', icon: Zap },
  { label: 'Terms', href: '/terms', icon: FileText },
  { label: 'Privacy', href: '/privacy', icon: Shield },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export const MobileNavSidebar = memo(({ isOpen, onClose }: MobileNavSidebarProps) => {
  const { handleAnchorClick } = useSmoothScroll();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      handleAnchorClick(e, href);
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[280px] border-l-0 p-0 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsla(0, 0%, 4%, 0.97) 0%, hsla(0, 0%, 8%, 0.95) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: `
            inset 1px 0 0 0 hsla(var(--aurora-orange), 0.15),
            -20px 0 60px -20px hsla(var(--aurora-orange), 0.2)
          `,
        }}
      >
        {/* Premium header with glow */}
        <SheetHeader className="p-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <SheetTitle
              className="text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange)) 0%, hsl(var(--aurora-sunset)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Navigation
            </SheetTitle>
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
              style={{
                background: 'hsla(var(--aurora-orange), 0.1)',
                color: 'hsl(var(--aurora-orange))',
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        {/* Navigation items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'hsla(var(--aurora-orange), 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Icon with glow */}
                <div
                  className="p-2.5 rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, hsla(var(--aurora-orange), 0.15) 0%, hsla(var(--aurora-sunset), 0.1) 100%)',
                    boxShadow: '0 0 20px hsla(var(--aurora-orange), 0.15)',
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-all duration-300"
                    style={{
                      color: 'hsl(var(--aurora-orange))',
                      filter: 'drop-shadow(0 0 4px hsla(var(--aurora-orange), 0.5))',
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  className="font-medium text-sm tracking-wide transition-colors duration-300"
                  style={{ color: 'hsl(0 0% 75%)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(0 0% 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(0 0% 75%)';
                  }}
                >
                  {item.label}
                </span>

                {/* Hover arrow */}
                <div
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ color: 'hsl(var(--aurora-orange))' }}
                >
                  →
                </div>
              </a>
            );
          })}
        </nav>

        {/* Bottom decoration */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, hsla(var(--aurora-orange), 0.05), transparent)',
          }}
        />
      </SheetContent>
    </Sheet>
  );
});

MobileNavSidebar.displayName = 'MobileNavSidebar';
