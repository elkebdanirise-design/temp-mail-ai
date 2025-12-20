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
    }} src="/lovable-uploads/66b4771e-6d49-4f11-816b-03204f1186b3.png" />
    </motion.div>;
};