const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
};

// Static pages for the sitemap
const staticPages = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/blog', changefreq: 'daily', priority: '0.9' },
  { loc: '/auth', changefreq: 'monthly', priority: '0.5' },
  { loc: '/profile', changefreq: 'monthly', priority: '0.4' },
  { loc: '/terms', changefreq: 'monthly', priority: '0.3' },
  { loc: '/privacy', changefreq: 'monthly', priority: '0.3' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.4' },
  { loc: '/faq', changefreq: 'weekly', priority: '0.6' },
  { loc: '/sitemap', changefreq: 'monthly', priority: '0.2' },
];

// Blog post slugs - these would ideally come from database
const blogSlugs = [
  'why-you-need-temp-mail-for-social-media',
  'how-disposable-email-protects-your-privacy',
  'rise-of-ai-powered-email-security',
  'tempmail-ai-v2-major-update-announcement',
  'understanding-zero-knowledge-encryption',
  'global-privacy-laws-2026-overview',
  'quantum-computing-threat-to-encryption',
  'recognizing-phishing-attempts-2026',
  'email-forwarding-vs-temp-mail',
  'protecting-children-online-temp-mail',
  'temp-mail-for-developers',
  'future-of-digital-identity',
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const baseUrl = 'https://temp-mail-ai.vercel.app';
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Add blog posts
    for (const slug of blogSlugs) {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    xml += `
</urlset>`;

    console.log('Generated sitemap with', staticPages.length + blogSlugs.length, 'URLs');

    return new Response(xml, {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
