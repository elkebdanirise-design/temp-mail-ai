import { motion } from 'framer-motion';

export const AuraLogo = ({
  className = ''
}: {
  className?: string;
}) => {
  return (
    <motion.div 
      className={`relative ${className}`} 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <img 
        alt="Temp Mail AI Logo" 
        className="w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 0 16px hsl(25 95% 55% / 0.9)) drop-shadow(0 0 32px hsl(25 95% 55% / 0.6)) drop-shadow(0 0 48px hsl(30 100% 55% / 0.3))',
          background: 'transparent',
        }}
        src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.png" 
      />
    </motion.div>
  );
};