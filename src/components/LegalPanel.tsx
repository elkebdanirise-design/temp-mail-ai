import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LegalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'faq' | 'contact' | null;
}

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    content: `
## Privacy Policy for Aura-Mail

**Last updated: January 2026**

### 1. Information We Collect
Aura-Mail is designed with privacy as our core principle. We collect minimal information:
- **Temporary Email Data**: Messages received are stored temporarily and automatically deleted after 24 hours.
- **No Personal Information**: We do not require registration, names, or permanent email addresses.

### 2. How We Use Information
- To provide temporary email functionality
- To display messages in your inbox
- To improve service performance

### 3. Data Retention
- All emails are automatically deleted after 24 hours
- No message content is stored permanently
- Session data is cleared when you close your browser

### 4. Third-Party Services
We use secure infrastructure to process emails. No data is sold or shared with advertisers.

### 5. Your Rights
You can delete your temporary mailbox at any time. No action needed for data deletion—it happens automatically.

### 6. Contact
For privacy inquiries, please contact us through our website.
    `
  },
  terms: {
    title: 'Terms of Service',
    content: `
## Terms of Service for Aura-Mail

**Last updated: January 2026**

### 1. Acceptance of Terms
By using Aura-Mail, you agree to these terms. If you disagree, please do not use our service.

### 2. Service Description
Aura-Mail provides temporary, disposable email addresses for privacy protection. Emails are automatically deleted after 24 hours.

### 3. Acceptable Use
You agree NOT to:
- Use the service for illegal activities
- Send spam or malicious content
- Attempt to access others' temporary inboxes
- Use the service to harass or harm others

### 4. No Warranty
The service is provided "as is" without warranties. We do not guarantee uptime or message delivery.

### 5. Limitation of Liability
Aura-Mail is not liable for any damages arising from use of this service.

### 6. Service Modifications
We reserve the right to modify or discontinue the service at any time.

### 7. Governing Law
These terms are governed by applicable laws. Disputes will be resolved through appropriate legal channels.
    `
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: `
## Frequently Asked Questions

### What is Aura-Mail?
Aura-Mail is a free, AI-powered disposable email service that lets you create temporary email addresses instantly for privacy protection.

### How long do emails last?
All emails are automatically deleted after 24 hours. Your temporary mailbox is also cleared when you generate a new address.

### Is it really free?
Yes! The basic service is completely free. We offer Pro features for users who need advanced functionality.

### Can I use a custom username?
Yes! Click the "Custom ID" button to enter your preferred username before the @ symbol.

### How do I change domains?
Use the domain dropdown next to your email address to select from available domains.

### Is my data secure?
Absolutely. We use encrypted connections, no tracking, and automatic data deletion. Your privacy is our priority.

### Can I use this for permanent accounts?
No. Aura-Mail is designed for temporary use—signups, trials, and spam protection. For permanent accounts, use a regular email provider.

### Why did my email disappear?
Emails are automatically deleted after 24 hours. If you need to keep a message, copy its content before it expires.

### How do I get Pro features?
Click the "Get Pro Systems" button to unlock premium features including ad-free experience and priority support.
    `
  },
  contact: {
    title: 'Contact Us',
    content: `
## Contact Aura-Mail

### General Inquiries
For general questions about our service, please visit our FAQ section first.

### Technical Support
If you're experiencing technical issues:
1. Try refreshing the page
2. Clear your browser cache
3. Generate a new email address

### Business Inquiries
For business partnerships, API access, or enterprise solutions, please reach out through our official channels.

### Feedback
We love hearing from our users! Your feedback helps us improve Aura-Mail.

### Report Abuse
If you notice any misuse of our service, please report it immediately.

---

**Response Time**: We aim to respond within 24-48 hours.

**Note**: Due to the anonymous nature of our service, we cannot recover deleted emails or access past mailboxes.
    `
  }
};

export const LegalPanel = ({ isOpen, onClose, type }: LegalPanelProps) => {
  const content = type ? legalContent[type] : null;

  return (
    <AnimatePresence>
      {isOpen && content && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-background border-l border-border z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold">{content.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-secondary"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose prose-invert prose-sm max-w-none">
                  {content.content.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-lg font-bold mt-6 mb-3 text-foreground">{line.replace('## ', '')}</h2>;
                    }
                    if (line.startsWith('### ')) {
                      return <h3 key={index} className="text-base font-semibold mt-4 mb-2 text-foreground">{line.replace('### ', '')}</h3>;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={index} className="font-semibold text-muted-foreground">{line.replace(/\*\*/g, '')}</p>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={index} className="text-muted-foreground ml-4">{line.replace('- ', '')}</li>;
                    }
                    if (line.match(/^\d+\./)) {
                      return <li key={index} className="text-muted-foreground ml-4 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
                    }
                    if (line.startsWith('---')) {
                      return <hr key={index} className="my-4 border-border" />;
                    }
                    if (line.trim()) {
                      return <p key={index} className="text-muted-foreground mb-2">{line}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
