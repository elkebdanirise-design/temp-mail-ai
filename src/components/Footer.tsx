import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, CheckCircle, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LegalPanel } from './LegalPanel';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

type LegalType = 'privacy' | 'terms' | 'faq' | 'contact' | null;

export const Footer = () => {
  const [legalPanel, setLegalPanel] = useState<LegalType>(null);
  const { handleAnchorClick } = useSmoothScroll();

  const handleLinkClick = (type: LegalType) => (e: React.MouseEvent) => {
    e.preventDefault();
    setLegalPanel(type);
  };

  return (
    <>
      <footer 
        className="py-12 mt-16"
        style={{ borderTop: '1px solid hsl(var(--aurora-magenta) / 0.1)' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            {/* Pro Button */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-105 transition-transform text-white font-semibold shadow-lg rounded-xl"
                style={{ boxShadow: '0 0 30px hsl(var(--aurora-magenta) / 0.2)' }}
              >
                <a 
                  href="#pro-systems" 
                  onClick={(e) => handleAnchorClick(e, '#pro-systems')}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Upgrade to Pro Systems</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4" style={{ color: 'hsl(150 70% 50%)' }} />
              <span className="font-medium" style={{ color: 'hsl(150 65% 50%)' }}>Status: All Systems Operational</span>
            </motion.div>

            {/* Links - Geist typography, consistent alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              {[
                { label: 'Blog', href: '#blog-section', isAnchor: true },
                { label: 'Terms of Service', type: 'terms' as LegalType },
                { label: 'Privacy Policy', type: 'privacy' as LegalType },
                { label: 'Contact', type: 'contact' as LegalType },
                { label: 'FAQ', type: 'faq' as LegalType },
              ].map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e as React.MouseEvent<HTMLAnchorElement>, link.href!)}
                    className="relative transition-colors"
                    style={{ color: 'hsl(200 12% 50%)' }}
                  >
                    <span className="hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-aurora-magenta hover:after:w-full after:transition-all">
                      {link.label}
                    </span>
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={handleLinkClick(link.type!)}
                    className="relative transition-colors"
                    style={{ color: 'hsl(200 12% 50%)' }}
                  >
                    <span className="hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-aurora-magenta hover:after:w-full after:transition-all">
                      {link.label}
                    </span>
                  </button>
                )
              ))}
              <a 
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors"
                style={{ color: 'hsl(200 12% 50%)' }}
              >
                <span className="hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-aurora-magenta hover:after:w-full after:transition-all flex items-center gap-1">
                  <Map className="w-3 h-3" />
                  Sitemap
                </span>
              </a>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-center"
            >
              <p 
                className="text-xs font-medium"
                style={{ 
                  color: 'hsl(200 12% 45%)',
                  letterSpacing: '0.02em',
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                © 2026 Temp Mail Aura. All rights reserved. The fastest AI-powered disposable email service.
              </p>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Legal Panel */}
      <LegalPanel 
        isOpen={legalPanel !== null}
        onClose={() => setLegalPanel(null)}
        type={legalPanel}
      />
    </>
  );
};
