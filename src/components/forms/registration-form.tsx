"use client";

import { useState } from "react";
import Link from "next/link";

interface RegisterFormProps {
  onRegister: (username: string, password: string) => void;
  loading: boolean;
  message: string;
}

export default function RegisterForm({ onRegister, loading, message }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h1 className="text-xl font-semibold text-center text-gray-900 mb-6">Register</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="abcdef@gmail.com"
            className="w-full px-4 py-2.5 rounded-md border border-gray-300
              bg-blue-50 text-black
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-md border border-gray-300
              bg-blue-50 text-black
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => onRegister(username, password)}
          disabled={loading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700
            text-white font-medium py-2.5 rounded-md
            transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 text-sm text-center p-2 rounded-md ${
            message.includes("successful")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
