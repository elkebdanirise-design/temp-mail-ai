-- Update the initialize_blog_post_views function to also set base ratings
CREATE OR REPLACE FUNCTION public.initialize_blog_post_views()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  base_rating_count integer;
  base_rating_avg numeric;
BEGIN
  -- Initialize views (existing logic)
  NEW.views_base = floor(random() * 151 + 150)::integer;
  NEW.views_count = NEW.views_base;
  
  -- Initialize ratings with social proof base
  -- Random count between 12 and 38
  base_rating_count = floor(random() * 27 + 12)::integer;
  -- Random average between 4.6 and 4.9
  base_rating_avg = 4.6 + (random() * 0.3);
  
  NEW.rating_count = base_rating_count;
  NEW.rating_sum = round((base_rating_count * base_rating_avg)::numeric, 1);
  
  RETURN NEW;
END;
$function$;

-- Update existing posts that have zero ratings to have base ratings
UPDATE public.blog_posts
SET 
  rating_count = floor(random() * 27 + 12)::integer,
  rating_sum = round(((floor(random() * 27 + 12)::integer) * (4.6 + (random() * 0.3)))::numeric, 1)
WHERE rating_count = 0;