"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";
import type { Profile } from "@/types/profile";
import { saveProfile } from "@/services/profile.service";
import { Loader2 } from "lucide-react";

/* Author: Aflaha on Jan 30, 2026 
   Purpose: Renders the user profile page to review, edit, and submit extracted profile data.
   Props: None 
*/


export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const extracted = sessionStorage.getItem("extractedProfile");
    const draft = sessionStorage.getItem("draftProfile");

    console.log("Draft:", draft);
    console.log("Extracted:", extracted);

    const source = extracted || draft;

    if (!source) {
      router.push("/resume-upload");
      return;
    }

    const parsed = JSON.parse(source);
    setProfile(parsed);
  }, [router]);

  useEffect(() => {
    if (profile) {
      sessionStorage.setItem("draftProfile", JSON.stringify(profile));
    }
  }, [profile]);

  const handleBasicChange = (field: keyof Profile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleArrayChange = (field: keyof Profile, items: string[]) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: items });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);

      const data = await saveProfile(profile);

      setProfile(data.profile);
      sessionStorage.removeItem("draftProfile");
      setIsEditing(false);

      // Show success + spinner screen
      setSubmitted(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1800);

    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-700">
            Profile submitted successfully
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <ProfileForm
        profile={profile}
        isEditing={isEditing}
        saving={saving}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onBasicChange={handleBasicChange}
        onArrayChange={handleArrayChange}
      />
    </main>
  );
}
