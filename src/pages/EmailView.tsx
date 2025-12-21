import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Clock, Trash2, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ParticleField } from '@/components/ParticleField';
import { ShootingStars } from '@/components/ShootingStars';
import { AuraLogo } from '@/components/AuraLogo';

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
  html?: string[];
  createdAt: string;
}

const API_BASE = 'https://api.mail.tm';

const EmailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHtml, setShowHtml] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const token = sessionStorage.getItem('aura_token');
      if (!token || !id) {
        setError('Session expired. Please return to inbox.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/messages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }

        const data = await response.json();
        setMessage(data);
      } catch (err) {
        console.error('Error fetching message:', err);
        setError('Failed to load email. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const handleDelete = async () => {
    const token = sessionStorage.getItem('aura_token');
    if (!token || !id) return;

    try {
      await fetch(`${API_BASE}/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{message?.subject || 'Email'} - Temp Mail AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Simplified cosmic background for email view - no large logo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(220 30% 4%) 50%, hsl(0 0% 3%) 100%)',
          }}
        />
        {/* Subtle aurora glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at center, hsl(var(--aurora-orange) / 0.08) 0%, hsl(var(--aurora-magenta) / 0.04) 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>
      <ParticleField />
      <ShootingStars />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header
          className="sticky top-0 z-50 px-4 py-3 sm:px-6"
          style={{
            background: 'hsl(220 30% 5% / 0.9)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid hsl(var(--glass-border))',
          }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2 rounded-full px-4 transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-magenta) / 0.1))',
                  border: '1px solid hsl(var(--aurora-orange) / 0.3)',
                  color: 'hsl(var(--aurora-orange))',
                  boxShadow: '0 0 20px hsl(var(--aurora-orange) / 0.2)',
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Inbox</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <AuraLogo />
              <span
                className="text-lg font-bold"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Temp Mail AI
              </span>
            </div>

            {message && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="hover:bg-destructive/10 hover:text-destructive rounded-full"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl"
          >
            {isLoading ? (
              <div
                className="glass-panel border-trace rounded-2xl p-8 flex items-center justify-center"
                style={{ minHeight: '400px' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 rounded-full"
                  style={{
                    border: '3px solid hsl(var(--aurora-orange) / 0.2)',
                    borderTopColor: 'hsl(var(--aurora-orange))',
                  }}
                />
              </div>
            ) : error ? (
              <div
                className="glass-panel border-trace rounded-2xl p-8 text-center"
                style={{ minHeight: '300px' }}
              >
                <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-6">{error}</p>
                <Button
                  onClick={handleBack}
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-magenta)))',
                  }}
                >
                  Return to Inbox
                </Button>
              </div>
            ) : message ? (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 30% 8%), hsl(220 30% 5%))',
                  border: '1px solid hsl(var(--glass-border))',
                  boxShadow: '0 25px 50px -12px hsl(0 0% 0% / 0.6), 0 0 80px hsl(var(--aurora-orange) / 0.1)',
                }}
              >
                {/* Subject Header */}
                <div
                  className="px-4 py-4 sm:px-8 sm:py-6"
                  style={{ borderBottom: '1px solid hsl(var(--glass-border))' }}
                >
                  <h1
                    className="text-xl sm:text-2xl md:text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.8))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {message.subject || '(No subject)'}
                  </h1>
                </div>

                {/* Sender Info */}
                <div
                  className="px-4 py-4 sm:px-8 sm:py-5"
                  style={{ borderBottom: '1px solid hsl(var(--glass-border))' }}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className="flex-shrink-0 p-3 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-magenta) / 0.1))',
                        border: '1px solid hsl(var(--aurora-orange) / 0.25)',
                      }}
                    >
                      <User className="w-6 h-6" style={{ color: 'hsl(var(--aurora-orange))' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg text-foreground truncate">
                        {message.from.name || message.from.address}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.from.address}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        To: {message.to.map(t => t.address).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="hidden md:inline">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </span>
                      <span className="md:hidden">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }).replace('about ', '')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Content */}
                <ScrollArea className="max-h-[50vh] sm:max-h-[60vh]">
                  <div className="p-4 sm:p-8">
                    {message.html && message.html.length > 0 && showHtml ? (
                      <div
                        className="prose prose-invert prose-sm sm:prose-base max-w-none 
                          prose-headings:text-foreground prose-p:text-foreground/85 
                          prose-a:text-[hsl(var(--aurora-orange))] prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-foreground prose-img:rounded-lg prose-img:max-w-full"
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                        dangerouslySetInnerHTML={{ __html: message.html.join('') }}
                      />
                    ) : (
                      <pre
                        className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed"
                        style={{
                          color: 'hsl(var(--foreground) / 0.9)',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        {message.text || 'No content available'}
                      </pre>
                    )}
                  </div>
                </ScrollArea>

                {/* Footer Toggle */}
                {message.html && message.html.length > 0 && (
                  <div
                    className="px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-between"
                    style={{
                      borderTop: '1px solid hsl(var(--glass-border))',
                      background: 'hsl(220 30% 5% / 0.8)',
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHtml(!showHtml)}
                      className="text-xs rounded-full px-4"
                      style={{
                        borderColor: 'hsl(var(--aurora-orange) / 0.3)',
                        color: 'hsl(var(--aurora-orange))',
                      }}
                    >
                      {showHtml ? 'View Plain Text' : 'View HTML'}
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default EmailView;
