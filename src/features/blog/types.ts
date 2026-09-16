export interface PostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  reading_time_minutes: number;
  tags: string[];
  published_at: string | null;
  is_published: boolean;
  views_count: number;
  likes_count: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface PostDetail extends PostSummary {
  content: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchPostsParams {
  skip?: number;
  limit?: number;
  tag?: string;
  q?: string;
}
