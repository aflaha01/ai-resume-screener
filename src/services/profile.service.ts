// // src/services/profile.service.ts
// import { API_BASE_URL } from "@/lib/api";

// import type { Profile } from "@/types/profile";

// export async function fetchProfile(
//   profileId: string
// ): Promise<Profile> {
//   const token = localStorage.getItem("access");

//   const res = await fetch(
//     `${API_BASE_URL}/profile/${profileId}/`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch profile");
//   }

//   return res.json();
// }
