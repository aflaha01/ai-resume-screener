import { API_BASE_URL } from "@/lib/api";
import { APIService } from "@/services/api.service";
import type { HRProfile } from "@/types/hr";

/*
 Author: Aflaha
 Purpose: HR-related API services
*/

export class HRService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async createHRProfile(data: FormData): Promise<HRProfile> {
    return this.post("/hr/profile/", data, true)
      .then((res) => res.data as HRProfile)
      .catch((error) => {
        throw error?.response?.data || "Failed to save HR profile";
      });
  }

  /* Fetch HR profile */
  async getHRProfile(): Promise<HRProfile> {
    return this.get("/hr/profile/me/")
      .then((res) => res.data as HRProfile)
      .catch((error) => {
        throw error?.response?.data || "Failed to fetch HR profile";
      });
  }
}