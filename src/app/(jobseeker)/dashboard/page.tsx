"use client";

import { useEffect, useState } from "react";
import { ProfileService } from "@/services/profile.service";
import SkillCloud from "@/components/jobseeker/dashboard/SkillCloud";
import { JobService } from "@/services/job.service";
import type { Job } from "@/types/job";
import JobCard from "@/components/common/JobCard";

/* Author: Aflaha on Feb 11, 2026 
   Purpose: Renders the main dashboard page for authenticated users 
   Props: None 
*/

export default function DashboardPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  const profileService = new ProfileService();

  useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const data = await profileService.getMySkills();
      setSkills(data.skills || []);

      const jobService = new JobService();
      const matchedJobs = await jobService.getMatchedJobs();
      setJobs(matchedJobs);

    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  loadDashboardData();
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
        <div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Recommended Jobs
  </h2>

  {jobs.length === 0 ? (
    <p className="text-gray-500">No matching jobs found.</p>
  ) : (
    <div className="space-y-4">
      {jobs.map((job) => (
      <JobCard key={job.id} job={job} />
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
}
