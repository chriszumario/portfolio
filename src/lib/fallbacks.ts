/**
 * Centralized fallback data for all portfolio sections.
 * Used when the API is unreachable at build time (SSG graceful degradation).
 */

import type { Hero } from '../features/hero/types';
import type { Experience } from '../features/experience/types';
import type { Education } from '../features/education/types';
import type { About } from '../features/about/types';
import type { Project } from '../features/projects/types';

export const HERO_FALLBACK: Hero = {
  name: 'Christian Perez',
  title: 'Desarrollador Full-Stack / Software Architect',
  subtitle: 'FastAPI, Python, TypeScript, React',
  description:
    'Especializado en el desarrollo de aplicaciones web modernas, APIs de alto rendimiento y arquitectura de software escalable.',
  resume_url: null,
  github_url: null,
  linkedin_url: null,
  email: null,
  is_available: true,
};

export const EXPERIENCE_FALLBACK: Experience[] = [];

export const EDUCATION_FALLBACK: Education[] = [];

export const ABOUT_FALLBACK: About = {
  bio: 'Apasionado por el desarrollo de software y la tecnología. Con experiencia en la construcción de soluciones escalables, código limpio y arquitectura moderna tanto en el backend como en el frontend.\n\nConstantemente explorando nuevas herramientas y buenas prácticas para aportar valor en proyectos de alto impacto.',
  profile_image_url:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
};

export const PROJECTS_FALLBACK: Project[] = [];
