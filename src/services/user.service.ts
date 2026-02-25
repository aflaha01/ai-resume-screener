import { API_BASE_URL } from "@/lib/api";
import { APIService } from "@/services/api.service";

/*
 Author: Aflaha
 Purpose: User-related API services
*/

export interface UserMeResponse {
  id: number;
  username: string;
  user_type: "HR" | "JOB_SEEKER";
  onboarding_completed: boolean;
}

export class UserService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async me(): Promise<UserMeResponse> {
    return this.get<UserMeResponse>("/user/me/")
      .then((res) => res.data)
      .catch((error) => {
        throw error?.response?.data || "Failed to fetch user";
      });
  }

  async completeOnboarding() {
    return this.patch("/user/me/complete-onboarding/")
      .then((res) => res.data)
      .catch((error) => {
        throw error?.response?.data || "Failed to complete onboarding";
      });
  }
}