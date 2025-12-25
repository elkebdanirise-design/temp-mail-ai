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
    // Surface OAuth callback errors (e.g. misconfigured provider) directly in the UI
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    const oauthError = params.get('error') || hashParams.get('error');
    const oauthErrorDescription = params.get('error_description') || hashParams.get('error_description');
    
    if (oauthError) {
      toast({
        variant: 'destructive',
        title: 'Google sign-in failed',
        description: oauthErrorDescription ?? oauthError,
      });
      // Clear both query params and hash
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[Auth] onAuthStateChange:', event, 'hasSession:', !!session);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Show welcome modal and create profile when user signs in
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

          // Sync profile first; only then show the welcome UI
          setTimeout(async () => {
            const profileReady = await ensureUserProfile(session.user);
            if (profileReady && !hasShownWelcomeModal.current) {
              hasShownWelcomeModal.current = true;
              setWelcomeData({ isOpen: true, userName, avatarUrl });
            }
          }, 0);
        }
        
        // Show goodbye toast and reset flag on sign out
        if (event === 'SIGNED_OUT') {
          hasShownWelcomeModal.current = false;
          toast({
            title: "See you soon! 👋",
            description: "You've been signed out successfully.",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('[Auth] getSession result:', { hasSession: !!session, error });
      if (error) {
        console.error('[Auth] getSession error:', error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // If a user exists but their profile row is missing, force a sync.
      if (session?.user) {
        setTimeout(() => {
          ensureUserProfile(session.user);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
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
