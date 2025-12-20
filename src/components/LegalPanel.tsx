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
## Privacy Policy for Temp Mail AI

**Last updated: January 2026**

### 1. Information We Collect
Temp Mail AI is designed with privacy as our core principle. We collect minimal information:
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
## Terms of Service for Temp Mail AI

**Last updated: January 2026**

### 1. Acceptance of Terms
By using Temp Mail AI, you agree to these terms. If you disagree, please do not use our service.

### 2. Service Description
Temp Mail AI provides temporary, disposable email addresses for privacy protection. Emails are automatically deleted after 24 hours.

### 3. Acceptable Use
You agree NOT to:
- Use the service for illegal activities
- Send spam or malicious content
- Attempt to access others' temporary inboxes
- Use the service to harass or harm others

### 4. No Warranty
The service is provided "as is" without warranties. We do not guarantee uptime or message delivery.

### 5. Limitation of Liability
Temp Mail AI is not liable for any damages arising from use of this service.

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

### What is Temp Mail AI?
Temp Mail AI is a free, AI-powered disposable email service that lets you create temporary email addresses instantly for privacy protection.

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
No. Temp Mail AI is designed for temporary use—signups, trials, and spam protection. For permanent accounts, use a regular email provider.

### Why did my email disappear?
Emails are automatically deleted after 24 hours. If you need to keep a message, copy its content before it expires.

### How do I get Pro features?
Click the "Get Pro Systems" button to unlock premium features including ad-free experience and priority support.
    `
  },
  contact: {
    title: 'Contact Us',
    content: `
## Contact Temp Mail AI

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
We love hearing from our users! Your feedback helps us improve Temp Mail AI.

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
          {/* Backdrop - Obsidian Glass Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 0% / 0.85), hsl(220 30% 5% / 0.9))',
              backdropFilter: 'blur(12px)',
            }}
          />
          
          {/* Modal - Centered Obsidian Glass Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] sm:w-[80vw] md:w-[70vw] lg:w-[55vw] max-w-2xl rounded-2xl overflow-hidden"
            style={{
              maxHeight: '80vh',
              background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 30% 6%))',
              border: '1px solid hsl(var(--aurora-magenta) / 0.2)',
              boxShadow: '0 30px 60px -15px hsl(0 0% 0% / 0.7), 0 0 80px hsl(var(--aurora-magenta) / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
            }}
          >
            <div className="flex flex-col h-full" style={{ maxHeight: '80vh' }}>
              {/* Header - Frosted Glass */}
              <div 
                className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                style={{
                  borderBottom: '1px solid hsl(var(--aurora-magenta) / 0.15)',
                  background: 'hsl(220 25% 8% / 0.9)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <h2 
                  className="text-lg sm:text-xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {content.title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-secondary/50 rounded-full transition-all duration-200"
                  style={{ color: 'hsl(var(--aurora-orange))' }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Content - Scrollable */}
              <div 
                className="flex-1 overflow-y-auto p-6 sm:p-8"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--aurora-magenta) / 0.3) transparent' }}
              >
                <div className="prose prose-invert prose-sm max-w-none">
                  {content.content.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return (
                        <h2 
                          key={index} 
                          className="text-lg font-bold mt-6 mb-3"
                          style={{ color: 'hsl(var(--aurora-orange))' }}
                        >
                          {line.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (line.startsWith('### ')) {
                      return (
                        <h3 
                          key={index} 
                          className="text-base font-semibold mt-5 mb-2 text-foreground"
                        >
                          {line.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p 
                          key={index} 
                          className="font-semibold"
                          style={{ color: 'hsl(var(--aurora-magenta))' }}
                        >
                          {line.replace(/\*\*/g, '')}
                        </p>
                      );
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li 
                          key={index} 
                          className="text-muted-foreground ml-4 mb-1 list-disc"
                          style={{ color: 'hsl(var(--foreground) / 0.75)' }}
                        >
                          {line.replace('- ', '')}
                        </li>
                      );
                    }
                    if (line.match(/^\d+\./)) {
                      return (
                        <li 
                          key={index} 
                          className="ml-4 mb-1 list-decimal"
                          style={{ color: 'hsl(var(--foreground) / 0.75)' }}
                        >
                          {line.replace(/^\d+\.\s*/, '')}
                        </li>
                      );
                    }
                    if (line.startsWith('---')) {
                      return (
                        <hr 
                          key={index} 
                          className="my-6"
                          style={{ borderColor: 'hsl(var(--aurora-magenta) / 0.2)' }}
                        />
                      );
                    }
                    if (line.trim()) {
                      return (
                        <p 
                          key={index} 
                          className="mb-3 leading-relaxed"
                          style={{ color: 'hsl(var(--foreground) / 0.7)' }}
                        >
                          {line}
                        </p>
                      );
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
