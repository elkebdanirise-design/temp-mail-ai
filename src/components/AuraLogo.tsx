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
        style={{
          // Synchronized vibrant neon orange glow matching the "AI" text
          filter: 'drop-shadow(0 0 8px rgba(255, 77, 0, 1)) drop-shadow(0 0 20px rgba(255, 140, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 106, 0, 0.7)) drop-shadow(0 0 60px rgba(255, 77, 0, 0.4))',
          background: 'transparent'
        }} 
        src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.png" 
        className="w-full h-full object-cover opacity-100" 
      />
    </motion.div>
  );
};