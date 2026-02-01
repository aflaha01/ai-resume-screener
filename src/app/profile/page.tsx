"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";
import type { Profile } from "@/types/profile";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("extractedProfile");

    if (!stored) {
      router.push("/dashboard");
      return;
    }

    setProfile(JSON.parse(stored));
  }, [router]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading extracted profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <ProfileForm profile={profile} />
    </main>
  );
}
