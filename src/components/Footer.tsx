import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Users, CheckCircle, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export const Footer = () => {
  const [liveUsers, setLiveUsers] = useState(1247);

  // Simulate live users fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Live Users Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse" />
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-400">
              {liveUsers.toLocaleString()} users online now
            </span>
          </motion.div>

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
              className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 bg-[length:200%_100%] animate-gradient-shift hover:scale-105 transition-transform text-white font-semibold shadow-lg shadow-cyan-500/25"
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
            <a 
              href="#terms" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              Terms of Service
            </a>
            <a 
              href="#privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              Privacy Policy
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              Contact
            </a>
            <a 
              href="#faq" 
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
            >
              FAQ
            </a>
            <a 
              href="#sitemap" 
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
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500" />
              <span className="font-semibold neon-text">Aura-Mail</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 Aura-Mail. All rights reserved. The fastest AI-powered disposable email service.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
