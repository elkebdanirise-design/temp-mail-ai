import { motion } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Pro Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-primary via-[hsl(var(--neon-glow-secondary))] to-primary bg-[length:200%_100%] animate-shimmer hover:scale-105 transition-transform"
            >
              <a href="#" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Upgrade to Pro Systems</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm"
          >
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              FAQ
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--neon-glow-secondary))]" />
              <span className="font-semibold neon-text">Aura-Mail</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 Aura-Mail. All rights reserved. The fastest disposable email service.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
