"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/resume/resumeUpload";
import { ResumeService } from "@/services/resume.service";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const handleResumeUpload = async (file: File) => {
  setLoading(true);
  setMessage("");

  try {
    const token = localStorage.getItem("access");
    if (!token) throw new Error("Please login again");

    const data = await ResumeService.uploadResume(file, token);

    setMessage("Resume uploaded successfully");

    //  store extracted profile temporarily
    sessionStorage.setItem(
      "extractedProfile",
      JSON.stringify(data.profile)
    );

    // redirect WITHOUT id
    setTimeout(() => {
      router.push("/profile");
      console.log("Upload response:", data);
    }, 800);
  } catch (error) {
    setMessage(
      error instanceof Error ? error.message : "Resume upload failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <ResumeUpload
        onSubmit={handleResumeUpload}
        loading={loading}
        message={message}
      />
    </main>
  );
}
