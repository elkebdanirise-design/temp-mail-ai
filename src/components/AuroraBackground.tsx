import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep dark void base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Aurora gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(270 100% 55% / 0.25) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[10%] right-[-20%] w-[50%] h-[50%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(320 100% 60% / 0.2) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(190 100% 50% / 0.15) 0%, transparent 60%)',
          filter: 'blur(90px)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -40, 80, 0],
          y: [0, 60, -80, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(220 100% 60% / 0.12) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Subtle center glow for ambient pulse effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(280 80% 50% / 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};