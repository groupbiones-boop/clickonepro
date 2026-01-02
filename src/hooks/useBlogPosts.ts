import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category_id: string | null;
  author: string;
  status: string;
  published_at: string | null;
  views: number;
  read_time: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  created_at: string;
}

export const usePublishedPosts = () => {
  return useQuery({
    queryKey: ["blog", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(*)")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog", "post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(*)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};

export const useAllPosts = () => {
  return useQuery({
    queryKey: ["blog", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(*)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["blog", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as BlogCategory[];
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: { title: string; slug: string; content: string; excerpt?: string; cover_image?: string; category_id?: string; author?: string; status?: string; published_at?: string; read_time?: number; meta_title?: string; meta_description?: string }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert([post])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: { name: string; slug: string; description?: string; color?: string }) => {
      const { data, error } = await supabase
        .from("blog_categories")
        .insert([category])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", "categories"] });
    },
  });
};

export const useIncrementViews = () => {
  return useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.rpc("increment_post_views", { post_slug: slug });
      if (error) throw error;
    },
  });
};

export const useBlogStats = () => {
  return useQuery({
    queryKey: ["blog", "stats"],
    queryFn: async () => {
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("views, read_time, status");

      if (error) throw error;

      const totalPosts = posts?.length || 0;
      const publishedPosts = posts?.filter((p) => p.status === "published").length || 0;
      const totalViews = posts?.reduce((acc, p) => acc + (p.views || 0), 0) || 0;
      const avgReadTime =
        posts && posts.length > 0
          ? Math.round(posts.reduce((acc, p) => acc + (p.read_time || 0), 0) / posts.length)
          : 0;

      return {
        totalPosts,
        publishedPosts,
        totalViews,
        avgReadTime,
      };
    },
  });
};
