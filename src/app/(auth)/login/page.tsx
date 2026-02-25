"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/jobseeker/forms/login-form";
import { AuthService } from "@/services/auth.service";

/**
  Author: Aflaha on Jan 30, 2026
  Purpose: Renders the login page for both HR and job seeker users. It reads
           optional role query parameter, handles authentication via AuthService,
           stores tokens, and redirects based on user type and onboarding status.
  Props: None
 */


export default function LoginPage() {

  const searchParams = useSearchParams();
const role =
  (searchParams.get("role") as "HR" | "JOB_SEEKER") || "JOB_SEEKER";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const authService = new AuthService();

  const handleLogin = async (formData: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setMessage("");

    try {
    const data = await authService.login({
      ...formData,
      user_type: role, 
    });

      authService.saveTokens(data.access, data.refresh);

      if (data.user_type === "HR") {
        router.push(
          data.onboarding_completed
            ? "/hr/dashboard"
            : "/hr/profile"
        );
      } else {
        router.push(
          data.onboarding_completed
            ? "/dashboard"
            : "/resume-upload"
        );
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={loading}
      message={message}
      role={role} 
    
    />
  );
}
