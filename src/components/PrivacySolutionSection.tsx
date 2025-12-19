import { motion } from 'framer-motion';
import { Zap, EyeOff, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get a fully functional email address in milliseconds. No forms, no waiting, no verification steps.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: EyeOff,
    title: 'Zero Tracking',
    description: 'We never log IPs, store cookies, or track your activity. Your privacy is absolute.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted Inbox',
    description: 'All messages are encrypted in transit and at rest. Bank-level security for your temp mail.',
    gradient: 'from-violet-500 to-purple-500',
  },
];

export const PrivacySolutionSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The Ultimate <span className="neon-text">Privacy Solution</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built from the ground up with privacy as the core principle. No compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-panel p-8 text-center group hover:scale-[1.02] transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
