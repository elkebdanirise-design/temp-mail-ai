import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, ChevronRight, Bookmark, Shield, Lock, Zap, Globe, User, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { AuroraBackground } from '@/components/AuroraBackground';
import { StarRating } from '@/components/StarRating';
import { SocialShare } from '@/components/SocialShare';
import { useBlogPost, useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { useBookmarks } from '@/hooks/useBookmarks';
import { supabase } from '@/integrations/supabase/client';

// Category styles mapping
const categoryStyles: Record<string, { gradient: string; glowColor: string }> = {
  'Privacy Tips': { gradient: 'from-fuchsia-500 to-purple-600', glowColor: 'hsl(280 80% 60%)' },
  'Cyber Security': { gradient: 'from-emerald-400 to-cyan-500', glowColor: 'hsl(170 70% 50%)' },
  'Platform Updates': { gradient: 'from-amber-400 to-orange-500', glowColor: 'hsl(35 90% 55%)' },
  'Tech News': { gradient: 'from-blue-400 to-indigo-500', glowColor: 'hsl(230 70% 60%)' },
};

const categoryIcons: Record<string, any> = {
  'Privacy Tips': Shield,
  'Cyber Security': Lock,
  'Platform Updates': Zap,
  'Tech News': Globe,
};

const defaultStyle = { gradient: 'from-gray-400 to-gray-600', glowColor: 'hsl(0 0% 50%)' };

// AI-themed placeholder images based on category
const placeholderImages: Record<string, string> = {
  'Privacy Tips': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop',
  'Cyber Security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop',
  'Platform Updates': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
  'Tech News': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
};

const defaultPlaceholder = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { post, isLoading, error } = useBlogPost(slug || '');
  const { posts: allPosts } = useBlogPosts();

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const viewIncrementedRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Increment view count on page load (only once per visit)
  useEffect(() => {
    const incrementViews = async () => {
      if (!post?.id || viewIncrementedRef.current) return;
      viewIncrementedRef.current = true;
      
      try {
        await supabase.rpc('increment_post_views', { post_id_input: post.id });
      } catch (err) {
        console.error('Failed to increment views:', err);
      }
    };

    incrementViews();
  }, [post?.id]);

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = post ? isBookmarked(post.id) : false;

  // Get related posts (same category, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post || !allPosts.length) return [];
    return allPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post, allPosts]);

  const style = post ? (categoryStyles[post.category] || defaultStyle) : defaultStyle;
  const Icon = post ? (categoryIcons[post.category] || User) : User;
  const readTime = post ? `${post.reading_time} min read` : '';

  const handleBookmarkClick = () => {
    if (!post) return;
    const newState = toggleBookmark(post.id);
    toast.success(newState ? 'Article bookmarked!' : 'Bookmark removed');
  };

  // Format date
  const formattedDate = useMemo(() => {
    if (!post) return '';
    const dateStr = post.published_at || post.created_at;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Convert markdown-like content to HTML
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let currentKey = 0;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag 
            key={currentKey++} 
            className={`mb-6 space-y-2 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} list-inside`}
            style={{ color: 'hsl(200 15% 70%)' }}
          >
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        flushList();
        const text = trimmed.replace('## ', '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2 
            key={currentKey++} 
            id={id}
            className="text-xl md:text-2xl font-bold mt-10 mb-4 scroll-mt-24"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 90%) 0%, hsl(0 0% 100%) 50%, hsl(0 0% 95%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {text}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        const text = trimmed.replace('### ', '');
        elements.push(
          <h3 
            key={currentKey++} 
            className="text-lg md:text-xl font-semibold mt-8 mb-3"
            style={{ color: 'hsl(0 0% 85%)' }}
          >
            {text}
          </h3>
        );
      } else if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        const text = trimmed.replace(/^- \*\*(.+)\*\*(.*)$/, '<strong>$1</strong>$2').replace(/^- /, '');
        listItems.push(text);
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        const text = trimmed.replace(/^\d+\.\s\*\*(.+)\*\*(.*)$/, '<strong>$1</strong>$2').replace(/^\d+\.\s/, '');
        listItems.push(text);
      } else if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p 
            key={currentKey++} 
            className="mb-5 leading-relaxed text-base md:text-lg"
            style={{ color: 'hsl(200 15% 70%)', lineHeight: '1.8' }}
          >
            {trimmed}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Temp Mail AI</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, hsl(var(--aurora-purple)), hsl(190 80% 55%))',
            boxShadow: '0 0 10px hsl(var(--aurora-purple) / 0.5), 0 0 20px hsl(190 80% 55% / 0.3)',
          }}
        />

        <AuroraBackground />
        
        <div className="relative z-10">
          <Header />

          <main className="container mx-auto px-4 py-8 md:py-12">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 group"
                style={{ color: 'hsl(200 15% 55%)' }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blog</span>
              </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
              {/* Main Content */}
              <article>
                {/* Feature Image Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-8"
                >
                  {/* Featured image or placeholder */}
                  <img 
                    src={post.featured_image || placeholderImages[post.category] || defaultPlaceholder}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, hsl(220 30% 3% / 0.95), hsl(220 30% 3% / 0.3) 50%, transparent 80%)' }}
                  />
                  
                  {/* Color tint overlay based on category */}
                  <div 
                    className={`absolute inset-0 opacity-30 bg-gradient-to-br ${style.gradient}`}
                  />
                  
                  {/* Cyber-glass icon pedestal - only show if no featured image */}
                  {!post.featured_image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="relative p-6 md:p-8 rounded-2xl"
                        style={{
                          background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.02))',
                          border: '1px solid hsl(0 0% 100% / 0.15)',
                          backdropFilter: 'blur(12px)',
                          boxShadow: `0 16px 48px hsl(0 0% 0% / 0.5), 0 0 60px ${style.glowColor}`,
                        }}
                      >
                        <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Category Tag */}
                  <div 
                    className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: 'hsl(0 0% 0% / 0.6)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid hsl(0 0% 100% / 0.1)',
                      color: 'hsl(0 0% 95%)',
                    }}
                  >
                    {post.category}
                  </div>
                </motion.div>

                {/* Article Meta & Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex flex-wrap items-center justify-between gap-4 mb-6"
                >
                  <div className="flex items-center gap-4" style={{ color: 'hsl(200 12% 50%)' }}>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{post.views_count?.toLocaleString() || 0} views</span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={handleBookmarkClick}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
                    className="group relative p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      background: bookmarked 
                        ? 'linear-gradient(135deg, hsl(45 90% 50%), hsl(35 85% 45%))'
                        : 'linear-gradient(145deg, hsl(220 30% 10%), hsl(220 30% 6%))',
                      border: '1px solid hsl(var(--glass-border))',
                      boxShadow: bookmarked ? '0 0 16px hsl(45 90% 50% / 0.4)' : 'none',
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'hsl(45 90% 50% / 0.3)', filter: 'blur(8px)' }}
                    />
                    <Bookmark className={`relative w-4 h-4 transition-colors ${bookmarked ? 'fill-white text-white' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  </button>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight"
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 100%) 40%, hsl(190 50% 80%) 70%, hsl(0 0% 95%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {post.title}
                </motion.h1>

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="prose prose-invert max-w-none"
                >
                  {renderContent(post.content)}
                </motion.div>

                {/* Engagement Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-12 grid gap-6 md:grid-cols-2"
                >
                  <StarRating 
                    postId={post.id}
                    initialRatingSum={post.rating_sum || 0}
                    initialRatingCount={post.rating_count || 0}
                  />
                  <SocialShare 
                    title={post.title}
                    url={articleUrl}
                  />
                </motion.div>
              </article>

              {/* Sidebar - Table of Contents */}
              <aside className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="sticky top-24 rounded-2xl p-5"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 30% 6% / 0.95), hsl(220 30% 4% / 0.98))',
                    border: '1px solid hsl(var(--glass-border))',
                  }}
                >
                  <h4 
                    className="text-sm font-semibold uppercase tracking-wider mb-4"
                    style={{ color: 'hsl(200 15% 60%)' }}
                  >
                    About This Article
                  </h4>
                  <p className="text-sm" style={{ color: 'hsl(200 15% 55%)' }}>
                    {post.excerpt || 'Read this article to learn more about this topic.'}
                  </p>
                </motion.div>
              </aside>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 md:mt-24"
              >
                <h2 
                  className="text-xl md:text-2xl font-bold mb-8"
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 98%) 50%, hsl(0 0% 92%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <ArticleCard key={relatedPost.id} post={relatedPost} index={index} />
                  ))}
                </div>
              </motion.section>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
