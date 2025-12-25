import { useState, useEffect, memo } from 'react';
import { Clock, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endDate: Date): TimeLeft => {
  const difference = endDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-background/40 backdrop-blur-sm border border-primary/30 rounded-lg px-2 py-1 md:px-3 md:py-2 min-w-[40px] md:min-w-[56px]">
      <span className="text-lg md:text-2xl font-bold text-primary tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider">
      {label}
    </span>
  </div>
));
TimeUnit.displayName = 'TimeUnit';

export const LimitedOfferBanner = memo(() => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Set end date to 3 days from now (resets on page load for demo purposes)
  const [endDate] = useState(() => {
    const stored = localStorage.getItem('promoEndDate');
    if (stored) {
      const date = new Date(stored);
      if (date.getTime() > new Date().getTime()) {
        return date;
      }
    }
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 3);
    localStorage.setItem('promoEndDate', newDate.toISOString());
    return newDate;
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(endDate));
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-orange-500/15 to-pink-500/20 border-y border-primary/30 py-3 md:py-4">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
          {/* Close button - mobile only positioned top right */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 p-1.5 rounded-full hover:bg-background/20 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Offer text */}
          <div className="flex items-center gap-2 text-center md:text-left pr-6 md:pr-0">
            <Zap className="w-5 h-5 text-primary animate-pulse hidden md:block" />
            <div>
              <span className="text-sm md:text-base font-semibold text-foreground">
                🔥 Launch Special: 
              </span>
              <span className="text-sm md:text-base text-muted-foreground ml-1">
                <span className="text-primary font-bold">50% OFF</span> Pro Plan
              </span>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <Clock className="w-4 h-4 text-primary hidden md:block" />
            <div className="flex items-center gap-1 md:gap-2">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="text-primary text-lg font-bold">:</span>
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <span className="text-primary text-lg font-bold">:</span>
              <TimeUnit value={timeLeft.minutes} label="Min" />
              <span className="text-primary text-lg font-bold">:</span>
              <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleScrollToPricing}
            size="sm"
            className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            Claim Offer
          </Button>
        </div>
      </div>
    </div>
  );
});

LimitedOfferBanner.displayName = 'LimitedOfferBanner';
