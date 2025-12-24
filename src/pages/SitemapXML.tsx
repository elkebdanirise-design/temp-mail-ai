import { useEffect } from 'react';

const SitemapXML = () => {
  useEffect(() => {
    // Redirect to the edge function that generates the XML sitemap
    window.location.href = 'https://htkasnnunfxtuvrzjyyh.supabase.co/functions/v1/sitemap-xml';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecting to sitemap...</p>
    </div>
  );
};

export default SitemapXML;
