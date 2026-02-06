import { API_BASE_URL } from "@/lib/api";

/* Author: Aflaha on Jan 26, 2026 
   Purpose: Provides authentication-related API services for login and registration. 
   Props: None 
*/

export class AuthService {
  static async login(data: { username: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();


    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  }

  static async register(data: { username: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  }
}
