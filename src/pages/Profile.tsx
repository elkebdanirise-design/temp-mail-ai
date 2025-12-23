import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Crown, Mail, Calendar, Key, LogOut, ArrowLeft, Shield, Sparkles, Check, AlertCircle, RefreshCw, CheckCircle, Lock, Eye, EyeOff, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/BrandLogo';
import { VIPBadge } from '@/components/VIPBadge';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/contexts/PremiumContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, signOut, resendVerificationEmail, updatePassword, isLoading: authLoading } = useAuth();
  const { isPremium, licenseKey, activatePremium, isLoading: premiumLoading } = usePremium();
  const navigate = useNavigate();
  
  const [showRedeemInput, setShowRedeemInput] = useState(false);
  const [redeemKey, setRedeemKey] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  
  // Avatar upload state
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Check if email is verified
  const isEmailVerified = user?.email_confirmed_at != null;
  
  // Check if user signed up with email (not OAuth)
  const isEmailUser = user?.app_metadata?.provider === 'email' || 
                      user?.identities?.some(id => id.provider === 'email');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Load avatar URL from profile or user metadata
  useEffect(() => {
    const loadAvatar = async () => {
      if (!user) return;
      
      // First check profile table
      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('user_id', user.id)
        .single();
      
      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      } else if (user.user_metadata?.avatar_url || user.user_metadata?.picture) {
        // Fallback to Google profile picture
        setAvatarUrl(user.user_metadata?.avatar_url || user.user_metadata?.picture);
      }
    };
    
    loadAvatar();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleRedeemKey = async () => {
    if (!redeemKey.trim()) return;
    
    setIsRedeeming(true);
    const result = await activatePremium(redeemKey.trim());
    
    if (result.success) {
      setShowRedeemInput(false);
      setRedeemKey('');
    } else {
      toast.error(result.error || 'Failed to redeem license key');
    }
    setIsRedeeming(false);
  };

  const handleResendVerification = async () => {
    setIsResendingVerification(true);
    
    try {
      const { error } = await resendVerificationEmail();
      if (error) {
        toast.error(error.message || 'Failed to send verification email');
      } else {
        setVerificationSent(true);
        toast.success('Verification email sent! Check your inbox.');
        // Reset the button after 60 seconds
        setTimeout(() => setVerificationSent(false), 60000);
      }
    } catch (err) {
      toast.error('Failed to send verification email');
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }
    
    setIsUploadingAvatar(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // Add cache buster to force refresh
      const urlWithCacheBuster = `${publicUrl}?t=${Date.now()}`;
      
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlWithCacheBuster })
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(urlWithCacheBuster);
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setPasswordError(error.message || 'Failed to update password');
      } else {
        toast.success('Password updated successfully!');
        setShowPasswordChange(false);
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPasswordError('Failed to update password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (authLoading || premiumLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)' }}
      >
        <motion.div
          className="w-8 h-8 border-2 rounded-full"
          style={{ borderColor: 'hsl(var(--aurora-orange) / 0.3)', borderTopColor: 'hsl(var(--aurora-orange))' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!user) return null;

  const memberSince = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Unknown';

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)'
      }}
    >
      {/* Background glow effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--aurora-orange) / 0.06) 0%, transparent 50%)'
        }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <BrandLogo className="w-8 h-8" />
            <span className="font-display font-bold" style={{ color: 'hsl(0 0% 80%)' }}>Profile</span>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-6"
        >
          {/* Card glow border */}
          <div 
            className="absolute -inset-px rounded-2xl"
            style={{
              background: isPremium 
                ? 'linear-gradient(135deg, hsl(45 80% 50% / 0.3), hsl(35 90% 45% / 0.2))' 
                : 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-sunset) / 0.1))',
              filter: 'blur(1px)'
            }}
          />
          
          <div 
            className="relative rounded-2xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(180deg, hsl(0 0% 8% / 0.9) 0%, hsl(0 0% 5% / 0.95) 100%)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 25px 80px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)'
            }}
          >
            {/* Avatar and Name Section */}
            <div className="flex flex-col items-center gap-6 mb-8">
              {/* Large Avatar with Edit Button */}
              <div className="relative group">
                <motion.div 
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: isPremium 
                      ? 'linear-gradient(135deg, hsl(45 80% 50%), hsl(35 90% 45%))' 
                      : 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                    boxShadow: isPremium 
                      ? '0 0 50px hsl(45 80% 50% / 0.5), inset 0 0 30px hsl(0 0% 0% / 0.2)' 
                      : '0 0 50px hsl(var(--aurora-orange) / 0.4), inset 0 0 30px hsl(0 0% 0% / 0.2)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : isPremium ? (
                    <Crown className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
                  ) : (
                    <User className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
                  )}
                  
                  {/* Premium ring */}
                  {isPremium && (
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        border: '3px solid hsl(45 80% 55%)',
                        boxShadow: 'inset 0 0 10px hsl(45 80% 50% / 0.3)'
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Edit button overlay */}
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-1 right-1 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                    boxShadow: '0 4px 20px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.2)',
                    border: '2px solid hsl(0 0% 8%)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5 text-white" />
                  )}
                </motion.button>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              
              {/* Name and Email */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'hsl(0 0% 95%)' }}>
                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                <p className="text-sm" style={{ color: 'hsl(0 0% 50%)' }}>{user.email}</p>
                <p className="text-xs mt-1" style={{ color: 'hsl(0 0% 40%)' }}>
                  Click the camera icon to change your photo
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: isPremium 
                  ? 'linear-gradient(135deg, hsl(45 80% 50% / 0.15), hsl(35 90% 45% / 0.1))' 
                  : 'hsl(0 0% 100% / 0.05)',
                border: isPremium 
                  ? '1px solid hsl(45 80% 50% / 0.3)' 
                  : '1px solid hsl(0 0% 100% / 0.1)'
              }}
            >
              {isPremium ? (
                <>
                  <Sparkles className="w-4 h-4" style={{ color: 'hsl(45 85% 55%)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'hsl(45 85% 60%)' }}>VIP Member</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" style={{ color: 'hsl(0 0% 50%)' }} />
                  <span className="text-sm font-medium" style={{ color: 'hsl(0 0% 60%)' }}>Free Account</span>
                </>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid gap-4 mb-6">
              {/* Email with Verification Status */}
              <div 
                className="p-4 rounded-xl"
                style={{ 
                  background: isEmailVerified 
                    ? 'hsl(0 0% 100% / 0.03)' 
                    : 'linear-gradient(135deg, hsl(45 80% 50% / 0.08), hsl(35 90% 45% / 0.05))'
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'hsl(var(--aurora-orange) / 0.1)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: 'hsl(var(--aurora-orange))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium" style={{ color: 'hsl(0 0% 45%)' }}>Email Address</p>
                    <p className="text-sm font-medium truncate" style={{ color: 'hsl(0 0% 80%)' }}>{user.email}</p>
                  </div>
                  
                  {/* Verification Badge */}
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded-full shrink-0"
                    style={{ 
                      background: isEmailVerified 
                        ? 'hsl(150 60% 40% / 0.15)' 
                        : 'hsl(45 80% 50% / 0.15)'
                    }}
                  >
                    {isEmailVerified ? (
                      <>
                        <CheckCircle className="w-3 h-3" style={{ color: 'hsl(150 70% 50%)' }} />
                        <span className="text-xs font-medium" style={{ color: 'hsl(150 70% 55%)' }}>Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" style={{ color: 'hsl(45 85% 55%)' }} />
                        <span className="text-xs font-medium" style={{ color: 'hsl(45 85% 60%)' }}>Unverified</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Resend Verification Section */}
                <AnimatePresence>
                  {!isEmailVerified && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t"
                      style={{ borderColor: 'hsl(0 0% 100% / 0.05)' }}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'hsl(45 85% 55%)' }} />
                        <div className="flex-1">
                          <p className="text-xs mb-2" style={{ color: 'hsl(0 0% 55%)' }}>
                            Please verify your email to access all features and secure your account.
                          </p>
                          <Button
                            onClick={handleResendVerification}
                            disabled={isResendingVerification || verificationSent}
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg text-xs font-medium gap-2 border-0"
                            style={{
                              background: verificationSent 
                                ? 'hsl(150 60% 40% / 0.15)' 
                                : 'hsl(var(--aurora-orange) / 0.15)',
                              color: verificationSent 
                                ? 'hsl(150 70% 55%)' 
                                : 'hsl(var(--aurora-orange))'
                            }}
                          >
                            {isResendingVerification ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </motion.div>
                                Sending...
                              </>
                            ) : verificationSent ? (
                              <>
                                <Check className="w-3 h-3" />
                                Email Sent
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-3 h-3" />
                                Resend Verification Email
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Member Since */}
              <div 
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'hsl(0 0% 100% / 0.03)' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'hsl(var(--aurora-sunset) / 0.1)' }}
                >
                  <Calendar className="w-5 h-5" style={{ color: 'hsl(var(--aurora-sunset))' }} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'hsl(0 0% 45%)' }}>Member Since</p>
                  <p className="text-sm font-medium" style={{ color: 'hsl(0 0% 80%)' }}>{memberSince}</p>
                </div>
              </div>

              {/* Subscription Status */}
              <div 
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ 
                  background: isPremium 
                    ? 'linear-gradient(135deg, hsl(45 80% 50% / 0.08), hsl(35 90% 45% / 0.05))' 
                    : 'hsl(0 0% 100% / 0.03)' 
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: isPremium 
                      ? 'hsl(45 80% 50% / 0.15)' 
                      : 'hsl(150 60% 40% / 0.1)' 
                  }}
                >
                  <Shield className="w-5 h-5" style={{ color: isPremium ? 'hsl(45 85% 55%)' : 'hsl(150 60% 50%)' }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium" style={{ color: 'hsl(0 0% 45%)' }}>Subscription</p>
                  <p className="text-sm font-medium" style={{ color: isPremium ? 'hsl(45 85% 60%)' : 'hsl(0 0% 80%)' }}>
                    {isPremium ? 'Pro VIP' : 'Free Plan'}
                  </p>
                </div>
                {isPremium && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'hsl(150 60% 40% / 0.15)' }}>
                    <Check className="w-3 h-3" style={{ color: 'hsl(150 70% 50%)' }} />
                    <span className="text-xs font-medium" style={{ color: 'hsl(150 70% 55%)' }}>Active</span>
                  </div>
                )}
              </div>

              {/* License Key (if pro) */}
              {isPremium && licenseKey && (
                <div 
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'hsl(0 0% 100% / 0.03)' }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(45 80% 50% / 0.1)' }}
                  >
                    <Key className="w-5 h-5" style={{ color: 'hsl(45 85% 55%)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'hsl(0 0% 45%)' }}>License Key</p>
                    <p className="text-sm font-mono" style={{ color: 'hsl(0 0% 60%)' }}>
                      {licenseKey.slice(0, 4)}****{licenseKey.slice(-4)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Pro Benefits (if premium) */}
            {isPremium && (
              <div 
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, hsl(45 80% 50% / 0.08), hsl(35 90% 45% / 0.05))',
                  border: '1px solid hsl(45 80% 50% / 0.15)'
                }}
              >
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(45 85% 60%)' }}>
                  <Crown className="w-4 h-4" /> Your VIP Benefits
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['No Ads', 'Priority Delivery', 'Extended Retention', 'VIP Badge'].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <Check className="w-3 h-3" style={{ color: 'hsl(150 70% 50%)' }} />
                      <span className="text-xs" style={{ color: 'hsl(0 0% 70%)' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upgrade Section (if not premium) */}
            {!isPremium && (
              <div 
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.08), hsl(var(--aurora-sunset) / 0.05))',
                  border: '1px solid hsl(var(--aurora-orange) / 0.15)'
                }}
              >
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'hsl(var(--aurora-orange))' }}>
                  Upgrade to VIP
                </h3>
                <p className="text-xs mb-4" style={{ color: 'hsl(0 0% 55%)' }}>
                  Remove ads, get priority delivery, and unlock exclusive features.
                </p>
                
                {showRedeemInput ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter license key..."
                      value={redeemKey}
                      onChange={(e) => setRedeemKey(e.target.value)}
                      className="flex-1 h-10 px-3 rounded-lg bg-black/30 border border-white/10 text-sm font-mono focus:outline-none focus:border-aurora-orange/50"
                      style={{ color: 'hsl(0 0% 80%)' }}
                    />
                    <Button
                      onClick={handleRedeemKey}
                      disabled={isRedeeming || !redeemKey.trim()}
                      className="h-10 px-4 rounded-lg font-medium"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))'
                      }}
                    >
                      {isRedeeming ? '...' : 'Redeem'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowRedeemInput(true)}
                      variant="outline"
                      className="flex-1 h-10 rounded-lg font-medium border-0"
                      style={{
                        background: 'hsl(0 0% 100% / 0.05)',
                        color: 'hsl(0 0% 70%)'
                      }}
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Redeem Key
                    </Button>
                    <Button
                      onClick={() => navigate('/#pro-systems')}
                      className="flex-1 h-10 rounded-lg font-medium"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))'
                      }}
                    >
                      Get Pro
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Password Change Section (only for email users) */}
            {isEmailUser && (
              <div 
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'hsl(0 0% 100% / 0.03)',
                  border: '1px solid hsl(0 0% 100% / 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'hsl(0 0% 70%)' }}>
                    <Lock className="w-4 h-4" /> Password
                  </h3>
                  {!showPasswordChange && (
                    <Button
                      onClick={() => setShowPasswordChange(true)}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 rounded-lg text-xs"
                      style={{ color: 'hsl(var(--aurora-orange))' }}
                    >
                      Change Password
                    </Button>
                  )}
                </div>
                
                <AnimatePresence>
                  {showPasswordChange ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      {/* New Password */}
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="New password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full h-10 px-3 pr-10 rounded-lg bg-black/30 border text-sm focus:outline-none"
                          style={{ 
                            borderColor: 'hsl(0 0% 100% / 0.1)',
                            color: 'hsl(0 0% 80%)'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ color: 'hsl(0 0% 50%)' }}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {/* Confirm Password */}
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full h-10 px-3 pr-10 rounded-lg bg-black/30 border text-sm focus:outline-none"
                          style={{ 
                            borderColor: 'hsl(0 0% 100% / 0.1)',
                            color: 'hsl(0 0% 80%)'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ color: 'hsl(0 0% 50%)' }}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {/* Error Message */}
                      {passwordError && (
                        <p className="text-xs" style={{ color: 'hsl(0 70% 60%)' }}>{passwordError}</p>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setShowPasswordChange(false);
                            setNewPassword('');
                            setConfirmPassword('');
                            setPasswordError('');
                          }}
                          variant="ghost"
                          size="sm"
                          className="flex-1 h-9 rounded-lg text-xs"
                          style={{ color: 'hsl(0 0% 60%)' }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handlePasswordChange}
                          disabled={isChangingPassword || !newPassword || !confirmPassword}
                          size="sm"
                          className="flex-1 h-9 rounded-lg text-xs font-medium"
                          style={{
                            background: 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))'
                          }}
                        >
                          {isChangingPassword ? (
                            <motion.div
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                          ) : (
                            'Update Password'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-xs" style={{ color: 'hsl(0 0% 50%)' }}>
                      ••••••••••••
                    </p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Sign Out Button */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full h-11 rounded-xl font-medium border-0 gap-2"
              style={{
                background: 'hsl(0 70% 50% / 0.1)',
                color: 'hsl(0 70% 60%)'
              }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs"
          style={{ color: 'hsl(0 0% 35%)' }}
        >
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          {' · '}
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </motion.p>
      </div>
    </div>
  );
};

export default Profile;
