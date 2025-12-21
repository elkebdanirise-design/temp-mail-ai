import { LegalPageLayout } from '@/components/LegalPageLayout';

const Terms = () => {
  return (
    <LegalPageLayout
      title="Terms of Service | Temp Mail AI"
      description="Terms for using Temp Mail AI disposable email service. Read acceptable use, limitations, and policies."
      canonicalPath="/terms"
      h1="Terms of Service"
    >
      <p><strong>Last updated:</strong> January 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using Temp Mail AI (the “Service”), you agree to these Terms. If you do not agree,
        do not use the Service.
      </p>

      <h2>2. Service Description</h2>
      <p>
        Temp Mail AI provides temporary, disposable email addresses intended to help you reduce spam and
        protect privacy during signups and trials.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>Engage in illegal activity or facilitate wrongdoing</li>
        <li>Send spam, phishing, malware, or abusive content</li>
        <li>Attempt unauthorized access to inboxes or systems</li>
        <li>Interfere with service availability or performance</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        Messages are intended for temporary use and may be deleted automatically. You are responsible for
        saving any information you need before it expires.
      </p>

      <h2>5. No Warranty</h2>
      <p>
        The Service is provided “as is” and “as available” without warranties of any kind. We do not
        guarantee uninterrupted delivery or inbox availability.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Temp Mail AI is not liable for indirect, incidental,
        special, consequential, or punitive damages.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these Terms periodically. Continued use of the Service after changes constitutes
        acceptance of the updated Terms.
      </p>
    </LegalPageLayout>
  );
};

export default Terms;
