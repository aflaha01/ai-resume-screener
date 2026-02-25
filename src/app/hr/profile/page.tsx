"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HRService } from "@/services/hr.service";
import ProfileForm from "@/components/hr/forms/profile-form";

/**
  Author: Aflaha on Feb 12, 2026
  Purpose: HR profile page for  completing company details.
           Handles form submission and logo preview, then navigates
           to dashboard on success.
  Props: None
 */

export default function HRProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const hrService = new HRService();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await hrService.createHRProfile(formData);
      router.push("/hr/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your HR Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Tell us about your company to start finding candidates
          </p>
        </div>

        <ProfileForm
          loading={loading}
          logoPreview={logoPreview}
          onSubmit={handleSubmit}
          onLogoChange={handleLogoChange}
        />
      </div>
    </div>
  );
}
