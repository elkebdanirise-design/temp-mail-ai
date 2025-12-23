import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from '@/components/AuraLogo';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, isLoading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
        setIsGoogleLoading(false);
      }
      // Don't set loading to false on success - OAuth will redirect
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)'
        }}
      >
        <motion.div
          className="w-8 h-8 border-2 rounded-full"
          style={{ 
            borderColor: 'hsl(var(--aurora-orange) / 0.3)',
            borderTopColor: 'hsl(var(--aurora-orange))'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)'
        }}
      >
        {/* Background glow effects - Amber theme */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(35 100% 50% / 0.1) 0%, transparent 50%)'
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 100%, hsl(25 90% 45% / 0.06) 0%, transparent 50%)'
          }}
        />

        {/* Floating particles - Amber colored */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsl(${30 + Math.random() * 20} 100% ${50 + Math.random() * 20}% / 0.5)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Auth Card - Slide up animation */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.3 }
          }}
          className="relative w-full max-w-md"
        >
          {/* Animated amber glow border */}
          <motion.div 
            className="absolute -inset-[2px] rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, hsl(35 100% 55% / 0.5), hsl(25 90% 45% / 0.3), hsl(40 100% 60% / 0.4), hsl(35 100% 55% / 0.5))',
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Outer glow effect */}
          <div 
            className="absolute -inset-4 rounded-[2rem] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(35 100% 50% / 0.15) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          
          {/* Card content - Obsidian Glass */}
          <div 
            className="relative rounded-3xl p-8 sm:p-10"
            style={{
              background: 'linear-gradient(145deg, hsl(0 0% 8% / 0.95) 0%, hsl(0 0% 4% / 0.98) 100%)',
              backdropFilter: 'blur(60px)',
              boxShadow: '0 30px 100px hsl(0 0% 0% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.08), inset 0 -1px 0 hsl(0 0% 0% / 0.3)',
              border: '1px solid hsl(0 0% 100% / 0.06)'
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full transition-all"
              style={{
                background: 'hsl(0 0% 100% / 0.05)',
                border: '1px solid hsl(0 0% 100% / 0.1)',
              }}
              whileHover={{ 
                scale: 1.1, 
                background: 'hsl(0 0% 100% / 0.1)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" style={{ color: 'hsl(0 0% 60%)' }} />
            </motion.button>

            {/* Logo and Title */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 20,
                  delay: 0.1 
                }}
              >
                <AuraLogo className="w-20 h-20 mb-5" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-center leading-tight"
                style={{
                  background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 75%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Join the Elite
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm mt-2 text-center max-w-[260px]"
                style={{ color: 'hsl(0 0% 50%)' }}
              >
                Sign in to Unlock AI Privacy
              </motion.p>

              {/* Premium badge with shield */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
                className="flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, hsl(35 100% 50% / 0.12) 0%, hsl(25 90% 45% / 0.08) 100%)',
                  border: '1px solid hsl(35 100% 55% / 0.25)',
                  boxShadow: '0 4px 20px hsl(35 100% 50% / 0.1)'
                }}
              >
                <Shield className="w-4 h-4" style={{ color: 'hsl(35 100% 60%)' }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: 'hsl(35 100% 65%)' }}>
                  SECURE • PRIVATE • INSTANT
                </span>
                <Sparkles className="w-4 h-4" style={{ color: 'hsl(35 100% 60%)' }} />
              </motion.div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-4 rounded-xl text-sm text-center mb-6"
                  style={{
                    background: 'hsl(0 70% 50% / 0.12)',
                    color: 'hsl(0 70% 70%)',
                    border: '1px solid hsl(0 70% 50% / 0.2)'
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In Button - Premium Large Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-16 rounded-2xl font-semibold relative overflow-hidden group border-0 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.12) 0%, hsl(0 0% 100% / 0.06) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.15), 0 8px 32px hsl(0 0% 0% / 0.4)',
                    border: '1px solid hsl(0 0% 100% / 0.12)'
                  }}
                >
                  {/* Hover glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: 'linear-gradient(135deg, hsl(35 100% 50% / 0.15) 0%, hsl(25 90% 45% / 0.1) 50%, transparent 100%)',
                      boxShadow: 'inset 0 0 30px hsl(35 100% 50% / 0.1)'
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {isGoogleLoading ? (
                      <motion.div
                        className="w-6 h-6 border-2 rounded-full"
                        style={{ 
                          borderColor: 'hsl(0 0% 100% / 0.2)',
                          borderTopColor: 'hsl(35 100% 60%)'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-base font-semibold" style={{ color: 'hsl(0 0% 95%)' }}>
                          Sign in with Google
                        </span>
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Terms notice */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xs text-center leading-relaxed"
              style={{ color: 'hsl(0 0% 40%)' }}
            >
              By continuing, you agree to our{' '}
              <Link to="/terms" className="underline hover:no-underline transition-colors" style={{ color: 'hsl(0 0% 55%)' }}>Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="underline hover:no-underline transition-colors" style={{ color: 'hsl(0 0% 55%)' }}>Privacy Policy</Link>
            </motion.p>

            {/* Back to Home - Using Link component */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-5 text-center"
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-xs transition-all hover:gap-3 group"
                style={{ color: 'hsl(0 0% 45%)' }}
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span className="group-hover:underline">Back to Temp Mail AI</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;
