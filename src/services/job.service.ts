import { API_BASE_URL } from "@/lib/api";
import { APIService } from "@/services/api.service";
import type { Job } from "@/types/job";

/*
 Author: Aflaha
 Purpose: Job-related API services
*/

export interface JobPayload {
  title: string;
  description: string;
  location: string;
  job_type: string;
  last_date: string;
}

export class JobService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  /* Create a new job */
  async createJob(payload: JobPayload): Promise<Job> {
    try {
      const res = await this.post("/jobs/", payload);
      return res.data as Job;
    } catch (error: any) {
      throw error?.response?.data || "Failed to create job";
    }
  }

  /* Fetch all jobs for HR */
  async getJobs(): Promise<Job[]> {
    try {
      const res = await this.get("/jobs/");
      return res.data as Job[];
    } catch (error: any) {
      throw error?.response?.data || "Failed to fetch jobs";
    }
  }
}