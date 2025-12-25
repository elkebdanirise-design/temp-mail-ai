-- Add engagement fields to blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS views_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_base INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_sum DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_count INTEGER NOT NULL DEFAULT 0;

-- Create function to initialize random base views (150-300) for new posts
CREATE OR REPLACE FUNCTION public.initialize_blog_post_views()
RETURNS TRIGGER AS $$
BEGIN
  NEW.views_base = floor(random() * 151 + 150)::integer;
  NEW.views_count = NEW.views_base;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for new posts
DROP TRIGGER IF EXISTS set_initial_views ON public.blog_posts;
CREATE TRIGGER set_initial_views
BEFORE INSERT ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.initialize_blog_post_views();

-- Create ratings table for tracking individual user ratings
CREATE TABLE IF NOT EXISTS public.blog_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_fingerprint TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_fingerprint)
);

-- Enable RLS on ratings
ALTER TABLE public.blog_ratings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert ratings (anonymous users)
CREATE POLICY "Anyone can insert ratings"
ON public.blog_ratings
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read ratings
CREATE POLICY "Anyone can read ratings"
ON public.blog_ratings
FOR SELECT
USING (true);

-- Create function to update post rating averages
CREATE OR REPLACE FUNCTION public.update_post_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.blog_posts
  SET 
    rating_sum = (SELECT COALESCE(SUM(rating), 0) FROM public.blog_ratings WHERE post_id = NEW.post_id),
    rating_count = (SELECT COUNT(*) FROM public.blog_ratings WHERE post_id = NEW.post_id)
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger to update ratings after insert
DROP TRIGGER IF EXISTS update_rating_on_insert ON public.blog_ratings;
CREATE TRIGGER update_rating_on_insert
AFTER INSERT ON public.blog_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_post_rating();

-- Create function to increment view count (called from edge function)
CREATE OR REPLACE FUNCTION public.increment_post_views(post_id_input UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.blog_posts
  SET views_count = views_count + 1
  WHERE id = post_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;