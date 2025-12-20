import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogData';

interface ArticleCardProps {
  post: BlogPost;
  index: number;
}

export const ArticleCard = ({ post, index }: ArticleCardProps) => {
  const Icon = post.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div 
          className="relative rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: 'linear-gradient(145deg, hsl(220 30% 5% / 0.95), hsl(220 30% 3% / 0.98))',
            border: '1px solid hsl(var(--glass-border))',
          }}
        >
          {/* Border trace on hover */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${post.glowColor}, transparent)`,
              backgroundSize: '200% 100%',
              animation: 'border-trace 2s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />

          {/* Image Area with Gradient & Icon */}
          <div 
            className={`relative w-full h-40 sm:h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}
          >
            {/* Overlay */}
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, hsl(220 30% 3% / 0.9), transparent 60%)' }}
            />
            
            {/* Zoom effect on hover */}
            <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-30"
              style={{ background: `radial-gradient(circle at center, ${post.glowColor}, transparent 70%)` }}
            />
            
            {/* Cyber-glass icon pedestal */}
            <div 
              className="relative p-4 rounded-xl group-hover:scale-110 transition-all duration-500"
              style={{
                background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.02))',
                border: '1px solid hsl(0 0% 100% / 0.15)',
                backdropFilter: 'blur(8px)',
                boxShadow: `0 8px 32px hsl(0 0% 0% / 0.4)`,
              }}
            >
              <div 
                className="absolute inset-[-6px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                style={{ background: post.glowColor }}
              />
              <Icon className="relative w-10 h-10 text-white/90 group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Category Tag */}
            <div 
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'hsl(0 0% 0% / 0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid hsl(0 0% 100% / 0.1)',
                color: 'hsl(0 0% 90%)',
              }}
            >
              {post.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs mb-3" style={{ color: 'hsl(200 12% 50%)' }}>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 
              className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 85%) 0%, hsl(0 0% 98%) 50%, hsl(0 0% 90%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <p 
              className="text-sm mb-4 line-clamp-2"
              style={{ color: 'hsl(200 12% 55%)', lineHeight: '1.65' }}
            >
              {post.excerpt}
            </p>

            {/* Read More Button */}
            <div 
              className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-300"
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(190 80% 55%), hsl(210 85% 60%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Read More
              </span>
              <ArrowRight 
                className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" 
                style={{ color: 'hsl(190 80% 55%)' }} 
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
