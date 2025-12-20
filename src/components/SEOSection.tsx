import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Globe, Clock, Eye } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Military-Grade Privacy',
    description: 'Your temporary email is encrypted and completely anonymous. No personal data required.',
    glowColor: 'hsl(var(--aurora-magenta) / 0.3)',
    gradient: 'from-[hsl(330,85%,55%)] to-[hsl(350,80%,50%)]',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get a working email address in milliseconds. No signup, no waiting, no hassle.',
    glowColor: 'hsl(var(--aurora-orange) / 0.3)',
    gradient: 'from-[hsl(25,95%,55%)] to-[hsl(35,90%,60%)]',
  },
  {
    icon: Lock,
    title: 'Spam Protection',
    description: 'Keep your real inbox clean. Use disposable emails for signups and trials.',
    glowColor: 'hsl(var(--aurora-crimson) / 0.3)',
    gradient: 'from-[hsl(350,80%,50%)] to-[hsl(10,85%,50%)]',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Compatible with any service that requires email verification. 100% deliverability.',
    glowColor: 'hsl(var(--aurora-sunset) / 0.3)',
    gradient: 'from-[hsl(35,90%,60%)] to-[hsl(45,85%,55%)]',
  },
  {
    icon: Clock,
    title: 'Auto-Refresh Inbox',
    description: 'Real-time message delivery. See new emails appear instantly without refreshing.',
    glowColor: 'hsl(var(--aurora-magenta) / 0.3)',
    gradient: 'from-[hsl(330,85%,55%)] to-[hsl(340,75%,60%)]',
  },
  {
    icon: Eye,
    title: 'Zero Tracking',
    description: 'We don\'t track, store, or sell your data. True privacy by design.',
    glowColor: 'hsl(var(--aurora-orange) / 0.3)',
    gradient: 'from-[hsl(10,85%,50%)] to-[hsl(25,95%,55%)]',
  },
];

export const SEOSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle neon fog background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -15, 20, 0],
            opacity: [0.1, 0.18, 0.12, 0.1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: 'hsl(var(--aurora-magenta) / 0.05)' }}
        />
        <motion.div
          animate={{
            x: [0, -25, 35, 0],
            y: [0, 25, -10, 0],
            opacity: [0.08, 0.15, 0.1, 0.08],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'hsl(var(--aurora-orange) / 0.05)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main SEO Content */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            <span className="text-foreground">Why Use </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 80%) 0%, hsl(0 0% 95%) 30%, hsl(var(--aurora-orange) / 0.7) 60%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Aura Mail
            </span>
            <span className="text-foreground"> for Privacy?</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'hsl(200 15% 55%)' }}>
            In a world where your data is currency, Aura Mail gives you back control. 
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
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div 
                  className="relative rounded-2xl p-6 transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
                    border: '1px solid hsl(var(--glass-border))',
                  }}
                >
                  {/* Border trace on hover */}
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

                  {/* Cyber-glass icon pedestal */}
                  <div 
                    className="relative inline-flex p-3 rounded-xl mb-4 group-hover:scale-105 transition-all duration-500"
                    style={{
                      background: `linear-gradient(145deg, hsl(220 30% 8% / 0.9), hsl(220 30% 4% / 0.95))`,
                      border: '1px solid hsl(0 0% 100% / 0.05)',
                      boxShadow: `
                        0 4px 16px hsl(220 30% 0% / 0.3),
                        inset 0 1px 0 hsl(0 0% 100% / 0.02)
                      `,
                    }}
                  >
                    {/* Neon aura */}
                    <div 
                      className="absolute inset-[-3px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                      style={{ background: feature.glowColor }}
                    />
                    <div className={`relative p-2 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Chrome title */}
                  <h3 
                    className="text-sm font-semibold mb-2 uppercase"
                    style={{
                      letterSpacing: '0.08em',
                      background: 'linear-gradient(135deg, hsl(0 0% 75%) 0%, hsl(0 0% 92%) 40%, hsl(var(--aurora-orange) / 0.8) 70%, hsl(0 0% 85%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'hsl(200 12% 50%)', lineHeight: '1.65' }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary SEO Block */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
            border: '1px solid hsl(var(--glass-border))',
          }}
        >
          <h2 
            className="text-xl md:text-2xl font-semibold tracking-tight mb-6 text-center uppercase"
            style={{
              letterSpacing: '0.06em',
              background: 'linear-gradient(135deg, hsl(0 0% 80%) 0%, hsl(0 0% 95%) 30%, hsl(var(--aurora-orange) / 0.7) 60%, hsl(0 0% 90%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The Fastest Disposable Email of 2026
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="leading-relaxed mb-4" style={{ color: 'hsl(200 12% 50%)' }}>
              Aura Mail represents the next generation of disposable email technology. Built with a focus on 
              speed, security, and simplicity, our service generates temporary email addresses instantly, 
              allowing you to maintain your privacy without sacrificing convenience.
            </p>
            
            <p className="leading-relaxed mb-4" style={{ color: 'hsl(200 12% 50%)' }}>
              Whether you're signing up for a new service, testing an application, or simply want to avoid 
              spam in your primary inbox, Aura Mail provides a seamless solution. Our real-time message 
              delivery ensures you never miss important verification emails, while our clean interface 
              makes managing your temporary inbox effortless.
            </p>

            <p className="leading-relaxed" style={{ color: 'hsl(200 12% 50%)' }}>
              Unlike traditional email providers, Aura Mail requires no personal information. No phone 
              number verification, no identity documents, no strings attached. Just pure, anonymous 
              email functionality when you need it most.
            </p>
          </div>

          <div className="mt-8 pt-8" style={{ borderTop: '1px solid hsl(var(--aurora-magenta) / 0.1)' }}>
            <h3 
              className="text-sm font-semibold mb-4 uppercase"
              style={{
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, hsl(0 0% 75%) 0%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Common Use Cases
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{ color: 'hsl(200 12% 50%)' }}>
              {[
                'Free trial signups without spam',
                'Online shopping with privacy',
                'Testing email workflows',
                'Avoiding newsletter spam',
                'Anonymous account creation',
                'Protecting your real identity',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'hsl(var(--aurora-orange))' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
