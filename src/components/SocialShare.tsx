import { useCallback } from 'react';
import { Twitter, Linkedin, Facebook, Link2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareProps {
  title: string;
  url: string;
}

export const SocialShare = ({ title, url }: SocialShareProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareButtons = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hsl(200 10% 90%)',
      hoverGlow: 'hsl(200 10% 90% / 0.5)',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hsl(210 80% 55%)',
      hoverGlow: 'hsl(210 80% 55% / 0.5)',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hsl(145 70% 50%)',
      hoverGlow: 'hsl(145 70% 50% / 0.5)',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hsl(220 70% 55%)',
      hoverGlow: 'hsl(220 70% 55% / 0.5)',
    },
  ];

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  }, [url]);

  return (
    <div 
      className="flex flex-col items-center gap-4 py-6 px-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, hsl(220 30% 8% / 0.9), hsl(220 30% 5% / 0.95))',
        border: '1px solid hsl(var(--glass-border))',
      }}
    >
      <h4 
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: 'hsl(200 15% 60%)' }}
      >
        Share This Article
      </h4>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        {shareButtons.map(({ name, icon: Icon, href, color, hoverGlow }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl transition-all duration-300 hover:scale-110"
            style={{
              background: 'hsl(220 30% 12%)',
              border: '1px solid hsl(var(--glass-border))',
            }}
            aria-label={`Share on ${name}`}
          >
            <Icon
              className="w-5 h-5 transition-all duration-300"
              style={{ 
                color: color,
              }}
            />
            <style>{`
              a:hover .lucide-${name.toLowerCase().replace(/[^a-z]/g, '')} {
                filter: drop-shadow(0 0 8px ${hoverGlow}) drop-shadow(0 0 16px ${hoverGlow});
              }
            `}</style>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="group p-3 rounded-xl transition-all duration-300 hover:scale-110"
          style={{
            background: 'hsl(220 30% 12%)',
            border: '1px solid hsl(var(--glass-border))',
          }}
          aria-label="Copy link"
        >
          <Link2
            className="w-5 h-5 transition-all duration-300 group-hover:text-aurora-orange"
            style={{ 
              color: 'hsl(var(--aurora-orange))',
            }}
          />
        </button>
      </div>
    </div>
  );
};
