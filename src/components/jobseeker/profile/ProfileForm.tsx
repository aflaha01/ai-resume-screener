"use client";

import { X, Edit2, User, Mail, Phone, Code, Award, GraduationCap, Building, BookOpen, CheckCircle, Loader2  } from "lucide-react";
import type { Profile } from "@/types/profile";
import EditableSummary from "./EditableSummary";
import EditableSection from "./EditableSection";
import EditableInfoCard from "./EditableInfoCard";

interface ProfileFormProps {
  profile: Profile;
  isEditing: boolean;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void; 
  onBasicChange: (field: keyof Profile, value: string) => void;
  onArrayChange: (field: keyof Profile, items: string[]) => void;
}

export default function ProfileForm({
  profile,
  isEditing,
  saving,
  onEdit,
  onCancel,
  onSave,
  onBasicChange,
  onArrayChange,
}: ProfileFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Basic Info */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>

            <div className="flex gap-2">
              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* ALWAYS SHOW SUBMIT */}
          <button
            onClick={onSave}
            disabled={saving}
            className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
            <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
            ) : (

              <>
                <CheckCircle className="w-4 h-4" />
                Submit Profile
              </>
            )}
          </button>

          <div className="space-y-4">
            <EditableInfoCard
              label="Full Name"
              value={profile.name || ""}
              icon={User}
              isEditing={isEditing}
              onChange={(v) => onBasicChange("name", v)}
            />

            <EditableInfoCard
              label="Email"
              value={profile.email || ""}
              icon={Mail}
              isEditing={isEditing}
              onChange={(v) => onBasicChange("email", v)}
            />

            <EditableInfoCard
              label="Phone"
              value={profile.phone || ""}
              icon={Phone}
              isEditing={isEditing}
              onChange={(v) => onBasicChange("phone", v)}
            />
          </div>
        </div>
      </div>

      {/* Right Column - Detailed Sections */}
      <div className="lg:col-span-2 space-y-6">
        <EditableSummary
          summary={profile.summary}
          isEditing={isEditing}
          onSummaryChange={(s) => onArrayChange("summary", s)}
          skills={profile.skills}
          experience={profile.experience}
          projects={profile.projects}
          education={profile.education}
        />

        <EditableSection
          title="Skills"
          items={profile.skills}
          icon={Code}
          isEditing={isEditing}
          onItemsChange={(i) => onArrayChange("skills", i)}
        />

        <EditableSection
          title="Certifications"
          items={profile.certifications}
          icon={Award}
          isEditing={isEditing}
          onItemsChange={(i) => onArrayChange("certifications", i)}
        />

        <EditableSection
          title="Education"
          items={profile.education}
          icon={GraduationCap}
          isEditing={isEditing}
          onItemsChange={(i) => onArrayChange("education", i)}
        />

        <EditableSection
          title="Experience"
          items={profile.experience}
          icon={Building}
          isEditing={isEditing}
          onItemsChange={(i) => onArrayChange("experience", i)}
        />

        <EditableSection
          title="Projects"
          items={profile.projects}
          icon={BookOpen}
          isEditing={isEditing}
          onItemsChange={(i) => onArrayChange("projects", i)}
        />
      </div>
    </div>
  );
}
