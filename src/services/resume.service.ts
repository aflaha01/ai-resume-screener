import { API_BASE_URL } from "@/lib/api";
import { APIService } from "@/services/api.service";
import { Profile } from "@/types/profile";

export interface ResumeUploadResponse {
  resume_id: number;
  profile: Profile;
}

export class ResumeService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async uploadResume(file: File): Promise<ResumeUploadResponse> {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await this.post<ResumeUploadResponse>(
      "/resume/upload/",
      formData,
      true
    );

    return response.data;
  }
}
