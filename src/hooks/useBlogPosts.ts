import { useState, useCallback, useMemo } from 'react';
import { blogPosts, BlogPost, BlogCategory, getPostsByCategory } from '@/data/blogData';

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
  
  const [activeCategory, setActiveCategory] = useState<BlogCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(postsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let posts = getPostsByCategory(activeCategory);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    return posts;
  }, [activeCategory, searchQuery]);

  // Get currently displayed posts
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;
  const totalCount = filteredPosts.length;

  // Load more posts with simulated loading state
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate network delay for smooth UX
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + postsPerPage, filteredPosts.length));
      setIsLoading(false);
    }, 300);
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

// Future database hook placeholder
// This can be replaced with actual Supabase queries when n8n content is ready
export const useBlogPostsFromDB = async (): Promise<BlogPost[]> => {
  // TODO: Replace with Supabase query when database-driven content is enabled
  // const { data, error } = await supabase
  //   .from('blog_posts')
  //   .select('*')
  //   .order('created_at', { ascending: false });
  
  return blogPosts;
};
