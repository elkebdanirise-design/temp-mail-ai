import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronDown, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Startup Founder',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'The AI-Enhanced Privacy feature saved my business. No more spam flooding my inbox after signing up for services.',
    highlight: 'AI-Enhanced Privacy',
  },
  {
    name: 'Marcus Webb',
    role: 'Software Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'High-speed servers make a real difference. Emails arrive instantly, and the custom domain feature is a game changer.',
    highlight: 'High-Speed Servers',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Privacy Advocate',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Finally, a temp mail service that takes privacy seriously. The Pro plan is worth every penny for the peace of mind.',
    highlight: 'Premium Support',
  },
  {
    name: 'David Kim',
    role: 'Digital Marketer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    text: 'I test dozens of landing pages daily. This tool saves me hours and keeps my real inbox clean. Absolutely essential.',
    highlight: 'Time Saver',
  },
  {
    name: 'Amanda Foster',
    role: 'Freelance Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'The 7-day retention on Pro is perfect for client projects. I never miss important verification emails anymore.',
    highlight: '7-Day Retention',
  },
  {
    name: 'James Morrison',
    role: 'Tech Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Custom domain access alone makes the Pro plan worthwhile. It gives my testing workflow a professional edge.',
    highlight: 'Custom Domains',
  },
  {
    name: 'Priya Sharma',
    role: 'Security Researcher',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
    rating: 4.5,
    text: 'The AI spam filtering caught phishing attempts that other services missed. Impressive technology under the hood.',
    highlight: 'AI Spam Filter',
  },
  {
    name: 'Michael Torres',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'We use this across our entire QA team. The unlimited concurrent emails feature is a massive productivity boost.',
    highlight: 'Unlimited Emails',
  },
  {
    name: 'Lisa Wang',
    role: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    text: 'Signing up for influencer programs without exposing my real email? Priceless. This service is a creator essential.',
    highlight: 'Privacy Shield',
  },
  {
    name: 'Robert Hayes',
    role: 'IT Consultant',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'I recommend Temp Mail AI to all my clients. The security features and 24/7 support make it enterprise-ready.',
    highlight: '24/7 Support',
  },
  {
    name: 'Sophie Laurent',
    role: 'E-commerce Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Testing competitor signups without revealing our company email has given us incredible market insights.',
    highlight: 'Competitive Edge',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star 
          key={i} 
          className="w-4 h-4 fill-current"
          style={{ color: 'hsl(var(--aurora-orange))' }}
        />
      ))}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star className="w-4 h-4 absolute text-muted-foreground/30" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star 
              className="w-4 h-4 fill-current"
              style={{ color: 'hsl(var(--aurora-orange))' }}
            />
          </div>
        </div>
      )}
      <span className="ml-1.5 text-xs font-medium text-muted-foreground">{rating}</span>
    </div>
  );
};

export const TestimonialsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--aurora-orange) / 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header with ornamentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Decorative ornamentation */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-orange)))' }}
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'hsl(var(--aurora-orange))' }}
            />
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px"
              style={{ background: 'linear-gradient(90deg, hsl(var(--aurora-orange)), transparent)' }}
            />
          </div>

          <h2 
            className="text-3xl md:text-5xl font-bold mb-4 relative inline-block italic"
            style={{ color: '#FFFFFF' }}
          >
            𝙇𝙤𝙫𝙚𝙙 𝙗𝙮 𝙏𝙝𝙤𝙪𝙨𝙖𝙣𝙙𝙨
            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-[2px] origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--aurora-magenta) / 0.6), hsl(var(--aurora-orange)), hsl(var(--aurora-magenta) / 0.6), transparent)',
              }}
            />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-5">
            See why Pro users never go back to free
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index < 3 ? index * 0.1 : (index - 3) * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -5 }}
                layout
                className="glass-panel p-6 md:p-8 relative group"
              >
                {/* Quote icon */}
                <Quote 
                  className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ color: 'hsl(var(--aurora-orange))' }}
                />

                {/* Stars with numeric rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial text */}
                <p className="text-foreground/80 mb-6 leading-relaxed text-sm md:text-base">
                  "{testimonial.text}"
                </p>

                {/* Highlight badge */}
                <div 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.15), hsl(var(--aurora-magenta) / 0.1))',
                    border: '1px solid hsl(var(--aurora-orange) / 0.25)',
                    color: 'hsl(var(--aurora-orange))',
                  }}
                >
                  {testimonial.highlight}
                </div>

                {/* User info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-11 h-11 rounded-full object-cover"
                    style={{
                      border: '2px solid hsl(var(--aurora-orange) / 0.3)',
                      boxShadow: '0 0 10px hsl(var(--aurora-orange) / 0.1)',
                    }}
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">
                        {testimonial.name}
                      </span>
                      <BadgeCheck 
                        className="w-4 h-4 flex-shrink-0" 
                        style={{ color: 'hsl(var(--aurora-orange))' }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • Verified User
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-center mt-10"
          >
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="group gap-2 px-6 py-5 rounded-xl font-medium transition-all duration-300"
              style={{
                background: 'hsl(var(--secondary) / 0.5)',
                border: '1px solid hsl(var(--aurora-orange) / 0.3)',
                color: 'hsl(var(--aurora-orange))',
              }}
            >
              View More Reviews
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>
        )}

        {/* Show Less Button */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mt-10"
          >
            <Button
              onClick={() => setShowAll(false)}
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              Show Less
              <ChevronDown className="w-4 h-4 rotate-180" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
