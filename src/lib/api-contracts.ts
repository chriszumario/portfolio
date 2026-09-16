import type { About } from '../features/about/types';
import type { PostDetail, PostSummary } from '../features/blog/types';
import type { Education } from '../features/education/types';
import type { Experience } from '../features/experience/types';
import type { Hero } from '../features/hero/types';
import type { Project } from '../features/projects/types';
import type { Skill, SkillCategory } from '../features/skills/types';

export type ApiResponseParser<T> = (value: unknown) => T;

type JsonObject = Record<string, unknown>;

function object(value: unknown, label: string): JsonObject {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} debe ser un objeto`);
  }
  return value as JsonObject;
}

function array<T>(value: unknown, label: string, parse: ApiResponseParser<T>): T[] {
  if (!Array.isArray(value)) throw new TypeError(`${label} debe ser una lista`);
  return value.map(parse);
}

function string(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`${label} debe ser un texto no vacío`);
  }
  return value;
}

function nullableString(value: unknown, label: string): string | null {
  return value === null ? null : string(value, label);
}

function integer(value: unknown, label: string, minimum = 0): number {
  if (!Number.isInteger(value) || (value as number) < minimum) {
    throw new TypeError(`${label} debe ser un entero mayor o igual que ${minimum}`);
  }
  return value as number;
}

function boolean(value: unknown, label: string): boolean {
  if (typeof value !== 'boolean') throw new TypeError(`${label} debe ser booleano`);
  return value;
}

export function safeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function externalUrl(value: unknown, label: string): string | null {
  if (value === null) return null;
  const url = safeExternalUrl(string(value, label));
  if (!url) throw new TypeError(`${label} debe ser una URL HTTP(S)`);
  return url;
}

function nullableEmail(value: unknown): string | null {
  if (value === null) return null;
  const email = string(value, 'email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new TypeError('email no es válido');
  }
  return email;
}

function stringList(value: unknown, label: string): string[] {
  return array(value, label, (item) => string(item, label));
}

export const parseHero: ApiResponseParser<Hero> = (value) => {
  const data = object(value, 'hero');
  return {
    name: string(data.name, 'hero.name'),
    title: string(data.title, 'hero.title'),
    subtitle: nullableString(data.subtitle, 'hero.subtitle'),
    description: nullableString(data.description, 'hero.description'),
    resume_url: externalUrl(data.resume_url, 'hero.resume_url'),
    github_url: externalUrl(data.github_url, 'hero.github_url'),
    linkedin_url: externalUrl(data.linkedin_url, 'hero.linkedin_url'),
    email: nullableEmail(data.email),
    is_available: boolean(data.is_available, 'hero.is_available'),
  };
};

export const parseAbout: ApiResponseParser<About> = (value) => {
  const data = object(value, 'about');
  return {
    bio: string(data.bio, 'about.bio'),
    profile_image_url: nullableString(data.profile_image_url, 'about.profile_image_url'),
  };
};

export const parseExperience: ApiResponseParser<Experience> = (value) => {
  const data = object(value, 'experience');
  return {
    id: integer(data.id, 'experience.id', 1),
    company: string(data.company, 'experience.company'),
    position: string(data.position, 'experience.position'),
    description: nullableString(data.description, 'experience.description'),
    company_url: externalUrl(data.company_url, 'experience.company_url'),
    start_date: string(data.start_date, 'experience.start_date'),
    end_date: nullableString(data.end_date, 'experience.end_date'),
    is_current: boolean(data.is_current, 'experience.is_current'),
    order: integer(data.order, 'experience.order'),
  };
};

export const parseEducation: ApiResponseParser<Education> = (value) => {
  const data = object(value, 'education');
  return {
    id: integer(data.id, 'education.id', 1),
    institution: string(data.institution, 'education.institution'),
    degree: string(data.degree, 'education.degree'),
    field_of_study: nullableString(data.field_of_study, 'education.field_of_study'),
    description: nullableString(data.description, 'education.description'),
    start_date: string(data.start_date, 'education.start_date'),
    end_date: nullableString(data.end_date, 'education.end_date'),
    is_current: boolean(data.is_current, 'education.is_current'),
    order: integer(data.order, 'education.order'),
  };
};

export const parseProject: ApiResponseParser<Project> = (value) => {
  const data = object(value, 'project');
  return {
    id: integer(data.id, 'project.id', 1),
    title: string(data.title, 'project.title'),
    description: string(data.description, 'project.description'),
    cover_image_url: nullableString(data.cover_image_url, 'project.cover_image_url'),
    demo_url: externalUrl(data.demo_url, 'project.demo_url'),
    github_url: externalUrl(data.github_url, 'project.github_url'),
    tags: stringList(data.tags, 'project.tags'),
    is_featured: boolean(data.is_featured, 'project.is_featured'),
    order: integer(data.order, 'project.order'),
  };
};

const parseSkill: ApiResponseParser<Skill> = (value) => {
  const data = object(value, 'skill');
  return {
    id: integer(data.id, 'skill.id', 1),
    category_id: integer(data.category_id, 'skill.category_id', 1),
    name: string(data.name, 'skill.name'),
    order: integer(data.order, 'skill.order'),
  };
};

export const parseSkillCategory: ApiResponseParser<SkillCategory> = (value) => {
  const data = object(value, 'skill category');
  return {
    id: integer(data.id, 'skill category.id', 1),
    name: string(data.name, 'skill category.name'),
    order: integer(data.order, 'skill category.order'),
    skills: array(data.skills, 'skill category.skills', parseSkill),
  };
};

export const parsePostSummary: ApiResponseParser<PostSummary> = (value) => {
  const data = object(value, 'post');
  const slug = string(data.slug, 'post.slug');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) {
    throw new TypeError('post.slug tiene un formato inválido');
  }
  return {
    id: integer(data.id, 'post.id', 1),
    title: string(data.title, 'post.title'),
    slug,
    excerpt: nullableString(data.excerpt, 'post.excerpt'),
    cover_image_url: nullableString(data.cover_image_url, 'post.cover_image_url'),
    reading_time_minutes: integer(data.reading_time_minutes, 'post.reading_time_minutes', 1),
    tags: stringList(data.tags, 'post.tags'),
    published_at: nullableString(data.published_at, 'post.published_at'),
    is_published: boolean(data.is_published, 'post.is_published'),
    views_count: integer(data.views_count, 'post.views_count'),
    likes_count: integer(data.likes_count, 'post.likes_count'),
    created_at: nullableString(data.created_at, 'post.created_at'),
    updated_at: nullableString(data.updated_at, 'post.updated_at'),
  };
};

export const parsePostDetail: ApiResponseParser<PostDetail> = (value) => {
  const data = object(value, 'post');
  return { ...parsePostSummary(data), content: string(data.content, 'post.content') };
};

export function parseList<T>(label: string, parser: ApiResponseParser<T>): ApiResponseParser<T[]> {
  return (value) => array(value, label, parser);
}

export function parsePaginated<T>(parser: ApiResponseParser<T>): ApiResponseParser<{
  items: T[];
  total: number;
  skip: number;
  limit: number;
}> {
  return (value) => {
    const data = object(value, 'paginación');
    return {
      items: array(data.items, 'paginación.items', parser),
      total: integer(data.total, 'paginación.total'),
      skip: integer(data.skip, 'paginación.skip'),
      limit: integer(data.limit, 'paginación.limit', 1),
    };
  };
}
