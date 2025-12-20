import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, CheckCircle, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LegalPanel } from './LegalPanel';

type LegalType = 'privacy' | 'terms' | 'faq' | 'contact' | null;

export const Footer = () => {
  const [legalPanel, setLegalPanel] = useState<LegalType>(null);

  const handleLinkClick = (type: LegalType) => (e: React.MouseEvent) => {
    e.preventDefault();
    setLegalPanel(type);
  };

  return (
    <>
      <footer className="border-t border-border py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            {/* Pro Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden mesh-gradient-btn-intense hover:scale-105 transition-transform text-white font-semibold shadow-lg shadow-cyan-500/30"
              >
                <a href="#pro-systems" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Upgrade to Pro Systems</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-400 font-medium">Status: All Systems Operational</span>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm"
            >
              <button 
                onClick={handleLinkClick('terms')}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
              >
                Terms of Service
              </button>
              <button 
                onClick={handleLinkClick('privacy')}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
              >
                Privacy Policy
              </button>
              <button 
                onClick={handleLinkClick('contact')}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
              >
                Contact
              </button>
              <button 
                onClick={handleLinkClick('faq')}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
              >
                FAQ
              </button>
              <a 
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all flex items-center gap-1"
              >
                <Map className="w-3 h-3" />
                Sitemap
              </a>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-center"
            >
              <p className="text-xs text-muted-foreground font-medium tracking-wide">
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