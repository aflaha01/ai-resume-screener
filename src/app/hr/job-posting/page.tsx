"use client";

import { useEffect, useState } from "react";
import {Briefcase,Plus,MapPin,Calendar,Pencil,Trash2} from "lucide-react";
import CreateJobForm from "@/components/hr/forms/CreateJobForm";
import { JobService } from "@/services/job.service";
import type { Job, JobStatus } from "@/types/job";

/**
  Author: Aflaha on Feb 12, 2026
  Purpose: Displays and manages a list of job postings for HR users.
           Enables creation, filtering, viewing,Fetches data from backend and handles state.
  Props: None
 */



export default function JobPostingPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<"all" | JobStatus>("all");
  const [openCreateJob, setOpenCreateJob] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);

  const toggleJobDescription = (jobId: number) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const jobService = new JobService();

  /* Fetch jobs from backend */
  const fetchJobs = async () => {
    try {
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-sm text-gray-600">
              Manage and track all your job listings
            </p>
          </div>

          <button
            onClick={() => setOpenCreateJob(true)}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={16} className="mr-2" />
            Create New Job
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-2 flex gap-2 mb-6">
          <FilterButton
            label="All Jobs"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterButton
            label="Active"
            active={filter === "active"}
            onClick={() => setFilter("active")}
          />
          <FilterButton
            label="Closed"
            active={filter === "closed"}
            onClick={() => setFilter("closed")}
          />
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-10">
              No jobs found
            </div>
          )}

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex justify-between gap-6">
                {/* Left */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    {job.status === "active" && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm text-gray-600 mt-2 whitespace-pre-line ${
                      expandedJobs.includes(job.id) ? "" : "line-clamp-3"
                    }`}
                  >
                    {job.description}
                  </p>

                  {job.description.length > 300 && (
                    <button
                      onClick={() => toggleJobDescription(job.id)}
                      className="mt-1 text-sm text-teal-600 hover:underline"
                    >
                      {expandedJobs.includes(job.id) ? "Show less" : "Read more"}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {job.job_type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Last date {job.last_date}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="  text-gray-700 transition"
                    title="Edit job"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    className=" text-red-600 transition"
                    title="Delete job"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Job Modal */}
      <CreateJobForm
        open={openCreateJob}
        onClose={() => setOpenCreateJob(false)}
        onJobCreated={fetchJobs}
      />
    </div>
  );
}

/* Filter Button */

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-lg transition ${
        active
          ? "bg-teal-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}