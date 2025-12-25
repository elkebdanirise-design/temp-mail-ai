import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { WelcomeModal } from '@/components/WelcomeModal';

const getRedirectUrl = () => `${window.location.origin}/`;

interface WelcomeData {
  isOpen: boolean;
  userName: string;
  avatarUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithApple: () => Promise<{ error: Error | null }>;
  signInWithMicrosoft: () => Promise<{ error: Error | null }>;
  resendVerificationEmail: () => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasShownWelcomeModal = useRef(false);
  const [welcomeData, setWelcomeData] = useState<WelcomeData>({
    isOpen: false,
    userName: '',
    avatarUrl: null,
  });

  const closeWelcomeModal = () => {
    setWelcomeData(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        // Check if we have a stored OAuth hash from main.tsx
        const storedHash = sessionStorage.getItem('supabase_auth_hash');
        
        if (storedHash) {
          console.log('[Auth] Processing stored OAuth hash...');
          sessionStorage.removeItem('supabase_auth_hash');
          
          // Parse the hash fragment to extract tokens
          const hashParams = new URLSearchParams(storedHash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            // Use setSession to establish the session from tokens
            const { data: { session }, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            console.log('[Auth] OAuth session established:', { hasSession: !!session, error });
            
            if (isMounted) {
              if (error) {
                console.error('[Auth] OAuth error:', error);
                toast({
                  variant: 'destructive',
                  title: 'Sign-in failed',
                  description: error.message,
                });
                setIsLoading(false);
                return;
              }
              
              setSession(session);
              setUser(session?.user ?? null);
              setIsLoading(false);
              
              // Sync profile and show welcome modal
              if (session?.user) {
                const profileReady = await ensureUserProfile(session.user);
                if (profileReady && !hasShownWelcomeModal.current) {
                  hasShownWelcomeModal.current = true;
                  const userName =
                    session.user.user_metadata?.full_name ||
                    session.user.user_metadata?.name ||
                    session.user.email?.split('@')[0] ||
                    'there';
                  const avatarUrl =
                    session.user.user_metadata?.avatar_url ||
                    session.user.user_metadata?.picture ||
                    null;
                  setWelcomeData({ isOpen: true, userName, avatarUrl });
                }
              }
            }
            return;
          }
        }

        // Surface OAuth callback errors from URL params
        const params = new URLSearchParams(window.location.search);
        const oauthError = params.get('error');
        const oauthErrorDescription = params.get('error_description');
        
        if (oauthError) {
          toast({
            variant: 'destructive',
            title: 'Google sign-in failed',
            description: oauthErrorDescription ?? oauthError,
          });
          window.history.replaceState({}, document.title, window.location.pathname);
          if (isMounted) setIsLoading(false);
          return;
        }

        // Normal session check (no OAuth callback)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('[Auth] getSession result:', { hasSession: !!session, error });
        
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
          
          // Sync profile if user exists
          if (session?.user) {
            await ensureUserProfile(session.user);
          }
        }
      } catch (err) {
        console.error('[Auth] Initialization error:', err);
        if (isMounted) setIsLoading(false);
      }
    };

    // Set up auth state listener for ongoing changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[Auth] onAuthStateChange:', event, 'hasSession:', !!session);
        
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Handle sign-in events (not from initial OAuth callback)
        if (event === 'SIGNED_IN' && session?.user) {
          const userName =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email?.split('@')[0] ||
            'there';

          const avatarUrl =
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ||
            null;

          setTimeout(async () => {
            if (!isMounted) return;
            const profileReady = await ensureUserProfile(session.user);
            if (profileReady && !hasShownWelcomeModal.current) {
              hasShownWelcomeModal.current = true;
              setWelcomeData({ isOpen: true, userName, avatarUrl });
            }
          }, 0);
        }
        
        // Handle sign out
        if (event === 'SIGNED_OUT') {
          hasShownWelcomeModal.current = false;
          toast({
            title: "See you soon! 👋",
            description: "You've been signed out successfully.",
          });
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Ensure user has a profile in the profiles table
  const ensureUserProfile = async (user: User): Promise<boolean> => {
    try {
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || null;

      // Upsert ensures the row exists without overwriting premium/license fields.
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert(
          ({
            user_id: user.id,
            email: user.email ?? null,
            full_name: fullName,
            avatar_url: avatarUrl,
          } as any),
          { onConflict: 'user_id' }
        );

      if (upsertError) {
        console.error('Profile upsert failed:', upsertError);
        toast({
          variant: 'destructive',
          title: 'Profile sync failed',
          description: upsertError.message,
        });
        return false;
      }

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Profile fetch failed:', fetchError);
        return false;
      }

      return !!data?.id;
    } catch (error) {
      console.error('Error ensuring user profile:', error);
      return false;
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getRedirectUrl()
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectUrl(),
      }
    });
    return { error };
  };

  const signInWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: getRedirectUrl(),
      }
    });
    return { error };
  };

  const signInWithMicrosoft = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: getRedirectUrl(),
        scopes: 'email profile openid',
      }
    });
    return { error };
  };

  const resendVerificationEmail = async () => {
    if (!user?.email) {
      return { error: new Error('No email address found') };
    }
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: getRedirectUrl(),
      }
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signUp, 
      signIn, 
      signInWithGoogle, 
      signInWithApple, 
      signInWithMicrosoft,
      resendVerificationEmail, 
      updatePassword, 
      signOut 
    }}>
      {children}
      <WelcomeModal
        isOpen={welcomeData.isOpen}
        onClose={closeWelcomeModal}
        userName={welcomeData.userName}
        avatarUrl={welcomeData.avatarUrl}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
