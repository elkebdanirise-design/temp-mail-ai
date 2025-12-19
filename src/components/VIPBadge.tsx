import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

export const VIPBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30"
    >
      <Crown className="w-3 h-3 text-amber-400" />
      <span className="text-xs font-semibold text-amber-400">VIP GOLD</span>
    </motion.div>
  );
};
