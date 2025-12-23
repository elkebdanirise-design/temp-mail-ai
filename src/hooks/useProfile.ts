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
      // Check if the license key exists and is unused
      const { data: keyData, error: keyError } = await supabase
        .from('license_keys')
        .select('*')
        .eq('license_key', licenseKey)
        .maybeSingle();

      if (keyError) {
        return { success: false, error: 'Error validating license key' };
      }

      if (!keyData) {
        return { success: false, error: 'Invalid license key' };
      }

      if (keyData.is_used) {
        return { success: false, error: 'This license key has already been redeemed' };
      }

      // Mark the key as used
      const { error: updateKeyError } = await supabase
        .from('license_keys')
        .update({
          is_used: true,
          used_by: user.id,
          used_at: new Date().toISOString()
        })
        .eq('license_key', licenseKey);

      if (updateKeyError) {
        return { success: false, error: 'Error redeeming license key' };
      }

      // Update the user's profile to is_pro: true
      const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({
          is_pro: true,
          license_key: licenseKey,
          activated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateProfileError) {
        return { success: false, error: 'Error updating profile' };
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
