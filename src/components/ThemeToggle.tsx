import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    // Add transitioning class for smooth animation
    document.documentElement.classList.add('transitioning');
    setTheme(isDark ? 'light' : 'dark');
    
    // Remove class after transition
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 400);
  };

  if (!mounted) {
    return (
      <div 
        className="p-2.5 rounded-xl"
        style={{
          background: 'linear-gradient(145deg, hsl(220 30% 10% / 0.8), hsl(220 30% 6% / 0.9))',
          border: '1px solid hsl(var(--glass-border))',
          width: 40,
          height: 40,
        }}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group"
      style={{
        background: 'linear-gradient(145deg, hsl(220 30% 10% / 0.8), hsl(220 30% 6% / 0.9))',
        border: '1px solid hsl(var(--glass-border))',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: isDark 
            ? 'hsl(45 90% 50% / 0.2)' 
            : 'hsl(220 80% 50% / 0.2)', 
          filter: 'blur(8px)' 
        }}
      />
      
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Sun className="relative w-5 h-5 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Moon className="relative w-5 h-5 text-blue-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
