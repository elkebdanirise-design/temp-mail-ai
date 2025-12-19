import { motion } from 'framer-motion';
import { ShieldCheck, Clock } from 'lucide-react';

export const TrustBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/20"
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-green-500/20">
          <ShieldCheck className="w-4 h-4 text-green-400" />
        </div>
        <span className="text-sm font-medium text-green-400">Encrypted & Private</span>
      </div>
      <span className="text-muted-foreground/50">•</span>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        <span>Emails are automatically deleted after 24 hours</span>
      </div>
    </motion.div>
  );
};
