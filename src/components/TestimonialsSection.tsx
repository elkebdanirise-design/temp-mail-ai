import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Startup Founder',
    avatar: 'SC',
    rating: 5,
    text: 'The AI-Enhanced Privacy feature saved my business. No more spam flooding my inbox after signing up for services.',
    highlight: 'AI-Enhanced Privacy',
  },
  {
    name: 'Marcus Webb',
    role: 'Developer',
    avatar: 'MW',
    rating: 5,
    text: 'High-speed servers make a real difference. Emails arrive instantly, and the custom domain feature is a game changer.',
    highlight: 'High-Speed Servers',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Privacy Advocate',
    avatar: 'ER',
    rating: 5,
    text: 'Finally, a temp mail service that takes privacy seriously. The Pro plan is worth every penny for the peace of mind.',
    highlight: 'Premium Support',
  },
];

export const TestimonialsSection = () => {
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

          <h2 className="text-3xl md:text-5xl font-bold silver-gradient-text mb-4 relative inline-block">
            Loved by Thousands
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 md:p-8 relative group"
            >
              {/* Quote icon */}
              <Quote 
                className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: 'hsl(var(--aurora-orange))' }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-current"
                    style={{ color: 'hsl(var(--aurora-orange))' }}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
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
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--aurora-orange) / 0.2), hsl(var(--aurora-magenta) / 0.15))',
                    border: '1px solid hsl(var(--aurora-orange) / 0.3)',
                    color: 'hsl(var(--aurora-orange))',
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
