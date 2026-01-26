"use client";

import { useState } from "react";
import RegisterForm from "@/components/forms/registration-form";
import { AuthService } from "@/services/auth.service";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (username: string, password: string) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await AuthService.register({ username, password });

      if (data.message) {
        setMessage("Registration successful. Please login.");
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <RegisterForm
        onRegister={handleRegister}
        loading={loading}
        message={message}
      />
    </main>
  );
}
