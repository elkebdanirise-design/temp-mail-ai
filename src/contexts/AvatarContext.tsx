import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface AvatarContextType {
  avatarUrl: string | null;
  userName: string;
  refreshAvatar: () => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const refreshAvatar = useCallback(() => {
    if (!user) {
      setAvatarUrl(null);
      return;
    }

    // Use Google OAuth avatar if available
    const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
    setAvatarUrl(googleAvatar || null);
  }, [user]);

  useEffect(() => {
    refreshAvatar();
  }, [refreshAvatar]);

  // Get user display name for letter avatar fallback
  const userName = user?.user_metadata?.full_name || 
                   user?.user_metadata?.name || 
                   user?.email?.split('@')[0] || 
                   'User';

  return (
    <AvatarContext.Provider value={{ avatarUrl, userName, refreshAvatar }}>
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
