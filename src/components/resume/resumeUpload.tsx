"use client";

import { useState } from "react";
import { Cloud, CheckCircle2, Loader } from "lucide-react";

interface ResumeUploadProps {
  onSubmit: (file: File) => Promise<void>;
  loading: boolean;
  message: string;
}

export default function ResumeUpload({
  onSubmit,
  loading,
  message,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const setSelectedFile = (selected: File | null) => {
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setFile(selected);
    setFileName(selected.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume");
      return;
    }
    await onSubmit(file);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Upload Your Resume
      </h2>

      <p className="mb-6 text-gray-600">
        Upload your resume in PDF format to create your smart profile
      </p>

      {/* File input + drop zone */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition
              ${
                dragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500"
              }
            `}
          >
            <div className="flex flex-col items-center">
              <Cloud className="w-12 h-12 text-gray-400 mb-3" />
              <span className="text-sm text-gray-600">
                {fileName || "Click to upload or drag & drop"}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PDF only
              </span>
            </div>
          </div>
        </div>

        {fileName && (
          <div className="mt-3 flex items-center text-sm text-green-600">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Selected: {fileName}
          </div>
        )}
      </div>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader className="animate-spin mr-2 h-5 w-5" />
            AI is analyzing your resume...
          </span>
        ) : (
          "Upload & Analyze Resume"
        )}
      </button>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 text-sm text-center p-2 rounded ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
