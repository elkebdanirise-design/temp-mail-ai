import { motion } from 'framer-motion';
import { Zap, EyeOff, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get a fully functional email address in milliseconds. No forms, no waiting, no verification steps.',
    auraColor: 'cyan',
    gradient: 'from-[hsl(185,90%,55%)] to-[hsl(195,85%,50%)]',
    glowColor: 'hsl(190 90% 55% / 0.35)',
  },
  {
    icon: EyeOff,
    title: 'Zero Tracking',
    description: 'We never log IPs, store cookies, or track your activity. Your privacy is absolute.',
    auraColor: 'purple',
    gradient: 'from-[hsl(270,70%,55%)] to-[hsl(280,65%,50%)]',
    glowColor: 'hsl(270 70% 55% / 0.35)',
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted Inbox',
    description: 'All messages are encrypted in transit and at rest. Bank-level security for your temp mail.',
    auraColor: 'magenta',
    gradient: 'from-[hsl(320,70%,55%)] to-[hsl(330,65%,50%)]',
    glowColor: 'hsl(320 70% 55% / 0.35)',
  },
];

export const PrivacySolutionSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle neon fog background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            opacity: [0.15, 0.25, 0.18, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'hsl(190 80% 50% / 0.08)' }}
        />
        <motion.div
          animate={{
            x: [0, -40, 25, 0],
            y: [0, 30, -15, 0],
            opacity: [0.12, 0.2, 0.15, 0.12],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'hsl(270 60% 50% / 0.06)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          {/* Chrome gradient title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            <span className="text-foreground">The Ultimate </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 80%) 0%, hsl(0 0% 95%) 30%, hsl(190 50% 75%) 60%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Privacy Solution
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'hsl(200 15% 55%)' }}>
            Built from the ground up with privacy as the core principle. No compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Obsidian glass card with border trace on hover */}
                <div 
                  className="relative rounded-2xl p-8 text-center transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
                    border: '1px solid hsl(var(--glass-border))',
                  }}
                >
                  {/* Border trace animation on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.glowColor}, transparent)`,
                      backgroundSize: '200% 100%',
                      animation: 'border-trace 2s linear infinite',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      padding: '1px',
                    }}
                  />

                  {/* Cyber-Glass 3D Icon Pedestal */}
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    className="relative inline-flex mb-6"
                  >
                    {/* Glass pedestal base */}
                    <div 
                      className="relative p-5 rounded-2xl group-hover:scale-105 transition-all duration-500"
                      style={{
                        background: `linear-gradient(145deg, hsl(220 30% 8% / 0.9), hsl(220 30% 4% / 0.95))`,
                        border: '1px solid hsl(0 0% 100% / 0.06)',
                        boxShadow: `
                          0 8px 32px hsl(220 30% 0% / 0.4),
                          inset 0 1px 0 hsl(0 0% 100% / 0.03),
                          inset 0 -2px 8px hsl(0 0% 0% / 0.2)
                        `,
                      }}
                    >
                      {/* 3D glass layer */}
                      <div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(180deg, hsl(0 0% 100% / 0.04) 0%, transparent 40%)`,
                        }}
                      />
                      
                      {/* Neon aura glow */}
                      <div 
                        className="absolute inset-[-4px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                        style={{ background: feature.glowColor }}
                      />
                      
                      {/* Icon with gradient */}
                      <div 
                        className={`relative p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}
                        style={{
                          boxShadow: `0 0 25px ${feature.glowColor}`,
                        }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Chrome gradient title - Cinematic All-Caps */}
                  <h3 
                    className="text-sm md:text-base font-semibold mb-3 uppercase transition-all duration-300"
                    style={{
                      letterSpacing: '0.12em',
                      background: 'linear-gradient(135deg, hsl(0 0% 75%) 0%, hsl(0 0% 92%) 40%, hsl(190 40% 80%) 70%, hsl(0 0% 85%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {feature.title}
                  </h3>
                  
                  {/* Muted silver description */}
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ 
                      color: 'hsl(200 12% 50%)',
                      lineHeight: '1.7',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
