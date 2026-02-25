"use client";

import { Building2, Briefcase, Upload } from "lucide-react";

interface ProfileFormProps {
  loading: boolean;
  logoPreview: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileForm({
  loading,
  logoPreview,
  onSubmit,
  onLogoChange,
}: ProfileFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <div className="relative">
            <Building2
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              name="company_name"
              placeholder="e.g., Tech Corp Inc."
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <div className="relative">
            <Briefcase
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              name="industry"
              type="text"
              placeholder="e.g., Technology, Healthcare, Finance..."
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Company Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>

          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center">
                  <Upload className="text-gray-400" size={24} />
                </div>
              )}
            </div>

            <div>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={onLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="inline-flex items-center px-4 py-2 border rounded-lg text-sm cursor-pointer hover:bg-gray-50"
              >
                <Upload size={18} className="mr-2" />
                Choose Logo
              </label>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving Profile..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}