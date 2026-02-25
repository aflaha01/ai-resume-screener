import { APIService } from "./api.service";
import { API_BASE_URL } from "@/lib/api";
import type { Profile } from "@/types/profile";

/*
 Author: Aflaha
 Purpose: AI-related API services
*/

type GenerateSummaryContext = Pick<
  Profile,
  "skills" | "experience" | "projects" | "education"
>;

type EnhanceSummaryResponse = {
  enhanced_summary: string[];
};

type GenerateSummaryResponse = {
  generated_summary: string[];
};

type GenerateJDResponse = {
  job_description: string;
};

export type GenerateJDContext = {
  title: string;
  skills?: string[];
  experience_level?: string;
  job_type?: string;
  location?: string;
  notes?: string;
};

export class AIService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async enhanceSummary(summary: string[]): Promise<string[]> {
    return this.post<EnhanceSummaryResponse>(
      "/ai/enhance-summary/",
      { summary }
    )
      .then((res) => res.data.enhanced_summary)
      .catch((error) => {
        throw error?.response?.data || "Failed to enhance summary";
      });
  }

  async generateSummary(
    context: GenerateSummaryContext
  ): Promise<string[]> {
    return this.post<GenerateSummaryResponse>(
      "/ai/generate-summary/",
      context
    )
      .then((res) => res.data.generated_summary)
      .catch((error) => {
        throw error?.response?.data || "Failed to generate summary";
      });
  }

  async generateJobDescription(
  context: GenerateJDContext
): Promise<string> {
  return this.post<GenerateJDResponse>(
    "/ai/generate-job-description/",
    context
  )
    .then((res) => res.data.job_description)
    .catch((error) => {
      throw error?.response?.data || "Failed to generate job description";
    });
}
}
