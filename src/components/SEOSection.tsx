import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Globe, Clock, Eye } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Military-Grade Privacy',
    description: 'Your temporary email is encrypted and completely anonymous. No personal data required.',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get a working email address in milliseconds. No signup, no waiting, no hassle.',
  },
  {
    icon: Lock,
    title: 'Spam Protection',
    description: 'Keep your real inbox clean. Use disposable emails for signups and trials.',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Compatible with any service that requires email verification. 100% deliverability.',
  },
  {
    icon: Clock,
    title: 'Auto-Refresh Inbox',
    description: 'Real-time message delivery. See new emails appear instantly without refreshing.',
  },
  {
    icon: Eye,
    title: 'Zero Tracking',
    description: 'We don\'t track, store, or sell your data. True privacy by design.',
  },
];

export const SEOSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Main SEO Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Use <span className="neon-text">Aura-Mail</span> for Privacy?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In a world where your data is currency, Aura-Mail gives you back control. 
            Generate unlimited temporary email addresses to protect your identity online.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 group"
              >
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary SEO Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            The Fastest Disposable Email of 2026
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Aura-Mail represents the next generation of disposable email technology. Built with a focus on 
              speed, security, and simplicity, our service generates temporary email addresses instantly, 
              allowing you to maintain your privacy without sacrificing convenience.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you're signing up for a new service, testing an application, or simply want to avoid 
              spam in your primary inbox, Aura-Mail provides a seamless solution. Our real-time message 
              delivery ensures you never miss important verification emails, while our clean interface 
              makes managing your temporary inbox effortless.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Unlike traditional email providers, Aura-Mail requires no personal information. No phone 
              number verification, no identity documents, no strings attached. Just pure, anonymous 
              email functionality when you need it most.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Common Use Cases:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Free trial signups without spam
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Online shopping with privacy
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Testing email workflows
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Avoiding newsletter spam
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Anonymous account creation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Protecting your real identity
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
