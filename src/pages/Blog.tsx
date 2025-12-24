import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Loader2, ArrowLeft, X, Bookmark, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { AuroraBackground } from '@/components/AuroraBackground';
import { blogPosts, blogCategories, BlogCategory, getPostsByCategory } from '@/data/blogData';
import { useBookmarks } from '@/hooks/useBookmarks';

const POSTS_PER_PAGE = 12; // Increased for better performance with large datasets
const MAX_SEARCH_LENGTH = 100;
const INFINITE_SCROLL_THRESHOLD = 300; // px from bottom to trigger load

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const { bookmarks, bookmarkCount } = useBookmarks();

  // Filter posts by category, search query, and bookmarks
  const filteredPosts = useMemo(() => {
    let posts = getPostsByCategory(activeCategory);
    
    // Filter by bookmarks if enabled
    if (showBookmarksOnly) {
      posts = posts.filter(post => bookmarks.includes(post.id));
    }
    
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(trimmedQuery) ||
        post.excerpt.toLowerCase().includes(trimmedQuery) ||
        post.content.toLowerCase().includes(trimmedQuery) ||
        post.category.toLowerCase().includes(trimmedQuery)
      );
    }
    
    return posts;
  }, [activeCategory, searchQuery, showBookmarksOnly, bookmarks]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visiblePosts);
  }, [filteredPosts, visiblePosts]);
  
  const hasMorePosts = visiblePosts < filteredPosts.length;
  const remainingPosts = filteredPosts.length - visiblePosts;

  const handleCategoryChange = useCallback((category: BlogCategory) => {
    setActiveCategory(category);
    setVisiblePosts(POSTS_PER_PAGE);
    setShowBookmarksOnly(false);
  }, []);

  const toggleBookmarksFilter = useCallback(() => {
    setShowBookmarksOnly(prev => !prev);
    setVisiblePosts(POSTS_PER_PAGE);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_SEARCH_LENGTH);
    setSearchQuery(value);
    setVisiblePosts(POSTS_PER_PAGE);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setVisiblePosts(POSTS_PER_PAGE);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMorePosts) return;
    
    setIsLoading(true);
    // Simulate network delay - remove when using real DB
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMorePosts, filteredPosts.length]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePosts && !isLoading) {
          handleLoadMore();
        }
      },
      { rootMargin: `${INFINITE_SCROLL_THRESHOLD}px` }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMorePosts, isLoading, handleLoadMore]);

  return (
    <>
      <Helmet>
        <title>Blog | Temp Mail AI - Privacy Tips & Cybersecurity Guides</title>
        <meta name="description" content="Stay informed about online privacy, security tips, and the latest updates in disposable email technology. Expert insights on protecting your digital identity with Temp Mail AI." />
        <meta property="og:title" content="Blog | Temp Mail AI - Privacy Insights" />
        <meta property="og:description" content="Expert guides on protecting your digital identity, security best practices, and the latest in privacy technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://temp-mail-ai.vercel.app/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Temp Mail AI" />
        <meta name="twitter:description" content="Expert guides on protecting your digital identity and security best practices." />
        <link rel="canonical" href="https://temp-mail-ai.vercel.app/blog" />
        
        {/* Blog JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Temp Mail AI Blog",
            "description": "Privacy tips, cybersecurity guides, and updates on disposable email technology",
            "url": "https://temp-mail-ai.vercel.app/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Temp Mail AI",
              "logo": {
                "@type": "ImageObject",
                "url": "https://temp-mail-ai.vercel.app/favicon-mail.png"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <AuroraBackground />
        
        <div className="relative z-10">
          <Header />

          <main className="container mx-auto px-4 py-8 md:py-16">
            {/* Floating Back to Home Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 left-4 md:left-6 z-40"
            >
              <Link
                to="/"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 30% 10% / 0.95), hsl(220 30% 6% / 0.98))',
                  border: '1px solid hsl(var(--glass-border))',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px hsl(0 0% 0% / 0.3)',
                }}
              >
                <ArrowLeft 
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
                  style={{ color: 'hsl(var(--aurora-orange))' }}
                />
                <span 
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 85%), hsl(0 0% 95%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Back to Home
                </span>
              </Link>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10 md:mb-14"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="text-foreground">Privacy </span>
                <span 
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 80%) 0%, hsl(0 0% 98%) 30%, hsl(190 60% 70%) 60%, hsl(0 0% 92%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Insights
                </span>
              </h1>
              <p 
                className="text-base md:text-lg max-w-2xl mx-auto"
                style={{ color: 'hsl(200 15% 55%)' }}
              >
                Expert guides on protecting your digital identity, security best practices, and the latest in privacy technology.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-xl mx-auto mb-8"
            >
              <div 
                className="relative flex items-center rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 30% 8% / 0.95), hsl(220 30% 5% / 0.98))',
                  border: `1px solid ${searchQuery ? 'hsl(var(--aurora-purple) / 0.5)' : 'hsl(var(--glass-border))'}`,
                  transition: 'border-color 0.3s ease',
                }}
              >
                <Search className="absolute left-4 w-5 h-5" style={{ color: 'hsl(200 15% 45%)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search articles by title, content, or category..."
                  className="w-full bg-transparent py-3.5 pl-12 pr-12 text-sm focus:outline-none placeholder:text-muted-foreground/50"
                  style={{ color: 'hsl(0 0% 90%)' }}
                  maxLength={MAX_SEARCH_LENGTH}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" style={{ color: 'hsl(200 15% 55%)' }} />
                  </button>
                )}
              </div>
              {searchQuery && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs mt-2 text-center"
                  style={{ color: 'hsl(200 15% 50%)' }}
                >
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found for "{searchQuery}"
                </motion.p>
              )}
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10 overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-2 md:justify-center min-w-max pb-2 px-1">
                {/* Bookmarks Filter Button */}
                <button
                  onClick={toggleBookmarksFilter}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2
                    ${showBookmarksOnly ? 'scale-105' : 'hover:scale-102'}
                  `}
                  style={{
                    background: showBookmarksOnly 
                      ? 'linear-gradient(135deg, hsl(45 90% 50%), hsl(35 85% 45%))'
                      : 'hsl(220 30% 8% / 0.8)',
                    border: `1px solid ${showBookmarksOnly ? 'transparent' : 'hsl(var(--glass-border))'}`,
                    color: showBookmarksOnly ? 'hsl(0 0% 100%)' : 'hsl(200 15% 60%)',
                    boxShadow: showBookmarksOnly 
                      ? '0 4px 20px hsl(45 90% 50% / 0.3)'
                      : 'none',
                  }}
                >
                  <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? 'fill-white' : ''}`} />
                  <span>Saved</span>
                  {bookmarkCount > 0 && (
                    <span 
                      className="px-1.5 py-0.5 rounded-full text-xs"
                      style={{
                        background: showBookmarksOnly ? 'hsl(0 0% 100% / 0.2)' : 'hsl(var(--aurora-purple) / 0.3)',
                        color: 'hsl(0 0% 100%)',
                      }}
                    >
                      {bookmarkCount}
                    </span>
                  )}
                </button>

                {/* Category Buttons */}
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                      ${activeCategory === category && !showBookmarksOnly ? 'scale-105' : 'hover:scale-102'}
                    `}
                    style={{
                      background: activeCategory === category && !showBookmarksOnly
                        ? 'linear-gradient(135deg, hsl(var(--aurora-purple)), hsl(190 80% 50%))'
                        : 'hsl(220 30% 8% / 0.8)',
                      border: `1px solid ${activeCategory === category && !showBookmarksOnly ? 'transparent' : 'hsl(var(--glass-border))'}`,
                      color: activeCategory === category && !showBookmarksOnly ? 'hsl(0 0% 100%)' : 'hsl(200 15% 60%)',
                      boxShadow: activeCategory === category && !showBookmarksOnly
                        ? '0 4px 20px hsl(var(--aurora-purple) / 0.3)'
                        : 'none',
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {displayedPosts.map((post, index) => (
                  <ArticleCard key={post.id} post={post} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More / Infinite Scroll Trigger */}
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {hasMorePosts && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="relative px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 30% 10%), hsl(220 30% 6%))',
                    border: '1px solid hsl(var(--glass-border))',
                    color: 'hsl(0 0% 85%)',
                  }}
                >
                  {/* Pulsing glow */}
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--aurora-purple) / 0.15), hsl(190 80% 50% / 0.15))',
                    }}
                  />
                  
                  <span className="relative flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Load {Math.min(remainingPosts, POSTS_PER_PAGE)} More Articles
                      </>
                    )}
                  </span>
                </motion.button>
              )}
              
              {!hasMorePosts && filteredPosts.length > 0 && (
                <p className="text-sm" style={{ color: 'hsl(200 15% 50%)' }}>
                  Showing all {filteredPosts.length} articles
                </p>
              )}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p style={{ color: 'hsl(200 15% 55%)' }}>
                  {showBookmarksOnly 
                    ? 'No saved articles yet. Bookmark articles to see them here!'
                    : searchQuery 
                      ? `No articles found for "${searchQuery}"`
                      : 'No articles found in this category.'
                  }
                </p>
              </motion.div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
