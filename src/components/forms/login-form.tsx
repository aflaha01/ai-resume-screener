"use client";

import { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void>;
  loading: boolean;
  message: string;
}

export default function LoginForm({
  onSubmit,
  loading,
  message,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await onSubmit({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-xl font-semibold text-center text-gray-900 mb-6">
          Login
        </h1>

        <div className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2.5 border rounded-md bg-blue-50 text-black"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 border rounded-md bg-blue-50 text-black"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 text-center p-2 rounded-md ${
              message.includes("successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-4 text-sm text- center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
