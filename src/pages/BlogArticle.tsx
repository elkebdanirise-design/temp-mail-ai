import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { AuroraBackground } from '@/components/AuroraBackground';
import { getPostBySlug, getRelatedPosts } from '@/data/blogData';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
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

  const relatedPosts = getRelatedPosts(post, 3);
  const Icon = post.icon;

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
        <title>{post.title} | Temp Mail Aura Blog</title>
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
                  className={`relative w-full h-48 sm:h-64 md:h-80 rounded-2xl bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden mb-8`}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, hsl(220 30% 3% / 0.95), transparent 70%)' }}
                  />
                  
                  {/* Cyber-glass icon pedestal */}
                  <div 
                    className="relative p-6 md:p-8 rounded-2xl"
                    style={{
                      background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.02))',
                      border: '1px solid hsl(0 0% 100% / 0.15)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: `0 16px 48px hsl(0 0% 0% / 0.5), 0 0 60px ${post.glowColor}`,
                    }}
                  >
                    <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>

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

                {/* Article Meta */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex flex-wrap items-center gap-4 mb-6"
                  style={{ color: 'hsl(200 12% 50%)' }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
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
                    Table of Contents
                  </h4>
                  <nav className="space-y-2">
                    {post.tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 text-sm py-1.5 transition-all duration-200 hover:translate-x-1 group"
                        style={{ color: 'hsl(200 15% 55%)' }}
                      >
                        <ChevronRight 
                          className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" 
                          style={{ color: 'hsl(190 80% 55%)' }}
                        />
                        <span className="group-hover:text-foreground transition-colors">{item.title}</span>
                      </a>
                    ))}
                  </nav>
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
