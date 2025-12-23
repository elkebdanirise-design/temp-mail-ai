import { memo } from 'react';
import { Shield, Zap, Bot, Lock, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Filtering',
    description: 'Smart algorithms detect and filter spam before it reaches your inbox.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No personal data required. Your identity stays completely anonymous.',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Create disposable email addresses in milliseconds, no signup needed.',
  },
  {
    icon: Lock,
    title: 'End-to-End Secure',
    description: 'Military-grade encryption protects all your temporary communications.',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Access your temp inbox from anywhere in the world, any device.',
  },
  {
    icon: Clock,
    title: 'Auto-Destruct',
    description: 'Emails automatically expire, leaving no trace of your activity.',
  },
];

export const FeaturesSection = memo(() => {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 70%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI-Powered Features
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'hsl(0 0% 55%)' }}>
            Experience the next generation of temporary email with intelligent automation and
            unmatched privacy protection.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, hsla(0, 0%, 10%, 0.8) 0%, hsla(0, 0%, 6%, 0.9) 100%)',
                  border: '1px solid hsla(0, 0%, 20%, 0.3)',
                  boxShadow: '0 4px 30px hsla(0, 0%, 0%, 0.3)',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, hsla(var(--aurora-orange), 0.08) 0%, transparent 70%)',
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, hsla(var(--aurora-orange), 0.15) 0%, hsla(var(--aurora-sunset), 0.1) 100%)',
                    boxShadow: '0 0 25px hsla(var(--aurora-orange), 0.2)',
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{
                      color: 'hsl(var(--aurora-orange))',
                      filter: 'drop-shadow(0 0 6px hsla(var(--aurora-orange), 0.5))',
                    }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-lg sm:text-xl font-semibold mb-3"
                  style={{ color: 'hsl(0 0% 95%)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'hsl(0 0% 55%)' }}>
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange)), transparent)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(var(--aurora-orange), 0.03) 0%, transparent 60%)',
        }}
      />
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';
