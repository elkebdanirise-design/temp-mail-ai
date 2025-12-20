import { motion, useScroll, useTransform } from 'framer-motion';

export const AuroraBackground = () => {
  const { scrollY } = useScroll();
  
  // Different parallax speeds for each layer (slower = further back)
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep dark void base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(210 30% 2%) 0%, hsl(210 35% 4%) 50%, hsl(210 30% 3%) 100%)',
        }}
      />
      
      {/* Main centered cyan aurora glow - slowest parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[20%] left-[50%] w-[80%] h-[60%]"
      >
        <motion.div
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
          style={{
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse 60% 40% at center, hsl(190 100% 55% / 0.2) 0%, hsl(190 100% 50% / 0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>
      
      {/* Secondary blue glow - left side - faster parallax */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[10%] left-[-10%] w-[50%] h-[50%]"
      >
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle, hsl(210 100% 55% / 0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>
      
      {/* Teal accent glow - right side - medium parallax */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[30%] right-[-5%] w-[40%] h-[40%]"
      >
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle, hsl(175 100% 45% / 0.12) 0%, transparent 60%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      {/* Bottom center glow for depth - slowest parallax */}
      <motion.div
        style={{ y: y4 }}
        className="absolute bottom-[0%] left-[30%] w-[40%] h-[40%]"
      >
        <motion.div
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at center bottom, hsl(190 100% 50% / 0.1) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Subtle moving highlight - creates the "living" feel - fastest parallax */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] left-[40%] w-[30%] h-[20%]"
      >
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle, hsl(185 100% 60% / 0.08) 0%, transparent 50%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Very subtle noise texture for depth - no parallax */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top gradient fade for header area - no parallax */}
      <div 
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, hsl(210 30% 3% / 0.8) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};