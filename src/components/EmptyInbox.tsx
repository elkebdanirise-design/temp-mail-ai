import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

export const EmptyInbox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-12 flex flex-col items-center justify-center text-center min-h-[300px]"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative p-4 rounded-2xl bg-secondary/50 border border-border">
          <Inbox className="w-12 h-12 text-primary" />
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold mb-2">Waiting for messages...</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Your inbox is empty. Send an email to your temporary address and it will appear here automatically.
      </p>

      <motion.div
        className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span>Checking for new messages...</span>
      </motion.div>
    </motion.div>
  );
};
