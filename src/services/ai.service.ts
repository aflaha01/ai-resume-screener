import { API_BASE_URL } from "@/lib/api";

export async function enhanceSummary(
  summary: string[]
): Promise<string[]> {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_BASE_URL}/ai/enhance-summary/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ summary }),
  });

  if (!res.ok) {
    throw new Error("Failed to enhance summary");
  }

  const data = await res.json();
  return data.enhanced_summary;
}

export async function generateSummary(context: {
  skills: string[];
  experience: string[];
  projects: string[];
  education: string[];
}): Promise<string[]> {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_BASE_URL}/ai/generate-summary/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(context),
  });

  if (!res.ok) {
    throw new Error("Failed to generate summary");
  }

  const data = await res.json();
  return data.generated_summary;
}
