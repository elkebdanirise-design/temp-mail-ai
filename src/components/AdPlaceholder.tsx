import { motion } from 'framer-motion';
import { useContext } from 'react';
import { PremiumContext } from '@/contexts/PremiumContext';

interface AdPlaceholderProps {
  variant?: 'horizontal' | 'vertical' | 'square';
  className?: string;
  monetagId?: string;
}

export const AdPlaceholder = ({ variant = 'horizontal', className = '', monetagId }: AdPlaceholderProps) => {
  // Use context directly to handle cases where provider might not be available
  const premiumContext = useContext(PremiumContext);
  const isPremium = premiumContext?.isPremium ?? false;

  // Hide ads for premium users
  if (isPremium) {
    return null;
  }

  // Responsive dimensions - automatically switch to mobile-friendly sizes
  const getDimensionClasses = () => {
    switch (variant) {
      case 'horizontal':
        // Desktop: 728x90, Mobile: 320x50
        return 'h-[50px] sm:h-20 w-full max-w-[320px] sm:max-w-none';
      case 'vertical':
        // Desktop: 160x600, Mobile: 300x250 (square-ish)
        return 'h-[250px] sm:h-[300px] w-full max-w-[300px] sm:max-w-none mx-auto';
      case 'square':
        // Consistent 250x250
        return 'h-[200px] sm:h-[250px] w-[200px] sm:w-[250px] mx-auto';
      default:
        return 'h-20 w-full';
    }
  };

  const getMobileSizeLabel = () => {
    switch (variant) {
      case 'horizontal':
        return { mobile: '320×50', desktop: '728×90' };
      case 'vertical':
        return { mobile: '300×250', desktop: '160×600' };
      case 'square':
        return { mobile: '200×200', desktop: '250×250' };
      default:
        return { mobile: '320×50', desktop: '728×90' };
    }
  };

  const sizeLabels = getMobileSizeLabel();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`ad-placeholder ${getDimensionClasses()} ${className}`}
      data-monetag-id={monetagId}
    >
      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground/50">
          Advertisement
        </span>
        <span className="text-[8px] sm:text-[10px] text-muted-foreground/30">
          <span className="sm:hidden">{sizeLabels.mobile}</span>
          <span className="hidden sm:inline">{sizeLabels.desktop}</span>
        </span>
        {/* Monetag placeholder - replace with actual script integration */}
        {monetagId && (
          <noscript>
            <span className="text-[8px] text-muted-foreground/20">Monetag: {monetagId}</span>
          </noscript>
        )}
      </div>
    </motion.div>
  );
};
