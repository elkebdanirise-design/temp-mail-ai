import { LegalPageLayout } from '@/components/LegalPageLayout';

const Contact = () => {
  return (
    <LegalPageLayout
      title="Contact | Temp Mail AI"
      description="Contact Temp Mail AI for support, privacy questions, or business inquiries."
      canonicalPath="/contact"
      h1="Contact"
    >
      <h2>Support</h2>
      <p>
        If something feels off (missing emails, delayed delivery, or UI glitches), try refreshing the page,
        generating a new address, and checking again.
      </p>

      <h2>Business Inquiries</h2>
      <p>
        Partnerships, enterprise needs, or custom integrations: please reach out with a clear description of
        your use case.
      </p>

      <h2>Abuse Reports</h2>
      <p>
        If you believe the Service is being misused, report it with as much detail as possible.
      </p>

      <h2>Email</h2>
      <p>
        <strong>support@tempmail-ai.com</strong>
      </p>
      <p className="text-muted-foreground">
        (If you have a different preferred support email, tell me and I’ll update it across the site.)
      </p>
    </LegalPageLayout>
  );
};

export default Contact;
