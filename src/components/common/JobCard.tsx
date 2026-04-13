"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  Pencil,
  Trash2,
  Building,
} from "lucide-react";

import type { Job } from "@/types/job";
import { ROLES } from "@/constants/roles";
import { AuthService } from "@/services/auth.service";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const authService = new AuthService();
  const role = authService.getRole();

  // Helper function to determine color based on match percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-teal-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1">
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

          <span className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Building size={14} />
            {job.company_name}
          </span>

          <p
            className={`text-sm text-gray-600 mt-2 whitespace-pre-line ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {job.description}
          </p>

          {job.description.length > 300 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm text-teal-600 hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
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

          {/*Apply button and Match Meter for Job Seekers*/}
          {role === ROLES.JOB_SEEKER && (
            <div className="mt-5">
              {job.match_percentage !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Match Score
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {job.match_percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${getMatchColor(
                        job.match_percentage
                      )} h-2.5 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${job.match_percentage}%` }}
                    />
                  </div>
                </div>
              )}
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* HR Actions */}
        {role === ROLES.HR && (
          <div className="flex gap-2">
            <button
              type="button"
              className="text-gray-700 hover:text-black transition"
              title="Edit job"
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              className="text-red-600 hover:text-red-700 transition"
              title="Delete job"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}