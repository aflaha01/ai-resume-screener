"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/login-form";
import { AuthService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (formData: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await AuthService.login(formData);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setMessage("Login successful");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={loading}
      message={message}
    />
  );
}
