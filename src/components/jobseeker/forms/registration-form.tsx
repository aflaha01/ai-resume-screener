"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

interface RegisterFormProps {
  onRegister: (data: { username: string; password: string }) => Promise<void>;
  loading: boolean;
  message: string;
  role: "HR" | "JOB_SEEKER";
}

export default function RegisterForm({
  onRegister,
  loading,
  message,
  role,
}: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-blue-600 font-medium mt-1">
              Register as {role === "HR" ? "HR" : "Job Seeker"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-blue-50/30"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-blue-50/30"
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`text-sm text-center p-3 rounded-lg ${
                  message.includes("success") || message.includes("Welcome")
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={() => onRegister({ username, password })}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Signing up..." : "Register"}
            </button>

            {/* Login Link */}
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href={`/login?role=${role}`}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
