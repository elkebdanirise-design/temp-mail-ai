import { useState, useCallback, useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Blog categories type
export type BlogCategory = 'All' | 'Privacy Tips' | 'Cyber Security' | 'Aura Updates' | 'Tech News';

export const blogCategories: BlogCategory[] = ['All', 'Privacy Tips', 'Cyber Security', 'Aura Updates', 'Tech News'];

// Blog post type matching database schema
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  author_name: string;
  author_avatar: string | null;
  featured_image: string | null;
  reading_time: number;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface UseBlogPostsOptions {
  initialCategory?: BlogCategory;
  postsPerPage?: number;
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  displayedPosts: BlogPost[];
  isLoading: boolean;
  hasMore: boolean;
  totalCount: number;
  activeCategory: BlogCategory;
  searchQuery: string;
  currentPage: number;
  loadMore: () => void;
  reset: () => void;
  setCategory: (category: BlogCategory) => void;
  setSearch: (query: string) => void;
  clearSearch: () => void;
}

export const useBlogPosts = (options: UseBlogPostsOptions = {}): UseBlogPostsReturn => {
  const { initialCategory = 'All', postsPerPage = 12 } = options;
  
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<BlogCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(postsPerPage);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts from database
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching blog posts:', error);
        } else {
          setAllPosts(data || []);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    
    // Filter by category
    if (activeCategory !== 'All') {
      posts = posts.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        (post.excerpt?.toLowerCase().includes(query) || false) ||
        post.category.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    return posts;
  }, [allPosts, activeCategory, searchQuery]);

  // Get currently displayed posts
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;
  const totalCount = filteredPosts.length;

  // Load more posts
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setVisibleCount(prev => Math.min(prev + postsPerPage, filteredPosts.length));
  }, [isLoading, hasMore, postsPerPage, filteredPosts.length]);

  // Reset visible count
  const reset = useCallback(() => {
    setVisibleCount(postsPerPage);
  }, [postsPerPage]);

  // Set category and reset pagination
  const setCategory = useCallback((category: BlogCategory) => {
    setActiveCategory(category);
    setVisibleCount(postsPerPage);
  }, [postsPerPage]);

  // Set search query and reset pagination
  const setSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setVisibleCount(postsPerPage);
  }, [postsPerPage]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setVisibleCount(postsPerPage);
  }, [postsPerPage]);

  return {
    posts: filteredPosts,
    displayedPosts,
    isLoading,
    hasMore,
    totalCount,
    activeCategory,
    searchQuery,
    currentPage: Math.ceil(visibleCount / postsPerPage),
    loadMore,
    reset,
    setCategory,
    setSearch,
    clearSearch,
  };
};

// Get a single post by slug
export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setPost(data);
        }
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, isLoading, error };
};
