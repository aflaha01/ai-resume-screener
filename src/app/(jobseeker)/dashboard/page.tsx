"use client";

import { useEffect, useState } from "react";
import { ProfileService } from "@/services/profile.service";
import SkillCloud from "@/components/jobseeker/dashboard/SkillCloud";

/* Author: Aflaha on Feb 11, 2026 
   Purpose: Renders the main dashboard page for authenticated users 
   Props: None 
*/

export default function DashboardPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const profileService = new ProfileService();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getMySkills();

        // Backend returns: { skills: [...] }
        setSkills(data.skills || []);
      } catch (error) {
        console.error("Failed to load skills", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to your dashboard!
        </p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Skills
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading skills...</p>
          ) : (
            <SkillCloud skills={skills} />
          )}
        </div>
      </div>
    </div>
  );
}
