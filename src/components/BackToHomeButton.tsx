import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BackToHomeButton = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-6 z-50"
    >
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(145deg, hsl(220 30% 10% / 0.95), hsl(220 30% 6% / 0.98))',
          border: '1px solid hsl(var(--glass-border))',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px hsl(0 0% 0% / 0.3)',
        }}
        aria-label="Back to Home"
      >
        <ArrowLeft
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          style={{ color: 'hsl(var(--aurora-orange))' }}
        />
        <span
          style={{
            background: 'linear-gradient(135deg, hsl(0 0% 85%), hsl(0 0% 95%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Back to Home
        </span>
      </button>
    </motion.div>
  );
};
