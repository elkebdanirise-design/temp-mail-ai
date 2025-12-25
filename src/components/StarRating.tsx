import { useState, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StarRatingProps {
  postId: string;
  initialRatingSum: number;
  initialRatingCount: number;
}

// Generate a simple fingerprint for anonymous users
const getUserFingerprint = (): string => {
  let fingerprint = localStorage.getItem('user_fingerprint');
  if (!fingerprint) {
    fingerprint = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('user_fingerprint', fingerprint);
  }
  return fingerprint;
};

export const StarRating = ({ postId, initialRatingSum, initialRatingCount }: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingSum, setRatingSum] = useState(initialRatingSum);
  const [ratingCount, setRatingCount] = useState(initialRatingCount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = ratingCount > 0 ? ratingSum / ratingCount : 0;

  // Check if user has already rated
  useEffect(() => {
    const checkExistingRating = async () => {
      const fingerprint = getUserFingerprint();
      const { data } = await supabase
        .from('blog_ratings')
        .select('rating')
        .eq('post_id', postId)
        .eq('user_fingerprint', fingerprint)
        .maybeSingle();

      if (data) {
        setUserRating(data.rating);
      }
    };

    checkExistingRating();
  }, [postId]);

  const handleRate = useCallback(async (rating: number) => {
    if (userRating || isSubmitting) return;

    setIsSubmitting(true);
    const fingerprint = getUserFingerprint();

    try {
      const { error } = await supabase
        .from('blog_ratings')
        .insert({
          post_id: postId,
          user_fingerprint: fingerprint,
          rating,
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already rated this article');
        } else {
          throw error;
        }
      } else {
        setUserRating(rating);
        setRatingSum(prev => prev + rating);
        setRatingCount(prev => prev + 1);
        toast.success('Thanks for rating!');
      }
    } catch (err) {
      console.error('Rating error:', err);
      toast.error('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  }, [postId, userRating, isSubmitting]);

  return (
    <div 
      className="flex flex-col items-center gap-4 py-8 px-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, hsl(220 30% 8% / 0.9), hsl(220 30% 5% / 0.95))',
        border: '1px solid hsl(var(--glass-border))',
      }}
    >
      <h4 
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: 'hsl(200 15% 60%)' }}
      >
        Rate This Article
      </h4>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = userRating 
            ? star <= userRating 
            : star <= (hoveredStar || Math.round(averageRating));
          const isHovered = !userRating && star <= hoveredStar;

          return (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !userRating && setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              disabled={!!userRating || isSubmitting}
              className={`p-1 transition-all duration-300 ${
                userRating ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              }`}
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-8 h-8 transition-all duration-300 ${
                  isFilled ? 'fill-current' : ''
                }`}
                style={{
                  color: isFilled 
                    ? 'hsl(35 90% 55%)' 
                    : 'hsl(200 15% 30%)',
                  filter: isHovered 
                    ? 'drop-shadow(0 0 12px hsl(35 90% 55% / 0.8)) drop-shadow(0 0 24px hsl(35 90% 55% / 0.5))'
                    : isFilled
                      ? 'drop-shadow(0 0 8px hsl(35 90% 55% / 0.5))'
                      : 'none',
                }}
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-sm" style={{ color: 'hsl(200 15% 55%)' }}>
        <span className="font-semibold" style={{ color: 'hsl(35 90% 55%)' }}>
          {averageRating.toFixed(1)}
        </span>
        <span>average from {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}</span>
      </div>

      {userRating && (
        <p className="text-xs" style={{ color: 'hsl(150 60% 50%)' }}>
          You rated this article {userRating} {userRating === 1 ? 'star' : 'stars'}
        </p>
      )}
    </div>
  );
};
