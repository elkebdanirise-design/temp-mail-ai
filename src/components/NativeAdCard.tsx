import { motion } from 'framer-motion';
import { Megaphone, ExternalLink } from 'lucide-react';

export const NativeAdCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-4 rounded-xl border border-white/5 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
          <Megaphone className="w-4 h-4 text-indigo-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase tracking-wider">
              Sponsored
            </span>
          </div>
          
          <h4 className="font-medium text-sm mb-1 text-foreground/90">
            Upgrade to Pro Systems
          </h4>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            Get unlimited emails, custom domains, and priority support with our premium plan.
          </p>
          
          <a 
            href="#pro-systems"
            className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Learn more
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
