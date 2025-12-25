import { memo, useCallback, useMemo } from 'react';
import { Calendar, ArrowRight, Clock, Bookmark, Shield, Lock, Zap, Globe, User } from 'lucide-react';
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

          {/* Image Area with Gradient & Icon */}
          <div 
            className={`relative w-full h-40 sm:h-48 bg-gradient-to-br ${style.gradient} flex items-center justify-center overflow-hidden`}
          >
            {/* Featured image if available */}
            {post.featured_image && (
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            {/* Overlay */}
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, hsl(220 30% 3% / 0.9), transparent 60%)' }}
            />
            
            {/* Zoom effect on hover - CSS only */}
            <div 
              className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-30"
              style={{ background: `radial-gradient(circle at center, ${style.glowColor}, transparent 70%)` }}
            />
            
            {/* Cyber-glass icon pedestal */}
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
            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs mb-3" style={{ color: 'hsl(200 12% 50%)' }}>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
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
