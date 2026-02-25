"use client";
import { useEffect, useState } from "react";
import { UserService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/jobseeker/resume/resumeUpload";
import { ResumeService } from "@/services/resume.service";

/* Author: Aflaha on Jan 30, 2026 
   Purpose: Renders the resume upload page, handles resume parsing, stores extracted profile data, and redirects to profile review. 
   Props: None 
*/


export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userService = new UserService();

  useEffect(() => {
  const checkOnboarding = async () => {
    try {
      const user = await userService.me();

      // If already onboarded skip resume upload
      if (user.onboarding_completed) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Failed to check onboarding", err);
    }
  };

  checkOnboarding();
}, [router]);


const handleResumeUpload = async (file: File) => {
  setLoading(true);
  setMessage("");

  try {
    const token = localStorage.getItem("access");
    if (!token) throw new Error("Please login again");

    const resumeService = new ResumeService();
    const data = await resumeService.uploadResume(file);

    setMessage("Resume uploaded successfully");

sessionStorage.setItem(
  "extractedProfile",
  JSON.stringify(data.profile)
);


    
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
