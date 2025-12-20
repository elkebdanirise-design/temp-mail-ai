import { motion, useScroll, useTransform } from 'framer-motion';

export const AuroraBackground = () => {
  const { scrollY } = useScroll();
  
  // Different parallax speeds for each layer
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep obsidian-black void base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 4%) 100%)',
        }}
      />
      
      {/* Main flowing wave - deep magenta */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[15%] left-[50%] w-[120%] h-[70%]"
      >
        <motion.div
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, 30, 0, -20, 0],
            opacity: [0.4, 0.6, 0.5, 0.6, 0.4],
            scale: [1, 1.05, 1, 1.03, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
          style={{
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse 80% 50% at center, hsl(330 85% 45% / 0.25) 0%, hsl(330 80% 40% / 0.1) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Second wave - crimson red */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[25%] left-[-20%] w-[80%] h-[60%]"
      >
        <motion.div
          animate={{
            x: [0, 80, 40, 0],
            y: [0, -40, 20, 0],
            opacity: [0.3, 0.5, 0.4, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at center, hsl(350 80% 45% / 0.2) 0%, hsl(10 85% 40% / 0.08) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>
      
      {/* Third wave - sunset orange glow */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[30%] right-[-15%] w-[70%] h-[50%]"
      >
        <motion.div
          animate={{
            x: [0, -60, -30, 0],
            y: [0, 50, 10, 0],
            opacity: [0.25, 0.45, 0.35, 0.25],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at center, hsl(25 95% 50% / 0.18) 0%, hsl(35 90% 45% / 0.06) 50%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </motion.div>

      {/* Bottom flowing silk wave */}
      <motion.div
        style={{ y: y4 }}
        className="absolute bottom-[-10%] left-[20%] w-[80%] h-[50%]"
      >
        <motion.div
          animate={{
            x: [-30, 30, -30],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 90% 60% at center bottom, hsl(340 75% 50% / 0.15) 0%, hsl(25 90% 50% / 0.05) 50%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      {/* Floating ambient highlight */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[45%] left-[35%] w-[40%] h-[30%]"
      >
        <motion.div
          animate={{
            x: [-80, 120, -80],
            y: [-40, 60, -40],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle, hsl(330 85% 55% / 0.12) 0%, hsl(25 95% 55% / 0.05) 40%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Soft pink accent wave */}
      <motion.div
        className="absolute top-[60%] left-[60%] w-[50%] h-[40%]"
      >
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            opacity: [0.15, 0.28, 0.15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle, hsl(340 75% 55% / 0.15) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top gradient fade */}
      <div 
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 4% / 0.9) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};