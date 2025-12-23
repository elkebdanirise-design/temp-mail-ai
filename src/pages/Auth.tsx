import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from '@/components/AuraLogo';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, signInWithGoogle, signInWithApple, signInWithMicrosoft } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithApple();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign in with Apple. Please try again.');
    } finally {
      setIsAppleLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setIsMicrosoftLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithMicrosoft();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign in with Microsoft. Please try again.');
    } finally {
      setIsMicrosoftLoading(false);
    }
  };

  const isAnyLoading = isGoogleLoading || isAppleLoading || isMicrosoftLoading;

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)'
      }}
    >
      {/* Background glow effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--aurora-orange) / 0.08) 0%, transparent 50%)'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, hsl(var(--aurora-sunset) / 0.05) 0%, transparent 50%)'
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? 'hsl(var(--aurora-orange) / 0.4)' : 'hsl(var(--aurora-sunset) / 0.3)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md"
      >
        {/* Card glow border */}
        <div 
          className="absolute -inset-px rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.3), hsl(var(--aurora-sunset) / 0.2), hsl(var(--aurora-orange) / 0.1))',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Card content - Glassmorphism */}
        <div 
          className="relative rounded-3xl p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, hsl(0 0% 100% / 0.02) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 25px 80px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.1), inset 0 -1px 0 hsl(0 0% 0% / 0.2)',
            border: '1px solid hsl(0 0% 100% / 0.08)'
          }}
        >
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <AuraLogo className="w-16 h-16 mb-4" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-center" style={{
              background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 80%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome to Temp Mail AI
            </h1>
            
            <p className="text-sm mt-2 text-center" style={{ color: 'hsl(0 0% 50%)' }}>
              Sign in instantly with your favorite account
            </p>

            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15) 0%, hsl(var(--aurora-sunset) / 0.1) 100%)',
                border: '1px solid hsl(var(--aurora-orange) / 0.2)'
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'hsl(var(--aurora-orange))' }} />
              <span className="text-xs font-medium" style={{ color: 'hsl(var(--aurora-orange))' }}>
                One-tap secure login
              </span>
            </motion.div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-xl text-sm text-center mb-6"
                style={{
                  background: 'hsl(0 70% 50% / 0.15)',
                  color: 'hsl(0 70% 70%)',
                  border: '1px solid hsl(0 70% 50% / 0.2)'
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Login Buttons - Glassmorphism Style */}
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isAnyLoading}
                className="w-full h-14 rounded-2xl font-medium relative overflow-hidden group border-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.1) 0%, hsl(0 0% 100% / 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 4px 20px hsl(0 0% 0% / 0.3)',
                  border: '1px solid hsl(0 0% 100% / 0.1)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isGoogleLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm font-medium" style={{ color: 'hsl(0 0% 90%)' }}>Continue with Google</span>
                    </>
                  )}
                </span>
                
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.05) 0%, transparent 100%)' }}
                />
              </Button>
            </motion.div>

            {/* Apple Sign In Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                onClick={handleAppleSignIn}
                disabled={isAnyLoading}
                className="w-full h-14 rounded-2xl font-medium relative overflow-hidden group border-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.1) 0%, hsl(0 0% 100% / 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 4px 20px hsl(0 0% 0% / 0.3)',
                  border: '1px solid hsl(0 0% 100% / 0.1)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isAppleLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'hsl(0 0% 95%)' }}>
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      <span className="text-sm font-medium" style={{ color: 'hsl(0 0% 90%)' }}>Continue with Apple</span>
                    </>
                  )}
                </span>
                
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.05) 0%, transparent 100%)' }}
                />
              </Button>
            </motion.div>

            {/* Microsoft Sign In Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                onClick={handleMicrosoftSignIn}
                disabled={isAnyLoading}
                className="w-full h-14 rounded-2xl font-medium relative overflow-hidden group border-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.1) 0%, hsl(0 0% 100% / 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 4px 20px hsl(0 0% 0% / 0.3)',
                  border: '1px solid hsl(0 0% 100% / 0.1)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isMicrosoftLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#F25022" d="M1 1h10v10H1z"/>
                        <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                        <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                        <path fill="#FFB900" d="M13 13h10v10H13z"/>
                      </svg>
                      <span className="text-sm font-medium" style={{ color: 'hsl(0 0% 90%)' }}>Continue with Microsoft</span>
                    </>
                  )}
                </span>
                
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.05) 0%, transparent 100%)' }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Terms notice */}
          <p className="mt-6 text-xs text-center" style={{ color: 'hsl(0 0% 40%)' }}>
            By continuing, you agree to our{' '}
            <a href="/terms" className="underline hover:no-underline" style={{ color: 'hsl(0 0% 50%)' }}>Terms</a>
            {' '}and{' '}
            <a href="/privacy" className="underline hover:no-underline" style={{ color: 'hsl(0 0% 50%)' }}>Privacy Policy</a>
          </p>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <a 
              href="/" 
              className="text-xs transition-colors hover:underline"
              style={{ color: 'hsl(0 0% 40%)' }}
            >
              ← Back to Temp Mail AI
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
