import { useState, useEffect, lazy, Suspense } from 'react';
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

// Lazy load below-the-fold sections for faster initial load
const SEOSection = lazy(() => import('@/components/SEOSection').then(m => ({ default: m.SEOSection })));
const PrivacySolutionSection = lazy(() => import('@/components/PrivacySolutionSection').then(m => ({ default: m.PrivacySolutionSection })));
const BlogSection = lazy(() => import('@/components/BlogSection').then(m => ({ default: m.BlogSection })));
const PricingSection = lazy(() => import('@/components/PricingSection').then(m => ({ default: m.PricingSection })));
const ComparisonTable = lazy(() => import('@/components/ComparisonTable').then(m => ({ default: m.ComparisonTable })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FastestEmailSection = lazy(() => import('@/components/FastestEmailSection').then(m => ({ default: m.FastestEmailSection })));

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
        <title>Temp Mail AI | #1 Fastest AI-Powered Disposable Email 2026</title>
        <meta 
          name="description" 
          content="Generate free disposable email addresses instantly with AI verification. Temp Mail AI provides secure, anonymous temporary email for signups, trials, and spam protection. The fastest AI-powered temp mail service of 2026." 
        />
        <meta name="keywords" content="temp mail ai, temp mail, disposable email, temporary email, anonymous email, ai email, secure inbox, free email, spam protection" />
        <meta property="og:title" content="Temp Mail AI | #1 Fastest AI-Powered Disposable Email 2026" />
        <meta property="og:description" content="Generate AI-verified anonymous temporary email addresses instantly. No signup required. Real-time inbox with military-grade privacy and AI-powered security." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tempmail-ai.com/og-image.png" />
        <link rel="canonical" href="https://tempmail-ai.com" />
        
        {/* JSON-LD Schema Markup for SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Temp Mail AI",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "description": "AI-powered disposable email service for instant, secure, anonymous temporary email addresses with AI verification",
            "url": "https://tempmail-ai.com",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "12847"
            },
            "featureList": [
              "AI-verified email generation",
              "Real-time inbox",
              "Zero tracking",
              "Encrypted messages",
              "AI Smart Shield protection"
            ]
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
          <Suspense fallback={<div className="min-h-[200px]" />}>
            {/* 1. Privacy Solution Section */}
            <PrivacySolutionSection />

            {/* 2. Testimonials Section */}
            <TestimonialsSection />

            {/* 3. SEO Section - Why Use Temp Mail AI */}
            <SEOSection />

            {/* 4. Blog Section */}
            <BlogSection />

            {/* 5. Pricing & Comparison */}
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
