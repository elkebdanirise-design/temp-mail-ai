import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface AvatarContextType {
  avatarUrl: string | null;
  updateAvatar: (url: string) => void;
  refreshAvatar: () => Promise<void>;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const refreshAvatar = useCallback(async () => {
    if (!user) {
      setAvatarUrl(null);
      return;
    }

    // First check profile table for custom avatar
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('user_id', user.id)
      .single();

    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    } else if (user.user_metadata?.avatar_url || user.user_metadata?.picture) {
      // Fallback to OAuth provider avatar
      setAvatarUrl(user.user_metadata?.avatar_url || user.user_metadata?.picture);
    } else {
      setAvatarUrl(null);
    }
  }, [user]);

  useEffect(() => {
    refreshAvatar();
  }, [refreshAvatar]);

  const updateAvatar = useCallback((url: string) => {
    setAvatarUrl(url);
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarUrl, updateAvatar, refreshAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
