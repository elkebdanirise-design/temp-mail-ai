import { motion } from 'framer-motion';

export const InboxSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass-panel p-4"
        >
          <div className="flex items-start gap-3">
            {/* Icon skeleton */}
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              {/* Sender skeleton */}
              <div className="h-4 w-2/3 rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
              
              {/* Subject skeleton */}
              <div className="h-3 w-full rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
              
              {/* Preview skeleton */}
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
                <div className="h-2 w-4/5 rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
              </div>

              {/* Time skeleton */}
              <div className="flex items-center justify-between mt-3">
                <div className="h-2 w-20 rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-shimmer" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
