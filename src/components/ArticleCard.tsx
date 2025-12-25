import { memo, useCallback, useMemo } from 'react';
import { Calendar, ArrowRight, Clock, Bookmark, Shield, Lock, Zap, Globe, User, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import { toast } from 'sonner';
import type { BlogPost } from '@/hooks/useBlogPosts';

// Category to icon/gradient mapping
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

interface ArticleCardProps {
  post: BlogPost;
  index: number;
}

export const ArticleCard = memo(({ post, index }: ArticleCardProps) => {
  const style = categoryStyles[post.category] || defaultStyle;
  const Icon = style.icon;
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.id);

  // Format date
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

  const readTime = `${post.reading_time} min read`;

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!post.rating_count || post.rating_count === 0) return 0;
    return (post.rating_sum || 0) / post.rating_count;
  }, [post.rating_sum, post.rating_count]);

  // Get image URL with fallback
  const imageUrl = post.featured_image || placeholderImages[post.category] || defaultPlaceholder;

  const handleBookmarkClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleBookmark(post.id);
    toast.success(newState ? 'Article bookmarked!' : 'Bookmark removed');
  }, [post.id, toggleBookmark]);

  return (
    <article
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
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
          <div className="relative w-full h-40 sm:h-48 overflow-hidden">
            {/* Featured image or placeholder */}
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
              <div 
                className="absolute inset-0 flex items-center justify-center"
              >
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
                  <Icon className="relative w-10 h-10 text-white/90 group-hover:text-white transition-colors duration-300" />
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

            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkClick}
              className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
              style={{
                background: bookmarked 
                  ? 'linear-gradient(135deg, hsl(var(--aurora-magenta)), hsl(var(--aurora-orange)))'
                  : 'hsl(0 0% 0% / 0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid hsl(0 0% 100% / 0.1)',
                boxShadow: bookmarked ? '0 0 16px hsl(var(--aurora-magenta) / 0.5)' : 'none',
              }}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <Bookmark 
                className={`w-4 h-4 transition-all duration-300 ${bookmarked ? 'fill-white' : ''}`}
                style={{ color: 'hsl(0 0% 100%)' }}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Meta info with views and rating */}
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

            {/* Title */}
            <h3 
              className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 98%) 50%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <p 
              className="text-sm mb-4 line-clamp-2"
              style={{ color: 'hsl(200 12% 55%)', lineHeight: '1.65' }}
            >
              {post.excerpt || 'Read this article to learn more...'}
            </p>

            {/* Read More Button */}
            <div 
              className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-300"
            >
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
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';
