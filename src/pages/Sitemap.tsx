import { Link } from 'react-router-dom';
import { LegalPageLayout } from '@/components/LegalPageLayout';

const Sitemap = () => {
  return (
    <LegalPageLayout
      title="Sitemap | Temp Mail AI"
      description="Sitemap for Temp Mail AI: quickly navigate to core pages like pricing, blog, terms, and privacy."
      canonicalPath="/sitemap"
      h1="Sitemap"
    >
      <h2>Pages</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/terms">Terms of Service</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>

      <h2>On the Home page</h2>
      <ul>
        <li><a href="/#pricing">Pricing</a></li>
        <li><a href="/#blog-section">Latest Blog Posts</a></li>
      </ul>
    </LegalPageLayout>
  );
};

export default Sitemap;
