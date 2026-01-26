"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
  const router = useRouter();
  const authService = new AuthService();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    const response = await AuthService.login(formData);

    if (response.status === "success") {
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } else {
      alert(response.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {loading ? (
        <p>Logging in...</p>
      ) : (
        <LoginForm onSubmit={onSubmit} />
      )}
    </div>
  );
}
