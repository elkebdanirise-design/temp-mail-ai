import { motion } from 'framer-motion';
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
      filter: 'drop-shadow(0 0 12px hsl(var(--aurora-orange) / 0.5))',
      background: 'transparent'
    }} src="/lovable-uploads/233fffab-b388-432b-94fa-4d216e249b1b.png" className="w-full h-full object-cover opacity-100" />
    </motion.div>;
};