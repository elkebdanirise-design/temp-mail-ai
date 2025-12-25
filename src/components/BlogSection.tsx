import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Shield, Lock, Zap, Globe, User, Clock, Eye, Star } from 'lucide-react';
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

// AI-themed placeholder images based on category
const placeholderImages: Record<string, string> = {
  'Privacy Tips': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
  'Cyber Security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
  'Platform Updates': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
  'Tech News': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
};

const defaultPlaceholder = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop';

// Blog Card Component - matches ArticleCard design
const HomeBlogCard = memo(({ post, index }: { post: any; index: number }) => {
  const style = categoryStyles[post.category] || defaultStyle;
  const Icon = style.icon;
  
  const formattedDate = useMemo(() => {
    if (post.published_at) {
      return new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return new Date(post.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, [post.published_at, post.created_at]);

  const readTime = `${post.reading_time || 5} min read`;
  
  const averageRating = useMemo(() => {
    if (!post.rating_count || post.rating_count === 0) return 0;
    return (post.rating_sum || 0) / post.rating_count;
  }, [post.rating_sum, post.rating_count]);

  const imageUrl = post.featured_image || placeholderImages[post.category] || defaultPlaceholder;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div 
          className="relative rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
            border: '1px solid hsl(var(--glass-border))',
          }}
        >
          {/* Border trace on hover */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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

          {/* Image Area with Featured Image or Placeholder */}
          <div className="relative w-full h-32 md:h-40 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, hsl(220 30% 3% / 0.95), hsl(220 30% 3% / 0.3) 50%, transparent 80%)' }}
            />
            
            {/* Color tint overlay based on category */}
            <div 
              className={`absolute inset-0 opacity-40 bg-gradient-to-br ${style.gradient}`}
            />
            
            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-30"
              style={{ background: `radial-gradient(circle at center, ${style.glowColor}, transparent 70%)` }}
            />
            
            {/* Cyber-glass icon pedestal - only show if no featured image */}
            {!post.featured_image && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="relative p-4 rounded-xl group-hover:scale-110 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.02))',
                    border: '1px solid hsl(0 0% 100% / 0.15)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: `0 8px 32px hsl(0 0% 0% / 0.4)`,
                  }}
                >
                  <div 
                    className="absolute inset-[-6px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                    style={{ background: style.glowColor }}
                  />
                  <Icon className="relative w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            )}

            {/* Category Tag */}
            <div 
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'hsl(0 0% 0% / 0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid hsl(0 0% 100% / 0.1)',
                color: 'hsl(0 0% 90%)',
              }}
            >
              {post.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Meta info with views and rating - matches ArticleCard */}
            <div className="flex items-center gap-3 text-xs mb-3 flex-wrap" style={{ color: 'hsl(200 12% 50%)' }}>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
              {/* View count - social proof */}
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{(post.views_count || 0).toLocaleString()}</span>
              </div>
              {/* Star rating - social proof */}
              {post.rating_count && post.rating_count > 0 && (
                <div className="flex items-center gap-1">
                  <Star 
                    className="w-3.5 h-3.5 fill-current" 
                    style={{ color: 'hsl(45 90% 55%)' }} 
                  />
                  <span style={{ color: 'hsl(45 90% 55%)' }}>
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Chrome Title */}
            <h3 
              className="font-semibold text-base md:text-lg mb-2 line-clamp-2 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 98%) 50%, hsl(0 0% 90%) 100%)',
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
              style={{ color: 'hsl(200 12% 55%)', lineHeight: '1.65' }}
            >
              {post.excerpt || 'Read this article to learn more...'}
            </p>

            {/* Read More - matches ArticleCard exactly */}
            <div className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-magenta)), hsl(var(--aurora-orange)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Read More
              </span>
              <ArrowRight 
                className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" 
                style={{ color: 'hsl(var(--aurora-orange))' }} 
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});

HomeBlogCard.displayName = 'HomeBlogCard';

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
            // Loading skeleton - matches ArticleCard structure
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index} 
                className="rounded-2xl overflow-hidden animate-pulse" 
                style={{ background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))' }}
              >
                <div className="w-full h-32 md:h-40 bg-muted/20" />
                <div className="p-5">
                  <div className="flex gap-3 mb-3">
                    <div className="h-4 w-16 bg-muted/20 rounded" />
                    <div className="h-4 w-16 bg-muted/20 rounded" />
                    <div className="h-4 w-12 bg-muted/20 rounded" />
                  </div>
                  <div className="h-6 w-full bg-muted/20 rounded mb-2" />
                  <div className="h-4 w-3/4 bg-muted/20 rounded mb-4" />
                  <div className="h-4 w-20 bg-muted/20 rounded" />
                </div>
              </div>
            ))
          ) : blogPosts.length === 0 ? (
            // No posts fallback
            <div className="col-span-full text-center py-12" style={{ color: 'hsl(200 15% 55%)' }}>
              <p>No articles available yet. Check back soon!</p>
            </div>
          ) : (
            blogPosts.map((post, index) => (
              <HomeBlogCard key={post.id} post={post} index={index} />
            ))
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