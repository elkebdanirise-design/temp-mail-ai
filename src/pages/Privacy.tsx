import { LegalPageLayout } from '@/components/LegalPageLayout';

const Privacy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy | Temp Mail AI"
      description="Privacy policy for Temp Mail AI. Learn what data is processed, retention periods, and how we protect your privacy."
      canonicalPath="/privacy"
      h1="Privacy Policy"
    >
      <p><strong>Last updated:</strong> January 2026</p>

      <h2>1. Overview</h2>
      <p>
        Temp Mail AI is built to minimize data collection. The Service is designed for temporary inbox use
        and privacy protection.
      </p>

      <h2>2. Data We Process</h2>
      <ul>
        <li><strong>Temporary mailbox data</strong> (address and received messages) to display your inbox</li>
        <li><strong>Technical data</strong> (basic logs, device/browser signals) to keep the Service stable and secure</li>
      </ul>

      <h2>3. How We Use Data</h2>
      <ul>
        <li>Provide inbox functionality and message viewing</li>
        <li>Detect abuse, protect reliability, and prevent spam/malicious activity</li>
        <li>Improve performance and user experience</li>
      </ul>

      <h2>4. Retention</h2>
      <p>
        Messages are intended to be temporary and may be deleted automatically. Retention windows can
        change to protect performance and security.
      </p>

      <h2>5. Sharing</h2>
      <p>
        We do not sell message content. We may share limited information when required by law or to
        protect the Service from abuse.
      </p>

      <h2>6. Your Choices</h2>
      <ul>
        <li>Generate a new address at any time</li>
        <li>Delete messages from the inbox interface</li>
        <li>Stop using the Service to end processing</li>
      </ul>

      <h2>7. Contact</h2>
      <p>
        For privacy questions, use the Contact page.
      </p>
    </LegalPageLayout>
  );
};

export default Privacy;
