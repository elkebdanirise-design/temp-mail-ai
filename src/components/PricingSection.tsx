import { motion } from 'framer-motion';
import { Check, Zap, Shield, Globe, Headphones, Sparkles } from 'lucide-react';

const freeFeatures = [
  { icon: Zap, text: 'Standard Mail Generation' },
  { icon: Shield, text: '24h Email Retention' },
  { icon: Sparkles, text: 'Standard Speed' },
  { icon: Check, text: 'Ad-Supported Experience' },
];

const proFeatures = [
  { icon: Zap, text: 'No Advertisements' },
  { icon: Shield, text: 'AI-Enhanced Privacy' },
  { icon: Globe, text: 'Custom Domain Access' },
  { icon: Sparkles, text: 'High-Speed Servers' },
  { icon: Headphones, text: '24/7 Premium Support' },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold silver-gradient-text mb-4">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free or unlock elite features with Pro
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 md:p-8 flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Free Plan
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold silver-gradient-text">
                  $0
                </span>
                <span className="text-muted-foreground text-sm">/forever</span>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(var(--secondary))' }}
                  >
                    <feature.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-foreground/80">{feature.text}</span>
                </li>
              ))}
            </ul>

            <button 
              className="mt-8 w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'hsl(var(--secondary))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              }}
            >
              Get Started Free
            </button>
          </motion.div>

          {/* Pro Plan - Featured */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: 0.25,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ scale: 1.02 }}
            className="relative p-6 md:p-8 flex flex-col rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 6% / 0.95), hsl(0 0% 4% / 0.98))',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              boxShadow: '0 0 40px hsl(var(--aurora-orange) / 0.15), 0 0 80px hsl(var(--aurora-magenta) / 0.08)',
            }}
          >
            {/* Glowing border effect */}
            <div 
              className="absolute inset-0 rounded-2xl -z-10 animate-pulse-neon"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)), hsl(var(--aurora-orange)))',
                padding: '2px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
              }}
            />

            {/* Featured badge */}
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                color: 'white',
                boxShadow: '0 0 20px hsl(var(--aurora-orange) / 0.5)',
              }}
            >
              Most Popular
            </div>

            <div className="mb-6 mt-2">
              <h3 className="text-xl md:text-2xl font-bold aurora-gradient-text mb-2">
                Pro Plan
              </h3>
              <div className="flex items-baseline gap-1">
                <span 
                  className="text-4xl md:text-5xl font-extrabold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(35 95% 65%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  $9.99
                </span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.15))',
                      border: '1px solid hsl(var(--aurora-orange) / 0.3)',
                    }}
                  >
                    <feature.icon 
                      className="w-4 h-4" 
                      style={{ color: 'hsl(var(--aurora-orange))' }}
                    />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            <button 
              className="mt-8 w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] mesh-gradient-btn-intense"
            >
              Upgrade to Pro
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
