import { motion } from 'framer-motion';
import aiChipLogo from '@/assets/ai-chip-logo.png';
export const AuraLogo = ({
  className = ''
}: {
  className?: string;
}) => {
  return <motion.div className={`relative ${className}`} initial={{
    opacity: 0,
    scale: 0.8
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.5
  }}>
      <img alt="Temp Mail AI Logo" style={{
      filter: 'drop-shadow(0 0 8px hsl(var(--aurora-orange) / 0.4))'
    }} className="w-full h-full object-cover" src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.png" />
    </motion.div>;
};