import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Shield, Eye, UserCheck } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Why You Need a Temp Mail for Social Media',
    excerpt: 'Protect your primary inbox from spam and data harvesting when signing up for new social platforms.',
    date: 'Dec 18, 2026',
    icon: UserCheck,
    gradient: 'from-[hsl(185,90%,55%)] to-[hsl(195,85%,50%)]',
    glowColor: 'hsl(190 90% 55% / 0.3)',
  },
  {
    id: 2,
    title: 'How Disposable Email Protects Your Privacy',
    excerpt: 'Learn how temporary email addresses keep your personal data safe from marketers and hackers.',
    date: 'Dec 15, 2026',
    icon: Shield,
    gradient: 'from-[hsl(270,70%,55%)] to-[hsl(280,65%,50%)]',
    glowColor: 'hsl(270 70% 55% / 0.3)',
  },
  {
    id: 3,
    title: 'The Rise of AI-Powered Email Security',
    excerpt: 'Discover how AI is revolutionizing the way we protect our digital communications in 2026.',
    date: 'Dec 12, 2026',
    icon: Eye,
    gradient: 'from-[hsl(320,70%,55%)] to-[hsl(330,65%,50%)]',
    glowColor: 'hsl(320 70% 55% / 0.3)',
  },
];

export const BlogSection = () => {
  return (
    <section id="blog-section" className="py-12 md:py-16 relative overflow-hidden">
      {/* Subtle neon fog */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -15, 0],
            opacity: [0.1, 0.16, 0.12, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'hsl(320 60% 50% / 0.05)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-3"
          >
            <span className="text-foreground">Latest Privacy Insights & </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 80%) 0%, hsl(0 0% 95%) 30%, hsl(190 50% 75%) 60%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Temp Mail Aura News
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="max-w-2xl mx-auto"
            style={{ color: 'hsl(200 15% 55%)' }}
          >
            Stay informed about online privacy, security tips, and the latest updates in disposable email technology.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {blogPosts.map((post, index) => {
            const Icon = post.icon;
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className="group cursor-pointer relative"
              >
                <div 
                  className="relative rounded-2xl p-5 md:p-6 transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
                    border: '1px solid hsl(var(--glass-border))',
                  }}
                >
                  {/* Border trace on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${post.glowColor}, transparent)`,
                      backgroundSize: '200% 100%',
                      animation: 'border-trace 2s linear infinite',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      padding: '1px',
                    }}
                  />

                  {/* Image Area with Cyber-Glass Icon */}
                  <div 
                    className={`relative w-full h-32 md:h-40 rounded-xl bg-gradient-to-br ${post.gradient} mb-4 flex items-center justify-center overflow-hidden`}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, hsl(220 30% 3% / 0.8), transparent)' }}
                    />
                    
                    {/* Cyber-glass icon pedestal */}
                    <div 
                      className="relative p-4 rounded-xl group-hover:scale-110 transition-all duration-500"
                      style={{
                        background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.08), hsl(0 0% 100% / 0.02))',
                        border: '1px solid hsl(0 0% 100% / 0.1)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: `0 8px 32px hsl(0 0% 0% / 0.3)`,
                      }}
                    >
                      {/* Icon glow on hover */}
                      <div 
                        className="absolute inset-[-4px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                        style={{ background: post.glowColor }}
                      />
                      <Icon className="relative w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'hsl(200 12% 50%)' }}>
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>

                  {/* Chrome Title */}
                  <h3 
                    className="font-semibold text-base md:text-lg mb-2 line-clamp-2 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 95%) 50%, hsl(0 0% 90%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Muted silver excerpt */}
                  <p 
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: 'hsl(200 12% 50%)', lineHeight: '1.6' }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div 
                    className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, hsl(190 80% 55%), hsl(210 85% 60%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" style={{ color: 'hsl(190 80% 55%)' }} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
