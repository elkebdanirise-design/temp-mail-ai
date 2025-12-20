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
        className="w-full h-full object-cover opacity-100 animate-ai-bloom"
        style={{ background: 'transparent' }} 
        src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.png" 
      />
    </motion.div>
  );
};