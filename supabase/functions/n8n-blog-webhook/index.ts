import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

const WEBHOOK_SECRET = Deno.env.get('N8N_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate webhook secret
    const providedSecret = req.headers.get('x-webhook-secret');
    
    if (!providedSecret || providedSecret !== WEBHOOK_SECRET) {
      console.error('Invalid or missing webhook secret');
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid webhook secret' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const body = await req.json();
    const { action, data } = body;

    console.log(`Received action: ${action}`, JSON.stringify(data));

    if (!action || !data) {
      return new Response(
        JSON.stringify({ error: 'Missing action or data in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result;

    switch (action) {
      case 'create':
        // Create a new blog post
        const { error: createError, data: createdPost } = await supabase
          .from('blog_posts')
          .insert({
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt || null,
            category: data.category || 'Tech News',
            author_name: data.author_name || 'Temp Mail AI Team',
            author_avatar: data.author_avatar || null,
            featured_image: data.featured_image || null,
            reading_time: data.reading_time || 5,
            is_published: data.is_published ?? false,
            published_at: data.is_published ? new Date().toISOString() : null,
          })
          .select()
          .single();

        if (createError) {
          console.error('Create error:', createError);
          throw createError;
        }
        
        result = { success: true, action: 'created', post: createdPost };
        console.log('Post created successfully:', createdPost?.id);
        break;

      case 'update':
        // Update existing blog post by slug or id
        if (!data.id && !data.slug) {
          return new Response(
            JSON.stringify({ error: 'Missing id or slug for update' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const updateQuery = supabase.from('blog_posts').update({
          ...(data.title && { title: data.title }),
          ...(data.content && { content: data.content }),
          ...(data.excerpt && { excerpt: data.excerpt }),
          ...(data.category && { category: data.category }),
          ...(data.author_name && { author_name: data.author_name }),
          ...(data.author_avatar && { author_avatar: data.author_avatar }),
          ...(data.featured_image && { featured_image: data.featured_image }),
          ...(data.reading_time && { reading_time: data.reading_time }),
          ...(typeof data.is_published === 'boolean' && { 
            is_published: data.is_published,
            published_at: data.is_published ? new Date().toISOString() : null 
          }),
        });

        const { error: updateError, data: updatedPost } = data.id
          ? await updateQuery.eq('id', data.id).select().single()
          : await updateQuery.eq('slug', data.slug).select().single();

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }

        result = { success: true, action: 'updated', post: updatedPost };
        console.log('Post updated successfully:', updatedPost?.id);
        break;

      case 'delete':
        // Delete blog post by id or slug
        if (!data.id && !data.slug) {
          return new Response(
            JSON.stringify({ error: 'Missing id or slug for delete' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const deleteQuery = supabase.from('blog_posts').delete();
        const { error: deleteError } = data.id
          ? await deleteQuery.eq('id', data.id)
          : await deleteQuery.eq('slug', data.slug);

        if (deleteError) {
          console.error('Delete error:', deleteError);
          throw deleteError;
        }

        result = { success: true, action: 'deleted' };
        console.log('Post deleted successfully');
        break;

      case 'publish':
        // Quick publish/unpublish by slug or id
        const publishQuery = supabase.from('blog_posts').update({
          is_published: data.publish ?? true,
          published_at: data.publish !== false ? new Date().toISOString() : null,
        });

        const { error: publishError, data: publishedPost } = data.id
          ? await publishQuery.eq('id', data.id).select().single()
          : await publishQuery.eq('slug', data.slug).select().single();

        if (publishError) {
          console.error('Publish error:', publishError);
          throw publishError;
        }

        result = { success: true, action: data.publish !== false ? 'published' : 'unpublished', post: publishedPost };
        console.log('Post publish status updated:', publishedPost?.id);
        break;

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}. Valid actions: create, update, delete, publish` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
