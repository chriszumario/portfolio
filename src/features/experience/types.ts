export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string | null;
  company_url: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  order: number;
}
