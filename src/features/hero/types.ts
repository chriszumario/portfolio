export interface Hero {
  name: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  resume_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  is_available: boolean;
}
