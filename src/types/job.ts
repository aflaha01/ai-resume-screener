export type JobStatus = "active" | "closed";

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  company_name: string
  match_percentage?: number;
  last_date: string;
  status: JobStatus;
}