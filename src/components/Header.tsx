import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 md:py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-lg blur-lg animate-pulse" />
              <div className="relative p-2 rounded-lg bg-primary/10 border border-primary/30">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Aura<span className="neon-text">-Mail</span>
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">
                Disposable Email
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};
