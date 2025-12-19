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
      {/* Outer shield glow */}
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="hsl(190, 95%, 50%)" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(190, 95%, 60%)" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Shield shape */}
      <motion.path
        d="M24 4L6 12V22C6 33.2 13.6 43.4 24 46C34.4 43.4 42 33.2 42 22V12L24 4Z"
        fill="url(#shieldGradient)"
        fillOpacity="0.15"
        stroke="url(#shieldGradient)"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* AI circuit pattern */}
      <motion.circle
        cx="24"
        cy="22"
        r="8"
        fill="none"
        stroke="url(#innerGradient)"
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      
      {/* AI eye/core */}
      <motion.circle
        cx="24"
        cy="22"
        r="3"
        fill="url(#innerGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
      
      {/* Connection lines */}
      <motion.path
        d="M24 14V18M24 26V30M18 22H14M34 22H30"
        stroke="url(#innerGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
      
      {/* Corner nodes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <circle cx="14" cy="22" r="2" fill="hsl(190, 95%, 50%)" />
        <circle cx="34" cy="22" r="2" fill="hsl(190, 95%, 50%)" />
        <circle cx="24" cy="14" r="2" fill="hsl(190, 95%, 50%)" />
        <circle cx="24" cy="30" r="2" fill="hsl(190, 95%, 50%)" />
      </motion.g>
      
      {/* @ symbol overlay - subtle */}
      <motion.text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(var(--primary))"
        fontSize="8"
        fontWeight="bold"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        @
      </motion.text>
    </motion.svg>
  );
};
