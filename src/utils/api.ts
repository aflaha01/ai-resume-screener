// export async function fetchAboutMe(profile: {
//   skills?: string[];
//   experience?: string[];
//   projects?: string[];
//   education?: string[];
// }): Promise<string[]> {
//   try {
//     const res = await fetch("/api/generate-about-me/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(profile),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to generate About Me");
//     }

//     const data = await res.json();
//     return data.about_me.split("\n\n").filter(Boolean);
//   } catch (err) {
//     console.error(err);
//     return ["Could not generate About Me at this time."];
//   }
// }
