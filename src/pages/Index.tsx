import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { EmailDisplay } from '@/components/EmailDisplay';
import { InboxComponent } from '@/components/Inbox';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { AuroraBackground } from '@/components/AuroraBackground';
import { ParticleField } from '@/components/ParticleField';
import { ShootingStars } from '@/components/ShootingStars';
import { Footer } from '@/components/Footer';
import { MobileNav } from '@/components/MobileNav';
import ScrollToTop from '@/components/ScrollToTop';
import { useMailTm } from '@/hooks/useMailTm';
import { useEmailSessions } from '@/hooks/useEmailSessions';
// Lazy load below-the-fold sections for faster initial load
const SEOSection = lazy(() => import('@/components/SEOSection').then(m => ({ default: m.SEOSection })));
const PrivacySolutionSection = lazy(() => import('@/components/PrivacySolutionSection').then(m => ({ default: m.PrivacySolutionSection })));
const BlogSection = lazy(() => import('@/components/BlogSection').then(m => ({ default: m.BlogSection })));
const PricingSection = lazy(() => import('@/components/PricingSection').then(m => ({ default: m.PricingSection })));
const ComparisonTable = lazy(() => import('@/components/ComparisonTable').then(m => ({ default: m.ComparisonTable })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FastestEmailSection = lazy(() => import('@/components/FastestEmailSection').then(m => ({ default: m.FastestEmailSection })));
const LimitedOfferBanner = lazy(() => import('@/components/LimitedOfferBanner').then(m => ({ default: m.LimitedOfferBanner })));

// Minimal loading fallback
const SectionFallback = memo(() => <div className="min-h-[100px]" />);
SectionFallback.displayName = 'SectionFallback';

const Index = () => {
  const [activeTab, setActiveTab] = useState('email');
  const {
    email,
    messages,
    loading,
    generateEmail,
    getMessageDetail,
    deleteMessage,
    deleteAccount,
    refreshMessages,
    setOnNewMessage,
  } = useMailTm();

  // Sound notification for new emails
  useEffect(() => {
    setOnNewMessage(() => {
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Audio play failed (likely autoplay policy)
      });
    });
  }, [setOnNewMessage]);

  const handleNewEmail = async () => {
    await deleteAccount();
    await generateEmail();
  };

  return (
    <>
      <Helmet>
        <title>Temp Mail AI - Free Disposable Email Generator | Secure Anonymous Inbox</title>
        <meta 
          name="description" 
          content="Generate free disposable email addresses instantly with AI verification. Temp Mail AI provides secure, anonymous temporary email for signups, trials, and spam protection. The fastest AI-powered temp mail service of 2026." 
        />
        <meta name="keywords" content="temp mail, temp mail ai, disposable email, temporary email, anonymous email, ai email, secure inbox, free email, spam protection, burner email, fake email, throwaway email" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://temp-mail-ai.vercel.app/" />
        <meta property="og:title" content="Temp Mail AI - Free Disposable Email Generator" />
        <meta property="og:description" content="Generate AI-verified anonymous temporary email addresses instantly. No signup required. Real-time inbox with military-grade privacy and AI-powered security." />
        <meta property="og:image" content="https://temp-mail-ai.vercel.app/lovable-uploads/66b4771e-6d49-4f11-816b-03204f1186b3.png" />
        <meta property="og:site_name" content="Temp Mail AI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://temp-mail-ai.vercel.app/" />
        <meta name="twitter:title" content="Temp Mail AI - Free Disposable Email Generator" />
        <meta name="twitter:description" content="Generate AI-verified anonymous temporary email addresses instantly. No signup required. Real-time inbox with military-grade privacy." />
        <meta name="twitter:image" content="https://temp-mail-ai.vercel.app/lovable-uploads/66b4771e-6d49-4f11-816b-03204f1186b3.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Temp Mail AI" />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="canonical" href="https://temp-mail-ai.vercel.app/" />
        
        {/* JSON-LD Schema Markup for SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Temp Mail AI",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "description": "AI-powered disposable email service for instant, secure, anonymous temporary email addresses with AI verification. Generate free temp mail in seconds.",
            "url": "https://temp-mail-ai.vercel.app",
            "image": "https://temp-mail-ai.vercel.app/lovable-uploads/66b4771e-6d49-4f11-816b-03204f1186b3.png",
            "screenshot": "https://temp-mail-ai.vercel.app/lovable-uploads/66b4771e-6d49-4f11-816b-03204f1186b3.png",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "12847",
              "bestRating": "5",
              "worstRating": "1"
            },
            "featureList": [
              "AI-verified email generation",
              "Real-time inbox",
              "Zero tracking",
              "Encrypted messages",
              "AI Smart Shield protection",
              "Instant disposable addresses",
              "No signup required"
            ],
            "author": {
              "@type": "Organization",
              "name": "Temp Mail AI"
            }
          })}
        </script>
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Temp Mail AI",
            "url": "https://temp-mail-ai.vercel.app",
            "logo": "https://temp-mail-ai.vercel.app/favicon-mail.png",
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://temp-mail-ai.vercel.app/contact"
            }
          })}
        </script>
        
        {/* WebSite Schema for Search Box */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Temp Mail AI",
            "url": "https://temp-mail-ai.vercel.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://temp-mail-ai.vercel.app/blog?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <AuroraBackground />
      <ParticleField />
      <ShootingStars />
      {/* Increased bottom padding on mobile for fixed nav bar (includes safe-area) */}
      <div className="relative z-10 min-h-screen pb-[calc(96px+env(safe-area-inset-bottom,0px))] md:pb-0 ambient-breathe">
        {/* Header Ad */}
        <div className="container mx-auto px-4 pt-4">
          <AdPlaceholder variant="horizontal" className="hidden md:flex" monetagId="header-728x90" />
        </div>

        <Header />

        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Email Display - Always visible on desktop, conditional on mobile */}
              <div className={`${activeTab === 'email' || activeTab === 'inbox' ? 'block' : 'hidden'} md:block`}>
                <EmailDisplay
                  email={email}
                  loading={loading}
                  onRefresh={handleNewEmail}
                  onDelete={handleNewEmail}
                />
              </div>

              {/* Ad between email and inbox */}
              <AdPlaceholder variant="horizontal" className="hidden md:flex" monetagId="mid-728x90" />

              {/* Inbox */}
              <div className={`${activeTab === 'inbox' ? 'block' : 'hidden'} md:block`}>
                <InboxComponent
                  messages={messages}
                  onRefresh={refreshMessages}
                  onDeleteMessage={deleteMessage}
                  isRefreshing={loading}
                />
              </div>
            </div>

            {/* Sidebar Ad - Desktop only */}
            <aside className="hidden lg:block w-[200px] flex-shrink-0">
              <div className="sticky top-6">
                <AdPlaceholder variant="vertical" monetagId="sidebar-160x600" />
              </div>
            </aside>
          </div>

          {/* Lazy loaded sections with minimal fallback */}
          <Suspense fallback={<SectionFallback />}>
            {/* 1. Privacy Solution Section */}
            <PrivacySolutionSection />

            {/* 2. Testimonials Section */}
            <TestimonialsSection />

            {/* 3. SEO Section - Why Use Temp Mail AI */}
            <SEOSection />

            {/* 4. Blog Section */}
            <BlogSection />

            {/* 5. Limited Offer Banner + Pricing & Comparison */}
            <LimitedOfferBanner />
            <PricingSection />
            <ComparisonTable />

            {/* 6. The Fastest Disposable Email of 2026 - Before Footer */}
            <FastestEmailSection />
          </Suspense>

          {/* Ad Placeholder */}
          <AdPlaceholder variant="horizontal" className="my-8" monetagId="content-728x90" />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mobile Navigation (mounted outside filtered container for true viewport-fixed positioning) */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRefresh={handleNewEmail}
        email={email}
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
};

export default Index;
