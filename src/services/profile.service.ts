import type { Profile } from "@/types/profile";
import { API_BASE_URL } from "@/lib/api";
import { APIService } from "./api.service";

/*
 Author: Aflaha
 Purpose: Profile-related API services
*/

interface SkillsResponse {
  skills: string[];
}

interface SaveProfileResponse {
  message: string;
  onboarding_completed: boolean;
  created: boolean;
  profile: Profile;
}

export class ProfileService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async saveProfile(profile: Profile): Promise<SaveProfileResponse> {
    return this.post<SaveProfileResponse>("/profile/save/", profile)
      .then((res) => res.data)
      .catch((error) => {
        throw error?.response?.data || "Failed to save profile";
      });
  }

  async getMySkills(): Promise<SkillsResponse> {
    return this.get<SkillsResponse>("/profile/skills/")
      .then((res) => res.data)
      .catch((error) => {
        throw error?.response?.data || "Failed to fetch skills";
      });
  }
}