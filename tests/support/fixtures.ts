import type { Hero } from '../../src/features/hero/types';
import type { PostSummary } from '../../src/features/blog/types';
import type { Project } from '../../src/features/projects/types';

export const heroFixture: Hero = {
  name: 'Ada Lovelace',
  title: 'Software Engineer',
  subtitle: 'Backend and web platforms',
  description: 'Builds reliable software.',
  resume_url: 'https://example.com/resume.pdf',
  github_url: 'https://github.com/ada',
  linkedin_url: 'https://linkedin.com/in/ada',
  email: 'ada@example.com',
  is_available: true,
};

export const projectFixture: Project = {
  id: 1,
  title: 'Compiler',
  description: 'A reliable compiler.',
  cover_image_url: null,
  demo_url: 'https://example.com/compiler',
  github_url: 'https://github.com/ada/compiler',
  tags: ['TypeScript', 'Astro'],
  is_featured: true,
  order: 0,
};

export const postFixture: PostSummary = {
  id: 1,
  title: 'Clean APIs',
  slug: 'clean-apis',
  excerpt: 'A practical guide.',
  cover_image_url: null,
  reading_time_minutes: 5,
  tags: ['API'],
  published_at: '2026-09-01T00:00:00Z',
  is_published: true,
  views_count: 10,
  likes_count: 2,
  created_at: '2026-09-01T00:00:00Z',
  updated_at: null,
};
