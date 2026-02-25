"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { AIService } from "@/services/ai.service";
import { JobService } from "@/services/job.service";

interface CreateJobFormProps {
  open: boolean;
  onClose: () => void;
  onJobCreated: () => void;
}

export default function CreateJobForm({
  open,
  onClose,
  onJobCreated, 
}: CreateJobFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");

  const [jdPrompt, setJdPrompt] = useState("");
  const [generatedJD, setGeneratedJD] = useState("");
  const [loadingJD, setLoadingJD] = useState(false);
  const [lastDate, setLastDate] = useState("");

  const handleGenerateJD = async () => {
    try {
      setLoadingJD(true);
      const aiService = new AIService();

      const jd = await aiService.generateJobDescription({
        title: jobTitle,
        job_type: jobType,
        location,
        notes: jdPrompt,
      });

      setGeneratedJD(jd);
    } catch (error) {
      console.error("JD generation failed", error);
    } finally {
      setLoadingJD(false);
    }
  };

  const jobService = new JobService();

const handleCreateJob = async () => {
  try {
    await jobService.createJob({
      title: jobTitle,
      description: generatedJD || jdPrompt,
      location,
      job_type: jobType,
      last_date: lastDate,
    });

    onClose();
    onJobCreated(); // 🔥 refresh list
  } catch (error) {
    console.error("Job creation failed", error);
  }
};

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Create New Job Posting
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Senior Frontend Developer"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                       outline-none transition text-gray-700"
          />
        </div>


        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Remote / San Francisco"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                       outline-none transition text-gray-700"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                       outline-none transition text-gray-700"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        {/* Last Date */}
        <div>
  <label className="block text-sm font-medium text-gray-700">
    Last Date to Apply
  </label>
  <input
    type="date"
    value={lastDate}
    onChange={(e) => setLastDate(e.target.value)}
    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
               focus:ring-2 focus:ring-teal-500 focus:border-teal-500
               outline-none transition text-gray-700"
  />
</div>
      </div>

      {/* JD Prompt */}
      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Describe the position you want to hire for
        </label>

        <textarea
          rows={4}
          value={jdPrompt}
          onChange={(e) => setJdPrompt(e.target.value)}
          placeholder="E.g., Senior Frontend Developer with React experience, Marketing Manager for B2B SaaS..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                     focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                     outline-none transition resize-none text-gray-700"
        />

        <p className="text-xs text-gray-600">
          Be as specific as possible. Include role title, key skills, experience level,
          or special requirements.
        </p>

        <button
          type="button"
          onClick={handleGenerateJD}
          disabled={!jdPrompt || loadingJD}
          className="w-full mt-3 flex items-center justify-center gap-2
                     rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium
                     text-white hover:bg-teal-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} />
          {loadingJD ? "Generating..." : "Generate Job Description"}
        </button>
      </div>

      {/* Generated JD */}
      {generatedJD && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Generated Job Description
          </label>
          <textarea
            rows={8}
            value={generatedJD}
            readOnly
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       text-sm bg-gray-50 text-gray-700 resize-none"
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700
                     hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
  onClick={handleCreateJob}
  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
>
  Create Job
</button>
      </div>
    </Modal>
  );
}