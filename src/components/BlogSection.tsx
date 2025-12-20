import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Shield, Eye, UserCheck } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Why You Need a Temp Mail for Social Media',
    excerpt: 'Protect your primary inbox from spam and data harvesting when signing up for new social platforms.',
    date: 'Dec 18, 2026',
    icon: UserCheck,
    gradient: 'from-[hsl(190,100%,55%)] to-[hsl(210,100%,60%)]',
  },
  {
    id: 2,
    title: 'How Disposable Email Protects Your Privacy',
    excerpt: 'Learn how temporary email addresses keep your personal data safe from marketers and hackers.',
    date: 'Dec 15, 2026',
    icon: Shield,
    gradient: 'from-[hsl(175,100%,45%)] to-[hsl(190,100%,50%)]',
  },
  {
    id: 3,
    title: 'The Rise of AI-Powered Email Security',
    excerpt: 'Discover how AI is revolutionizing the way we protect our digital communications in 2026.',
    date: 'Dec 12, 2026',
    icon: Eye,
    gradient: 'from-[hsl(210,100%,55%)] to-[hsl(220,100%,60%)]',
  },
];

export const BlogSection = () => {
  return (
    <section id="blog-section" className="py-12 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-3"
        >
          Latest Privacy Insights & <span className="aurora-gradient-text">Temp Mail Aura News</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Stay informed about online privacy, security tips, and the latest updates in disposable email technology.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {blogPosts.map((post, index) => {
          const Icon = post.icon;
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-panel p-5 md:p-6 cursor-pointer hover-lift"
            >
              {/* Placeholder Image Area */}
              <div className={`w-full h-32 md:h-40 rounded-xl bg-gradient-to-br ${post.gradient} mb-4 flex items-center justify-center overflow-hidden relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Icon className="w-12 h-12 text-white/40 group-hover:scale-110 group-hover:text-white/60 transition-all duration-500" />
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Calendar className="w-3 h-3" />
                <span>{post.date}</span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-[hsl(190,100%,60%)] transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Read More */}
              <div className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all aurora-gradient-text">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};