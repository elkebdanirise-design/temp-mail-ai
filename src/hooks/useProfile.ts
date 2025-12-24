import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  is_pro: boolean;
  license_key: string | null;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const redeemLicenseKey = async (licenseKey: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Please sign in to redeem a license key' };
    }

    try {
      // Use atomic database function to prevent race conditions
      const { data, error } = await supabase.rpc('redeem_license_key', {
        key_to_redeem: licenseKey,
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

      // Refresh the profile
      await fetchProfile();
      
      toast.success('License key activated! Enjoy VIP features!');
      return { success: true };
    } catch (err) {
      console.error('Error redeeming license key:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return {
    profile,
    isLoading,
    isPro: profile?.is_pro ?? false,
    redeemLicenseKey,
    refetch: fetchProfile
  };
};
