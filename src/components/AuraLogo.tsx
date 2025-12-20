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
      <img alt="Temp Mail AI Logo" className="w-full h-full object-contain" style={{
      filter: 'drop-shadow(0 0 8px hsl(var(--aurora-orange) / 0.4))'
    }} src="/lovable-uploads/39aded29-e1a2-43e3-a2c0-18975a32aacf.png" />
    </motion.div>;
};