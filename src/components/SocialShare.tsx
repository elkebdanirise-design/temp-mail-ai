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

  const shareConfigs = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      getUrl: () => `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hsl(200 10% 90%)',
      hoverGlow: 'hsl(200 10% 90% / 0.5)',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      getUrl: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hsl(210 80% 55%)',
      hoverGlow: 'hsl(210 80% 55% / 0.5)',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      getUrl: () => `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hsl(145 70% 50%)',
      hoverGlow: 'hsl(145 70% 50% / 0.5)',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      color: 'hsl(220 70% 55%)',
      hoverGlow: 'hsl(220 70% 55% / 0.5)',
    },
  ];

  const openSharePopup = useCallback((url: string, name: string) => {
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      url,
      `share-${name}`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );
  }, []);

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
        {shareConfigs.map(({ name, icon: Icon, getUrl, color, hoverGlow }) => (
          <button
            key={name}
            onClick={() => openSharePopup(getUrl(), name)}
            className="group p-3 rounded-xl transition-all duration-300 hover:scale-110"
            style={{
              background: 'hsl(220 30% 12%)',
              border: '1px solid hsl(var(--glass-border))',
            }}
            aria-label={`Share on ${name}`}
          >
            <Icon
              className="w-5 h-5 transition-all duration-300 group-hover:drop-shadow-lg"
              style={{ 
                color: color,
                filter: 'none',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.filter = `drop-shadow(0 0 8px ${hoverGlow}) drop-shadow(0 0 16px ${hoverGlow})`;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.filter = 'none';
              }}
            />
          </button>
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
            className="w-5 h-5 transition-all duration-300 group-hover:drop-shadow-lg"
            style={{ 
              color: 'hsl(var(--aurora-orange))',
            }}
          />
        </button>
      </div>
    </div>
  );
};
