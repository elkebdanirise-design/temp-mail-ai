import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface PremiumContextType {
  isPremium: boolean;
  licenseKey: string | null;
  isLoading: boolean;
  activatePremium: (key: string) => Promise<{ success: boolean; error?: string }>;
  deactivatePremium: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      // Check localStorage for non-logged in users (legacy support)
      const savedKey = localStorage.getItem('tempmail_license_key');
      if (savedKey) {
        setLicenseKey(savedKey);
        setIsPremium(true);
      } else {
        setIsPremium(false);
        setLicenseKey(null);
      }
      setIsLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_pro, license_key')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setIsPremium(data.is_pro);
        setLicenseKey(data.license_key);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const activatePremium = async (key: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      // Legacy mode for non-logged in users - just store in localStorage
      localStorage.setItem('tempmail_license_key', key);
      setLicenseKey(key);
      setIsPremium(true);
      toast.success('License key activated!');
      return { success: true };
    }

    try {
      // Use atomic database function to prevent race conditions
      const { data, error } = await supabase.rpc('redeem_license_key', {
        key_to_redeem: key,
        redeeming_user_id: user.id
      });

      if (error) {
        console.error('Error calling redeem_license_key:', error);
        return { success: false, error: 'Error redeeming license key' };
      }

      const result = data as { success: boolean; error?: string };
      
      if (!result.success) {
        return { success: false, error: result.error || 'Failed to redeem license key' };
      }

      setLicenseKey(key);
      setIsPremium(true);
      
      toast.success('License key activated! Enjoy VIP features!');
      return { success: true };
    } catch (err) {
      console.error('Error redeeming license key:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const deactivatePremium = () => {
    localStorage.removeItem('tempmail_license_key');
    setLicenseKey(null);
    setIsPremium(false);
  };

  return (
    <PremiumContext.Provider value={{ isPremium, licenseKey, isLoading, activatePremium, deactivatePremium }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};
