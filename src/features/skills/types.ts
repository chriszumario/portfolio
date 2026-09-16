export interface Skill {
  id: number;
  category_id: number;
  name: string;
  order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  order: number;
  skills: Skill[];
}
