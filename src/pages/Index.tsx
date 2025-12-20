import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { EmailDisplay } from '@/components/EmailDisplay';
import { InboxComponent } from '@/components/Inbox';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SEOSection } from '@/components/SEOSection';
import { PrivacySolutionSection } from '@/components/PrivacySolutionSection';
import { BlogSection } from '@/components/BlogSection';
import { Footer } from '@/components/Footer';
import { MobileNav } from '@/components/MobileNav';
import { useMailTm } from '@/hooks/useMailTm';

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

  const handleNewEmail = async (customPrefix?: string) => {
    await deleteAccount();
    await generateEmail(customPrefix);
  };

  return (
    <>
      <Helmet>
        <title>Aura Mail | Fast & Secure Disposable Email</title>
        <meta 
          name="description" 
          content="Generate free disposable email addresses instantly. Aura Mail provides secure, anonymous temporary email for signups, trials, and spam protection. The fastest AI-powered temp mail service of 2026." 
        />
        <meta name="keywords" content="aura mail, temp mail, disposable email, temporary email, anonymous email, secure inbox, free email, spam protection, AI email" />
        <meta property="og:title" content="Aura Mail | Fast & Secure Disposable Email" />
        <meta property="og:description" content="Generate anonymous temporary email addresses instantly. No signup required. Real-time inbox with military-grade privacy and AI-powered security." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aura-mail.com/og-image.png" />
        <link rel="canonical" href="https://aura-mail.com" />
        
        {/* Monetag Script Placeholder - Replace with actual Monetag scripts */}
        {/* <script async src="https://alwingulla.com/88/tag.min.js" data-zone="YOUR_ZONE_ID" /> */}
        
        {/* JSON-LD Schema Markup for SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Aura Mail",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "description": "AI-powered disposable email service for instant, secure, anonymous temporary email addresses",
            "url": "https://aura-mail.com",
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
              "Instant email generation",
              "Custom email prefix",
              "Real-time inbox",
              "Zero tracking",
              "Encrypted messages",
              "Fast domain selection"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background pb-20 md:pb-0">
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
                  getMessageDetail={getMessageDetail}
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

          {/* Privacy Solution Section */}
          <PrivacySolutionSection />

          {/* Blog Section - Moved above SEO */}
          <BlogSection />

          {/* Ad Placeholder */}
          <AdPlaceholder variant="horizontal" className="my-8" monetagId="content-728x90" />

          {/* SEO Section */}
          <SEOSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Navigation */}
        <MobileNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRefresh={refreshMessages}
          email={email}
        />
      </div>
    </>
  );
};

export default Index;
