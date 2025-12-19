import { motion } from 'framer-motion';

interface AdPlaceholderProps {
  variant?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

export const AdPlaceholder = ({ variant = 'horizontal', className = '' }: AdPlaceholderProps) => {
  const dimensions = {
    horizontal: 'h-20 w-full',
    vertical: 'h-[300px] w-full',
    square: 'h-[250px] w-[250px]',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`ad-placeholder ${dimensions[variant]} ${className}`}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs uppercase tracking-widest text-muted-foreground/50">
          Advertisement
        </span>
        <span className="text-[10px] text-muted-foreground/30">
          {variant === 'horizontal' ? '728×90' : variant === 'vertical' ? '160×600' : '250×250'}
        </span>
      </div>
    </motion.div>
  );
};
