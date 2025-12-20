import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionTitle = ({ 
  children, 
  subtitle, 
  className = '', 
  align = 'center' 
}: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${align === 'center' ? 'text-center' : 'text-left'} mb-10 md:mb-14 ${className}`}
    >
      {/* Decorative line above title */}
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange)))' }}
        />
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'hsl(var(--aurora-orange))' }}
        />
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px"
          style={{ background: 'linear-gradient(90deg, hsl(var(--aurora-orange)), transparent)' }}
        />
      </div>

      {/* Title with underline animation */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight relative inline-block">
        {children}
        
        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-2 left-0 right-0 h-[2px] origin-left"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--aurora-magenta) / 0.6), hsl(var(--aurora-orange)), hsl(var(--aurora-magenta) / 0.6))',
          }}
        />
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6"
          style={{ color: 'hsl(200 15% 55%)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
