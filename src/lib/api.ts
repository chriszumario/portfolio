import { apiFetch } from './http';
import {
  parseAbout,
  parseEducation,
  parseExperience,
  parseHero,
  parseList,
  parseProject,
  parseSkillCategory,
} from './api-contracts';
import type { Hero } from '../features/hero/types';
import type { About } from '../features/about/types';
import type { Experience } from '../features/experience/types';
import type { Education } from '../features/education/types';
import type { Project } from '../features/projects/types';
import type { SkillCategory } from '../features/skills/types';

export async function fetchHero(): Promise<Hero> {
  return apiFetch('/hero', parseHero);
}

export async function fetchAbout(): Promise<About> {
  return apiFetch('/about', parseAbout);
}

export async function fetchExperience(): Promise<Experience[]> {
  return apiFetch('/experience', parseList('experience', parseExperience));
}

export async function fetchEducation(): Promise<Education[]> {
  return apiFetch('/education', parseList('education', parseEducation));
}

export async function fetchProjects(): Promise<Project[]> {
  return apiFetch('/projects', parseList('projects', parseProject));
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  return apiFetch('/skills', parseList('skills', parseSkillCategory));
}
