import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuraLogo } from '@/components/AuraLogo';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(128)
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

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

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate input
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please try again.');
          } else {
            setError(error.message);
          }
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('User already registered')) {
            setError('This email is already registered. Please sign in instead.');
          } else {
            setError(error.message);
          }
        } else {
          toast.success('Account created successfully!');
          navigate('/');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        
        {/* Card content */}
        <div 
          className="relative rounded-3xl p-8 sm:p-10"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 8% / 0.9) 0%, hsl(0 0% 5% / 0.95) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 25px 80px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)'
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
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            
            <p className="text-sm mt-2" style={{ color: 'hsl(0 0% 50%)' }}>
              {isLogin ? 'Sign in to access your VIP features' : 'Join Temp Mail AI for premium access'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <Mail 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ color: 'hsl(0 0% 40%)' }}
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-12 pr-4 rounded-xl border-0 text-foreground placeholder:text-muted-foreground/50"
                style={{
                  background: 'hsl(0 0% 100% / 0.05)',
                  boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03), 0 1px 3px hsl(0 0% 0% / 0.2)'
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                style={{ color: 'hsl(0 0% 40%)' }}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pl-12 pr-12 rounded-xl border-0 text-foreground placeholder:text-muted-foreground/50"
                style={{
                  background: 'hsl(0 0% 100% / 0.05)',
                  boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03), 0 1px 3px hsl(0 0% 0% / 0.2)'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl text-sm text-center"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl font-semibold text-white relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--aurora-orange)) 0%, hsl(var(--aurora-sunset)) 100%)',
                boxShadow: '0 4px 20px hsl(var(--aurora-orange) / 0.4)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              
              {/* Hover gradient overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-sunset)) 0%, hsl(var(--aurora-orange)) 100%)'
                }}
              />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'hsl(0 0% 100% / 0.1)' }} />
            <span className="text-xs font-medium" style={{ color: 'hsl(0 0% 40%)' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'hsl(0 0% 100% / 0.1)' }} />
          </div>

          {/* OAuth Buttons */}
          <div className="flex gap-3">
            {/* Google Sign In Button */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isAppleLoading}
              variant="outline"
              className="flex-1 h-12 rounded-xl font-medium relative overflow-hidden group border-0"
              style={{
                background: 'hsl(0 0% 100% / 0.05)',
                boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03), 0 1px 3px hsl(0 0% 0% / 0.2)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isGoogleLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    {/* Google Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="hidden sm:inline text-sm" style={{ color: 'hsl(0 0% 70%)' }}>Google</span>
                  </>
                )}
              </span>
              
              {/* Hover overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'hsl(0 0% 100% / 0.03)' }}
              />
            </Button>

            {/* Apple Sign In Button */}
            <Button
              type="button"
              onClick={handleAppleSignIn}
              disabled={isAppleLoading || isGoogleLoading}
              variant="outline"
              className="flex-1 h-12 rounded-xl font-medium relative overflow-hidden group border-0"
              style={{
                background: 'hsl(0 0% 100% / 0.05)',
                boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03), 0 1px 3px hsl(0 0% 0% / 0.2)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isAppleLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    {/* Apple Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'hsl(0 0% 90%)' }}>
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="hidden sm:inline text-sm" style={{ color: 'hsl(0 0% 70%)' }}>Apple</span>
                  </>
                )}
              </span>
              
              {/* Hover overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'hsl(0 0% 100% / 0.03)' }}
              />
            </Button>
          </div>

          {/* Toggle between Login/Signup */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm transition-colors"
              style={{ color: 'hsl(0 0% 50%)' }}
            >
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <span style={{ color: 'hsl(var(--aurora-orange))' }} className="font-medium hover:underline">
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span style={{ color: 'hsl(var(--aurora-orange))' }} className="font-medium hover:underline">
                    Sign in
                  </span>
                </>
              )}
            </button>
          </div>

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
