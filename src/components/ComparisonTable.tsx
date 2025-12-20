import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  free: FeatureValue;
  pro: FeatureValue;
}

const features: Feature[] = [
  { name: 'Email Generation', free: true, pro: true },
  { name: 'Real-time Inbox', free: true, pro: true },
  { name: 'Email Retention', free: '24 hours', pro: '7 days' },
  { name: 'Server Speed', free: 'Standard', pro: 'High-Priority' },
  { name: 'Custom Domains', free: false, pro: true },
  { name: 'AI-Enhanced Privacy', free: false, pro: true },
  { name: 'Ad-Free Experience', free: false, pro: true },
  { name: 'Attachment Support', free: '5 MB', pro: '25 MB' },
  { name: 'Concurrent Emails', free: '1', pro: 'Unlimited' },
  { name: 'Priority Support', free: false, pro: '24/7' },
];

const ValueCell = ({ value, isPro = false }: { value: FeatureValue; isPro?: boolean }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: isPro 
            ? 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.15))'
            : 'hsl(160 60% 35% / 0.15)',
          border: isPro 
            ? '1px solid hsl(var(--aurora-orange) / 0.4)'
            : '1px solid hsl(160 60% 40% / 0.3)',
        }}
      >
        <Check 
          className="w-3.5 h-3.5" 
          style={{ color: isPro ? 'hsl(var(--aurora-orange))' : 'hsl(160 60% 50%)' }}
        />
      </div>
    ) : (
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: 'hsl(var(--secondary))',
          border: '1px solid hsl(var(--border))',
        }}
      >
        <X className="w-3.5 h-3.5 text-muted-foreground/50" />
      </div>
    );
  }
  
  return (
    <span 
      className="font-medium text-sm"
      style={{ color: isPro ? 'hsl(var(--aurora-orange))' : 'hsl(var(--foreground) / 0.8)' }}
    >
      {value}
    </span>
  );
};

export const ComparisonTable = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h3 
            className="text-2xl md:text-3xl font-bold mb-3 italic"
            style={{ color: '#FFFFFF' }}
          >
            𝘾𝙤𝙢𝙥𝙖𝙧𝙚 𝙋𝙡𝙖𝙣𝙨
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            See exactly what you get with each plan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto glass-panel overflow-hidden"
        >
          {/* Table Header */}
          <div 
            className="grid grid-cols-3 gap-4 p-4 md:p-6 border-b"
            style={{ borderColor: 'hsl(var(--border))' }}
          >
            <div className="text-left">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Feature
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-foreground">Free</span>
              <div className="text-xs text-muted-foreground mt-0.5">$0</div>
            </div>
            <div className="text-center relative">
              <span 
                className="text-sm font-semibold"
                style={{ color: 'hsl(var(--aurora-orange))' }}
              >
                Pro
              </span>
              <div 
                className="text-xs mt-0.5"
                style={{ color: 'hsl(var(--aurora-orange) / 0.7)' }}
              >
                $9.99/mo
              </div>
              {/* Recommended badge */}
              <div 
                className="absolute -top-1 -right-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                  color: 'white',
                }}
              >
                Best
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y" style={{ borderColor: 'hsl(var(--border) / 0.5)' }}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="grid grid-cols-3 gap-4 p-4 md:px-6 hover:bg-secondary/30 transition-colors"
              >
                <div className="text-left">
                  <span className="text-sm text-foreground/80">{feature.name}</span>
                </div>
                <div className="text-center flex items-center justify-center">
                  <ValueCell value={feature.free} />
                </div>
                <div className="text-center flex items-center justify-center">
                  <ValueCell value={feature.pro} isPro />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table Footer CTA */}
          <div 
            className="p-4 md:p-6 border-t"
            style={{ 
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--secondary) / 0.3)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-sm text-muted-foreground">Ready to upgrade?</span>
              <button 
                className="px-6 py-2 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02] mesh-gradient-btn-intense"
              >
                Get Pro Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
