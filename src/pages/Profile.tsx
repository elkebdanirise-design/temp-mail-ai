import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Crown, Mail, Calendar, Key, LogOut, ArrowLeft, Shield, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuraLogo } from '@/components/AuraLogo';
import { VIPBadge } from '@/components/VIPBadge';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/contexts/PremiumContext';
import { toast } from 'sonner';

const Profile = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const { isPremium, licenseKey, activatePremium, isLoading: premiumLoading } = usePremium();
  const navigate = useNavigate();
  
  const [showRedeemInput, setShowRedeemInput] = useState(false);
  const [redeemKey, setRedeemKey] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

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
            <AuraLogo className="w-8 h-8" />
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
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: isPremium 
                    ? 'linear-gradient(135deg, hsl(45 80% 50%), hsl(35 90% 45%))' 
                    : 'linear-gradient(135deg, hsl(var(--aurora-orange)), hsl(var(--aurora-sunset)))',
                  boxShadow: isPremium 
                    ? '0 0 40px hsl(45 80% 50% / 0.4)' 
                    : '0 0 40px hsl(var(--aurora-orange) / 0.3)'
                }}
              >
                {isPremium ? (
                  <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                ) : (
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                )}
              </div>
              
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'hsl(0 0% 95%)' }}>
                    {user.email?.split('@')[0] || 'User'}
                  </h1>
                  {isPremium && <VIPBadge />}
                </div>
                <p className="text-sm" style={{ color: 'hsl(0 0% 50%)' }}>{user.email}</p>
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
              {/* Email */}
              <div 
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'hsl(0 0% 100% / 0.03)' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'hsl(var(--aurora-orange) / 0.1)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: 'hsl(var(--aurora-orange))' }} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: 'hsl(0 0% 45%)' }}>Email Address</p>
                  <p className="text-sm font-medium" style={{ color: 'hsl(0 0% 80%)' }}>{user.email}</p>
                </div>
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
