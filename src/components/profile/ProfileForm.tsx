// "use client";

// import { CheckCircle, BookOpen, Award, Code, GraduationCap, Building, FileText,Mail,Phone } from "lucide-react";
// import type { Profile } from "@/types/profile";

// interface ProfileFormProps {
//   profile: Profile;
// }

// function Section({
//   title,
//   items,
//   icon: Icon,
// }: {
//   title: string;
//   items?: string[];
//   icon?: React.ComponentType<{ className?: string }>;
// }) {
//   if (!items || items.length === 0) return null;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       <div className="flex items-center gap-3 mb-4">
//         {Icon && <Icon className="w-5 h-5 text-gray-700" />}
//         <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
//       </div>
      
//       {title === "Skills" ? (
//         <div className="flex flex-wrap gap-2">
//           {items.map((item, index) => (
//             <span
//               key={index}
//               className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {items.map((item, index) => (
//             <div key={index} className="flex items-start gap-3">
//               <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
//               <p className="text-gray-700 leading-relaxed">{item}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function SummarySection({ summary }: { summary?: string[] }) {
//   if (!summary || summary.length === 0) return null;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <FileText className="w-5 h-5 text-gray-700" />
//         <h2 className="text-lg font-semibold text-gray-900">Professional Summary</h2>
//       </div>
//       <div className="prose max-w-none">
//         {summary.map((paragraph, index) => (
//           <p key={index} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
//             {paragraph}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }

// function InfoCard({
//   label,
//   value,
//   icon: Icon,
// }: {
//   label: string;
//   value: string;
//   icon: React.ComponentType<{ className?: string }>;
// }) {
//   if (!value) return null;
  
//   return (
//     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//       <div className="flex items-center gap-2 mb-2">
//         <Icon className="w-4 h-4 text-gray-600" />
//         <label className="text-sm font-medium text-gray-700">{label}</label>
//       </div>
//       <div className="text-gray-900 font-medium">{value}</div>
//     </div>
//   );
// }

// export default function ProfileForm({ profile }: ProfileFormProps) {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Left Column - Basic Info */}
//       <div className="lg:col-span-1">
//         <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
//           <div className="space-y-4">
//             <InfoCard 
//               label="Full Name" 
//               value={profile.name || ""} 
//               icon={FileText}
//             />
//             <InfoCard 
//               label="Email" 
//               value={profile.email || ""} 
//               icon={Mail}
//             />
//             <InfoCard 
//               label="Phone" 
//               value={profile.phone || ""} 
//               icon={Phone}
//             />
//           </div>
          
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span>Profile complete</span>
//             </div>
//             <p className="text-sm text-gray-500 mt-2">
//               This profile was automatically generated from your resume.
//               Editing functionality will be available soon.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - Detailed Sections */}
//       <div className="lg:col-span-2 space-y-6">
//         <SummarySection summary={profile.summary} />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Section 
//             title="Skills" 
//             items={profile.skills} 
//             icon={Code}
//           />
//           <Section 
//             title="Certifications" 
//             items={profile.certifications} 
//             icon={Award}
//           />
//         </div>
        
//         <Section 
//           title="Education" 
//           items={profile.education} 
//           icon={GraduationCap}
//         />
        
//         <Section 
//           title="Experience" 
//           items={profile.experience} 
//           icon={Building}
//         />
        
//         <Section 
//           title="Projects" 
//           items={profile.projects} 
//           icon={BookOpen}
//         />
//       </div>
//     </div>
//   );
// } 
"use client";

import { useState, useEffect } from "react";
import { X, Edit2, User, Mail, Phone, Code, Award, GraduationCap, Building, BookOpen } from "lucide-react";
import type { Profile } from "@/types/profile";
import EditableSummary from "./EditableSummary";
import EditableSection from "./EditableSection";
import EditableInfoCard from "./EditableInfoCard";

interface ProfileFormProps {
  profile: Profile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);

  //  Sync when profile prop changes
  useEffect(() => {
    console.log("ProfileForm received new profile:", profile);
    setLocalProfile(profile);
  }, [profile]);

  const handleBasicInfoChange = (field: keyof Profile, value: string) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: keyof Profile, items: string[]) => {
    setLocalProfile(prev => ({ ...prev, [field]: items }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Basic Info */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <button
              onClick={toggleEditMode}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel Edit
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <EditableInfoCard 
              label="Full Name" 
              value={localProfile.name || ""}
              icon={User}
              isEditing={isEditing}
              onChange={(value) => handleBasicInfoChange('name', value)}
            />
            <EditableInfoCard 
              label="Email" 
              value={localProfile.email || ""}
              icon={Mail}
              isEditing={isEditing}
              onChange={(value) => handleBasicInfoChange('email', value)}
            />
            <EditableInfoCard 
              label="Phone" 
              value={localProfile.phone || ""}
              icon={Phone}
              isEditing={isEditing}
              onChange={(value) => handleBasicInfoChange('phone', value)}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className={`w-2 h-2 rounded-full ${isEditing ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <span>{isEditing ? 'Editing mode' : 'Profile complete'}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {isEditing 
                ? 'You are in editing mode. Changes are only stored locally and will not be saved.'
                : 'Edit profile to make changes. All edits are stored locally.'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Detailed Sections */}
      <div className="lg:col-span-2 space-y-6">
        <EditableSummary 
          summary={localProfile.summary} 
          isEditing={isEditing}
          onSummaryChange={(summary) => handleArrayFieldChange('summary', summary)}
           skills={localProfile.skills}
           experience={localProfile.experience}
           projects={localProfile.projects}
           education={localProfile.education}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableSection 
            title="Skills" 
            items={localProfile.skills} 
            icon={Code}
            isEditing={isEditing}
            onItemsChange={(items) => handleArrayFieldChange('skills', items)}
          />
          <EditableSection 
            title="Certifications" 
            items={localProfile.certifications} 
            icon={Award}
            isEditing={isEditing}
            onItemsChange={(items) => handleArrayFieldChange('certifications', items)}
          />
        </div>
        
        <EditableSection 
          title="Education" 
          items={localProfile.education} 
          icon={GraduationCap}
          isEditing={isEditing}
          onItemsChange={(items) => handleArrayFieldChange('education', items)}
        />
        
        <EditableSection 
          title="Experience" 
          items={localProfile.experience} 
          icon={Building}
          isEditing={isEditing}
          onItemsChange={(items) => handleArrayFieldChange('experience', items)}
        />
        
        <EditableSection 
          title="Projects" 
          items={localProfile.projects} 
          icon={BookOpen}
          isEditing={isEditing}
          onItemsChange={(items) => handleArrayFieldChange('projects', items)}
        />
      </div>
    </div>
  );
}
