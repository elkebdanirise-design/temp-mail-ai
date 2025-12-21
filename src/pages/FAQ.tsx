import { LegalPageLayout } from '@/components/LegalPageLayout';

const FAQ = () => {
  return (
    <LegalPageLayout
      title="FAQ | Temp Mail AI"
      description="Frequently asked questions about Temp Mail AI disposable email: retention, safety, and best practices."
      canonicalPath="/faq"
      h1="FAQ"
    >
      <h2>What is Temp Mail AI?</h2>
      <p>
        Temp Mail AI provides disposable email addresses you can use for signups, trials, and spam
        protection—without exposing your real inbox.
      </p>

      <h2>How long do emails stay available?</h2>
      <p>
        Emails are designed to be temporary and may be deleted automatically. If you need something
        important, copy it out immediately.
      </p>

      <h2>Is Temp Mail AI free?</h2>
      <p>
        Yes—core features are free. Pro plans add advanced features and an upgraded experience.
      </p>

      <h2>Why didn’t I receive an email?</h2>
      <ul>
        <li>The sender may block disposable domains</li>
        <li>The message may be delayed upstream</li>
        <li>The inbox may have been replaced by generating a new address</li>
      </ul>

      <h2>Can I use this for permanent accounts?</h2>
      <p>
        Not recommended. Disposable inboxes are meant for temporary use—use a permanent email provider
        for accounts you need long-term.
      </p>
    </LegalPageLayout>
  );
};

export default FAQ;
