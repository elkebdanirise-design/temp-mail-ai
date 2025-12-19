import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { EmailDisplay } from '@/components/EmailDisplay';
import { InboxComponent } from '@/components/Inbox';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { SEOSection } from '@/components/SEOSection';
import { PrivacySolutionSection } from '@/components/PrivacySolutionSection';
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
  } = useMailTm();

  const handleNewEmail = async () => {
    await deleteAccount();
    await generateEmail();
  };

  return (
    <>
      <Helmet>
        <title>Aura-Mail | Free Disposable Email - Temp Mail AI & Secure Inbox</title>
        <meta 
          name="description" 
          content="Generate free disposable email addresses instantly. Aura-Mail provides secure, anonymous temporary email for signups, trials, and spam protection. The fastest temp mail service of 2026." 
        />
        <meta name="keywords" content="disposable email, temp mail, temporary email, anonymous email, secure inbox, Temp Mail AI, free email, spam protection" />
        <meta property="og:title" content="Aura-Mail | Free Disposable Email Service" />
        <meta property="og:description" content="Generate anonymous temporary email addresses instantly. No signup required. Real-time inbox with military-grade privacy." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aura-mail.com" />
      </Helmet>

      <div className="min-h-screen bg-background pb-20 md:pb-0">
        {/* Header Ad */}
        <div className="container mx-auto px-4 pt-4">
          <AdPlaceholder variant="horizontal" className="hidden md:flex" />
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
              <AdPlaceholder variant="horizontal" className="hidden md:flex" />

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
                <AdPlaceholder variant="vertical" />
              </div>
            </aside>
          </div>

          {/* Privacy Solution Section */}
          <PrivacySolutionSection />

          {/* Ad Placeholder */}
          <AdPlaceholder variant="horizontal" className="my-8" />

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
        />
      </div>
    </>
  );
};

export default Index;
