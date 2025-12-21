import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { LegalPageLayout } from '@/components/LegalPageLayout';
import { Button } from '@/components/ui/button';

interface MessageDetail {
  id: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  text?: string;
  html?: string[] | string;
  createdAt: string;
}

const API_BASE = 'https://api.mail.tm';

const normalizeHtml = (html: MessageDetail['html']) => {
  if (!html) return null;
  if (Array.isArray(html)) return html.join('');
  if (typeof html === 'string') return html;
  return null;
};

const EmailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [message, setMessage] = useState<MessageDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMessage = async () => {
      const token = sessionStorage.getItem('aura_token');

      if (!id) {
        if (!isMounted) return;
        setError('Message not found.');
        setIsLoading(false);
        return;
      }

      if (!token) {
        if (!isMounted) return;
        setError('Session expired. Please return to inbox.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/messages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch message');

        const data = (await response.json()) as MessageDetail;
        if (!isMounted) return;
        setMessage(data);
      } catch {
        if (!isMounted) return;
        setError('Failed to load this email. Please try again from the inbox.');
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    fetchMessage();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const html = useMemo(() => normalizeHtml(message?.html), [message?.html]);

  const title = message?.subject ? `${message.subject} | Temp Mail AI` : 'Email Message | Temp Mail AI';
  const h1 = message?.subject || 'Email Message';
  const description = 'Read your temporary email message securely in Temp Mail AI.';

  return (
    <LegalPageLayout
      title={title}
      description={description}
      canonicalPath={id ? `/message/${id}` : '/message'}
      h1={h1}
      noIndex
      showBrandHeader
    >
      {isLoading ? (
        <div className="not-prose">
          <div className="text-sm text-muted-foreground">Loading message…</div>
        </div>
      ) : error ? (
        <div className="not-prose">
          <p className="text-sm text-muted-foreground">{error}</p>
          <div className="mt-4">
            <Button onClick={() => navigate('/')} className="mesh-gradient-btn-intense">
              Back to Inbox
            </Button>
          </div>
        </div>
      ) : message ? (
        <div className="not-prose">
          <div className="mt-1 grid gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">From: </span>
              <span className="text-foreground font-medium">
                {message.from.name || message.from.address}
              </span>
              <span className="text-muted-foreground"> · </span>
              <span className="text-muted-foreground">{message.from.address}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Date: </span>
              <span className="text-foreground/90">
                {format(new Date(message.createdAt), 'PPpp')}
              </span>
            </div>
          </div>

          <div className="mt-6">
            {html ? (
              <div
                className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-[hsl(var(--aurora-orange))]"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre
                className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed"
                style={{ color: 'hsl(var(--foreground) / 0.9)', wordBreak: 'break-word', overflowWrap: 'break-word' }}
              >
                {message.text || 'No content available'}
              </pre>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate('/')} className="mesh-gradient-btn-intense">
              Back to Home
            </Button>
          </div>
        </div>
      ) : (
        <div className="not-prose">
          <p className="text-sm text-muted-foreground">Message not found.</p>
          <div className="mt-4">
            <Button onClick={() => navigate('/')} className="mesh-gradient-btn-intense">
              Back to Inbox
            </Button>
          </div>
        </div>
      )}
    </LegalPageLayout>
  );
};

export default EmailView;

