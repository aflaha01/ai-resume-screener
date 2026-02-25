"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RegisterForm from "@/components/jobseeker/forms/registration-form";
import { AuthService } from "@/services/auth.service";

/**
  Author: Aflaha on Jan 30, 2026
  Purpose: Renders the registration page allowing HR or job seeker users to
           create an account.
  Props: None
 */


export default function RegisterPage() {
  const searchParams = useSearchParams();
  const role =
    (searchParams.get("role") as "HR" | "JOB_SEEKER") || "JOB_SEEKER";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const authService = new AuthService();

  const handleRegister = async (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;

  setLoading(true);
  setMessage("");

  try {
    await authService.register({
      username,
      password,
      user_type: role,
    });
    setMessage("Registration successful. Please login.");
  } catch (err) {
    setMessage("Registration failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <RegisterForm
      onRegister={handleRegister}
      loading={loading}
      message={message}
      role={role} 
    />
  );
}
