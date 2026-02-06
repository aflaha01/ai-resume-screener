import type { Profile } from "@/types/profile";
import { API_BASE_URL } from "@/lib/api";

/* Author: Aflaha on Jan 30, 2026 
   Purpose: Provides profile-related API services to save and update user profile data to the backend. 
   Props: None 
*/


export async function saveProfile(profile: Profile) {
  const token = localStorage.getItem("access");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_BASE_URL}/profile/save/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    let errorMsg = "Failed to save profile";
    try {
      const data = await res.json();
      errorMsg = data?.detail || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json();
}
