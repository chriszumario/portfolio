export interface Project {
  id: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  tags: string[];
  is_featured: boolean;
  order: number;
}
