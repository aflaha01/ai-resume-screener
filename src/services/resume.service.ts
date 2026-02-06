import { API_BASE_URL } from "@/lib/api";

/* Author: Aflaha on Jan 30, 2026 
   Purpose: Provides resume-related API services and types for uploading resumes and handling extracted profile data from the backend. 
   Props: None 
*/

export interface ResumeProfile {
  name?: string;
  email?: string;
  phone?: string;
  summary: string[];
  skills: string[];
  education: string[];
  experience: string[];
  projects: string[];
  certifications: string[];
}

export interface ResumeUploadResponse {
  resume_id: number;
  profile: ResumeProfile;
}

export class ResumeService {
  static async uploadResume(
    file: File,
    token: string
  ): Promise<ResumeUploadResponse> {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch(`${API_BASE_URL}/resume/upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Resume upload failed");
    }

    return res.json();
  }
}
