import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  licenseKey: string | null;
  activatePremium: (key: string) => void;
  deactivatePremium: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('aura_license_key');
    if (savedKey) {
      setLicenseKey(savedKey);
      setIsPremium(true);
    }
  }, []);

  const activatePremium = (key: string) => {
    localStorage.setItem('aura_license_key', key);
    setLicenseKey(key);
    setIsPremium(true);
  };

  const deactivatePremium = () => {
    localStorage.removeItem('aura_license_key');
    setLicenseKey(null);
    setIsPremium(false);
  };

  return (
    <PremiumContext.Provider value={{ isPremium, licenseKey, activatePremium, deactivatePremium }}>
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
