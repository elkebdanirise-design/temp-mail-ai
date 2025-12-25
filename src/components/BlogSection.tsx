import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Shield, Lock, Zap, Globe, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/useBlogPosts';

// Category to icon/gradient mapping for styling
const categoryStyles: Record<string, { icon: any; gradient: string; glowColor: string }> = {
  'Privacy Tips': { icon: Shield, gradient: 'from-fuchsia-500 to-purple-600', glowColor: 'hsl(280 80% 60%)' },
  'Cyber Security': { icon: Lock, gradient: 'from-emerald-400 to-cyan-500', glowColor: 'hsl(170 70% 50%)' },
  'Platform Updates': { icon: Zap, gradient: 'from-amber-400 to-orange-500', glowColor: 'hsl(35 90% 55%)' },
  'Tech News': { icon: Globe, gradient: 'from-blue-400 to-indigo-500', glowColor: 'hsl(230 70% 60%)' },
};

const defaultStyle = { icon: User, gradient: 'from-gray-400 to-gray-600', glowColor: 'hsl(0 0% 50%)' };

export const BlogSection = () => {
  const { displayedPosts, isLoading } = useBlogPosts({ postsPerPage: 3 });
  
  // Get only first 3 posts for homepage
  const blogPosts = displayedPosts.slice(0, 3);

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
          style={{ background: 'hsl(var(--aurora-magenta) / 0.05)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Decorative ornamentation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange)))' }}
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'hsl(var(--aurora-orange))' }}
            />
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px"
              style={{ background: 'linear-gradient(90deg, hsl(var(--aurora-orange)), transparent)' }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-3 relative inline-block italic"
            style={{ color: '#FFFFFF' }}
          >
            𝙇𝙖𝙩𝙚𝙨𝙩 𝙋𝙧𝙞𝙫𝙖𝙘𝙮 𝙄𝙣𝙨𝙞𝙜𝙝𝙩𝙨
            
            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-[2px] origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-magenta) / 0.6), hsl(var(--aurora-orange)), hsl(var(--aurora-magenta) / 0.6), transparent)',
              }}
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="max-w-2xl mx-auto mt-5"
            style={{ color: 'hsl(200 15% 55%)' }}
          >
            Stay informed about online privacy, security tips, and the latest updates in disposable email technology.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-2xl p-5 md:p-6 animate-pulse" style={{ background: 'hsl(220 30% 5% / 0.95)' }}>
                <div className="w-full h-32 md:h-40 rounded-xl bg-muted/20 mb-4" />
                <div className="h-4 w-24 bg-muted/20 rounded mb-2" />
                <div className="h-6 w-full bg-muted/20 rounded mb-2" />
                <div className="h-4 w-3/4 bg-muted/20 rounded" />
              </div>
            ))
          ) : blogPosts.length === 0 ? (
            // No posts fallback
            <div className="col-span-full text-center py-12" style={{ color: 'hsl(200 15% 55%)' }}>
              <p>No articles available yet. Check back soon!</p>
            </div>
          ) : (
            blogPosts.map((post, index) => {
              const style = categoryStyles[post.category] || defaultStyle;
              const Icon = style.icon;
              const formattedDate = post.published_at 
                ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.6 }}
                  className="group cursor-pointer relative"
                >
                  <Link to={`/blog/${post.slug}`}>
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
                          background: `linear-gradient(90deg, transparent, ${style.glowColor}, transparent)`,
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
                        className={`relative w-full h-32 md:h-40 rounded-xl bg-gradient-to-br ${style.gradient} mb-4 flex items-center justify-center overflow-hidden`}
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
                            style={{ background: style.glowColor }}
                          />
                          <Icon className="relative w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'hsl(200 12% 50%)' }}>
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
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
                      {post.excerpt || 'Read this article to learn more...'}
                    </p>

                    {/* Read More */}
                    <div 
                      className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--aurora-magenta)), hsl(var(--aurora-orange)))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
                    </div>
                  </div>
                </Link>
              </motion.article>
              );
            })
          )}
        </div>

        {/* View All Articles Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mt-8 md:mt-10"
        >
          <Link
            to="/blog"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(145deg, hsl(220 30% 10%), hsl(220 30% 6%))',
              border: '1px solid hsl(var(--glass-border))',
              color: 'hsl(0 0% 85%)',
            }}
          >
            {/* Hover glow */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-magenta) / 0.2), hsl(var(--aurora-orange) / 0.2))',
              }}
            />
            <span className="relative">View All Articles</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: 'hsl(var(--aurora-orange))' }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
