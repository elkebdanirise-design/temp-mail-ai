import { motion } from 'framer-motion';

export const AuraLogo = ({ className = '' }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        {/* Gradient for shield stroke - Magenta to Orange */}
        <linearGradient id="shieldStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(330, 85%, 55%)" />
          <stop offset="50%" stopColor="hsl(350, 80%, 50%)" />
          <stop offset="100%" stopColor="hsl(25, 95%, 55%)" />
        </linearGradient>
        
        {/* Gradient for inner aura glow */}
        <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(330, 85%, 60%)" stopOpacity="1" />
          <stop offset="60%" stopColor="hsl(350, 80%, 50%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(25, 95%, 55%)" stopOpacity="0" />
        </radialGradient>
        
        {/* Glow filter */}
        <filter id="auraFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Shield outline */}
      <motion.path
        d="M24 4L6 12V22C6 33.2 13.6 43.4 24 46C34.4 43.4 42 33.2 42 22V12L24 4Z"
        fill="none"
        stroke="url(#shieldStrokeGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#auraFilter)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      {/* Inner shield fill - subtle */}
      <motion.path
        d="M24 6L8 13V22C8 32.2 14.8 41.6 24 44C33.2 41.6 40 32.2 40 22V13L24 6Z"
        fill="url(#shieldStrokeGradient)"
        fillOpacity="0.08"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      
      {/* Central Aura Pulse - breathing animation */}
      <motion.circle
        cx="24"
        cy="24"
        r="10"
        fill="url(#auraGlow)"
        filter="url(#auraFilter)"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Core dot */}
      <motion.circle
        cx="24"
        cy="24"
        r="4"
        fill="hsl(330, 85%, 60%)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
      />
      
      {/* Small protection nodes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <circle cx="24" cy="14" r="1.5" fill="hsl(330, 85%, 55%)" />
        <circle cx="15" cy="20" r="1.5" fill="hsl(350, 80%, 50%)" />
        <circle cx="33" cy="20" r="1.5" fill="hsl(350, 80%, 50%)" />
        <circle cx="18" cy="30" r="1.5" fill="hsl(25, 95%, 55%)" />
        <circle cx="30" cy="30" r="1.5" fill="hsl(25, 95%, 55%)" />
      </motion.g>
    </motion.svg>
  );
};
