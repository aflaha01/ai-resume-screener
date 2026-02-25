import { API_BASE_URL } from "@/lib/api";
import { APIService } from "@/services/api.service";

/*
 Author: Aflaha
 Purpose: Authentication-related API services (Login & Register)
 Backend aligned with role-based auth (HR / JOB_SEEKER)
*/

export type UserType = "HR" | "JOB_SEEKER";

export interface LoginPayload {
  username: string;
  password: string;
  user_type: UserType;
}

export interface RegisterPayload {
  username: string;
  password: string;
  user_type: UserType;
}


export interface LoginResponse {
  message: string;
  access: string;
  refresh: string;
  user_type: UserType;
  onboarding_completed: boolean;
  statusCode: number;
}

export interface RegisterResponse {
  message: string;
  statusCode: number;
}


export class AuthService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async login(data: LoginPayload): Promise<LoginResponse> {
    return this.post("/auth/login/", data)
      .then((res) => res.data as LoginResponse)
      .catch((error) => {
        throw error?.response?.data || "Login failed";
      });
  }

  async register(data: RegisterPayload): Promise<RegisterResponse> {
    return this.post("/auth/register/", data)
      .then((res) => res.data as RegisterResponse)
      .catch((error) => {
        throw error?.response?.data || "Registration failed";
      });
  }

  saveTokens(access: string, refresh: string) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  }

  clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}